import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BentoCardProps {
  name: string;
  image: string;
  link: string;
  description: string;
  className?: string;
}

export const BentoCard = ({
  name,
  image,
  link,
  className,
  description,
}: BentoCardProps) => {
  return (
    <Link
      href={link}
      className={cn("relative block overflow-hidden w-full h-full", className)}
    >
      <div className="relative w-full h-full group">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-overlay opacity-50 transition-opacity duration-400 group-hover:opacity-0"></div>

        <div className="absolute bottom-0 group-hover:bg-primary/90 duration-350 w-full rounded-t-md sm:rounded-t-xl text-white transition left-0 sm:p-4 p-1 text-left">
          <p className="sm:text-xl text-base text-left font-medium">{name}</p>
          <p className="max-h-0 overflow-hidden sm:text-base text-[12px] transition-all duration-500 ease-in-out group-hover:max-h-20">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
