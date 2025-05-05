import { getPostBySlug } from "@/lib/posts";

// Mark as server component
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>
      
      <article 
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:font-extrabold
          prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold
          prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-semibold
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-700 prose-li:my-2
          prose-pre:bg-[#0d1117] prose-pre:rounded-lg prose-pre:p-4
          prose-code:text-[#e6edf3] prose-code:bg-transparent
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
          prose-img:rounded-lg prose-img:my-8
          [&_pre]:overflow-x-auto
          [&_pre]:my-6
          [&_pre_.highlighted]:bg-slate-700/50
          [&_pre_.word]:bg-slate-700/50
          [&_pre_.word]:rounded
          [&_pre_.word]:p-1
          [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:my-2"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </div>
  );
}