import Image from "next/image";
import { Button } from "../ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { DayOfWeek, PrayerLocation, ProgramId } from "@/lib/types";
import { PRAYER_LOCATIONS, PROGRAMS } from "@/lib/const";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function formatRecurringDays(days: DayOfWeek[]) {
  function arraysEqual(arr1: string[], arr2: string[]) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const weekends = ["saturday", "sunday"];
  const everyDay = [...weekdays, ...weekends];

  if (arraysEqual(days, weekdays)) {
    return "Weekdays";
  } else if (arraysEqual(days, weekends)) {
    return "Weekends";
  } else if (arraysEqual(days, everyDay)) {
    return "Every Day";
  } else {
    return (
      "Every " +
      days.map((day) => day[0].toUpperCase() + day.slice(1)).join(", ")
    );
  }
}

// Convert 42 hour time (HH:MM) to 12 hour time (h:mm AM/PM)
function formatTime(time: string): string {
  // Split the input string into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Return formatted time
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export type EventCardProps = {
  image: string;
  title: string;
  description: string;
  tag?: ProgramId | null;
  startDate: string;
  recurringDays: DayOfWeek[] | null;
  startTime: string;
  endTime: string;
  endDate: string;
  location: PrayerLocation | "none";
  cta?: string;
};

export const EventCard = ({
  image,
  title,
  description,
  tag,
  startDate,
  endDate,
  recurringDays,
  startTime,
  endTime,
  location,
  cta,
}: EventCardProps) => {
  return (
    <div className="text-left md:w-fit break-words w-[250px] space-y-2 border-2 bg-white p-3 rounded-lg border-primary">
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <Image
            src={image}
            alt="event-image"
            width={350}
            height={250}
            className="sm:w-[350px] sm:h-[250px] w-[250px] h-[150px] object-cover rounded-lg"
          />
        </DialogTrigger>
        <DialogContent className="p-2 [&>button]:hidden">
          <Image
            src={image}
            alt="event-image"
            width={800}
            height={600}
            className="h-auto w-full rounded-lg"
          />
        </DialogContent>
      </Dialog>

      {tag && tag !== "none" ? (
        <div className="text-primary border-2 text-xs border-primary rounded-lg px-3 py-2 w-fit">
          {PROGRAMS[tag].name}
        </div>
      ) : (
        ""
      )}
      <div className="max-w-[300px]">
        <h3 className="sm:text-2xl text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>

      <div className="space-y-1">
        <div className="flex gap-2 items-center text-sm text-primary">
          <Calendar size={14} />
          <p>
            {recurringDays ? (
              formatRecurringDays(recurringDays)
            ) : (
              <>
                {/* Convert date strings from YYYY-MM-DD to YYYY/MM/DD */}
                {new Date(startDate.replace(/-/g, "/")).toDateString()} -{" "}
                {new Date(endDate.replace(/-/g, "/")).toDateString()}
              </>
            )}
          </p>
        </div>
        <div className="flex gap-2 items-center text-sm text-primary">
          <Clock size={14} />
          <p>
            {formatTime(startTime)} - {formatTime(endTime)}
          </p>
        </div>
        {location !== "none" && (
          <div className="flex gap-2 items-center text-sm text-primary">
            <MapPin size={14} />
            <p>{PRAYER_LOCATIONS[location]?.name}</p>
          </div>
        )}
      </div>
      {cta && (
        <a href={cta} target="_blank">
          <Button size={"lg"} className="mt-2">
            Learn More
          </Button>
        </a>
      )}
    </div>
  );
};
