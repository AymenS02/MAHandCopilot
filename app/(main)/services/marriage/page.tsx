import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Marriage Services | Muslim Association of Hamilton",
  description:
    "Islamic marriage services, nikkah packages, and prerequisites offered by the Muslim Association of Hamilton.",
};
import RingsImage from "@/public/wedding-rings.jpg";
import { UserCheck, UserRoundX } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Marriage() {
  const packages = [
    {
      name: "Member Package",
      icon: <UserCheck size={20} />,
      price: 500,
    },
    {
      name: "Non-Member Package",
      icon: <UserRoundX size={20} />,
      price: 600,
    },
  ];

  return (
    <div className="space-y-24">
      <section className="flex gap-12 items-center flex-wrap justify-center">
        {/* Square, responsive image */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src={RingsImage}
            alt="rings"
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary">Marriage Services</h1>
          <p className="max-w-xl mt-2">
            “And one of His signs is that He created for you spouses from among
            yourselves so that you may find comfort in them. And He has placed
            between you compassion and mercy. Surely in this are signs for
            people who reflect.” (Quran, 30:21)
          </p>
        </div>
      </section>
      <hr />
      <section>
        <h2 className="text-center text-4xl font-bold text-primary">
          Islamic Marriage Service Packages
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {packages.map((packageItem, index) => (
            <PackageCard
              key={index}
              name={packageItem.name}
              icon={packageItem.icon}
              price={packageItem.price}
            />
          ))}
        </div>
        <p className="mt-4 text-bold text-center">
          Please note, there is an additional $100 fee for off-site services.
        </p>
      </section>
      <hr />
      <section className="text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary">
          Nikkah Prerequisites
        </h1>
        <p className="max-w-2xl mt-2">
          Please download the Pre-requisites PDF for the process and procedures
          for solemnization of nikkah (marital services), steps for newlyweds to
          follow and all other pertinent info below.
        </p>
        <Link href={"/nikkah-prereq.pdf"}>
          <Button className="w-full rounded-xl mt-8 text-lg p-6" size={"lg"}>
            Download Pre-requisites PDF
          </Button>
        </Link>
        <a href="https://form.jotform.com/243338141181248" target="_blank">
                  <Button
                    size={"lg"}
                    className="w-full rounded-xl mt-8 text-lg p-6"
                    variant={"special"}
                    
                  >
                    Marriage Application Form
                  </Button>
                </a>
      </section>
    </div>
  );
}
