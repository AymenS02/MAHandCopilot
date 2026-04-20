import { PrayerTime } from "../types";

export function getNextPrayerTime(
  prayerTimes: PrayerTime[],
  date: Date
): PrayerTime {
  const currentTime = date.getTime();

  // Filter out prayer times that are in the past
  const upcomingPrayers = prayerTimes.filter(
    (prayerTime) => prayerTime.time > currentTime
  );

  // If there are upcoming prayers, return the nearest one
  if (upcomingPrayers.length > 0) {
    return upcomingPrayers[0];
  }

  // If no prayers are left for today, return Fajr for the next day
  const msInADay = 24 * 60 * 60 * 1000;
  const fajrNextDay = {
    ...prayerTimes[0],
    time: prayerTimes[0]?.time + msInADay,
  };

  return fajrNextDay;
}
