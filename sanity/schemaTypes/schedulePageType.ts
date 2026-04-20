import { defineField, defineType } from "sanity";

export const schedulePageType = defineType({
  name: "schedulePage",
  title: "Schedule Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Button Label / Title",
      type: "string",
      description: 'Displayed as the homepage button text and dialog title (e.g. "Ramadan Schedule")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scheduleFiles",
      title: "Schedule Files",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "File Title",
              type: "string",
              description: 'e.g. "Ramadan Schedule", "Taraweeh Schedule"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "location",
              title: "Mosque Location",
              type: "string",
              options: {
                list: [
                  { title: "Hamilton Mountain Mosque", value: "hamilton" },
                  { title: "Umar Mosque", value: "umar" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pdfFile",
              title: "File (PDF or Image)",
              type: "file",
              options: { accept: ".pdf,image/jpeg,image/png,image/webp,image/gif" },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              location: "location",
            },
            prepare({ title, location }) {
              const loc =
                location === "hamilton"
                  ? "Mountain Mosque"
                  : location === "umar"
                    ? "Umar Mosque"
                    : "Unknown";
              return {
                title: title || "Untitled",
                subtitle: loc,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the homepage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on Homepage",
      type: "boolean",
      description: "Whether this schedule appears as a button on the homepage hero",
      options: { layout: "switch" },
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      options: { layout: "switch" },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      showOnHomepage: "showOnHomepage",
    },
    prepare({ title, isActive, showOnHomepage }) {
      const flags = [
        isActive ? "Active" : "Inactive",
        showOnHomepage ? "Homepage" : "Hidden",
      ].join(" • ");
      return {
        title: title || "Untitled Schedule",
        subtitle: flags,
      };
    },
  },
});
