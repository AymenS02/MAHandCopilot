"use client";

import React from "react";
import { PRAYER_LOCATIONS_ARRAY } from "@/lib/const";
import { PrayerLocation } from "@/lib/types";

export function ScheduleLocationModal({
  open,
  onClose,
  onSelect,
  availableLocations,
  title = "Choose Location",
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (location: PrayerLocation) => void;
  availableLocations?: PrayerLocation[];
  title?: string;
}) {
  if (!open) return null;

  const locations = availableLocations
    ? PRAYER_LOCATIONS_ARRAY.filter((l) => availableLocations.includes(l.id))
    : PRAYER_LOCATIONS_ARRAY;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-lg p-6 shadow-lg overflow-hidden"
        style={{
          backgroundImage: "url('/pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-green-50/90 p-4 rounded-lg">
          <h2 className="mb-2 w-full bg-primary rounded-2xl p-6 font-bold text-xl text-white text-center">
            {title}
          </h2>
          <ul className="space-y-2">
            {locations.map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  className="w-full bg-primary rounded-xl p-6 text-white text-center text-base font-semibold hover:opacity-90 transition-opacity"
                  onClick={() => onSelect(location.id)}
                >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-gray-700 hover:underline block mx-auto w-full text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
