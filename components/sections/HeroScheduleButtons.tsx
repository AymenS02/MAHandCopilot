"use client";

import { SchedulePage } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_SCHEDULE_PAGES_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SchedulePageButton } from "@/components/buttons/SchedulePageButton";

const HeroScheduleButtonsComponent = () => {
  const { data: schedulePages } = useQuery({
    queryKey: ["schedulePages"],
    queryFn: async () => {
      return await sanityFetch<SchedulePage[]>({
        query: ALL_SCHEDULE_PAGES_QUERY,
      });
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (!schedulePages || schedulePages.length === 0) return null;

  return (
    <>
      {schedulePages.map((schedule) => (
        <SchedulePageButton key={schedule._id} schedule={schedule} />
      ))}
    </>
  );
};

export const HeroScheduleButtons = () => {
  return (
    <ReactQueryProvider>
      <HeroScheduleButtonsComponent />
    </ReactQueryProvider>
  );
};
