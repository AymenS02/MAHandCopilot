"use client";
import { PrayerLocation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const MasjidBoxPrayerTimesEmbed = ({
  mosqueId,
  className,
}: {
  mosqueId: PrayerLocation;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // const prayerTimesEmbedd = `<script type="text/javascript">(function(w){function async_load(){var s=w.document.createElement('script');s.type='text/javascript';s.async=true;s.defer=true;s.src='https://masjidbox.com/widgets/loader.js';var x=w.document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);} if(w.attachEvent)w.attachEvent('onload',async_load);else w.addEventListener('load',async_load,false);})(window);</script><a data-masjidbox-widget="F4oIfuhj13CaJbJi7iq6a" data-masjidbox-ifr href="https://masjidbox.com/prayer-times/muslim-association-of-hamilton">Prayer times Muslim Association of Hamilton</a>`;

  return (
    <div className={cn("relative w-full h-[600px] notranslate", className)}>
      <iframe
        className="w-full h-full notranslate"
        onLoad={() => setIsLoading(false)}
        src={
          mosqueId === "hamilton"
            ? "https://masjidbox.com/prayer-times/muslim-association-of-hamilton"
            : "https://masjidbox.com/prayer-times/mah-umar-mosque"
        }
      />

      {isLoading && (
        <p className="absolute text-center flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white text-xl">
          Loading...
        </p>
      )}
    </div>
  );
};
