import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("border-t border-border bg-muted/20 p-3", className)}>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/magicui-logo.png"
              alt="Magic UI"
              fill
              sizes="32px"
              className="rounded object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              Try Magic UI Pro
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Beautiful design system
            </p>
          </div>
          <a
            href="#"
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("border border-border rounded-lg p-4 bg-card", className)}
    >
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-40">
          <Image
            src="/magicui-pro.png"
            alt="Magic UI"
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className="rounded-md object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tighter">
            Try Magic UI Pro
          </h3>
          <p className="text-sm text-muted-foreground">
            Magic UI Pro is a design system for building beautiful and
            responsive web applications.
          </p>
        </div>
      </div>
    </div>
  );
}
