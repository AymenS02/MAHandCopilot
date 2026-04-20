"use client";
import React from "react";
import Image from "next/image";
import SalamArabic from "@/public/salam-arabic.png";
import { Button } from "@/components/ui/button";
import { PrimaryLayout } from "@/components/layouts/PrimaryLayout";
import { SubscribeWidget } from "@/components/widgets/SubscribeWidget";
import Link from "next/link";
import { AnimateIn } from "@/lib/framer-motion/AnimateIn";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { LandingPrayerTimesButton } from "@/components/buttons/LandingPrayerTimesButton";
import { HeroExternalLinks } from "@/components/sections/HeroExternalLinks";
import { HeroScheduleButtons } from "@/components/sections/HeroScheduleButtons";
import { HeroSection } from "@/components/sections/HeroSection";
import { VolunteerWidget } from "@/components/widgets/VolunteerWidget";
import { DonateModal } from "@/components/modals/DonateModal";

export default function Home() {
  return (
    <PrimaryLayout transparentNavbar animateIn={false} prayerTimesSmallWidget>
      <div className="space-y-24 w-full">
        <HeroSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-x-2 md:gap-y-4 text-white p-4">
            <DonateModal
              trigger={
                <Button
                  size="lg"
                  className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px]"
                  variant="special"
                >
                  Donate
                </Button>
              }
            />
            <LandingPrayerTimesButton />
            <HeroScheduleButtons />
            <Link href="#eventsSection">
              <Button
                size="lg"
                className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px] justify-center"
                variant="special"
              >
                Events
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                size="lg"
                className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px] justify-center"
                variant="special"
              >
                Careers
              </Button>
            </Link>
            <Link href="/announcements">
              <Button
                size="lg"
                className="px-2 md:px-4 md:w-fit w-full text-sm md:text-[16px] justify-center"
                variant="special"
              >
                Announcements
              </Button>
            </Link>
            <HeroExternalLinks />
          </div>
        </HeroSection>
        <div className="space-y-24 sm:px-24 px-12">
          <section className="flex items-center text-center flex-col justify-center">
            <AnimateIn>
              <h1 id="eventsSection" className="text-6xl text-primary">
                Upcoming Events
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <p className="mt-4 max-w-2xl">
                Join us for upcoming community events at the masjid, where
                faith, community come together. Everyone is welcome!
              </p>
            </AnimateIn>
            <AnimateIn delay={0.4}>
              <UpcomingEventsSection className="mt-12 w-full" />
            </AnimateIn>
            <AnimateIn>
              <div className="flex justify-center gap-4 mt-12">
                <Link href={"/events"}>
                  <Button
                    size="lg"
                    className="px-4 text-[16px]"
                    variant="special"
                  >
                    See Our Calendar
                  </Button>
                </Link>
              </div>
            </AnimateIn>
          </section>
          <section className="h-full w-full flex flex-col text-center items-center justify-center ">
            <div className="flex flex-col items-center">
              <AnimateIn>
                <h4 className="font-oregano text-6xl text-primary">
                  Peace Be Upon You
                </h4>
              </AnimateIn>
              <AnimateIn delay={0.3}>
                <Image src={SalamArabic} alt="salam" width={200} height={200} />
              </AnimateIn>
              <AnimateIn delay={0.4}>
                <p className="max-w-3xl text-center">
                  The history of the Muslim Association of Hamilton dates back
                  to the 1960s.
                  <br />
                  <br /> For more than half a century the MAH has administered
                  hundreds of diverse projects and the original 15 founding
                  families have grown to a community of over 40,000 Muslims
                  consisting of over 35 nationalities who now call Hamilton
                  home.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.5}>
                <Link className="w-full" href={"/about-us"}>
                  <Button
                    className="w-full mt-6 text-lg p-6 px-4 text-[16px]"
                    size="lg"
                    variant="special"
                  >
                    Learn About Us
                  </Button>
                </Link>
              </AnimateIn>
            </div>
          </section>
        </div>
        <section
          id="services"
          className="flex gap-12 w-full items-center text-center flex-col justify-center mt-12"
        >
          <div>
            <h1 className="text-6xl text-primary">Services</h1>
            <p className="mt-4 max-w-2xl"></p>
          </div>
          <ServicesBento />
          <div className="px-12 w-full flex gap-4 flex-wrap">
            <SubscribeWidget className="flex-1 basis-0" />
            <VolunteerWidget className="flex-1 basis-0" />
          </div>
        </section>
      </div>
    </PrimaryLayout>
  );
}
