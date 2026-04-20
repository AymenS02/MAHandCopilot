import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JobPosting } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, MapPin, Building, DollarSign, ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JobDetailsModal } from "../dialog/JobDetailsModal";

export const JobCard = ({
  job,
  className,
}: {
  job: JobPosting;
  className?: string;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString.replace(/-/g, "/")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "contract":
        return "bg-purple-100 text-purple-800";
      case "temporary":
        return "bg-orange-100 text-orange-800";
      case "volunteer":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "administration":
        return "bg-blue-100 text-blue-800";
      case "education":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "community-services":
        return "bg-purple-100 text-purple-800";
      case "religious-services":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on the apply button
    if ((e.target as HTMLElement).closest('a[href]')) {
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <div 
        className={cn("bg-white rounded-xl overflow-hidden border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]", className)}
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={urlFor(job.image.asset._ref).url()}
            alt={job.title}
            fill
            className="object-contain bg-gray-50"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getJobTypeColor(job.jobType))}>
              {job.jobType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getDepartmentColor(job.department))}>
              {job.department.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          {/* View Details Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2">
              <Eye className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">{job.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
          </div>

          <div className="space-y-2">
            {job.salary && (
              <div className="flex gap-2 items-center text-sm text-primary">
                <DollarSign size={14} />
                <p>{job.salary}</p>
              </div>
            )}
            
            <div className="flex gap-2 items-center text-sm text-primary">
              <MapPin size={14} />
              <p>{job.location === "hamilton" ? "Hamilton Mountain Mosque" : 
                  job.location === "umar" ? "Umar Mosque" : 
                  job.location.replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>

            <div className="flex gap-2 items-center text-sm text-primary">
              <Building size={14} />
              <p>{job.department.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {formatDate(job.endDate)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            
            {job.applicationUrl && (
              <Link href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="flex-1">
                  Apply Now
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <JobDetailsModal 
        job={job}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}; 