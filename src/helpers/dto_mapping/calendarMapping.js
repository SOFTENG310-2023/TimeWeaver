const { CalendarGroupDTO } = require("../../schemas/dto");
const { groupSchema } = require("../../schemas/calendar");
const z = require("zod");

function groupListDTOConverter(groupDtoList) {
  z.array(CalendarGroupDTO).parse(groupDtoList);

  return groupDtoList.map((group) => {
    return groupSchema.parse({
      name: group.name,
      calendarList: calendarListDTOConverter(group.calendar),
    });
  });
}

function calendarListDTOConverter(calendarDtoList) {
  return calendarDtoList.map((calendar) => {
    const calendarSlots = selectedSlotDTOConverter(
      calendar.selected_slots,
      calendar.name,
    );

    return {
      user: calendar.name,
      icalUrl: "",
      calendarJson: JSON.stringify({ cells: calendarSlots }),
    };
  });
}

function selectedSlotDTOConverter(selectedSlotDtoList, name) {
  return selectedSlotDtoList.map((slot) => {
    const slot_id = selectedSlotIDConverter(slot);
    return {
      id: slot_id,
      users: [name],
      numPeople: 1,
    };
  });
}

/**
 * Converts the selected slot data to the ID format used in frontend
 * @param {{day: string, timeslot: string}} slot
 */
function selectedSlotIDConverter(slot) {
  const timeRegex = /^(\d{2}):(\d{2}).*/;
  const matches = slot.timeslot.match(timeRegex);
  const hours = matches[1];
  const minutes = matches[2];

  return `${slot.day.substring(0, 3).toLowerCase()}-${hours}${minutes}`;
}

module.exports = {
  groupListDTOConverter,
  calendarListDTOConverter,
  selectedSlotDTOConverter,
  selectedSlotIDConverter,
};
