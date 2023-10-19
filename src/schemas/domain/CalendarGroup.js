const z = require("zod");
const CalendarEntity = require("./Calendar");

const CalendarGroupEntity = z.object({
  id: z.string().uuid(),
  name: z.string(),
  calendar: z.array(CalendarEntity),
});

module.exports = CalendarGroupEntity;
