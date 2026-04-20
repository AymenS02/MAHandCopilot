import { cn } from "@/lib/utils";
import { Footer } from "../footer/Footer";
import { Navbar } from "../nav/Navbar";
import { AnimatePresence } from "@/lib/framer-motion/AnimatePresence";
import { PrayerTimesSmallWidget } from "../widgets/PrayerTimesSmallWidget";
import Pattern from "@/public/pattern.jpg";

export const PrimaryLayout = ({
  children,
  className,
  transparentNavbar = false,
  animateIn = true,
  prayerTimesSmallWidget = false,
}: {
  children: React.ReactNode;
  className?: string;
  transparentNavbar?: boolean;
  animateIn?: boolean;
  prayerTimesSmallWidget?: boolean;
}) => {
  const main = (
    <main
      className={cn(
        "pb-20 flex-1 relative bg-white bg-opacity-0 z-[2]",
        className
      )}
    >
      {children}
    </main>
  );

  return (
    <div className="min-h-screen font-marcellus flex flex-col relative">
      {prayerTimesSmallWidget && (
        <PrayerTimesSmallWidget className="fixed bottom-0 m-4 left-0" />
      )}
      <Navbar transparent={transparentNavbar} />
      <div className="relative flex-1 w-full">
        <div
          className="absolute inset-0 bg-repeat opacity-5 z-0"
          style={{
            backgroundImage: `url('${Pattern.src}')`,
          }}
        />
        {animateIn ? <AnimatePresence>{main}</AnimatePresence> : main}
      </div>
      <Footer />
    </div>
  );
};
