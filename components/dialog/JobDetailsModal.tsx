import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobPosting } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, Clock, MapPin, Building, DollarSign, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type JobDetailsModalProps = {
  job: JobPosting | null;
  open: boolean;
  onClose: () => void;
};

export const JobDetailsModal = ({ job, open, onClose }: JobDetailsModalProps) => {
  if (!job) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString.replace(/-/g, "/")).toLocaleDateString("en-US", {
      month: "long",
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

  const getLocationDisplay = (location: string) => {
    switch (location) {
      case "hamilton":
        return "Hamilton Mountain Mosque";
      case "umar":
        return "Umar Mosque";
      case "none":
        return "Not Specified";
      default:
        return location.charAt(0).toUpperCase() + location.slice(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center justify-between">
            {job.title}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Image */}
          {job.image && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={urlFor(job.image).url()}
                alt={job.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Job Tags */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.jobType)}`}>
              {job.jobType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDepartmentColor(job.department)}`}>
              {job.department.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">Location:</span>
                <span>{getLocationDisplay(job.location)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4 text-primary" />
                <span className="font-medium">Department:</span>
                <span>{job.department.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>

              {job.salary && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="font-medium">Salary:</span>
                  <span>{job.salary}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">Application Deadline:</span>
                <span>{formatDate(job.endDate)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">Posted:</span>
                <span>{formatDate(job.startDate)}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">Job Description</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          {(job.applicationUrl || job.contactEmail) && (
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-primary mb-3">How to Apply</h4>
              <div className="space-y-3">
                {job.applicationUrl && (
                  <Link href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full md:w-auto" size="lg">
                      Apply Online
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {job.contactEmail && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Contact Email:</span>
                    <Link 
                      href={`mailto:${job.contactEmail}`}
                      className="text-primary hover:underline"
                    >
                      {job.contactEmail}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 