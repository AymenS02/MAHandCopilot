import { MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";

export type TeamCardProps = {
  name: string;
  position: string;
  image: string;
  phone?: string;
  email?: string;
};

export const TeamCard = ({
  name,
  position,
  image,
  phone,
  email,
}: TeamCardProps) => {
  return (
    <div>
      <Image
        className="rounded-xl object-cover w-[270px] h-[300px]"
        src={image}
        alt="team-member"
        width={300}
        height={270}
      />
      <div className="max-w-[250px] text-left">
        <p className="text-2xl text-primary">{name}</p>
        <p>{position}</p>
        <div className="text-sm">
          {phone && (
            <a
              className="flex gap-2 items-center cursor-pointer"
              href={`tel:${phone}`}
            >
              <PhoneIcon size={14} />
              <p>{phone}</p>
            </a>
          )}
          {email && (
            <a
              className="flex gap-2 items-center curosor-pointer"
              href={`mailto:${email}`}
            >
              <MailIcon size={14} />
              <p>{email}</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
