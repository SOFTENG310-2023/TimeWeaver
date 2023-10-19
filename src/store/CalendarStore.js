const { groupSchema, calendarSchema } = require("../schemas/calendar.js");
const { CalendarGroupEntity } = require("../schemas/domain/index.js");
const {
  groupListEntityConverter,
  selectedSlotDBConverter,
} = require("../helpers/entity_mapping/calendarMapping.js");

class CalendarStore {
  static _instance;
  /* The currently selected calendar */
  selectedCalList = [];

  /* The currently selected group */
  selectedGroup;

  /* The currently selected group HTML element in sidebar */
  selectedGroupElem;

  /* List of all groups and its associated calendars */
  groupList = [];

  /**
   * Retrieves all groups from the database and stores it in the groupList
   */
  async retrieveGroups() {
    const res = await fetch("/api/group");
    const groups = await res.json();

    const groupEntityList = groups.map((group) =>
      CalendarGroupEntity.parse(group),
    );
    this.groupList = groupListEntityConverter(groupEntityList);
  }

  /**
   * Add group to the list of groups and upload to database
   * @param {*} group
   */
  async addGroup(group) {
    // Validate group and add if satisfied
    this.groupList.push(groupSchema.parse(group));

    // call the group post api and upload new group to db
    const res = await fetch("/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: group.name }),
    });

    if (!res.ok) {
      throw new Error(`Error adding group: ${res.statusText}`);
    }
  }

  /**
   * Add calendar to the given list of calendars.
   *
   * @param {{ user: string, icalUrl: string, calendarJson: string }[]} calList
   * @param {{ user: string, icalUrl: string, calendarJson: string }} newCalendar
   */
  async addCalendar(calList, newCalendar) {
    // Validate calendar and add if satisfied
    const calendar = calendarSchema.parse(newCalendar);
    calList.push(calendar);

    const selectedSlots = JSON.parse(calendar.calendarJson).cells.map((slot) =>
      selectedSlotDBConverter(slot),
    );

    // call the calendar post api and upload new calendarr to db
    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calendar: {
          group_id: calendar.groupId,
          name: calendar.user,
        },
        selected_slots: selectedSlots,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error adding calendar: ${res.statusText}`);
    }
  }

  /**
   * Returns the singleton instance of the CalendarStore
   *
   * @returns {CalendarStore} The singleton instance of the CalendarStore
   */
  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }
}

module.exports = CalendarStore;
