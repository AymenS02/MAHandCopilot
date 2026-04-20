"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Adjust the path based on your project structure

export const Countdown = ({
  countdownEndDate,
  currentTime,
  containerClassName = "",
  timeUnitClassName = "",
  labelClassName = "",
  colons = false,
}: {
  countdownEndDate: Date | null;
  currentTime: Date;
  containerClassName?: string;
  timeUnitClassName?: string;
  labelClassName?: string;
  colons?: boolean;
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!countdownEndDate) {
      setCountdown(null);
      return;
    }

    const updateCountdown = () => {
      const timeRemaining = countdownEndDate.getTime() - currentTime.getTime();
      setCountdown(timeRemaining > 0 ? timeRemaining : 0);
    };

    updateCountdown();
  }, [countdownEndDate, currentTime]);

  if (countdown === null) {
    return <p>Loading...</p>;
  }

  const hours = Math.floor(countdown / (1000 * 60 * 60));
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <div
      className={cn(
        "flex flex-col items-center w-[100px] text-center",
        containerClassName
      )}
    >
      <div className="text-center">
        <div className="text-xl items-center font-bold flex gap-2">
          <div className={cn(timeUnitClassName)}>
            {hours < 10 ? "0" + hours : hours}
            <p className={cn("text-xs", labelClassName)}>HRS</p>
          </div>
          {colons && <p className="text-3xl">:</p>}
          <div className={cn(timeUnitClassName)}>
            {minutes < 10 ? "0" + minutes : minutes}
            <p className={cn("text-xs", labelClassName)}>MIN</p>
          </div>
          {colons && <p className="text-3xl">:</p>}
          <div className={cn(timeUnitClassName)}>
            {seconds < 10 ? "0" + seconds : seconds}
            <p className={cn("text-xs", labelClassName)}>SEC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
