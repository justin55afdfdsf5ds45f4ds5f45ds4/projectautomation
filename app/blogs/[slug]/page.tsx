import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "@/lib/blogs";
import ReactMarkdown from "react-markdown";

interface BlogDetailPageProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/blogs">
            <Button variant="outline" className="mb-6">
              ← Back to Blogs
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-lg text-gray-600 mb-6">{post.summary}</p>
          )}
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

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
