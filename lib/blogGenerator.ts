import Replicate from "replicate";
import { uploadBlogToSupabase, checkIfBlogExistsBySlug } from "./blogs";
import { generateImageWithReplicate } from "./replicateImage";
import { generateImagePromptFromBlog, insertImageTagIntoBlog } from "./utils";
import {
  GENERATE_AI_BLOG_PROMPT,
  GENERATE_WEIGHTLOSS_BLOG_PROMPT,
} from "./prompts";

let lastGeneratedCategory: "ai" | "weightloss" = "weightloss";

export async function generateAndUploadUniqueBlog(): Promise<{
  filename: string;
  path: string;
  blog: string;
} | null> {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    return null;
  }

  const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
  });
  const model = "meta/meta-llama-3-8b-instruct";
  const input = {
    prompt:
      lastGeneratedCategory === "weightloss"
        ? GENERATE_AI_BLOG_PROMPT
        : GENERATE_WEIGHTLOSS_BLOG_PROMPT,
    max_new_tokens: 4096,
  };

  // Update the last generated category for the next run
  lastGeneratedCategory =
    lastGeneratedCategory === "weightloss" ? "ai" : "weightloss";

  const output = await replicate.run(model, { input });

  let blog: string;
  if (Array.isArray(output)) {
    blog = output.join("");
  } else if (typeof output === "string") {
    blog = output;
  } else {
    blog = JSON.stringify(output);
  }

  if (!blog) {
    console.error("Failed to generate blog content from Replicate.");
    return null;
  }

  const frontmatterIndex = blog.indexOf("---");
  if (frontmatterIndex !== -1 && frontmatterIndex !== 0) {
    blog = blog.slice(frontmatterIndex);
  }

  const titleMatch = blog.match(/title:\s*["']?(.+?)["']?\s*(\r?\n|$)/i);
  if (!titleMatch || !titleMatch[1]) {
    console.warn(
      "Generated blog missing title in frontmatter, skipping upload."
    );
    return null;
  }
  const title = titleMatch[1].trim();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  const blogExists = await checkIfBlogExistsBySlug(slug);

  if (blogExists) {
    console.log(
      `Blog with slug "${slug}" already exists. Retrying generation.`
    );
    return null;
  }

  const imagePrompt = generateImagePromptFromBlog(blog);
  const imageUrl = await generateImageWithReplicate(imagePrompt);
  blog = insertImageTagIntoBlog(blog, imageUrl, imagePrompt);

  const { filename, path } = await uploadBlogToSupabase(blog);

  return { filename, path, blog };
}
