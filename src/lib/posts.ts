import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMdx from 'remark-mdx';
import { compile } from '@mdx-js/mdx';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';

// Mark these functions as server-side only
export const dynamic = 'force-dynamic';

const postsDirectory = path.join(process.cwd(), "src/content/posts/");
const imagesDirectory = path.join(process.cwd(), "public/images/blog");

// Function to process image paths in markdown content
function processImagePaths(content: string, slug: string): string {
  // Replace any image reference with the correct public path
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, imagePath) => {
      // Remove any URL encoding and clean up the path
      const filename = decodeURIComponent(imagePath)
        .split('/')
        .pop()
        ?.replace(/^[./\\]+/, ''); // Remove any leading ./ or ../ or \

      if (filename) {
        return `![${alt}](/images/blog/${slug}/${filename})`;
      }
      return match; // Return original if something went wrong
    }
  );
}

const prettyCodeOptions = {
  theme: 'github-dark',
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word'];
  },
};

async function processContent(content: string, isMarkdown: boolean, slug: string) {
  // Process image paths before markdown processing
  const contentWithFixedPaths = processImagePaths(content, slug);

  const processor = unified()
    .use(remarkParse) // Parse markdown to mdast
    .use(remarkGfm)   // Support GFM (tables, etc.)
    .use(remarkRehype, { 
      allowDangerousHtml: true 
    }) // Convert to hast
    .use(rehypeRaw) // Parse the raw HTML in the markdown
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings) // Add links to headings
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: true
    })
    .use(rehypeFormat) // Format HTML
    .use(rehypeStringify, { 
      allowDangerousHtml: true 
    }); // Convert to string

  if (!isMarkdown) {
    processor.use(remarkMdx);
  }

  const result = await processor.process(contentWithFixedPaths);
  return result.toString();
}

export async function getAllPosts() {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const postsPromises = fileNames
    .filter(fileName => {
      // Only process .md or .mdx files
      return fileName.endsWith('.md') || fileName.endsWith('.mdx');
    })
    .map(async (fileName) => {
      try {
        const fullPath = path.join(postsDirectory, fileName);
        // Check if it's a file
        const stats = fs.statSync(fullPath);
        if (!stats.isFile()) {
          return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const slug = fileName.replace(/\.mdx?$/, "");
        const processedContent = await processContent(content, fileName.endsWith('.md'), slug);

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          content: processedContent,
        };
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        return null;
      }
    });

  const posts = await Promise.all(postsPromises);
  return posts.filter(post => post !== null); // Remove any failed posts
}

export async function getPostBySlug(slug: string) {
  // Try both .md and .mdx extensions
  const possibleExtensions = ['.md', '.mdx'];
  let fileContents = null;
  let fullPath = '';
  let isMarkdown = true;

  for (const ext of possibleExtensions) {
    try {
      fullPath = path.join(postsDirectory, `${slug}${ext}`);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        fileContents = fs.readFileSync(fullPath, "utf8");
        isMarkdown = ext === '.md';
        break;
      }
    } catch (error) {
      continue;
    }
  }

  if (!fileContents) {
    console.error(`Post not found: ${slug}`);
    return null;
  }

  try {
    const { data, content } = matter(fileContents);
    const processedContent = await processContent(content, isMarkdown, slug);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      content: processedContent,
    };
  } catch (error) {
    console.error(`Error parsing post ${slug}:`, error);
    return null;
  }
}