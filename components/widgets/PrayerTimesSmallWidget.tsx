"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PrayerTimesDialog } from "../dialog/PrayerTimesDialog";
import { PrayerTimesLocationModal } from "../dialog/PrayerTimesLocationModal";
import { PrayerLocation } from "@/lib/types";
// import MAHCircleLogo from "@/public/MAH-Circle.png";
import PrayerTimesIcon from "@/public/prayer-times-icon.jpg";
import Image from "next/image";

export const PrayerTimesSmallWidget = ({
  className,
}: {
  className?: string;
}) => {
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<PrayerLocation | null>(null);

  return (
    <div>
      <div
        className={cn(
          "bg-white shadow-xl border hover:shadow-2xl rounded-full z-10 cursor-pointer hover:bg-slate-50 transition",
          className
        )}
        onClick={() => setOpenLocationModal(true)}
      >
        <Image
          src={PrayerTimesIcon}
          alt="MAH Circle Logo"
          className="rounded-full"
          width={100}
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
