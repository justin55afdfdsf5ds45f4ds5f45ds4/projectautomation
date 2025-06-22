import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchBlogPostsFromSupabase } from "@/lib/blogs";

export default async function BlogsPage() {
  const blogPosts = await fetchBlogPostsFromSupabase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover tips, insights, and stories to help you on your health
            journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No blog posts found.
            </div>
          ) : (
            blogPosts.map(
              (post: { slug: string; title: string; excerpt: string }) => (
                <div
                  key={post.slug}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blogs/${post.slug}`}>
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
