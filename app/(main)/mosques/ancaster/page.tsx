import { Metadata } from "next";
import AncasterMosque from "@/public/ancaster-mosque.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ancaster Mosque | Muslim Association of Hamilton",
  description:
    "Learn about the upcoming Ancaster Mosque — a new addition to the Muslim Association of Hamilton.",
};

export default function Hamilton() {
  return (
    <div>
      <div className="flex items-center gap-12 flex-wrap justify-center">
        <Image
          src={AncasterMosque}
          alt="Ancaster Mosque"
          width={600}
          className="rounded-xl"
        />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary">Ancaster Mosque</h1>
          <p className="text-xl font-medium">Our upcoming mosque located in Ancaster.</p>
          <ul className="list-disc ml-4 text-sm">
            <li>Address: 1545 Stone Church Rd E, Hamilton, ON L8W 3P8 </li>
            <li>Hours: Mon-Sun 6 am - 10 pm</li>
            <li>Phone number: (905) 929-1526</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
