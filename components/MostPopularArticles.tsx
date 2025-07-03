import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  thumbnail?: string | null;
}

interface MostPopularArticlesProps {
  popularPosts: BlogPost[];
}

export default function MostPopularArticles({
  popularPosts,
}: MostPopularArticlesProps) {
  return (
    <div className="mt-8 pt-8 col-span-full">
      <h2 className="text-2xl font-bold text-gray-900 pb-4 mb-8 border-b border-gray-200">
        Most Popular Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularPosts.map((popularPost) => (
          <div
            key={popularPost.slug}
            className="bg-white rounded-[8px] overflow-hidden border p-1 hover:shadow-lg"
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
                className="text-md font-semibold text-gray-800 hover:text-red-500"
              >
                {popularPost.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
