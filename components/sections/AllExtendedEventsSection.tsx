"use client";
import { DayOfWeek, MosqueEvent, PrayerLocation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { sanityFetch } from "@/sanity/lib/client";
import { buildEventsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PRAYER_LOCATIONS_SELECT_VALUES } from "@/lib/const";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/daygrid/index.cjs";

export type AllExtendedEventsSectionProps = {
  className?: string;
};

function renderEventContent(eventInfo: {
  event: { title: string; extendedProps: { link?: string } };
  timeText: string;
}) {
  return (
    <a
      href={eventInfo.event.extendedProps.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="bg-primary border-none outline-none">
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    </a>
  );
}

export const AllExtendedEventsSectionComponent = ({
  className,
}: AllExtendedEventsSectionProps) => {
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
        query: buildEventsQuery(mosque === "all" ? null : mosque),
      });
      return events;
    },
    select: (data) => {
      // Generate both regular and recurring events
      const allEvents = data.flatMap((event) => {
        if (
          event.isRecurring &&
          event.recurrenceDays &&
          event.recurrenceDays.length > 0
        ) {
          // Recurring event handling
          const recurrenceDays = event.recurrenceDays; // e.g. ["tuesday", "thursday"]
          const startDate = new Date(event.startDate);
          const endDate = event.endDate ? new Date(event.endDate) : null;

          const recurringEvents = [];
          const today = new Date();
          const endRecurrenceDate = new Date();
          endRecurrenceDate.setMonth(today.getMonth() + 3); // Set a limit for recurring event generation (e.g. 3 months from today)

          for (
            let date = new Date(today);
            date <= endRecurrenceDate;
            date.setDate(date.getDate() + 1)
          ) {
            const dayOfWeek = date
              .toLocaleString("en-US", { weekday: "long" })
              .toLowerCase() as DayOfWeek;

            if (recurrenceDays.includes(dayOfWeek)) {
              recurringEvents.push({
                title: event.title,
                start: new Date(
                  date.setHours(startDate.getHours(), startDate.getMinutes())
                ),
                end: endDate
                  ? new Date(
                      date.setHours(endDate.getHours(), endDate.getMinutes())
                    )
                  : new Date(date.getTime() + 60 * 60 * 1000), // Default end time: 1 hour after start
                link: event.cta,
                allDay: true,
              });
            }
          }

          return recurringEvents;
        } else {
          // Regular event
          return [
            {
              title: event.title,
              start: new Date(event.startDate),
              end: event.endDate
                ? new Date(event.endDate)
                : new Date(
                    new Date(event.startDate).getTime() + 60 * 60 * 1000
                  ),
              link: event.cta,
              allDay: true,
            },
          ];
        }
      });
      return allEvents;
    },
  });

  return (
    <div className={cn("", className)}>
      <div className="flex justify-center gap-4 mt-4 mb-6 w-full">
        <Select
          value={mosque}
          onValueChange={(value) => setMosque(value as PrayerLocation)}
        >
          <SelectTrigger className="w-[220px] border-2 border-gray-300 rounded-lg shadow-md">
            <SelectValue placeholder="Select a Mosque" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Mosques</SelectItem>
              {PRAYER_LOCATIONS_SELECT_VALUES.map((location, index) => (
                <SelectItem key={index} value={location.value}>
                  {location.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : isError ? (
          <div className="text-center text-lg font-semibold text-red-500">
            Error: {error.message}
          </div>
        ) : (
          <div className="text-xl font-bold text-primary w-full">
            {events && events.length > 0 ? (
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventContent={renderEventContent}
              />
            ) : (
              <div className="text-center text-lg font-semibold">
                No upcoming events
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const AllExtendedEventsSection = (
  props: AllExtendedEventsSectionProps
) => {
  return (
    <ReactQueryProvider>
      <AllExtendedEventsSectionComponent {...props} />
    </ReactQueryProvider>
  );
};
