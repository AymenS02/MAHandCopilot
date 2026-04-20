"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScheduleLocationModal } from "@/components/dialog/ScheduleLocationModal";
import { SchedulePdfDialog } from "@/components/dialog/SchedulePdfDialog";
import { PrayerLocation, SchedulePage } from "@/lib/types";

export function SchedulePageButton({ schedule }: { schedule: SchedulePage }) {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<PrayerLocation | null>(null);

  const scheduleItems = useMemo(() => {
    if (!selectedLocation) return [];
    return schedule.scheduleFiles
      .filter((f) => f.location === selectedLocation)
      .map((f) => ({ title: f.title, path: f.pdfUrl }));
  }, [schedule.scheduleFiles, selectedLocation]);

  const availableLocations = useMemo(() => {
    const locs = new Set(schedule.scheduleFiles.map((f) => f.location));
    return Array.from(locs) as PrayerLocation[];
  }, [schedule.scheduleFiles]);

  const handleSelectLocation = (location: PrayerLocation) => {
    setSelectedLocation(location);
    setLocationModalOpen(false);
    setPdfDialogOpen(true);
  };

  const handlePdfDialogClose = (open: boolean) => {
    setPdfDialogOpen(open);
    if (!open) setSelectedLocation(null);
  };

  return (
    <>
      <Button
        size="lg"
        className="px-2 md:px-4 text-sm md:text-[16px] md:w-fit w-full"
        variant="special"
        onClick={() => setLocationModalOpen(true)}
      >
        {schedule.title}
      </Button>

      <ScheduleLocationModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={handleSelectLocation}
        availableLocations={availableLocations}
        title={`Choose Location`}
      />

      <SchedulePdfDialog
        open={pdfDialogOpen}
        onOpenChange={handlePdfDialogClose}
        location={selectedLocation}
        scheduleItems={scheduleItems}
        dialogTitle={schedule.title}
      />
    </>
  );
}
