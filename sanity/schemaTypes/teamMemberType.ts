import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
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
      name: "email",
      title: "Email",
      type: "string",
      description: "Optional contact email",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required(),
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
      title: "name",
      subtitle: "role",
      media: "image",
      isActive: "isActive",
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: title || "Unnamed",
        subtitle: `${subtitle || "No role"} • ${isActive ? "Active" : "Inactive"}`,
        media,
      };
    },
  },
});
