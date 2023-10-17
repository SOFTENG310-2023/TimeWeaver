const z = require("zod");

const CalendarSlotDTO = z.object({
  id: z.number(),
  day: z.string(),
  timeslot: z.string(),
});

module.exports = CalendarSlotDTO;
