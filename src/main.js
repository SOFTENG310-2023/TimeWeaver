/**
 * This is the Application Entry Point
 * Browserify will bundle up everything here and put it in assets/js/main.js
 * This enables everything to be run in the web browser
 */

const {
  addManualModal,
  addIcalModal,
  formatModal,
  accountModal,
  signupModal,
} = require("./views/modals");

const {
  updateCalList,
  setupNewIcal,
  setupNewManual,
  addCalendar,
  viewCombinedCalendar,
  uploadIcal,
  uploadManual,
  openCalendar,
  setCell,
  initializeCellListeners,
} = require("./views/manageCalendars");

const { showGroups, addGroup, setupNewGroup } = require("./views/manageGroups");

const {
  openAccountPopup,
  openSignupPopup,
  userLogin,
  userSignup,
} = require("./views/manageAccount");

const { addFilter } = require("./views/manageFilter");

const onDisplay = require("./helpers/onDisplay");

const { selectCurrentWeek } = require("./views/selectCurrentWeek");
