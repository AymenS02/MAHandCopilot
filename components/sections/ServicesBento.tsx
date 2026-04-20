import { BentoCard } from "../misc/BentoCard";
import MarriageImage from "@/public/marriage.jpg";
import FuneralImage from "@/public/funeral.png";
import IslamicSchoolImage from "@/public/islamic-school.png";
import FacilityBookingsImage from "@/public/facility-bookings.jpeg";
import MishkaImage from "@/public/mishka.jpg";
import ZakaatApplicationImage from "@/public/zakat-image.jpg";
import { cn } from "@/lib/utils";

export const ServicesBento = ({ className }: { className?: string }) => {
  const bentoCards = [
    {
      name: "Marriage",
      image: MarriageImage.src,
      link: "/services/marriage",
      colSpan: 1,
      rowSpan: 1,
      description:
        "We offer a variety of marriage services for your perfect day.",
    },
    {
      name: "Funeral",
      image: FuneralImage.src,
      link: "/services/funeral",
      colSpan: 1,
      rowSpan: 1,
      description: "Select one of many funeral packages to suit your needs.",
    },
    {
      name: "Facility Bookings",
      image: FacilityBookingsImage.src,
      link: "/services/facility-bookings",
      colSpan: 1,
      rowSpan: 2,
      description: "Book your preferred facility for your event.",
    },
    {
      name: "Islamic Schools",
      image: IslamicSchoolImage.src,
      link: "/programs/islamic-schools",
      colSpan: 2,
      rowSpan: 1,
      description: "We offer a variety of Islamic schools for your child.",
    },
    {
      name: "Mishka",
      image: MishkaImage.src,
      link: "https://mishkasocialservices.org/",
      colSpan: 1,
      rowSpan: 1,
      description:
        "Mishka is a social service that helps welcome newcomers, immigrants, and refugees to Canada.",
    },
    {
      name: "Zakaat Application",
      image: ZakaatApplicationImage.src,
      link: "/services/zakaat-application",
      colSpan: 2,
      rowSpan: 1,
      description: "Apply for our Zakaat programs.",
    },
  ];

  return (
    <div className={cn("grid grid-cols-3 w-full aspect-[14/11]", className)}>
      {bentoCards.map((bentoCard, index) => (
        <div
          className={cn("w-full h-full", {
            "col-span-1": bentoCard.colSpan === 1,
            "col-span-2": bentoCard.colSpan === 2,
            "row-span-1": bentoCard.rowSpan === 1,
            "row-span-2": bentoCard.rowSpan === 2,
          })}
          key={index}
        >
          <BentoCard {...bentoCard} />
        </div>
      ))}
    </div>
  );
};
