import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GENERATE_BLOG_PROMPT } from "../../../lib/prompts";
import Replicate from "replicate";
import { uploadBlogToSupabase } from "@/lib/blogs";

export async function GET(request: NextRequest) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: "Replicate API token not set" },
      { status: 500 }
    );
  }

  try {
    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });
    const model = "meta/meta-llama-3-8b-instruct";
    const input = {
      prompt: GENERATE_BLOG_PROMPT,
    };
    const output = await replicate.run(model, { input });

    let blog: string;
    if (Array.isArray(output)) {
      blog = output.join("");
    } else if (typeof output === "string") {
      blog = output;
    } else {
      blog = JSON.stringify(output);
    }

    // Ensure blog starts with YAML frontmatter (---)
    const frontmatterIndex = blog.indexOf("---");
    if (frontmatterIndex !== -1 && frontmatterIndex !== 0) {
      blog = blog.slice(frontmatterIndex);
    }

    // Store the blog to supabase
    const { filename, path } = await uploadBlogToSupabase(blog);

    return NextResponse.json({
      message: "Blog uploaded successfully",
      filename,
      path,
      blog,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Unexpected error",
        details: err.details || err,
      },
      { status: 500 }
    );
  }
}
