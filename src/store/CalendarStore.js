const { groupSchema, calendarSchema } = require("../schemas/calendar.js");

class CalendarStore {
  static _instance;
  /* The currently selected calendar */
  selectedCalList = [];

  /* The currently selected group HTML element in sidebar */
  selectedGroup;

  /* List of all groups and its associated calendars */
  groupList = [];

  get selectedCalList() {
    return this.selectedCalList;
  }

  set selectedCalList(list) {
    this.selectedCalList = list;
  }

  get selectedGroup() {
    return this.selectedGroup;
  }

  set selectedGroup(group) {
    this.selectedGroup = group;
  }

  get groupList() {
    return this.groupList;
  }

  /**
   * Add group to the list of groups
   * @param {*} group
   */
  addGroup(group) {
    // Validate group and add if satisfied
    this.groupList.push(groupSchema.parse(group));
  }

  /**
   * Add calendar to the given list of calendars.
   *
   * @param {{ user: string, icalUrl: string, calendarJson: string }[]} calList
   * @param {{ user: string, icalUrl: string, calendarJson: string }} newCalendar
   */
  addCalendar(calList, newCalendar) {
    // Validate calendar and add if satisfied
    calList.push(calendarSchema.parse(newCalendar));
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
