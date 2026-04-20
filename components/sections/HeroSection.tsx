"use client";

import React from "react";
import { AnimateIn } from "@/lib/framer-motion/AnimateIn";
import { HomepageHero } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_HERO_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

const DEFAULTS = {
  videoUrl: "/ramadan_video.mp4",
  posterUrl: "/hamilton-mosque.jpeg",
  arabicText: "وَٱللَّهُ يَدْعُوٓا۟ إِلَىٰ دَارِ ٱلسَّلَـٰمِ",
  englishText: "And Allah invites to the Home of Peace",
};

function HeroSectionComponent({ children }: { children: React.ReactNode }) {
  const { data: hero } = useQuery({
    queryKey: ["homepageHero"],
    queryFn: () =>
      sanityFetch<HomepageHero | null>({ query: HOMEPAGE_HERO_QUERY }),
    staleTime: 0,
    gcTime: 0,
  });

  const videoUrl = hero?.videoUrl || DEFAULTS.videoUrl;
  const posterUrl = hero?.posterUrl || DEFAULTS.posterUrl;
  const arabicText = hero?.arabicText || DEFAULTS.arabicText;
  const englishText = hero?.englishText || DEFAULTS.englishText;

  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-black mix-blend-multiply"></div>
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl}
        className="pointer-events-none w-full md:h-[850px] h-[750px] object-cover rounded-b-2xl"
      />
      <div className="absolute inset-0 flex w-full justify-center items-center pointer-events-auto">
        <div className="text-center max-w-xl space-y-4">
          <AnimateIn delay={0.3}>
            <h2 className="text-white sm:text-5xl text-4xl font-bold notranslate">
              {arabicText}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.4}>
            <h1 className="text-white sm:text-5xl text-4xl font-bold">
              {englishText}
            </h1>
          </AnimateIn>
          {children}
        </div>
      </div>
    </section>
  );
}

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <HeroSectionComponent>{children}</HeroSectionComponent>
    </ReactQueryProvider>
  );
}
