import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "@/lib/blogs";
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

  if (!post) {
    notFound();
  }

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
      <div className="max-w-4xl mx-auto px-4 py-12">
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
          const conclusionIndex = post.content.indexOf(conclusionHeadingMarker);

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

        <div className="border-t border-gray-200 pt-8">
          <Link href="/blogs">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              ← Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
