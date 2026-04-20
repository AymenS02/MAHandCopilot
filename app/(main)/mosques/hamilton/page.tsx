import { Metadata } from "next";
import AncasterMosque from "@/public/hamilton-mosque.jpeg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hamilton Mountain Mosque | Muslim Association of Hamilton",
  description:
    "Visit the Hamilton Mountain Mosque — the central mosque of the Muslim Association of Hamilton.",
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
          <h1 className="text-5xl font-bold text-primary">
            Hamilton Mountain Mosque
          </h1>
          <p className="text-xl font-medium">Our beautiful central mosque is the perfect place to connect with your faith.</p>
          <ul className="list-disc ml-4 text-sm">
            <li>Address: 1545 Stone Church Rd E, Hamilton, ON L8W 3P8 </li>
            <li>Hours: Mon-Sun 6 am - 10 pm</li>
            <li>Phone number: (905) 929-1526</li>
          </ul>
        </div>
      </div>

      {/* Google Map iframe */}
      <div className="mt-8 flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.6638735238753!2d-79.82316792258682!3d43.195563181907545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c99f05f7af55f%3A0x7beba84c8756b076!2sHamilton%20Mountain%20Masjid!5e0!3m2!1sen!2sca!4v1733351929995!5m2!1sen!2sca"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}