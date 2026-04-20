import { defineField, defineType } from "sanity";

export const heroLinkType = defineType({
  name: "heroLink",
  title: "Homepage Buttons/Links",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Button Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "External URL (opens in new tab)", value: "external" },
          { title: "Internal Path (navigates within site)", value: "internal" },
        ],
        layout: "radio",
      },
      initialValue: "external",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "External URL",
      type: "url",
      description: "External URL the button links to (e.g. https://example.com)",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === "external" && !value) {
            return "URL is required for external links";
          }
          return true;
        }),
    }),
    defineField({
      name: "internalPath",
      title: "Internal Path",
      type: "string",
      description: "Path within the site (e.g. /campaigns/ramadan-2026)",
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === "internal" && !value) {
            return "Internal path is required for internal links";
          }
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
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
      title: "title",
      linkType: "linkType",
      url: "url",
      internalPath: "internalPath",
      isActive: "isActive",
      order: "order",
    },
    prepare({ title, linkType, url, internalPath, isActive, order }) {
      const dest = linkType === "internal" ? internalPath : url;
      return {
        title: title || "Untitled",
        subtitle: `#${order ?? "?"} • ${isActive ? "Active" : "Inactive"} • ${dest ?? ""}`,
      };
    },
  },
});
