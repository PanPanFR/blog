import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  showRightBorder?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
  index?: number;
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
  showRightBorder = true,
  priority = false,
  loading = "lazy",
  index = 0,
}: BlogCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const,
      },
    },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      className="h-full"
    >
      <Link
        href={url}
        className={cn(
          "group block relative h-full before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-0 after:h-px after:w-screen after:bg-border after:content-['']",
          showRightBorder && "md:border-r border-border border-b-0"
        )}
      >
        <div className="flex flex-col h-full">
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
                loading={loading}
              />
            </motion.div>
          </div>
        )}

        <div className="p-6 flex flex-col gap-2 flex-grow">
          <motion.h3 
            className="text-xl font-semibold text-card-foreground group-hover:underline underline-offset-4"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          <p className="text-muted-foreground text-sm flex-grow">{description}</p>
          <time className="block text-sm font-medium text-muted-foreground mt-auto">
            {date}
          </time>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
