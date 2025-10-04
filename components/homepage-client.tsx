"use client";

import { Suspense } from "react";
import { BlogCard } from "@/components/blog-card";
import { AnimatedTagFilter } from "@/components/animated-tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

interface BlogPageData {
  url: string;
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

interface HomePageClientProps {
  allTags: string[];
  selectedTag: string;
  tagCounts: Record<string, number>;
  paginatedBlogs: BlogPageData[];
  currentPage: number;
  totalPages: number;
  filteredBlogsLength: number;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function HomePageClient({
  allTags,
  selectedTag,
  tagCounts,
  paginatedBlogs,
  currentPage,
  totalPages,
  filteredBlogsLength,
}: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Magic UI Blog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates from Magic UI.
            </p>
          </div>
        </div>
        
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <AnimatedTagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading articles...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredBlogsLength < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {paginatedBlogs.map((blog, index) => {
              const date = new Date(blog.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.url}
                  url={blog.url}
                  title={blog.title}
                  description={blog.description}
                  date={formattedDate}
                  thumbnail={blog.thumbnail}
                  showRightBorder={paginatedBlogs.length < 3}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  index={index}
                />
              );
            })}
          </div>
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-8">
            {currentPage > 1 && (
              <a
                href={`?${new URLSearchParams({
                  ...(selectedTag !== "All" && { tag: selectedTag }),
                  page: (currentPage - 1).toString(),
                }).toString()}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Previous
              </a>
            )}
            <span className="text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <a
                href={`?${new URLSearchParams({
                  ...(selectedTag !== "All" && { tag: selectedTag }),
                  page: (currentPage + 1).toString(),
                }).toString()}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}