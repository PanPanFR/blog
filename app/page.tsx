import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { HomePageClient } from "@/components/homepage-client";

interface BlogData {
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

interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});



export const revalidate = 3600; // ISR every hour

const POSTS_PER_PAGE = 9; // Limit to reduce initial load

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = blogSource.getPages() as BlogPage[];
  const sortedBlogs = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  // Pagination
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedBlogs.length;
    } else {
      acc[tag] = sortedBlogs.filter((blog) =>
        blog.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  // Serialize blog data for client component
  const serializedBlogs = paginatedBlogs.map(blog => ({
    url: blog.url,
    title: blog.data.title,
    description: blog.data.description,
    date: blog.data.date,
    tags: blog.data.tags,
    featured: blog.data.featured,
    readTime: blog.data.readTime,
    author: blog.data.author,
    authorImage: blog.data.authorImage,
    thumbnail: blog.data.thumbnail,
  }));

  return (
    <HomePageClient
      allTags={allTags}
      selectedTag={selectedTag}
      tagCounts={tagCounts}
      paginatedBlogs={serializedBlogs}
      currentPage={currentPage}
      totalPages={totalPages}
      filteredBlogsLength={filteredBlogs.length}
    />
  );
}
