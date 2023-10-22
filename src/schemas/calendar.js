const { z } = require("zod");

/**
 * @typedef {Object} CalendarCell
 * @property {string} id - The id of the cell
 * @property {string[]} users - The list of users who are available at this time
 * @property {number} numPeople - The number of people who are available at this time
 */

/**
 * @typedef {Object} Calendar
 * @property {string} groupId - The id of the group this calendar belongs to
 * @property {string} user - The name of the user who owns this calendar
 * @property {string} icalUrl - The url of the ical file
 * @property {string} calendarJson - The json string of the calendar
 */

/**
 * @typedef {Object} CalendarGroup
 * @property {string} id - The id of the group
 * @property {string} name - The name of the group
 * @property {Calendar[]} calendarList - The list of calendars in this group
 */

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
  groupId: z.string().uuid(),
  user: z.string(),
  icalUrl: z.union([z.literal(""), z.string().trim().url()]),
  calendarJson: z.string(),
});

/* Schema for each group of calendars */
const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  calendarList: z.array(calendarSchema),
});

module.exports = { calendarSchema, calendarCellSchema, groupSchema };
