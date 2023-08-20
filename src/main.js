// This is the entry point
// Browserify will bundle up everything here and put it in assets/js/main.js
// This enables everything to be run in the web browser

const onePlusTwo = require("./onePlusTwo");
const {
  addCalendar,
  viewCombinedCalendar,
  updateCalList,
  uploadIcal,
  uploadManual,
  openCalendar,
  formatModal,
  addManualModal,
  addIcalModal,
} = require("./addCalendar");

console.log(onePlusTwo());
