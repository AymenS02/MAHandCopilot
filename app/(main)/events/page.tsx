import { Metadata } from "next";
import { AllExtendedEventsSection } from "@/components/sections/AllExtendedEventsSection";

export const metadata: Metadata = {
  title: "Events & Programs | Muslim Association of Hamilton",
  description:
    "Browse upcoming community events, programs, and activities at the Muslim Association of Hamilton.",
};

export default async function Events() {
  return (
    <div className="w-full">
      <div className="text-center w-full">
        <h1 className="text-4xl font-bold text-primary">
          All Events & Programs
        </h1>
        <p>Join us for all of our upcoming events below.</p>
      </div>
      <AllExtendedEventsSection className="mt-12 w-full" />
    </div>
  );
}
