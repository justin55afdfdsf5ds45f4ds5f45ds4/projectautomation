import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts YAML frontmatter from a markdown string.
 * @param markdownString The markdown content
 * @returns The frontmatter string or null if not found
 */
export function extractFrontmatter(markdownString: string): string | null {
  const frontmatterMatch =
    markdownString.match(/^```mdx\s*---([\s\S]*?)---\s*/m) ||
    markdownString.match(/^---([\s\S]*?)---\s*/m);
  return frontmatterMatch ? frontmatterMatch[1] : null;
}

/**
 * Generates an image prompt from blog content by extracting title and summary from frontmatter.
 * @param blog The full blog content string.
 * @returns A string to be used as an image prompt.
 */
export function generateImagePromptFromBlog(blog: string): string {
  const frontmatter = extractFrontmatter(blog);
  let imagePrompt = "A relevant image for this blog post: ";
  if (frontmatter) {
    const titleMatch = frontmatter.match(
      /title:\s*["']?(.+?)["']?\s*(\r?\n|$)/i
    );
    if (titleMatch && titleMatch[1]) {
      imagePrompt = imagePrompt += " - " + titleMatch[1].trim();
    }
  }
  return imagePrompt;
}

/**
 * Inserts an image tag into the blog content, preferably after the frontmatter.
 * @param blog The blog content string.
 * @param imageUrl The URL of the image to insert.
 * @param imagePrompt The alt text for the image.
 * @returns The modified blog content with the image tag inserted.
 */
export function insertImageTagIntoBlog(
  blog: string,
  imageUrl: string | null,
  imagePrompt: string
): string {
  if (!imageUrl) {
    return blog;
  }

  const imageTag = `![${imagePrompt}](${imageUrl})\n\n`;
  const frontmatterIndex = blog.indexOf("---");
  const frontmatterEndIndex =
    frontmatterIndex !== -1
      ? blog.indexOf("---", frontmatterIndex + 3) + 3
      : -1;

  if (frontmatterEndIndex !== -1) {
    return (
      blog.slice(0, frontmatterEndIndex) +
      "\n\n" +
      imageTag +
      blog.slice(frontmatterEndIndex).trimStart()
    );
  } else {
    return imageTag + blog;
  }
}

/**
 * Generates a slug from a given text string.
 * @param text The text to slugify.
 * @returns The slugified string.
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Extracts headings from markdown content and generates unique IDs.
 * @param markdownContent The markdown content.
 * @returns An array of heading objects with text and unique IDs.
 */
export function extractHeadings(
  markdownContent: string
): Array<{ text: string; id: string }> {
  const headings: Array<{ text: string; id: string }> = [];
  const slugCounts: { [key: string]: number } = {};
  const lines = markdownContent.split("\n");
  lines.forEach((line) => {
    if (line.startsWith("#")) {
      const headingText = line.replace(/^#+\s*/, "").trim();
      if (headingText) {
        let id = generateHeadingId(headingText);

        if (slugCounts[id]) {
          slugCounts[id]++;
          id = `${id}-${slugCounts[id]}`;
        } else {
          slugCounts[id] = 1;
        }

        headings.push({ text: headingText, id });
      }
    }
  });
  return headings;
}
