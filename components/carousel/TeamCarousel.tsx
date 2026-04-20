"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TEAM_MEMBERS } from "@/lib/const";
import { TeamCard } from "../cards/TeamCard";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { PrayerLocation, TeamMember } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

const locationFilterOptions = [
  { name: "All Mosques", value: "all" },
  { name: "Hamilton Mosque", value: "hamilton" },
  { name: "Umar Mosque", value: "umar" },
];

export type TeamCarouselLocationFilterOptions = PrayerLocation | "all";

const TeamCarouselComponent = ({ className }: { className?: string }) => {
  const [filter, setFilter] =
    useState<TeamCarouselLocationFilterOptions>("all");

  const { data: sanityMembers } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: () =>
      sanityFetch<TeamMember[]>({ query: ALL_TEAM_MEMBERS_QUERY }),
    staleTime: 0,
    gcTime: 0,
  });

  const teamMembers = useMemo(() => {
    if (sanityMembers && sanityMembers.length > 0) {
      return sanityMembers
        .filter((m) => filter === "all" || m.location === filter)
        .map((m) => ({
          name: m.name,
          role: m.role,
          image: urlFor(m.image).width(300).height(270).url(),
          email: m.email,
          location: m.location,
        }));
    }
    return TEAM_MEMBERS.filter((m) => filter === "all" || m.location === filter);
  }, [sanityMembers, filter]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-8",
        className
      )}
    >
      <Select
        value={filter}
        onValueChange={(value: TeamCarouselLocationFilterOptions) =>
          setFilter(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by location" />
        </SelectTrigger>
        <SelectContent>
          {locationFilterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Carousel className="w-full">
        <CarouselContent>
          {teamMembers.map((member, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/4 sm:basis-1/2 items-center sm:block flex flex-col justify-center"
            >
              <TeamCard
                name={member.name}
                position={member.role}
                image={member.image}
                email={member.email}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export const TeamCarousel = ({ className }: { className?: string }) => {
  return (
    <ReactQueryProvider>
      <TeamCarouselComponent className={className} />
    </ReactQueryProvider>
  );
};
