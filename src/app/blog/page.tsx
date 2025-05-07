import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// Mark as server component
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      {posts?.map((post) => post && (
        <div key={post.slug} className="mt-4">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="text-blue-500">Read More →</Link>
        </div>
      ))}
    </div>
  );
}