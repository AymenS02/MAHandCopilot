import { defineField, defineType } from "sanity";

export const homepageHeroType = defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "document",
  fields: [
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description: "The hero background video (MP4 or WebM)",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown while the video is loading",
    }),
    defineField({
      name: "arabicText",
      title: "Arabic Text",
      type: "string",
      description: "The Arabic heading displayed over the video",
    }),
    defineField({
      name: "englishText",
      title: "English Text",
      type: "string",
      description: "The English heading displayed over the video",
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
      arabicText: "arabicText",
      englishText: "englishText",
      isActive: "isActive",
      media: "posterImage",
    },
    prepare({ englishText, isActive, media }) {
      return {
        title: englishText || "Homepage Hero",
        subtitle: isActive ? "Active" : "Inactive",
        media,
      };
    },
  },
});
