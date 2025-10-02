import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

export interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

export const allPages = blogSource.getPages() as BlogPage[];
export const sortedBlogs = allPages.sort((a, b) => {
  const dateA = new Date(a.data.date).getTime();
  const dateB = new Date(b.data.date).getTime();
  return dateB - dateA;
});

export const allTags = [
  "All",
  ...Array.from(
    new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
  ).sort(),
];