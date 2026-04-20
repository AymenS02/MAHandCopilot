import { Metadata } from "next";
import AncasterMosque from "@/public/umar-masjid.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Umar Mosque | Muslim Association of Hamilton",
  description:
    "Visit Umar Mosque — located downtown Hamilton, perfect for quick prayers and community gatherings.",
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
          <h1 className="text-5xl font-bold text-primary">Umar Mosque</h1>
          <p className="text-xl font-medium">Our mosque located downtown, perfect for quick prayers and gatherings.</p>
          <ul className="list-disc ml-4 text-sm">
            <li>Address: 734 Rennie St, Hamilton, ON L8H 3R2 </li>
            <li>Hours: Mon-Sun 6 am - 10 pm</li>
            <li>Phone number: (905) 544-9016</li>
          </ul>
        </div>
      </div>
     {/* Google Map iframe */}
     <div className="mt-8 flex justify-center">
     <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.2339434644236!2d-79.77672572258547!3d43.24651857863687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c98d000d623bb%3A0x2bdedfb413dbe0f3!2sUmar%20Mosque!5e0!3m2!1sen!2sca!4v1733352473716!5m2!1sen!2sca"
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
