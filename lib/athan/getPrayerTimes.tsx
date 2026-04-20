import { getPrayerTimesCSV } from "../actions";
import { Prayer, PrayerLocation, PrayerTime } from "../types";

export const getPrayerTimes = async (mosque: PrayerLocation, date: Date) => {
  // Format dates as required
  const formattedDate = date.toISOString().split("T")[0];
  const tomorrowDate = new Date(date);
  tomorrowDate.setDate(date.getDate() + 1);
  const tomorrowFormattedDate = tomorrowDate.toISOString().split("T")[0];

  // Fetch prayer times from API
  // const res = await fetch(
  //   `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${long}&prayers=Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha`,
  //   {
  //     method: "GET",
  //   }
  // );

  // const tomorrowRes = await fetch(
  //   `https://api.aladhan.com/v1/timings/${tomorrowFormattedDate}?latitude=${lat}&longitude=${long}&prayers=Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha`,
  //   {
  //     method: "GET",
  //   }
  // );

  // if (!res.ok || !tomorrowRes.ok) {
  //   throw new Error("Failed to fetch prayer times");
  // }

  // const data = await res.json();
  // const tomorrowData = await tomorrowRes.json();

  const data = await getPrayerTimesCSV(mosque, date);

  const timings = data.prayerTimes!;

  const prayerTimes = Object.entries(timings).map(([prayer, time]) => {
    if (prayer === "FajrNext") {
      const nextFajrFullDateTimeString = `${tomorrowFormattedDate}T${time}:00`;

      return {
        prayer: "Fajr",
        time: new Date(nextFajrFullDateTimeString).getTime(),
        timeString: time,
      };
    }
    const fullDateTimeString = `${formattedDate}T${time}:00`;
    return {
      prayer: prayer as Prayer,
      time: new Date(fullDateTimeString).getTime(),
      timeString: time,
    };
  });

  // Add Fajr time for the next day
  // const nextFajrTimeString = tomorrowData.data.timings.Fajr;
  // const nextFajrFullDateTimeString = `${tomorrowFormattedDate}T${nextFajrTimeString}:00`;

  // prayerTimes.push({
  //   prayer: "Fajr",
  //   time: new Date(nextFajrFullDateTimeString).getTime(),
  //   timeString: nextFajrTimeString,
  // });

  return prayerTimes as PrayerTime[];
};
