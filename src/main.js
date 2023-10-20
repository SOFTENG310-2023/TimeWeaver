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

const { handleLogin } = require("./views/manageAccount");

const { addFilter } = require("./views/manageFilter");

const { showInviteUsersModal } = require("./views/manageInviteUsers");

const onDisplay = require("./helpers/onDisplay");

const { selectCurrentWeek } = require("./views/selectCurrentWeek");

// Every time the web app is refreshed, we run this function to handle the current login status
handleLogin();
