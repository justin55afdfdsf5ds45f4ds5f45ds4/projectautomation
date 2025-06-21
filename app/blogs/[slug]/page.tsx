import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

const blogPosts = [
  {
    slug: "5-simple-weight-loss-tips",
    title: "5 Simple Weight Loss Tips That Actually Work",
  },
  {
    slug: "healthy-meal-prep-guide",
    title: "The Ultimate Healthy Meal Prep Guide for Busy People",
  },
  {
    slug: "metabolism-boosting-foods",
    title: "10 Metabolism-Boosting Foods to Add to Your Diet",
  },
]

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
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

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
            ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <Link href="/blogs">
            <Button className="bg-red-500 hover:bg-red-600 text-white">← Back to Blogs</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
