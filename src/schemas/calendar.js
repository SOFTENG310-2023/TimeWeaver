const { z } = require("zod");

/* Stores information regarding the calendar table cells */
const calendarCellSchema = z
  .object({
    id: z.string(),
    users: z.array(z.string()),
    numPeople: z.number(),
  })
  .refine((data) => data.users.length === data.numPeople);

/* Schema for each calendar */
const calendarSchema = z.object({
  user: z.string(),
  icalUrl: z.union([z.literal(""), z.string().trim().url()]),
  calendarJson: z.string(),
});

/* Schema for each group of calendars */
const groupSchema = z.object({
  name: z.string(),
  calendarList: z.array(calendarSchema),
});

module.exports = { calendarSchema, calendarCellSchema, groupSchema };
