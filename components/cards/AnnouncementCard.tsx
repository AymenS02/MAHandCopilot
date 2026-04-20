"use client";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type AnnouncementCardProps = {
  title: string;
  description?: string;
  pdfUrl: string;
  date?: string;
  className?: string;
};

export const AnnouncementCard = ({
  title,
  description,
  pdfUrl,
  date,
  className,
}: AnnouncementCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString.replace(/-/g, "/")).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm mb-2">{description}</p>
          )}
          {date && (
            <p className="text-gray-500 text-xs">Published: {formatDate(date)}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

