import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export const SubscribeWidget = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full bg-primary rounded-xl p-6", className)}>
      <h1 className="text-white md:text-2xl md:text-left text-center text-base font-semibold">
        Subscribe to our newsletter
      </h1>
      <p className="text-white md:text-base md:text-left text-center text-sm flex-1">
        Subscribe to our newsletter to stay updated on the latest news and
        events.
      </p>
      <Link href={"/subscribe"}>
        <Button variant={"secondary"} className="w-full mt-4" size={"lg"}>
          Subscribe
        </Button>
      </Link>
    </div>
  );
};
