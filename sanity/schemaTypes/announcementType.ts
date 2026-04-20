import { defineField, defineType } from "sanity";

export const announcementType = defineType({
  name: "announcement",
  title: "Announcement",
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
      description: "Brief description of the announcement",
    }),
    defineField({
      name: "pdfFile",
      title: "File (PDF or Image)",
      type: "file",
      options: {
        accept: ".pdf,image/jpeg,image/png,image/webp,image/gif",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      description: "Date when the announcement was published",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active Announcement",
      type: "boolean",
      options: {
        layout: "switch",
      },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      isActive: "isActive",
    },
    prepare({ title, date, isActive }) {
      return {
        title: title || "Untitled Announcement",
        subtitle: `${date || "No date"} • ${isActive ? "Active" : "Inactive"}`,
      };
    },
  },
});

