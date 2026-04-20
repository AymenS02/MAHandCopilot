import {
  PRAYER_LOCATIONS,
  PRAYER_LOCATIONS_SELECT_VALUES,
  PROGRAMS_SELECT_VALUES,
} from "@/lib/const";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) =>
        Rule.required().custom((endDate, context) => {
          const startDate = context.document?.startDate as Date | string;
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return "End date must be after the start date";
          }
          return true;
        }),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "duration",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isRecurring",
      type: "boolean",
      title: "Is Recurring",
      initialValue: false,
      options: {
        layout: "switch",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "recurrenceDays",
      type: "array",
      title: "Recurring Days",
      of: [{ type: "string" }],
      hidden: ({ document }) => !document?.isRecurring,
      options: {
        list: [
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
          { title: "Sunday", value: "sunday" },
        ],
      },
      validation: (Rule) =>
        Rule.custom((recurrenceDays, context) => {
          if (
            context.document?.isRecurring &&
            (!recurrenceDays || recurrenceDays.length === 0)
          ) {
            return "Please specify the recurring days for a recurring event";
          }
          return true;
        }),
    }),
    defineField({
      name: "showInCalendar",
      title: "Show in Calendar",
      type: "boolean",
      options: {
        layout: "switch",
      },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: PRAYER_LOCATIONS_SELECT_VALUES.concat([
          //@ts-expect-error - None value is not a valid PrayerLocation
          { title: "None", value: "none" },
        ]),
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "program",
      title: "Program",
      type: "string",
      options: {
        list: PROGRAMS_SELECT_VALUES,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    // Optional Call To Action field
    defineField({
      name: "cta",
      title: "Call To Action (optional)",
      type: "url",
    }),
  ],
});
