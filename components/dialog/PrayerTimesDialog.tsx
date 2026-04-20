// This dialog supports being controlled by a parent modal for location selection (see PrayerTimesLocationModal).
// It is compatible with the new location-first prayer times flow.
"use client";
import {
  Dialog,
  DialogContent,
  // DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PrayerLocation, PrayerTime } from "@/lib/types";
import { PRAYER_LOCATIONS_ARRAY } from "@/lib/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePrayerLocationState } from "@/state/PrayerLocationState";
// import {
//   CalendarFold,
//   Moon,
//   Sun,
//   SunDim,
//   SunMoon,
//   Sunrise,
//   Sunset,
// } from "lucide-react";
// import { getNextPrayerTime } from "@/lib/athan/getNextPrayerTime";
// import { Countdown } from "../misc/Countdown";
import { MasjidBoxPrayerTimesEmbed } from "../embed/MasjidBoxPrayerTimesEmbed";
// import ModalOverlay from "@/public/modal-overlay.png";
import React from "react";

export type PrayerTimesDialogProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  initialPrayerLocation?: PrayerLocation;
  onClose?: () => void;
  // prayerTimes: PrayerTime[] | undefined;
  // isLoading: boolean;
  // currentDate: Date;
};

export const PrayerTimesDialog = ({
  open,
  setIsOpen,
  className,
  initialPrayerLocation,
  onClose,
  // prayerTimes,
  // isLoading,
  // currentDate,
}: PrayerTimesDialogProps) => {
  const { prayerLocation, setPrayerLocation } = usePrayerLocationState();
  // Use local state for location if initialPrayerLocation is provided
  const fallbackLocation = PRAYER_LOCATIONS_ARRAY[0].id;
  const [localLocation, setLocalLocation] = React.useState<PrayerLocation | null>(initialPrayerLocation || fallbackLocation);
  React.useEffect(() => {
    if (open && initialPrayerLocation) {
      setLocalLocation(initialPrayerLocation);
    }
    if (!open) {
      setLocalLocation(initialPrayerLocation || fallbackLocation);
    }
  }, [open, initialPrayerLocation, fallbackLocation]);

  // Always use a valid PrayerLocation (never null)
  const locationToUse: PrayerLocation = initialPrayerLocation
    ? localLocation || fallbackLocation
    : prayerLocation;

  // Call onClose when dialog closes
  React.useEffect(() => {
    if (!open && onClose) {
      onClose();
    }
  }, [open, onClose]);

  // const iconSize = 20;
  // const nextPrayer = getNextPrayerTime(prayerTimes || [], currentDate);
  // const currentHijriDate = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
  //   day: "numeric",
  //   month: "long",
  //   weekday: "long",
  //   year: "numeric",
  // }).format(currentDate);

  // const jumaaPrayerTimes: PrayerTime[] = [
  //   {
  //     time: 0,
  //     prayer: "Jummah 1",
  //     timeString: "12:30",
  //   },
  //   {
  //     time: 0,
  //     prayer: "Jummah 2",
  //     timeString: "13:30",
  //   },
  // ];

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          "bg-primary text-white border-0 shadow-xl p-0",
          className
        )}
      >
        <DialogTitle className="text-2xl font-bold text-center mb-4">Prayer Times</DialogTitle>
        {/* <DialogHeader className="p-2">
          <DialogTitle className="flex items-center justify-between text-left">
            <div>
              <h1 className="text-3xl">Prayer Times</h1>
              <div className="text-sm font-normal">
                <p>{currentDate.toDateString()}</p>
                <p>{currentHijriDate}</p>
              </div>
            </div>
            <Select
              value={prayerLocation}
              onValueChange={(value: PrayerLocation) =>
                setPrayerLocation(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prayer Location" />
              </SelectTrigger>
              <SelectContent>
                {PRAYER_LOCATIONS_ARRAY.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogTitle>
        </DialogHeader>
        {isLoading || !prayerTimes ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4 flex flex-col items-center justify-center">
            <div className="bg-white text-primary p-6 w-full rounded-xl items-center">
              <Countdown
                containerClassName="flex flex-col text-left w-fit"
                timeUnitClassName="text-5xl font-bold"
                labelClassName="hidden"
                countdownEndDate={new Date(nextPrayer.time)}
                currentTime={currentDate}
                colons
              />
              <p className="mt-2 font-semibold">
                Until {nextPrayer.prayer} at {nextPrayer.timeString}
              </p>
              <p className="text-sm">
                Current Time:{" "}
                {currentDate.toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
            <div className="flex flex-wrap sm:justify-between justify-center sm:gap-6 gap-2">
              <PrayerComponent
                prayerTime={prayerTimes[0]}
                icon={<SunMoon size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={prayerTimes[1]}
                icon={<Sunrise size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={prayerTimes[2]}
                icon={<SunDim size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={prayerTimes[3]}
                icon={<Sun size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={prayerTimes[4]}
                icon={<Sunset size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={prayerTimes[5]}
                icon={<Moon size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={jumaaPrayerTimes[0]}
                icon={<CalendarFold size={iconSize} />}
              />
              <PrayerComponent
                prayerTime={jumaaPrayerTimes[1]}
                icon={<CalendarFold size={iconSize} />}
              />
            </div>
          </div>
        )}
      */}
        <div>
          <MasjidBoxPrayerTimesEmbed
            mosqueId={locationToUse}
            key={locationToUse}
          />
          <Select
            value={locationToUse}
            onValueChange={(value: PrayerLocation) => {
              if (initialPrayerLocation) {
                setLocalLocation(value);
              } else {
                setPrayerLocation(value);
              }
            }}
          >
            <SelectTrigger className="w-full bg-primary text-white outline-none border-none rounded-none text-center">
              <SelectValue placeholder="Prayer Location" />
            </SelectTrigger>
            <SelectContent>
              {PRAYER_LOCATIONS_ARRAY.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PrayerComponent = ({
  prayerTime,
  icon,
}: {
  prayerTime: PrayerTime;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex gap-2 items-center bg-white sm:w-[210px] w-full h-[55px] text-primary justify-between rounded-xl p-2">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="font-medium">{prayerTime.prayer}</p>
      </div>
      <p className="sm:text-xl text-base font-bold">{prayerTime.timeString}</p>
    </div>
  );
};
