"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { PRAYER_LOCATIONS } from "@/lib/const";
import { PrayerLocation } from "@/lib/types";
import { cn } from "@/lib/utils";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i;

export type ScheduleItem = { title: string; path: string };

export type SchedulePdfDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: PrayerLocation | null;
  scheduleItems: ScheduleItem[];
  dialogTitle?: string;
};

export function SchedulePdfDialog({
  open,
  onOpenChange,
  location,
  scheduleItems,
  dialogTitle = "Schedule",
}: SchedulePdfDialogProps) {
  const locationName = location ? PRAYER_LOCATIONS[location]?.name : null;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = scheduleItems[selectedIndex];
  const fileSrc = selected ? encodeURI(selected.path) : null;
  const isImage = fileSrc ? IMAGE_EXTENSIONS.test(fileSrc) : false;
  const hasMultiple = scheduleItems.length > 1;
  const hasItems = scheduleItems.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-4xl flex-col p-0 gap-0 sm:max-h-[85vh]"
        aria-describedby={undefined}
      >
        <DialogHeader className="shrink-0 border-b px-4 py-3 sm:px-6">
          <DialogTitle className="text-lg sm:text-xl">
            {dialogTitle} {locationName ? `— ${locationName}` : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-6">
          {!hasItems && (
            <p className="text-muted-foreground text-sm">No schedule available.</p>
          )}
          {hasMultiple && hasItems && (
            <div className="flex flex-wrap gap-2">
              {scheduleItems.map((item, index) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    selectedIndex === index
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 hover:bg-muted border-muted-foreground/20"
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
          {fileSrc && selected && (
            <>
              <a
                href={fileSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-muted/50 py-2 text-sm font-medium hover:bg-muted sm:w-auto sm:self-end"
              >
                <ExternalLink className="h-4 w-4" />
                Open in new tab
              </a>
              {isImage ? (
                <div className="w-full flex-1 overflow-auto rounded-lg border bg-muted/30 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={selected.path}
                    src={fileSrc}
                    alt={selected.title}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="relative min-h-[50vh] w-full flex-1 overflow-hidden rounded-lg border bg-muted/30 sm:min-h-[60vh]">
                  <iframe
                    key={selected.path}
                    src={fileSrc}
                    title={selected.title}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
