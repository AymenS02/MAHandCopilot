"use client";

import { HeroLink } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_HERO_LINKS_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import Link from "next/link";

const HeroExternalLinksComponent = () => {
  const { data: links } = useQuery({
    queryKey: ["heroLinks"],
    queryFn: async () => {
      return await sanityFetch<HeroLink[]>({ query: ALL_HERO_LINKS_QUERY });
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (!links || links.length === 0) return null;

  return (
    <>
      {links.map((link) => {
        const isInternal = link.linkType === "internal" && link.internalPath;

        if (isInternal) {
          return (
            <Link key={link._id} href={link.internalPath!}>
              <Button
                size="lg"
                className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px] justify-center"
                variant="special"
              >
                {link.title}
              </Button>
            </Link>
          );
        }

        return (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px] justify-center"
              variant="special"
            >
              {link.title}
            </Button>
          </a>
        );
      })}
    </>
  );
};

export const HeroExternalLinks = () => {
  return (
    <ReactQueryProvider>
      <HeroExternalLinksComponent />
    </ReactQueryProvider>
  );
};
