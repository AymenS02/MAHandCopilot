"use client";

import { useState } from "react";
import { PrayerTimesDialog } from "../dialog/PrayerTimesDialog";
import { Button } from "../ui/button";
import { PrayerTimesLocationModal } from "../dialog/PrayerTimesLocationModal";
import { PrayerLocation } from "@/lib/types";

export const LandingPrayerTimesButton = () => {
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<PrayerLocation | null>(null);

  return (
    <div>
      <Button
        size={"lg"}
        className="px-2 md:px-4 text-sm md:text-[16px] md:w-fit w-full"
        variant={"special"}
        onClick={() => setOpenLocationModal(true)}
      >
        Prayer Times
      </Button>

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
