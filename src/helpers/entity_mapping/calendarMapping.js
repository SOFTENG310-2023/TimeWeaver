const { CalendarGroupEntity } = require("../../schemas/domain");
const { groupSchema } = require("../../schemas/calendar");
const z = require("zod");

/**
 * Converts the group list from the database to the schema
 * required by the front-end
 *
 * @param {*} groupEntityList
 * @returns group list as required by the front-end
 */
function groupListEntityConverter(groupEntityList) {
  z.array(CalendarGroupEntity).parse(groupEntityList);

  return groupEntityList.map((group) => {
    return groupSchema.parse({
      name: group.name,
      calendarList: calendarListEntityConverter(group.calendar),
    });
  });
}

/**
 * Converts the calendar list from the database to the schema
 * required by the front-end
 *
 * @param {*} calendarEntityList
 * @returns calendar list as required by the front-end
 */
function calendarListEntityConverter(calendarEntityList) {
  return calendarEntityList.map((calendar) => {
    const calendarSlots = selectedSlotEntityConverter(
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

/**
 * Converts the selected slot data to the schema required
 * by the front-end
 *
 * @param {*} selectedSlotEntityList
 * @param {string} name username of the calendar
 * @returns calendar slot list as required by the front-end
 */
function selectedSlotEntityConverter(selectedSlotEntityList, name) {
  return selectedSlotEntityList.map((slot) => {
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
  const matches = timeRegex.exec(slot.timeslot);
  const hours = matches[1];
  const minutes = matches[2];

  return `${slot.day.substring(0, 3).toLowerCase()}-${hours}${minutes}`;
}

module.exports = {
  groupListEntityConverter,
  calendarListEntityConverter,
  selectedSlotEntityConverter,
  selectedSlotIDConverter,
};
