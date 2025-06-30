import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug, fetchBlogPostsFromSupabase } from "@/lib/blogs";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import InArticleLinks from "@/components/InArticleLinks";
import { extractHeadings } from "@/lib/utils";

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);
  const allPosts = await fetchBlogPostsFromSupabase();

  if (!post) {
    notFound();
  }

  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const mostRecentPosts = allPosts
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .filter((recentPost) => recentPost.slug !== params.slug)
    .slice(0, 5);

  const popularPosts = shuffleArray([...allPosts])
    .filter((popularPost) => popularPost.slug !== params.slug)
    .slice(0, 6);

  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(post.updated_at));

  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {" "}
        <div className="md:col-span-2">
          {" "}
          <div className="mb-8">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-red-500">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> » </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blogs" className="text-red-500">
                    Blogs
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> » </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-red-700">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Last Updated: {lastUpdated}
            </p>
            {post.summary && (
              <div className="bg-gray-100 border-l-4 border-red-500 text-gray-700 p-4 mb-6 rounded-md">
                <p className="text-lg italic">{post.summary}</p>
              </div>
            )}
          </div>
          <InArticleLinks headings={headings} />
          {/* Logic to find and split content */}
          {(() => {
            const conclusionHeadingMarker = "## Conclusion/Key Takeaways";
            const conclusionIndex = post.content.indexOf(
              conclusionHeadingMarker
            );

            let contentBeforeConclusion = post.content;
            let conclusionContent = null;

            if (conclusionIndex !== -1) {
              const startOfHeadingLine =
                post.content.lastIndexOf("\n", conclusionIndex) + 1;
              const endOfHeadingLine = post.content.indexOf(
                "\n",
                conclusionIndex + conclusionHeadingMarker.length
              );

              contentBeforeConclusion = post.content.substring(
                0,
                startOfHeadingLine
              );
              conclusionContent =
                endOfHeadingLine !== -1
                  ? post.content.substring(endOfHeadingLine + 1).trim()
                  : "";
            }

            return (
              <>
                {/* Render content before conclusion */}
                {conclusionIndex !== -1 &&
                  contentBeforeConclusion.trim().length > 0 && (
                    <div className="prose prose-lg max-w-none mb-8">
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h1 id={id} {...props}>
                                {props.children}
                              </h1>
                            );
                          },
                          h2: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h2 id={id} {...props}>
                                {props.children}
                              </h2>
                            );
                          },
                          h3: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h3 id={id} {...props}>
                                {props.children}
                              </h3>
                            );
                          },
                          h4: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h4 id={id} {...props}>
                                {props.children}
                              </h4>
                            );
                          },
                          h5: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h5 id={id} {...props}>
                                {props.children}
                              </h5>
                            );
                          },
                          h6: ({ node, ...props }) => {
                            const children = Array.isArray(props.children)
                              ? props.children
                              : [props.children];
                            const text = children
                              .map((child) =>
                                typeof child === "string" ? child : ""
                              )
                              .join("");
                            const id = text
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9-]/g, "");
                            return (
                              <h6 id={id} {...props}>
                                {props.children}
                              </h6>
                            );
                          },
                        }}
                      >
                        {contentBeforeConclusion}
                      </ReactMarkdown>
                    </div>
                  )}

                {/* Render conclusion section with custom styling */}
                {conclusionIndex !== -1 && (
                  <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-red-800 mb-4">
                      Conclusion/Key Takeaways
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <ReactMarkdown>{conclusionContent}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Render full content if conclusion heading not found */}
                {conclusionIndex === -1 && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h1 id={id} {...props}>
                              {props.children}
                            </h1>
                          );
                        },
                        h2: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h2 id={id} {...props}>
                              {props.children}
                            </h2>
                          );
                        },
                        h3: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h3 id={id} {...props}>
                              {props.children}
                            </h3>
                          );
                        },
                        h4: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h4 id={id} {...props}>
                              {props.children}
                            </h4>
                          );
                        },
                        h5: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h5 id={id} {...props}>
                              {props.children}
                            </h5>
                          );
                        },
                        h6: ({ node, ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const text = children
                            .map((child) =>
                              typeof child === "string" ? child : ""
                            )
                            .join("");
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          return (
                            <h6 id={id} {...props}>
                              {props.children}
                            </h6>
                          );
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                )}
              </>
            );
          })()}
          <div className="mt-12 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 pb-4 mb-8 border-b border-gray-200">
              Most Popular Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPosts.map((popularPost) => (
                <div
                  key={popularPost.slug}
                  className="bg-white rounded-[8px] shadow-md overflow-hidden border p-1"
                >
                  {popularPost.thumbnail && (
                    <img
                      src={popularPost.thumbnail}
                      alt={popularPost.title}
                      className="w-full h-40 object-cover rounded-[6px]"
                    />
                  )}
                  <div className="p-4">
                    <Link
                      href={`/blogs/${popularPost.slug}`}
                      className="text-lg font-semibold text-gray-800 hover:text-red-500"
                    >
                      {popularPost.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          {" "}
          <div className="p-6 pt-0 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Most Recent Posts
            </h2>
            <ul>
              {mostRecentPosts.map((recentPost) => (
                <li
                  key={recentPost.slug}
                  className="mb-4 flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="w-1/3">
                    {recentPost.thumbnail && (
                      <img
                        src={recentPost.thumbnail}
                        alt={recentPost.title}
                        className="w-full h-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="w-2/3">
                    <Link
                      href={`/blogs/${recentPost.slug}`}
                      className="hover:text-red-500"
                    >
                      {recentPost.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="mt-12">
        <div className="bg-white border-t border-blue-100">
          <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Advertise With Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Join Our Medical Board
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Editorial Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Image Usage Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Affiliate Disclosure
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Advertising Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-red-500">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2"></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#1a202c] text-gray-400 py-6">
          <div className="max-w-6xl mx-auto px-4 text-sm text-center md:text-left">
            <p className="mb-2">
              © 2011 - 2025 Project Automation Private Limited.
            </p>
            <p>
              Project Automation provides content of general nature that is
              designed for informational purposes only. The content is not
              intended to be a substitute for professional medical advice,
              diagnosis, or treatment.{" "}
              <Link href="#" className="text-red-500 hover:underline">
                Click here for additional information.
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
