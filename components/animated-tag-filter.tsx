"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface AnimatedTagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts: Record<string, number>;
}

export function AnimatedTagFilter({ tags, selectedTag, tagCounts }: AnimatedTagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (tag === "All") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    
    // Reset page to 1 when changing tags
    params.delete("page");
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.push(newUrl);
  };

  // Limit tags to prevent overcrowding
  const displayTags = tags.slice(0, 8); // Show max 8 tags
  
  return (
    <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
      {displayTags.map((tag) => {
        const isSelected = selectedTag === tag;
        const count = tagCounts[tag] || 0;
        
        return (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              border border-transparent hover:scale-105 active:scale-95 animate-fade-in-up
              ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:shadow-md"
              }
            `}
            style={{ 
              animationDelay: `${tags.indexOf(tag) * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <span className="flex items-center gap-1">
              {tag}
              <span
                className={`
                  text-xs px-1.5 py-0.5 rounded-full transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }
                `}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
      
      {tags.length > 8 && (
        <div
          className="px-4 py-2 text-sm text-muted-foreground flex items-center gap-1 animate-fade-in-up"
          style={{ 
            animationDelay: `${displayTags.length * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <span>+{tags.length - 8} more</span>
        </div>
      )}
    </div>
  );
}