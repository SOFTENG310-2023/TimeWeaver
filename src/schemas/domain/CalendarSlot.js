const z = require("zod");

const CalendarSlotEntity = z.object({
  id: z.number(),
  day: z.string(),
  timeslot: z.string(),
});

module.exports = CalendarSlotEntity;
