"use client";
import { MosqueEvent, PrayerLocation } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { sanityFetch } from "@/sanity/lib/client";
import { buildTopEventsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EventCard } from "../cards/EventCard";
import { urlFor } from "@/sanity/lib/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRAYER_LOCATIONS_SELECT_VALUES } from "@/lib/const";
import { cn } from "@/lib/utils";

export const UpcomingEventsSectionComponent = ({
  className,
}: {
  className?: string;
}) => {
  const [mosque, setMosque] = useState<PrayerLocation | "all">("all");

  const {
    isLoading,
    isError,
    error,
    data: events,
  } = useQuery({
    queryKey: ["events", mosque],
    queryFn: async () => {
      const events = await sanityFetch<MosqueEvent[]>({
        query: buildTopEventsQuery(mosque === "all" ? null : mosque, null),
      });
      return events;
    },
  });

  // console.log(events);

  return (
    <div className={cn("", className)}>
      <div className="flex justify-center">
        <Select
          value={mosque}
          onValueChange={(value) => setMosque(value as PrayerLocation)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Mosque" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {PRAYER_LOCATIONS_SELECT_VALUES.map((location, index) => (
                <SelectItem key={index} value={location.value}>
                  {location.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="mt-12 flex gap-6 flex-wrap justify-center">
            {events && events.length > 0 ? (
              <Carousel className="xl:max-w-[1000px] md:max-w-[750px] max-w-[275px] mx-auto">
                <CarouselContent>
                  {events.map((event) => {
                    return (
                      <CarouselItem
                        key={event._id}
                        className="md:basis-1/2 basis-full"
                      >
                        <EventCard
                          image={urlFor(event.image.asset._ref).url()}
                          title={event.title}
                          description={event.description}
                          tag={event.program}
                          startDate={event.startDate}
                          endDate={event.endDate
                            .replace(/-/g, "/")
                            .replace(/T.+/, "")}
                          location={event.location}
                          cta={event.cta}
                          recurringDays={
                            event.isRecurring ? event.recurrenceDays! : null
                          }
                          startTime={event.duration.startTime}
                          endTime={event.duration.endTime}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              // <div>
              //   {
              //     events.map((event) => {
              //       return (
              //         <EventCard
              //           key={event._id}
              //           image={urlFor(event.image.asset._ref).url()}
              //           title={event.title}
              //           description={event.description}
              //           tag={event.program}
              //           startDate={new Date(event.startDate)}
              //           endDate={new Date(event.endDate)}
              //           location={event.location}
              //           cta={event.cta}
              //         />
              //       );
              //     })
              //   }
              // </div>
              "No upcoming events and programs"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const UpcomingEventsSection = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <ReactQueryProvider>
      <UpcomingEventsSectionComponent className={className} />
    </ReactQueryProvider>
  );
};
