import { PRAYER_LOCATIONS } from "@/lib/const";
import { MapPin, MoveRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Countdown } from "../misc/Countdown";
import { cn } from "@/lib/utils";
import { PrayerTimesDialog } from "../dialog/PrayerTimesDialog";
import { usePrayerLocationState } from "@/state/PrayerLocationState";
import { getPrayerTimes } from "@/lib/athan/getPrayerTimes";
import { PrayerTime } from "@/lib/types";
import { getNextPrayerTime } from "@/lib/athan/getNextPrayerTime";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { getPrayerTimesCSV } from "@/lib/actions";
import { PrayerTimesLocationModal } from "../dialog/PrayerTimesLocationModal";
import { PrayerLocation } from "@/lib/types";

const PrayerTimesWidgetComponent = ({ className }: { className?: string }) => {
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<PrayerLocation | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update currentDate every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getPrayerTimesCSV("hamilton", currentDate);
  }, [currentDate]);

  const { prayerLocation } = usePrayerLocationState();

  const {
    data: prayerTimes,
    // isLoading
  } = useQuery({
    queryKey: ["prayerTimes", prayerLocation],
    queryFn: () =>
      getPrayerTimes(
        prayerLocation,
        // prayerLocationDetails.latitude,
        // prayerLocationDetails.longitude,
        currentDate
      ),
    enabled: !!prayerLocation,
  });

  const prayerLocationDetails = PRAYER_LOCATIONS[prayerLocation];

  const [nearestPrayerTime, setNearestPrayerTime] = useState<PrayerTime | null>(
    null
  );

  // Function to update nearest prayer time based on current time
  const updateNearestPrayerTime = useCallback(() => {
    if (prayerTimes) {
      const newDate = new Date();

      const nextPrayer = getNextPrayerTime(prayerTimes, newDate);
      setNearestPrayerTime(nextPrayer);
    }
  }, [prayerTimes]);

  // Set up an interval to continuously update the nearest prayer time
  useEffect(() => {
    const intervalId = setInterval(updateNearestPrayerTime, 250); // Check every quarter second
    updateNearestPrayerTime(); // Initial check

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [prayerTimes, updateNearestPrayerTime]);

  return (
    <div>
      <div
        className={cn(
          "bg-primary h-[100px] flex gap-8 items-center text-white px-6 p-4 rounded-bl-xl cursor-pointer",
          className
        )}
        onClick={() => setOpenLocationModal(true)}
      >
        <div className="">
          <div className="flex gap-2 items-center text-sm text-secondary">
            <MapPin size={12} />
            <p>{prayerLocationDetails?.name}</p>
          </div>
          <p className="text-lg">
            Next Prayer: {nearestPrayerTime?.prayer || "Loading..."}
          </p>
          <div className="flex gap-2 items-center text-sm">
            <p className="text-sm">See prayer times</p>
            <MoveRight size={16} />
          </div>
        </div>
        <Countdown
          countdownEndDate={
            nearestPrayerTime ? new Date(nearestPrayerTime.time) : null
          }
          currentTime={currentDate}
        />
      </div>
      <PrayerTimesLocationModal
        open={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        onSelect={(location) => {
          setSelectedLocation(location);
          setOpenLocationModal(false);
          setOpenDialog(true);
        }}
      />
      <PrayerTimesDialog
        open={openDialog}
        setIsOpen={setOpenDialog}
        initialPrayerLocation={selectedLocation || undefined}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
};

export const PrayerTimesWidget = ({ className }: { className?: string }) => {
  return (
    <ReactQueryProvider>
      <PrayerTimesWidgetComponent className={className} />
    </ReactQueryProvider>
  );
};
