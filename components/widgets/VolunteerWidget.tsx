import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export const VolunteerWidget = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full bg-primary rounded-xl p-6", className)}>
      <h1 className="text-white md:text-2xl md:text-left text-center text-base font-semibold">
        Volunteer
      </h1>
      <p className="text-white md:text-base md:text-left text-center text-sm flex-1">
        Join us as a volunteer and gain valuable experience while making a
        difference!
      </p>
      <Link href="https://chat.whatsapp.com/GiC49gcgTl0B9qCcPJsHUL">
        <Button variant={"secondary"} className="w-full mt-4" size={"lg"}>
          Volunteer
        </Button>
      </Link>
    </div>
  );
};
