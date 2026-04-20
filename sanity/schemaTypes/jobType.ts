import {
  PRAYER_LOCATIONS,
  PRAYER_LOCATIONS_SELECT_VALUES,
  PROGRAMS_SELECT_VALUES,
} from "@/lib/const";
import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Job Posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Job Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobType",
      title: "Job Type",
      type: "string",
      options: {
        list: [
          { title: "Full Time", value: "full-time" },
          { title: "Part Time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Temporary", value: "temporary" },
          { title: "Volunteer", value: "volunteer" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "salary",
      title: "Salary Range",
      type: "string",
      description: "e.g., $50,000 - $70,000, Competitive, Negotiable",
    }),
    defineField({
      name: "location",
      title: "Job Location",
      type: "string",
      options: {
        list: [
          { title: "Hamilton Mountain Mosque", value: "hamilton" },
          { title: "Umar Mosque", value: "umar" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Administration", value: "administration" },
          { title: "Education", value: "education" },
          { title: "Maintenance", value: "maintenance" },
          { title: "Community Services", value: "community-services" },
          { title: "Religious Services", value: "religious-services" },
          { title: "General", value: "general" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
      description: "List of job requirements",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      description: "List of job responsibilities",
    }),
    defineField({
      name: "startDate",
      title: "Application Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Application Deadline",
      type: "date",
      validation: (Rule) =>
        Rule.required().custom((endDate, context) => {
          const startDate = context.document?.startDate as Date | string;
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return "Application deadline must be after the start date";
          }
          return true;
        }),
    }),
    defineField({
      name: "isActive",
      title: "Active Job Posting",
      type: "boolean",
      options: {
        layout: "switch",
      },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showInListings",
      title: "Show in Job Listings",
      type: "boolean",
      options: {
        layout: "switch",
      },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    // Optional Call To Action field for application link
    defineField({
      name: "applicationUrl",
      title: "Application URL (optional)",
      type: "url",
      description: "Link to job application form or email",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email (optional)",
      type: "email",
      description: "Email for job inquiries",
    }),
  ],
}); 