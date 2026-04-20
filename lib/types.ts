import { PRAYERS, PROGRAMS } from "./const";

export type PrayerLocation = "hamilton" | "umar";

export type PrayerLocationMap = {
  name: string;
  latitude: number;
  longitude: number;
  id: PrayerLocation;
};

export type ProgramType = {
  id: string;
  name: string;
  description: string;
};

export type MosqueEvent = {
  isRecurring: boolean;
  recurrenceDays?: DayOfWeek[];
  image: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
  _type: "event";
  _id: string;
  title: string;
  program: ProgramId | "none";
  cta?: string;
  startDate: string; // Date string
  endDate: string; // Date string
  duration: {
    _type: "duration";
    // HH:MM format
    startTime: string;
    endTime: string;
  };
  _createdAt: string; // ISO date string
  _rev: string;
  description: string;
  location: PrayerLocation | "none";
  _updatedAt: string; // ISO date string
};

export type Prayer = (typeof PRAYERS)[number];

export type PrayerTime = {
  time: number; // Unix timestamp
  prayer: Prayer;
  timeString: string; // Formatted time string
};

export type ActionsResponse = {
  message: string;
  success: boolean;
};

export type ProgramId = keyof typeof PROGRAMS;

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type JobType = "full-time" | "part-time" | "contract" | "temporary" | "volunteer";

export type JobLocation = PrayerLocation | "none";

export type JobDepartment = 
  | "administration" 
  | "education" 
  | "maintenance" 
  | "community-services" 
  | "religious-services" 
  | "general";

export type JobPosting = {
  _type: "job";
  _id: string;
  title: string;
  description: string;
  image: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
  jobType: JobType;
  salary?: string;
  location: JobLocation;
  department: JobDepartment;
  requirements?: string[];
  responsibilities?: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  showInListings: boolean;
  applicationUrl?: string;
  contactEmail?: string;
};

export type Announcement = {
  _type: "announcement";
  _id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  date: string;
  isActive: boolean;
};

export type HeroLink = {
  _type: "heroLink";
  _id: string;
  title: string;
  linkType?: "external" | "internal";
  url?: string;
  internalPath?: string;
  order: number;
  isActive: boolean;
};

export type TeamMember = {
  _type: "teamMember";
  _id: string;
  name: string;
  role: string;
  image: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  };
  location: PrayerLocation;
  email?: string;
  order: number;
  isActive: boolean;
};

export type CampaignPage = {
  _type: "campaignPage";
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  image?: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  };
  pdfUrl?: string;
  isActive: boolean;
  publishedAt?: string;
};

export type HomepageHero = {
  _type: "homepageHero";
  _id: string;
  videoUrl?: string;
  posterUrl?: string;
  arabicText?: string;
  englishText?: string;
  isActive: boolean;
};

export type ScheduleFile = {
  title: string;
  location: PrayerLocation;
  pdfUrl: string;
};

export type SchedulePage = {
  _type: "schedulePage";
  _id: string;
  title: string;
  scheduleFiles: ScheduleFile[];
  order: number;
  isActive: boolean;
  showOnHomepage: boolean;
};
