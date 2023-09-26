/**
 * This is the Application Entry Point
 * Browserify will bundle up everything here and put it in assets/js/main.js
 * This enables everything to be run in the web browser
 */

const { addManualModal, addIcalModal, formatModal } = require("./modals");

const {
  updateCalList,
  setupNewIcal,
  setupNewManual,
  addCalendar,
  viewCombinedCalendar,
  uploadIcal,
  uploadManual,
  openCalendar,
  calList,
  cellList,
  setCell,
  initializeCellListeners,
} = require("./manageCalendars");

const { showGroups, addGroup, setupNewGroup } = require("./manageGroups");

const { addFilter } = require("./manageFilter");

const onDisplay = require("./onDisplay");

const { selectCurrentWeek } = require("./selectCurrentWeek");
