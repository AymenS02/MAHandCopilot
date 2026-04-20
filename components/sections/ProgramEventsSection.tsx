"use client";
import { MosqueEvent, ProgramId } from "@/lib/types";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { sanityFetch } from "@/sanity/lib/client";
import { buildProgramEventsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "../cards/EventCard";
import { urlFor } from "@/sanity/lib/image";

export type ProgramEventsSectionProps = {
  programId: ProgramId;
  className?: string;
};

export const ProgramEventsSectionComponent = ({
  programId,
  className,
}: ProgramEventsSectionProps) => {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const events = await sanityFetch<MosqueEvent[]>({
        query: buildProgramEventsQuery(programId),
      });
      return events;
    },
  });

  return (
    <div className={className}>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="mt-12 flex gap-6 flex-wrap justify-center">
          {events && events.length > 0
            ? events.map((event) => {
                return (
                  <EventCard
                    key={event._id}
                    image={urlFor(event.image.asset._ref).url()}
                    title={event.title}
                    description={event.description}
                    tag={event.program}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    location={event.location}
                    cta={event.cta}
                    recurringDays={
                      event.isRecurring ? event.recurrenceDays! : null
                    }
                    startTime={event.duration.startTime}
                    endTime={event.duration.endTime}
                  />
                );
              })
            : "No upcoming events"}
        </div>
      )}
    </div>
  );
};

export const ProgramEventsSection = (props: ProgramEventsSectionProps) => {
  return (
    <ReactQueryProvider>
      <ProgramEventsSectionComponent {...props} />
    </ReactQueryProvider>
  );
};
