const z = require("zod");
const CalendarSlotEntity = require("./CalendarSlot");

const CalendarEntity = z.object({
  id: z.string().uuid(),
  group_id: z.string().uuid(),
  name: z.string(),
  selected_slots: z.array(CalendarSlotEntity),
});

module.exports = CalendarEntity;
