const z = require("zod");
const CalendarDTO = require("./CalendarDTO");

const CalendarGroupDTO = z.object({
  id: z.string().uuid(),
  name: z.string(),
  calendar: z.array(CalendarDTO),
});

module.exports = CalendarGroupDTO;
