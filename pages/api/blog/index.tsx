import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), 'blogs');
  const files = fs.readdirSync(blogDir);

  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || 'Untitled',
      date: data.date || '',
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, title, date }) => (
          <li key={slug} className="border-b pb-2">
            <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline text-xl">
              {title}
            </Link>
            <p className="text-sm text-gray-500">{new Date(date).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
