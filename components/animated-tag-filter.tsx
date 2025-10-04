"use client";

import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Limit tags to prevent overcrowding
  const displayTags = tags.slice(0, 8); // Show max 8 tags
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2 justify-center"
    >
      {displayTags.map((tag) => {
        const isSelected = selectedTag === tag;
        const count = tagCounts[tag] || 0;
        
        return (
          <motion.button
            key={tag}
            variants={itemVariants}
            onClick={() => handleTagClick(tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              border border-transparent hover:scale-105 active:scale-95
              ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }
            `}
            whileHover={{ 
              scale: 1.05,
              boxShadow: isSelected 
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                : "0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <span className="flex items-center gap-1">
              {tag}
              <motion.span
                className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }
                `}
                layout
              >
                {count}
              </motion.span>
            </span>
          </motion.button>
        );
      })}
      
      {tags.length > 8 && (
        <motion.div
          variants={itemVariants}
          className="px-4 py-2 text-sm text-muted-foreground flex items-center gap-1"
        >
          <span>+{tags.length - 8} more</span>
        </motion.div>
      )}
    </motion.div>
  );
}