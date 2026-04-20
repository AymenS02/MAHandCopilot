import { defineField, defineType } from "sanity";

export const durationType = defineType({
  name: "duration",
  title: "Duration",
  description: "A start and finish time for an event.",
  type: "object",
  fields: [
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "timeValue",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "timeValue",
      validation: (Rule) =>
        Rule.required().custom((endTime: string, context) => {
          //@ts-expect-error
          const startTime = context.parent?.startTime as string;

          // StartTime in this format is in the format of HH:MM
          if (startTime && endTime) {
            const startTimeHours = parseInt(startTime.split(":")[0]);
            const startTimeMinutes = parseInt(startTime.split(":")[1]);
            const endTimeHours = parseInt(endTime.split(":")[0]);
            const endTimeMinutes = parseInt(endTime.split(":")[1]);

            if (startTimeHours > endTimeHours) {
              return "End time must be after the start time";
            }

            if (
              startTimeHours === endTimeHours &&
              startTimeMinutes > endTimeMinutes
            ) {
              return "End time must be after the start time";
            }
          }
          return true;
        }),
    }),
  ],
  // make the fields render next to each other
  options: { columns: 2 },
});
