import { PrayerLocation } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PrayerLocationState {
  prayerLocation: PrayerLocation;
  setPrayerLocation: (mosque: PrayerLocation) => void;
}

export const usePrayerLocationState = create<PrayerLocationState>()((set) => ({
  prayerLocation: "hamilton",
  setPrayerLocation: (prayerLocation: PrayerLocation) =>
    set({ prayerLocation }),
}));
