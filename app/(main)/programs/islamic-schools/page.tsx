import { Metadata } from "next";
import { PackageCard } from "@/components/cards/PackageCard";

export const metadata: Metadata = {
  title: "Islamic Schools | Muslim Association of Hamilton",
  description:
    "The Islamic School of Hamilton offers preschool through Grade 8, combining the Ontario Curriculum with Quran, Arabic, and Islamic Studies.",
};
import {
  BookOpen,
  Shield,
  Smile,
  MapPin,
  Book,
  Calendar,
  Monitor,
  Activity,
  Wrench,
  Globe,
  Shirt,
  Map,
  Pizza,
} from "lucide-react";

export default function IslamicSchoolsPage() {
  const programs = [
    {
      name: "Preschool Program (3 – 4 yrs)",
      icon: <Smile size={20} />, // Represents friendly, child-oriented learning
    },
    {
      name: "Junior Kindergarten to Grade 8",
      icon: <BookOpen size={20} />, // Represents a range of grades and studies
    },
    {
      name: "A safe and Caring Islamic Environment",
      icon: <Shield size={20} />, // Represents safety and care
    },
    {
      name: "Teaching of the Ontario Curriculum",
      icon: <MapPin size={20} />, // Represents a specific curriculum or location
    },
    {
      name: "Strong Arabic, Quran and Islamic Studies Curriculum",
      icon: <Book size={20} />, // Represents religious studies
    },
    {
      name: "Reading Programs in English and Arabic",
      icon: <BookOpen size={20} />, // Represents reading and language
    },
    {
      name: "Monthly Tarbiyah Program",
      icon: <Calendar size={20} />, // Represents a monthly program
    },
    {
      name: "Computer and Science Lab",
      icon: <Monitor size={20} />, // Represents technology and labs
    },
    {
      name: "Fitness Program for all ages",
      icon: <Activity size={20} />, // Represents physical activity and fitness
    },
    {
      name: "Skill Development Program",
      icon: <Wrench size={20} />, // Represents building skills
    },
    {
      name: "Helpful Website Resources",
      icon: <Globe size={20} />, // Represents online resources
    },
    {
      name: "Enforced School Uniform",
      icon: <Shirt size={20} />, // Represents clothing or uniforms
    },
    {
      name: "Educational and Fun Trips",
      icon: <Map size={20} />, // Represents trips or outings
    },
    {
      name: "Pizza and Snack Days",
      icon: <Pizza size={20} />, // Represents food/snack days
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-primary text-center">
          Islamic School of Hamilton
        </h1>
        <p className="max-w-4xl mt-2">
          <span>
            The Islamic School of Hamilton (ISH) is a non-profit private
            elementary school, registered with the Ministry of Education, and is
            operating under the Muslim Association of Hamilton (MAH). The ISH
            was established in 1998 and has developed into a fully functional
            educational institute, with over 200 students currently enrolled.
            The ISH takes great pride in teaching the Ontario Curriculum, in
            addition to Quran, Arabic Language, Islamic Studies, and French.
          </span>

          <br />
          <br />

          <span>
            Our ultimate objective is to help our students become responsible
            Canadians that practice proper Islamic teachings and values in their
            day-to-day activities. The ISH works to create a balanced learning
            environment for the students that maximizes both academic and
            character development. The Islamic School of Hamilton is committed
            to providing our students with a challenging learning environment
            that enhances their academic levels, while instilling in them the
            Islamic teachings that will help them grow into responsible,
            educated young Muslims within our community.
          </span>
        </p>
      </section>
      <section className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-primary">
          Programs and Services
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {programs.map((program) => (
            <PackageCard
              key={program.name}
              name={program.name}
              icon={program.icon}
            />
          ))}
        </div>
      </section>
      <section className="text-center items-center justify-center flex flex-col text-sm">
        <div className="max-w-3xl space-y-6">
          <p>
            <span className="font-bold">
              The ISH is monitored by the MAH Education Committee.
            </span>
            <br />
            <span>
              The education committee oversees the overall operations of the
              school and reports to the MAH Board of Directors.
            </span>
          </p>
          <p>
            The Education Committee consists of: Sr. Lubna Sartawi, Sr. Nazli
            Khan, Sr. Kamilia Karayyim, and Sr. Hanan Emhammed. The principal of
            the ISH is a non-voting member of the committee. To contact the ISH,
            please visit, ishcanada.ca or email Secretary@ishcanada.ca
          </p>
        </div>
      </section>
    </div>
  );
}
