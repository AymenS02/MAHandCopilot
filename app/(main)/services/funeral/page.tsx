import { Metadata } from "next";
import { TeamCard } from "@/components/cards/TeamCard";

export const metadata: Metadata = {
  title: "Funeral Services | Muslim Association of Hamilton",
  description:
    "Islamic funeral services, burial packages, and cemetery arrangements provided by the Muslim Association of Hamilton since 1978.",
};
import PlaceholderPhoto from "@/public/team-member-placeholder.jpeg";
// import ShujaQureshiImage from "@/public/shujaqureshi-image.jpg";
// import AbdulHafizImage from "@/public/abdulhafiz-image.jpg";
// import TanseemGhouseImage from "@/public/tasneemghouse-image.jpg";
import {
  Book,
  ChartNoAxesGantt,
  Droplets,
  Globe,
  HandHelping,
  Scroll,
  UserCheck,
  UserRoundX,
} from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";

export default function FuneralPage() {
  const committee = [
    {
      name: "Shuja Qureshi",
      position: "Chair",
      image: PlaceholderPhoto.src,
      email: "funeraldirector@hamiltonmosque.com",
    },
    {
      name: "Abdul Hafiz",
      position: "Member",
      image: PlaceholderPhoto.src,
    },
    {
      name: "Tasneem Ghouse",
      position: "Member",
      image: PlaceholderPhoto.src,
    },
  ];

  const primaryServices = [
    {
      title: "Deceased Members of MAH",
      price: 5500,
      icon: <UserCheck size={20} />,
    },
    {
      title: "Deceased Non Members of MAH",
      price: 6000,
      icon: <UserRoundX size={20} />,
    },
    {
      title: "Non Local",
      price: 7000,
      icon: <Globe size={20} />,
    },
  ];

  // Add funeral preplanning, cemetery allotment, burial services, ghusl services, and bereavement resources
  const otherServices = [
    {
      title: "Funeral Pre-Planning",
      icon: <ChartNoAxesGantt size={20} />,
    },
    {
      title: "Cemetery Allotment",
      icon: <Scroll size={20} />,
    },
    {
      title: "Burial Services",
      icon: <Book size={20} />,
    },
    {
      title: "Ghusl Services",
      icon: <Droplets size={20} />,
    },
    {
      title: "Bereavement Resources",
      icon: <HandHelping size={20} />,
    },
  ];

  return (
    <div className="space-y-24 flex flex-col items-center justify-center">
      <section className="w-full items-center flex flex-col justify-center text-center">
        <h1 className="text-primary text-4xl font-bold text-center">
          We&#39;re here to help.
        </h1>
        <p className="text-center max-w-3xl mt-4">
          <span>
            The Muslim Association of Hamilton has been providing funeral
            services to the Hamilton community since 1978.
          </span>
          <br />
          <br />
          <span>
            Working in conjunction with Mount Hamilton Cemetery and
            cemetery arrangements are made within Mount Hamilton Cemetery in an area
            entitled Muslim Gardens.
          </span>
          <br />
          <br />
          <span>
          Funeral Applications are currently in person only.

          Please visit the Mountain Mosque admin office or email admin@hamiltonmosque.com to get a copy of the application and additional instructions.
         </span>
        </p>
         {/* Google Map iframe */}
      <div className="mt-8 flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5816.999685741889!2d-79.88660430892928!3d43.19900440725154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9a85a7d166e9%3A0x6aacc4648f5051dd!2sMount%20Hamilton%20Cemetery!5e0!3m2!1sen!2sca!4v1734538213186!5m2!1sen!2sca"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
      </section>
      <section>
        <h2 className="text-3xl text-primary font-bold text-center">
          The Funeral Committee
        </h2>
        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {committee.map((committeeMember, index) => {
            return (
              <TeamCard
                key={index}
                name={committeeMember.name}
                position={committeeMember.position}
                image={committeeMember.image}
                email={committeeMember.email}
              />
            );
          })}
        </div>
      </section>
      <section className="text-center items-center justify-center flex flex-col">
        <h2 className="text-3xl text-primary font-bold">Primary Services</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
          {primaryServices.map((service, index) => {
            return (
              <PackageCard
                key={index}
                name={service.title}
                icon={service.icon}
                price={service.price}
              />
            );
          })}
        </div>
      </section>
      <section className="text-center items-center justify-center flex flex-col">
        <h2 className="text-3xl text-primary font-bold">Other Services</h2>
        <div className="flex flex-wrap gap-12 justify-center mt-8">
          {otherServices.map((service, index) => {
            return (
              <PackageCard
                key={index}
                name={service.title}
                icon={service.icon}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
