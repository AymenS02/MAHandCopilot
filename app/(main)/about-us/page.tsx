import { Metadata } from "next";
import FoundersImage from "@/public/founders-image.jpg";

export const metadata: Metadata = {
  title: "About Us | Muslim Association of Hamilton",
  description:
    "Learn about the history, mission, and team behind the Muslim Association of Hamilton, serving the community since the 1960s.",
};
import FoundersImage2 from "@/public/founders-image-2.jpg";
import FoundersImage3 from "@/public/founders-image-3.jpg";
import { AnimateIn } from "@/lib/framer-motion/AnimateIn";
import { TeamCarousel } from "@/components/carousel/TeamCarousel";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto space-y-12 md:space-y-24">
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-primary">
            Our history, mission & goal.
          </h1>
          <p className="mt-4 text-base md:text-lg">With our one and only priority: the community.</p>
        </section>
        
        <hr className="bg-secondary w-full" />
        
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto">
              <Image
                src={FoundersImage}
                alt="founders"
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-primary font-bold text-2xl md:text-4xl text-center md:text-left">
              Our Founding Story
            </h2>
            <div className="space-y-4 text-base md:text-lg text-center md:text-left">
              <p>
                The history of the Muslim Association of Hamilton dates back to
                the 1960s, when the founding members, a group of Muslim McMaster
                University students originating from the Middle East and Southeast
                Asia, decided to settle in Hamilton.
              </p>
              <p>
                For more than half a century the MAH has administered hundreds of
                diverse projects ranging from community development, outreach,
                education, and construction.
              </p>
              <p>
                The original 15 founding families have grown to a community of
                over 40,000 Muslims consisting of over 35 nationalities who now
                call Hamilton home.
              </p>
            </div>
          </div>
        </section>

        <hr className="bg-secondary w-full" />
        
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
            <h2 className="text-primary font-bold text-2xl md:text-4xl text-center md:text-left">Our Mission</h2>
            <div className="space-y-4 text-base md:text-lg text-center md:text-left">
              <p>
                The Muslim Association of Hamilton (MAH) is a registered
                charitable organization dedicated to providing religious,
                educational, and social services for the diverse Muslim community
                in Hamilton.
              </p>
              <p>
                Our charitable registration number is 12156-9677-RR-0001.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto">
              <Image
                src={FoundersImage2}
                alt="founders"
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </section>

        <hr className="bg-secondary w-full" />
        
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto">
              <Image
                src={FoundersImage3}
                alt="founders"
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-primary font-bold text-2xl md:text-4xl text-center md:text-left">Accessibility Act</h2>
            <div className="space-y-4 text-base md:text-lg text-center md:text-left">
              <p>
                The Muslim Association of Hamilton (MAH) is operating in
                accordance with the Accessibility for Ontarions with Disabilities
                Act. MAH is committed to providing full access to the premises and
                eliminating any potential barriers that could hinder compliance to
                the Act.
              </p>
              <p>
                If you require any type of accommodations when visiting the MAH
                premises or if you require any information about the compliance to
                the Act, feel free to contact us at admin@hamiltonmosque.com
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center text-center">
          <AnimateIn>
            <h1 className="text-3xl md:text-6xl text-primary">Meet Our Team</h1>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="mt-4 max-w-2xl text-base md:text-lg">
              Meet our dedicated team serving the Hamilton Islamic community.
            </p>
          </AnimateIn>
          <AnimateIn
            delay={0.4}
            className="w-full"
          >
            <TeamCarousel className="mt-8 w-full" />
          </AnimateIn>
        </section>
      </div>
    </div>
  );
}
