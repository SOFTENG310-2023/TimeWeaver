const z = require("zod");
const CalendarSlotDTO = require("./CalendarSlotDTO");

const CalendarDTO = z.object({
  id: z.string().uuid(),
  name: z.string(),
  selected_slots: z.array(CalendarSlotDTO),
});

module.exports = CalendarDTO;
