import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Muslim Association of Hamilton",
  description:
    "Stay updated with the latest announcements and important information from the Muslim Association of Hamilton.",
};

export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
