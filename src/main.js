// This is the entry point
// Browserify will bundle up everything here and put it in assets/js/main.js
// This enables everything to be run in the web browser

const onePlusTwo = require("./onePlusTwo");
const {
  getNumberOfCalendars,
  addCalendar,
  viewCombinedCalendar,
  updateCalList,
  uploadIcal,
  uploadManual,
  openCalendar,
  setupNewIcal,
  setupNewManual,
  formatModal,
  addManualModal,
  addIcalModal,
} = require("./manageCalendars");

const onDisplay = require("./onDisplay");

console.log(onePlusTwo());
