import { defineField, defineType } from "sanity";

export const campaignPageType = defineType({
  name: "campaignPage",
  title: "Campaign Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Brief summary shown in listings and SEO",
    }),
    defineField({
      name: "body",
      title: "Page Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pdfFile",
      title: "File Attachment (PDF or Image)",
      type: "file",
      options: { accept: ".pdf,image/jpeg,image/png,image/webp,image/gif" },
      description: "Optional PDF or image file to display or link on the page",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      options: { layout: "switch" },
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      isActive: "isActive",
    },
    prepare({ title, media, isActive }) {
      return {
        title: title || "Untitled Campaign",
        subtitle: isActive ? "Active" : "Inactive",
        media,
      };
    },
  },
});
