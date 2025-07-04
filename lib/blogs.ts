import { supabase } from "./supabase";

/**
 * Uploads a blog post to Supabase storage.
 * Extracts the title, generates a filename, and uploads the content.
 * @param blog The blog content as a string
 * @returns {Promise<{ filename: string, path: string }>}
 * @throws Error if upload fails
 */
export async function uploadBlogToSupabase(
  blog: string
): Promise<{ filename: string; path: string }> {
  const titleMatch = blog.match(/title:\s*["']?(.+?)["']?\s*(\r?\n|$)/i);
  if (!titleMatch || !titleMatch[1]) {
    throw new Error(
      'Blog post must have a title in the frontmatter (e.g., title: "My Blog Title")'
    );
  }
  const title = titleMatch[1].trim();

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  const filename = `${slug}.mdx`;

  const { data, error } = await supabase.storage
    .from("blog-posts")
    .upload(filename, blog, {
      contentType: "text/mdx",
    });

  if (error) {
    throw error;
  }

  return { filename, path: data.path };
}

/**
 * Fetches all blog posts from Supabase Storage, parses their content, and returns metadata.
 * @returns {Promise<Array<{ slug: string, title: string, excerpt: string }>>}
 */
export async function fetchBlogPostsFromSupabase(): Promise<
  {
    slug: string;
    title: string;
    excerpt: string;
    updated_at: string;
    thumbnail: string | null;
  }[]
> {
  // List all files in the "blog-posts" bucket
  const { data: files, error: listError } = await supabase.storage
    .from("blog-posts")
    .list("", { limit: 100 });

  if (listError) {
    throw listError;
  }
  if (!files) {
    return [];
  }

  // Fetch and parse each file
  const posts = await Promise.all(
    files
      .filter((file) => file.name.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.name.replace(/\.mdx$/, "");
        const { data, error } = await supabase.storage
          .from("blog-posts")
          .download(file.name);

        if (error || !data) {
          return null;
        }

        // Read the file content as text
        const text = await data.text();

        // Extract title and excerpt using regex
        const titleMatch = text.match(/title:\s*["']?(.+?)["']?\s*(\r?\n|$)/i);
        const excerptMatch = text.match(
          /excerpt:\s*["']?(.+?)["']?\s*(\r?\n|$)/i
        );
        const summaryMatch = text.match(
          /summary:\s*["']?(.+?)["']?\s*(\r?\n|$)/i
        );

        let thumbnail: string | null = null;
        const imageMatch = text.match(/!\[.*?\]\((.*?)\)/);
        if (imageMatch && imageMatch[1]) {
          thumbnail = imageMatch[1];
        }

        return {
          slug,
          title: titleMatch ? titleMatch[1] : slug,
          excerpt: excerptMatch
            ? excerptMatch[1]
            : summaryMatch
            ? summaryMatch[1]
            : "No excerpt available.",
          updated_at: file.updated_at,
          thumbnail: thumbnail,
        };
      })
  );

  // Filter out any nulls (failed downloads)
  return posts.filter(
    (
      post
    ): post is {
      slug: string;
      title: string;
      excerpt: string;
      updated_at: string;
      thumbnail: string | null;
    } => !!post
  );
}

/**
 * Checks if a blog post with the given slug already exists in Supabase Storage.
 * @param slug The blog post slug (filename without .mdx)
 * @returns {Promise<boolean>} True if the blog exists, false otherwise.
 */
export async function checkIfBlogExistsBySlug(slug: string): Promise<boolean> {
  const filename = `${slug}.mdx`;
  const { data: files, error: listError } = await supabase.storage
    .from("blog-posts")
    .list("", { search: filename });

  if (listError) {
    console.error("Error checking for blog post:", listError);
    return true;
  }

  return (
    files && files.length > 0 && files.some((file) => file.name === filename)
  );
}

/**
 * Fetches a single blog post by slug from Supabase Storage.
 * Parses the frontmatter and content.
 * @param slug The blog post slug (filename without .mdx)
 * @returns {Promise<{ slug: string, title: string, summary: string, content: string } | null>}
 */
export async function fetchBlogPostBySlug(slug: string): Promise<{
  slug: string;
  title: string;
  summary: string;
  content: string;
  updated_at: string;
} | null> {
  const filename = `${slug}.mdx`;
  const { data: files, error: listError } = await supabase.storage
    .from("blog-posts")
    .list("", { search: filename });

  if (listError) {
    console.error("Error listing blog posts:", listError);
    return null;
  }

  if (!files || files.length === 0) {
    return null;
  }

  const fileMetadata = files[0];
  const updated_at = fileMetadata.updated_at;

  const { data, error: downloadError } = await supabase.storage
    .from("blog-posts")
    .download(filename);

  if (downloadError || !data) {
    console.error("Error downloading blog post:", downloadError);
    return null;
  }

  const text = await data.text();

  // Extract YAML frontmatter
  const frontmatterMatch =
    text.match(/^```mdx\s*---([\s\S]*?)---\s*/m) ||
    text.match(/^---([\s\S]*?)---\s*/m);
  let title = slug;
  let summary = "";
  let content = text;

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    // Extract title and summary from frontmatter
    const titleMatch = frontmatter.match(
      /title:\s*["']?(.+?)["']?\s*(\r?\n|$)/i
    );
    const summaryMatch = frontmatter.match(
      /summary:\s*["']?(.+?)["']?\s*(\r?\n|$)/i
    );
    if (titleMatch) title = titleMatch[1];
    if (summaryMatch) summary = summaryMatch[1];
    // Remove frontmatter from content
    content = text.replace(frontmatterMatch[0], "");
  }

  return {
    slug,
    title,
    summary,
    content: content.trim(),
    updated_at,
  };
}
