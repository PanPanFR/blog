"use client";
import dynamic from "next/dynamic";
export const TableOfContentsClient = dynamic(
  () => import("@/components/table-of-contents").then((m) => m.TableOfContents),
  { ssr: false },
);
export const MobileTableOfContentsClient = dynamic(
  () => import("@/components/mobile-toc").then((m) => m.MobileTableOfContents),
  { ssr: false },
);
