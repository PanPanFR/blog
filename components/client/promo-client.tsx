"use client";
import dynamic from "next/dynamic";
export const PromoContentClient = dynamic(
  () => import("@/components/promo-content").then((m) => m.PromoContent),
  { ssr: false },
);
