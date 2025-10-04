import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  return (
    <div 
      className="h-full animate-fade-up hover:-translate-y-2 transition-all duration-300 ease-out"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
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
            <div className="w-full h-full transition-transform duration-300 hover:scale-105">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
                loading={loading}
              />
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col gap-2 flex-grow">
          <h3 className="text-xl font-semibold text-card-foreground group-hover:underline underline-offset-4 transition-transform duration-200 group-hover:translate-x-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm flex-grow">{description}</p>
          <time className="block text-sm font-medium text-muted-foreground mt-auto">
            {date}
          </time>
        </div>
      </div>
    </Link>
    </div>
  );
}
