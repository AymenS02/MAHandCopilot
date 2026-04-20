"use client";
import { JobsSection } from "@/components/sections/JobsSection";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JobsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="text-center w-full mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Job Opportunities
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our team and be part of our mission to serve the Muslim community in Hamilton. 
          We offer various opportunities across different departments and locations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Select value={selectedLocation || "all"} onValueChange={(value) => setSelectedLocation(value === "all" ? null : value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="hamilton">Hamilton Mountain Mosque</SelectItem>
            <SelectItem value="umar">Umar Mosque</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDepartment || "all"} onValueChange={(value) => setSelectedDepartment(value === "all" ? null : value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="administration">Administration</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="community-services">Community Services</SelectItem>
            <SelectItem value="religious-services">Religious Services</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <JobsSection 
        className="mt-12 w-full" 
        limit={12} 
        location={selectedLocation}
        department={selectedDepartment}
      />
    </div>
  );
} 