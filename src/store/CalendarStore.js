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
