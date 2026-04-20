"use client";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";

export default function AnnouncementsPage() {
  return (
    <div className="w-full">
      <div className="text-center w-full mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Announcements
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest announcements and important information from the Muslim Association of Hamilton.
        </p>
      </div>

      <AnnouncementsSection className="mt-12 w-full" />
    </div>
  );
}

