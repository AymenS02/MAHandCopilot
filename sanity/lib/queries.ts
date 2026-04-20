import { PrayerLocation } from "@/lib/types";

export const ALL_AVAILABLE_EVENTS_QUERY = `*[_type == "event" && dateTime(endDate + "T" + duration.endTime + ":00Z") >= dateTime(now()) - 60*60*5 && showInCalendar == true] | order(endDate asc)`;

export const buildEventsQuery = (mosque: PrayerLocation | null) =>
  mosque
    ? `*[_type == "event" && dateTime(endDate + "T" + duration.endTime + ":00Z") >= dateTime(now()) - 60*60*5 && location == "${mosque}" && showInCalendar == true]`
    : ALL_AVAILABLE_EVENTS_QUERY;

// Also handle infinity as number limit
export const buildTopEventsQuery = (
  mosque: PrayerLocation | null,
  limit: number | null = 4
) =>
  mosque
    ? `*[_type == "event" && dateTime(endDate + "T" + duration.endTime + ":00Z") >= dateTime(now()) - 60*60*5 && location == "${mosque}" && showInCalendar == true] | order(endDate asc)${limit !== null ? `[0..${limit - 1}]` : ""}`
    : `*[_type == "event" && dateTime(endDate + "T" + duration.endTime + ":00Z") >= dateTime(now()) - 60*60*5 && showInCalendar == true] | order(endDate asc)${limit !== null ? `[0..${limit - 1}]` : ""}
`;

export const buildProgramEventsQuery = (programId: string) =>
  `*[_type == "event" && dateTime(endDate + "T" + duration.endTime + ":00Z") >= dateTime(now()) - 60*60*5 && program == "${programId}"] | order(endDate asc)`;

// Job queries
export const ALL_AVAILABLE_JOBS_QUERY = `*[_type == "job" && endDate >= now() && isActive == true && showInListings == true] | order(endDate asc)`;

// Debug queries - no filters
export const ALL_JOBS_QUERY = `*[_type == "job"] | order(endDate asc)`;
export const ACTIVE_JOBS_QUERY = `*[_type == "job" && isActive == true && showInListings == true] | order(endDate asc)`;

// Simple query without date filtering
export const SIMPLE_JOBS_QUERY = `*[_type == "job" && isActive == true && showInListings == true]`;

export const buildJobsQuery = (location: string | null) =>
  location
    ? `*[_type == "job" && endDate >= now() && location == "${location}" && isActive == true && showInListings == true]`
    : ALL_AVAILABLE_JOBS_QUERY;

export const buildTopJobsQuery = (
  location: string | null,
  limit: number | null = 4
) =>
  location
    ? `*[_type == "job" && endDate >= now() && location == "${location}" && isActive == true && showInListings == true] | order(endDate asc)${limit !== null ? `[0..${limit - 1}]` : ""}`
    : `*[_type == "job" && endDate >= now() && isActive == true && showInListings == true] | order(endDate asc)${limit !== null ? `[0..${limit - 1}]` : ""}`;

export const buildDepartmentJobsQuery = (department: string) =>
  `*[_type == "job" && endDate >= now() && department == "${department}" && isActive == true && showInListings == true] | order(endDate asc)`;

// Announcement queries
export const ALL_ANNOUNCEMENTS_QUERY = `*[_type == "announcement" && isActive == true] {
  _id,
  _type,
  title,
  description,
  date,
  isActive,
  "pdfUrl": pdfFile.asset->url
} | order(date desc)`;

export const buildAnnouncementsQuery = (limit: number | null = null) =>
  limit !== null
    ? `*[_type == "announcement" && isActive == true] {
      _id,
      _type,
      title,
      description,
      date,
      isActive,
      "pdfUrl": pdfFile.asset->url
    } | order(date desc)[0..${limit - 1}]`
    : ALL_ANNOUNCEMENTS_QUERY;

// Hero link button queries
export const ALL_HERO_LINKS_QUERY = `*[_type == "heroLink" && isActive == true] {
  _id,
  _type,
  title,
  linkType,
  url,
  internalPath,
  order,
  isActive
} | order(order asc)`;

// Campaign page queries
export const CAMPAIGN_BY_SLUG_QUERY = `*[_type == "campaignPage" && slug.current == $slug && isActive == true][0] {
  _id,
  _type,
  title,
  slug,
  description,
  body,
  image,
  "pdfUrl": pdfFile.asset->url,
  isActive,
  publishedAt
}`;

export const ALL_CAMPAIGNS_QUERY = `*[_type == "campaignPage" && isActive == true] {
  _id,
  _type,
  title,
  slug,
  description,
  image,
  isActive,
  publishedAt
} | order(publishedAt desc)`;

// Team member queries
export const ALL_TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && isActive == true] {
  _id,
  _type,
  name,
  role,
  image,
  location,
  email,
  order,
  isActive
} | order(order asc)`;

// Homepage hero query
export const HOMEPAGE_HERO_QUERY = `*[_type == "homepageHero" && isActive == true][0] {
  _id,
  _type,
  "videoUrl": backgroundVideo.asset->url,
  "posterUrl": posterImage.asset->url,
  arabicText,
  englishText,
  isActive
}`;

// Schedule page queries
export const ALL_SCHEDULE_PAGES_QUERY = `*[_type == "schedulePage" && isActive == true && showOnHomepage == true] {
  _id,
  _type,
  title,
  order,
  isActive,
  showOnHomepage,
  scheduleFiles[] {
    title,
    location,
    "pdfUrl": pdfFile.asset->url
  }
} | order(order asc)`;
