import { PrayerLocation, PrayerLocationMap } from "./types";
import JavidImage from "@/public/javid-mirza.jpg";
import LubnaImage from "@/public/lubna-sartawi.jpg";
import SamirImage from "@/public/samir-hussein.jpg";
import WahedImage from "@/public/wahed-mifthioul.jpg";
import AdilImage from "@/public/adil-abu-lebdeh.jpg";
import NazilImage from "@/public/nazil-khan.jpeg";
import NasreenImage from "@/public/nasreen-sahib.jpg";
import AlaaImage from "@/public/alaa-mohamed.jpg";
import YasmeenImage from "@/public/yasmeen-mirza.jpg";
import AnisaImage from "@/public/anisa-malik.jpeg";
import AbdulImage from "@/public/abdulhafiz-image.jpg";
import AbdulImage2 from "@/public/adbul-afridi.jpg";
import AsjadImage from "@/public/asjad-bemat.jpg";
import AbdelImage from "@/public/abdel-karim-mustafa.jpg";
import GhulamImage from "@/public/ghulam-ali-mohatarem.jpeg";
import JavedImage from "@/public/javed-mian.jpg";
import MahmoodImage from "@/public/mahmood-ali.jpg";
import AuzairImage from "@/public/auzair-anwar.jpg";
import JahanImage from "@/public/jahnan-zaib-choudhry.jpg";
import PlaceholderImage from "@/public/team-member-placeholder.jpeg";

export const PRAYER_LOCATIONS: Record<PrayerLocation, PrayerLocationMap> = {
  umar: {
    name: "Umar Mosque",
    latitude: 43.24649949977402,
    longitude: -79.77410595767851,
    id: "umar",
  },
  hamilton: {
    name: "Hamilton Mountain Mosque",
    latitude: 43.19557541066001,
    longitude: -79.82058494509435,
    id: "hamilton",
  },
};

export const PRAYER_LOCATIONS_ARRAY = Object.values(PRAYER_LOCATIONS);

export const PRAYER_LOCATIONS_SELECT_VALUES = PRAYER_LOCATIONS_ARRAY.map(
  (location) => ({
    title: location.name,
    value: location.id,
  })
);

export const PROGRAMS = {
  "youth-programs": {
    id: "youth-programs",
    name: "Youth Programs",
    description:
      "We offer a variety of youth programs to help you grow and develop your faith.",
  },
  "children-programs": {
    id: "children-programs",
    name: "Children's Events & Programs",
    description:
      "Focusing on fostering growth spiritually, emotionally & physically.",
  },
  "sisters-programs": {
    id: "sisters-programs",
    name: "Sister's Events & Programs",
    description:
      "Focusing on fostering growth spiritually, emotionally & physically.",
  },
  "new-muslims": {
    id: "new-muslims",
    name: "New Muslims",
    description:
      "Helping you find resources, connect with the community & grow as an individual.",
  },
  "seniors-programs": {
    id: "seniors-programs",
    name: "Senior's Programs",
    description:
      "Finding resources, maintaining friendships and growing with a community.",
  },
  "community-events": {
    id: "community-events",
    name: "Community Events",
    description: "A hub for community & contribution.",
  },
  classes: {
    id: "classes",
    name: "Classes",
    description: "Weekly, bi-Weekly & Monthly Classes",
  },
  none: {
    id: "none",
    name: "None",
    description: "No Program",
  },
};

export const PROGRAMS_SELECT_VALUES = Object.values(PROGRAMS).map(
  (program) => ({
    title: program.name,
    value: program.id,
  })
);

// Sunrise technically isnt a prayer, but used as a timestamp for Fajr.
export const PRAYERS = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Jummah 1",
  "Jummah 2",
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Javid Mirza",
    role: "MAH President",
    image: JavidImage.src,
    location: "hamilton",
    email: "president@hamiltonmosque.com",
  },
  {
    name: "Lubna Sartawi",
    role: "Vice President",
    image: LubnaImage.src,
    location: "hamilton",
    email: "vp@hamiltonmosque.com",
  },
  {
    name: "Samir Hussein",
    role: "Director",
    image: SamirImage.src,
    location: "hamilton",
    email: "s.hussein@hamiltonmosque.com",
  },
  {
    name: "Wahed Mifthioul",
    role: "Director",
    image: WahedImage.src,
    location: "hamilton",
    email: "m.wahed@hamiltonmosque.com",
  },
  {
    name: "Adil Abu Lebdeh",
    role: "Director",
    image: AdilImage.src,
    location: "hamilton",
    email: "a.abulebdeh@hamiltonmosque.com",
  },
  {
    name: "Nazli Khan",
    role: "Director",
    image: NazilImage.src,
    location: "hamilton",
    email: "n.khan@hamiltonmosque.com",
  },
  {
    name: "Nasreen Sahib",
    role: "Director",
    image: NasreenImage.src,
    location: "hamilton",
    email: "n.sahib@hamiltonmosque.com",
  },
  {
    name: "Ala Mohamed",
    role: "Director",
    image: AlaaImage.src,
    location: "hamilton",
    email: "a.mohamed@hamiltonmosque.com",
  },
  {
    name: "Yasmeen Mirza",
    role: "Secretary",
    image: YasmeenImage.src,
    location: "hamilton",
    email: "secretary@hamiltonmosque.com",
  },
  {
    name: "Anisa Malik",
    role: "Assistant Secretary",
    image: AnisaImage.src,
    location: "hamilton",
    email: "assistant.secretary@hamiltonmosque.com",
  },
  {
    name: "Abdul Latif Barrih",
    role: "Treasurer",
    image: AbdulImage.src,
    email: "treasurer@hamiltonmosque.com",
  },
  {
    name: "Abdul Afridi",
    role: "Accountant",
    image: AbdulImage2.src,
    location: "hamilton",
    email: "finance@hamiltonmosque.com",
  },
  {
    name: "Dana Almobayed",
    role: "Administrator",
    image: PlaceholderImage.src,
    location: "hamilton",
    email: "admin@hamiltonmosque.com",
  },
  {
    name: "Asjad Bemat",
    role: "Mountain Mosque Imam",
    image: AsjadImage.src,
    location: "hamilton",
    // email: "testemail@email.com",
  },
  {
    name: "Abdel-Karim Mustafa",
    role: "Chairman",
    image: AbdelImage.src,
    location: "hamilton",
    // email: "placeholder",
  },
  {
    name: "Ghulam Ali Mohatarem",
    role: "Internal Auditor",
    image: GhulamImage.src,
    location: "hamilton",
    email: "internalaudit@hamiltonmosque.com",
  },
  {
    name: "Javed Mian",
    role: "Chairman",
    image: JavedImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Mahmood Ali",
    role: "Maintenance and Repair",
    image: MahmoodImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Abdussattar Shaikh",
    role: "Committee Member",
    image: AuzairImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Auzair Anwar",
    role: "Secretary & Accounts",
    image: PlaceholderImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Jahan Zaib Choudhry",
    role: "Committee Member",
    image: JahanImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Abdur Rehman",
    role: "Committee Member",
    image: PlaceholderImage.src,
    location: "umar",
    // email: "placeholder",
  },
  {
    name: "Haseeb Rana",
    role: "Committee Member",
    image: PlaceholderImage.src,
    location: "umar",
    // email: "placeholder",
  },
];

