import React from "react";
import { PRAYER_LOCATIONS_ARRAY } from "@/lib/const";
import { PrayerLocation } from "@/lib/types";
// import { Button } from "../ui/button";

export function PrayerTimesLocationModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (location: PrayerLocation) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative rounded-lg p-6 shadow-lg max-w-sm w-full overflow-hidden"
        style={{
          backgroundImage: "url('/pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-green-50 bg-opacity-90 p-4 rounded-lg">
          <h2 className="mb-2 w-full bg-primary rounded-2xl p-6 font-bold text-xl text-white text-center">
            Choose Prayer Times Location
          </h2>
          <ul>
            {PRAYER_LOCATIONS_ARRAY.map(location => (
              <li key={location.id} className="mb-2 w-full">
                <button
                  className="w-full bg-primary rounded-xl p-6 text-white md:text-l text-center text-base font-semibold hover:bg-primary-dark transition-colors"
                  onClick={() => onSelect(location.id)}
                >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onClose}
            className="mt-4 text-gray-700 hover:underline block mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 