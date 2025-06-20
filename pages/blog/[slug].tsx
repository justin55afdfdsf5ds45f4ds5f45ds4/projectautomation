import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'blogs'));
  const paths = files.map(file => ({
    params: { slug: file.replace('.mdx', '') }
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const file = fs.readFileSync(path.join(process.cwd(), 'blogs', `${params.slug}.mdx`), 'utf-8');
  const { content, data } = matter(file);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontmatter: data }, revalidate: 86400 };
};

export default function Blog({ source, frontmatter }) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-gray-500 mb-8">{frontmatter.date}</p>
      <MDXRemote {...source} />
    </div>
  );
}
