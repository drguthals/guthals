'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import prisma from '@/lib/prisma';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export type BlogType = 'tutorial' | 'article' | 'news' | 'research' | 'personal';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  type: BlogType;
  excerpt: string;
  content: string;
  readingTime: string;
  tags: string[];
  authorId?: string;  // Reference to Author model
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Check if the path exists and is a directory
    const postDir = path.join(POSTS_PATH, slug);
    const postPath = path.join(postDir, 'index.mdx');

    // Verify the file exists before trying to read it
    try {
      await fs.access(postPath);
    } catch (error) {
      console.error(`File not found: ${postPath}`);
      return null;
    }

    const fileContents = await fs.readFile(postPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      type: data.type || 'article',
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content: content,
      readingTime: calculateReadingTime(content),
      tags: data.tags || [],
      authorId: data.authorId || null,
    };
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: Promise<BlogPost | null>[] = [];
  
  async function findPosts(dir: string) {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      
      if (stat.isDirectory()) {
        try {
          await fs.access(path.join(fullPath, 'index.mdx'));
          posts.push(getBlogPost(item));
        } catch {
          // If no index.mdx, keep searching subdirectories
          await findPosts(fullPath);
        }
      }
    }
  }

  await findPosts(POSTS_PATH);
  
  const resolvedPosts = await Promise.all(posts);
  return resolvedPosts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Add a helper function to get author details
export async function getAuthorForPost(authorId: string) {
  const author = await prisma.author.findUnique({
    where: { id: authorId },
    select: {
      name: true,
      image: true,
      bio: true,
      title: true,
      company: true,
    }
  });
  return author;
} 