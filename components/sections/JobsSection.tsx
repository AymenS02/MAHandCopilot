"use client";
import { cn } from "@/lib/utils";
import { JobPosting } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import { buildTopJobsQuery, buildDepartmentJobsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { JobCard } from "../cards/JobCard";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

export type JobsSectionProps = {
  className?: string;
  limit?: number;
  location?: string | null;
  department?: string | null;
};

const JobsSectionComponent = ({ className, limit = 4, location = null, department = null }: JobsSectionProps) => {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs", location, department, limit],
    queryFn: async () => {
      let query;
      if (department) {
        query = buildDepartmentJobsQuery(department);
      } else {
        query = buildTopJobsQuery(location, limit);
      }
      const jobs = await sanityFetch<JobPosting[]>({ query });
      return jobs;
    },
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache in garbage collection
  });

  if (isLoading) {
    return (
      <div className={cn("text-center", className)}>
        <div className="text-lg font-semibold">Loading job postings...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("text-center text-red-600", className)}>
        <div className="text-lg font-semibold">Error loading job postings</div>
        <div className="text-sm text-gray-600 mt-2">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </div>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className={cn("text-center", className)}>
        <div className="text-lg font-semibold">No job postings available</div>
        <div className="text-sm text-gray-600 mt-2">
          Check back later for new opportunities
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export const JobsSection = (props: JobsSectionProps) => {
  return (
    <ReactQueryProvider>
      <JobsSectionComponent {...props} />
    </ReactQueryProvider>
  );
}; 