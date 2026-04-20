import React from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { PrayerLocation } from "@/lib/types";
import { PRAYER_LOCATIONS } from "@/lib/const";

export const ExtendedEventCard = ({
  image,
  title,
  startDate,
  // endDate,
  location,
  // pageUrl,
  description,
  cta,
}: {
  image: string;
  title: string;
  startDate: Date;
  // endDate: Date;
  location: PrayerLocation | "none";
  // pageUrl: string;
  description: string;
  cta?: string;
}) => {
  // Get the shortened start day (FRI, etc)
  const startDay = startDate
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .toUpperCase();

  // Get the date number
  const dateNumber = startDate.getDate();

  // Format date for subtitle (September 21, 2018)
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // const formattedEndDate = endDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  // const shortenedDescription = description.slice(0, 100) + "...";

  return (
    <div className="max-w-sm bg-white rounded-xl overflow-hidden border-2 p-4 border-primary">
      <div className="flex gap-2">
        {/* Date Display */}
        <div className="p-4 space-y-0">
          <div className="text-sm text-gray-600">{startDay}</div>
          <div className="text-4xl font-bold">{dateNumber}</div>
        </div>

        {/* Title and Metadata */}
        <div className="px-4 py-2 space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={14} />
            <span>{formattedDate}</span>
          </div>
          {location !== "none" && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{PRAYER_LOCATIONS[location]?.name}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm mt-2 text-center">{description}</p>

      <hr className="my-4" />

      {/* Image */}
      <div className="mt-2">
        <Image
          src={image}
          alt={title}
          width={300}
          height={150}
          className="w-full rounded-xl h-48 object-cover"
        />
      </div>

      {cta && (
        <a href={cta} target="_blank" className="w-full">
          <Button size={"lg"} className="mt-2 w-full">
            Learn More
          </Button>
        </a>
      )}
    </div>
  );
};

export default ExtendedEventCard;
