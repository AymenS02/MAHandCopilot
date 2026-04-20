"use server";
import { list } from "@vercel/blob";
import { PrayerLocation } from "./types";
import * as csv from "csv/sync";

function to24Hour(time: string) {
  const [hourTime, ampm] = time.split(" ");
  const [hour, minute] = hourTime.split(":");

  const hour24 = parseInt(hour);
  let minute24: string | number = parseInt(minute);

  if (minute24 < 10) {
    minute24 = "0" + minute24;
  }

  if (ampm === "AM") {
    return `${hour24 > 10 ? hour24 : `0${hour24}`}:${minute24}`;
  } else if (ampm === "PM" && hour24 < 12) {
    return `${hour24 + 12}:${minute24}`;
  } else {
    return `${hour24}:${minute24}`;
  }
}

export const getPrayerTimesCSV = async (mosque: PrayerLocation, date: Date) => {
  try {
    let fileName = null;

    switch (mosque) {
      case "hamilton":
        fileName = "umar-masjid-timings.csv";
        break;
      case "umar":
        fileName = "umar-masjid-timings.csv";
        break;
      default:
        throw new Error("Invalid mosque location provided.");
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const fileLink = (await list()).blobs.find(
      (b) => b.pathname === fileName
    )?.downloadUrl;

    if (!fileLink) {
      return {
        message: "File not found.",
        success: false,
      };
    }

    const file = await (await fetch(fileLink)).text();

    const data = csv.parse(file);

    const row = data.find(
      (row: string[]) =>
        row[0] === day.toString() && row[1] === month.toString()
    );

    const nextDayRow = data.find(
      (row: string[]) =>
        row[0] === (day + 1).toString() && row[1] === month.toString()
    );

    if (!row) {
      return {
        message: "No prayer times found for the given date.",
        success: false,
      };
    }

    const [, , ...prayers] = row;
    const [, , ...nextDayPrayers] = nextDayRow;

    const prayers24h = prayers.map((prayer: string) => {
      return to24Hour(prayer);
    });

    const prayersNextDay24h = nextDayPrayers.map((prayer: string) => {
      return to24Hour(prayer);
    });

    const prayerObject = {
      Fajr: prayers24h[0],
      Sunrise: prayers24h[2],
      Dhuhr: prayers24h[3],
      Asr: prayers24h[5],
      Maghrib: prayers24h[7],
      Isha: prayers24h[9],
      FajrNext: prayersNextDay24h[0],
    };

    return {
      message: "Prayer times successfully fetched.",
      success: true,
      prayerTimes: prayerObject,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error fetching prayer times.",
      success: false,
    };
  }
};
