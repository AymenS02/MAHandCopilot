"use client";
import { cn } from "@/lib/utils";
import { Announcement } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_ANNOUNCEMENTS_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { AnnouncementCard } from "../cards/AnnouncementCard";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

export type AnnouncementsSectionProps = {
  className?: string;
};

const AnnouncementsSectionComponent = ({ className }: AnnouncementsSectionProps) => {
  const {
    data: announcements,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const announcements = await sanityFetch<Announcement[]>({ 
        query: ALL_ANNOUNCEMENTS_QUERY 
      });
      return announcements;
    },
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache in garbage collection
  });

  if (isLoading) {
    return (
      <div className={cn("text-center", className)}>
        <div className="text-lg font-semibold">Loading announcements...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("text-center text-red-600", className)}>
        <div className="text-lg font-semibold">Error loading announcements</div>
        <div className="text-sm text-gray-600 mt-2">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </div>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className={cn("text-center", className)}>
        <div className="text-lg font-semibold">No announcements available</div>
        <div className="text-sm text-gray-600 mt-2">
          Check back later for new announcements
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement._id}
          title={announcement.title}
          description={announcement.description}
          pdfUrl={announcement.pdfUrl}
          date={announcement.date}
        />
      ))}
    </div>
  );
};

export const AnnouncementsSection = (props: AnnouncementsSectionProps) => {
  return (
    <ReactQueryProvider>
      <AnnouncementsSectionComponent {...props} />
    </ReactQueryProvider>
  );
};

