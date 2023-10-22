const { urlToJSON } = require("../helpers/icalToJSON");
const converter = require("../helpers/converter");
const onDisplay = require("../helpers/onDisplay");
const combine = require("../helpers/combine");
const { NO_CALENDAR_SELECTED } = require("../constants/strings");
const { selectCurrentWeek } = require("./selectCurrentWeek");
const { addManualModal, addIcalModal, formatModal } = require("./modals");
const CalendarStore = require("../store/CalendarStore").instance();
const { calendarCellSchema } = require("../schemas/calendar");

/** HTML Element Declarations */
const title = document.getElementById("calendar-title");
const icalName = document.getElementById("ical-name-input");
const icalInput = document.getElementById("ical-link-input");
const manualName = document.getElementById("manual-name-input");
const dynamicSection = document.getElementById("dynamic-tabs");

/** Mapping buttons to their onClick functions */
document
  .getElementById("add-calendar-modal-open")
  .addEventListener("click", addCalendar);
document
  .getElementById("view-combination-button")
  .addEventListener("click", viewCombinedCalendar);
document.getElementById("upload-ical").addEventListener("click", uploadIcal);
document
  .getElementById("upload-manual")
  .addEventListener("click", uploadManual);
document
  .getElementById("setup-new-calendar-manual")
  .addEventListener("click", () => {
    setupNewManual(CalendarStore.selectedCalList);
  });
document
  .getElementById("setup-new-calendar-ical")
  .addEventListener("click", () => {
    setupNewIcal(CalendarStore.selectedCalList);
  });

/** List of Occupied Calendar Cells */
let cellList = [];
/** Whether the user has opened the "add a new Manual Calendar" Modal before */
let hasInitializedManual = false;

/** Handles the Display of the Given Individual Calendar When Nav Element is Clicked */
function openCalendar(name) {
  title.textContent = name + "'s Calendar";

  const [userInfo] = CalendarStore.selectedCalList.filter(
    (x) => x.user === name,
  );

  onDisplay(userInfo.calendarJson, 1);
}

/**
 * Shows an empty calendar
 */
function resetCalendar() {
  title.textContent = NO_CALENDAR_SELECTED;
  onDisplay(JSON.stringify({ cells: [] }), 0);
}

/** Handles the Display of the Add Calendar Modal */
function addCalendar() {
  // Don't allow creation of a new calendar if the user is not logged in
  if (localStorage.getItem("access_token") === null) {
    alert("You need to be logged in to create a calendar.");
    return;
  }
  formatModal.modal("show");
}

/**
 * Shows the modal for uploading an ical
 */
function uploadIcal() {
  formatModal.modal("hide");
  addIcalModal.modal("show");
}

/**
 * Shows the modal for uploading a manual calendar
 */
function uploadManual() {
  formatModal.modal("hide");
  addManualModal.modal("show");
  initializeCellListeners();
}

/** Handles the Display of the Combined Calendar When Nav Element is Clicked */
function viewCombinedCalendar() {
  const calList = CalendarStore.selectedCalList;
  title.textContent = "Combined Calendar";
  let combination = { cells: [] };

  for (let cal in calList) {
    const obj = calList[cal];
    /** Combine each instances of the calendar list */
    combination = combine(combination, JSON.parse(obj.calendarJson));
  }

  onDisplay(JSON.stringify(combination), calList.length);
}

/** Handles the Display of the Filtered Calendar user specifies the value to filter by */
function viewFilteredCalendar(filterValue) {
  const calList = CalendarStore.selectedCalList;

  title.textContent = "Filtered Calendar : " + filterValue + " or more people";
  let combination = { cells: [] };

  for (let cal in calList) {
    const obj = calList[cal];

    /**
     * Filter the cells based on the filter value
     */
    combination = combine(combination, JSON.parse(obj.calendarJson));
  }

  const filtered = combination.cells.filter((x) => {
    return x.numPeople >= filterValue;
  });

  combination.cells = filtered;

  onDisplay(JSON.stringify(combination), calList.length);
}

/** Handles the setup of a new Calendar based on the Ical Link */
async function setupNewIcal(calList) {
  // Check if the name is any duplicate, or if the name is empty. Alert the user if so.
  const duplicate = calList.filter((x) => x.user === icalName.value);
  if (duplicate.length > 0 || icalName.value === "") {
    alert("Please enter a valid name");
    return;
  }

  addIcalModal.modal("hide");

  const icalUrl = icalInput.value;
  const json = await urlToJSON(icalUrl);

  const actual = selectCurrentWeek(json);

  // Converts the date format used by Ical into the date format used by the converter function
  const formatted = actual.map((x) => {
    return {
      start: applyNewFormat(x.start),
      end: applyNewFormat(x.end),
    };
  });

  // Converts the JSON into the format used by the converter function
  const userJson = converter(
    JSON.stringify({ events: formatted }),
    icalName.value,
  );

  CalendarStore.addCalendar(calList, {
    groupId: CalendarStore.selectedGroup,
    user: icalName.value,
    icalUrl: icalInput.value,
    calendarJson: userJson,
  }).then(() => {
    icalName.value = "";
    icalInput.value = "";
    updateCalList();
  });
}

/** Converts Date Format used by Ical into Date Format used by the converter function */
function applyNewFormat(date) {
  const arr = date.split(" ");
  const output = `${arr[0]} ${arr[3]} ${arr[4]}`;
  return output;
}

/** Handles setup of a new Calendar based on the Manual Input */
function setupNewManual(calList) {
  // Check if the name is any duplicate, or if the name is empty. Alert the user if so.
  const duplicate = calList.filter((x) => x.user === manualName.value);
  if (duplicate.length > 0 || manualName.value === "") {
    alert("Please enter a valid name");
    return;
  }

  addManualModal.modal("hide");

  // Creates a cell object for each cell in the cellList array
  const cells = cellList.map((cell) => {
    return calendarCellSchema.parse({
      id: cell,
      users: [manualName.value],
      numPeople: 1,
    });
  });

  cellList = [];

  CalendarStore.addCalendar(calList, {
    groupId: CalendarStore.selectedGroup,
    user: manualName.value,
    icalUrl: "",
    calendarJson: JSON.stringify({ cells: cells }),
  }).then(() => {
    manualName.value = "";
    updateCalList();
  });
}

/** Updates the Top Navigation based on the current Calendar List */
function updateCalList() {
  const calList = CalendarStore.selectedCalList;

  // Remove all the calendar items
  $(dynamicSection).children(".calendar-select").remove();

  const referenceNode = dynamicSection.children[1];

  // Creates new entry in the top navigation for each calendar
  for (const element of calList) {
    const title = document.createElement("span");
    title.innerHTML = element.user;

    const button = document.createElement("button");
    button.setAttribute("class", "calendar-select item focus-border");
    button.appendChild(title);
    button.addEventListener("click", function () {
      openCalendar(element.user);
    });

    dynamicSection.insertBefore(button, referenceNode);
  }
}

/** Adds listeners to Item Cells that trigger when the cell is clicked (used for manual calendar addition) */
function initializeCellListeners() {
  cellList = [];

  const table = document.getElementById("calendar-table");
  const rows = table.getElementsByTagName("tr");
  for (const row of rows) {
    const rowCells = row.getElementsByTagName("td");

    for (const cell of rowCells) {
      // Classes are used for indicating whether a cell is selected or not
      cell.classList.remove("cellSelected");
      cell.style.backgroundColor = null;

      if (!hasInitializedManual) {
        cell.addEventListener("mousedown", function () {
          setCell(cell);
          hasInitializedManual = true;
        });

        cell.addEventListener("mouseover", function (e) {
          if (e.buttons == 1) {
            setCell(cell);
          }
        });
      }
    }
  }
}

/** Dictates functionality of Manual Cell when it is clicked */
function setCell(cell) {
  const id = cell.id;

  if (cell.classList.contains("cellSelected")) {
    cell.classList.remove("cellSelected");
    cell.style.backgroundColor = null;
    cellList = cellList.filter((x) => x != id); // Convoluted way of removing the cell from the cellList array
  } else if (!cell.classList.contains("collapsing")) {
    cell.classList.add("cellSelected");
    cell.style.backgroundColor = "purple";
    cellList.push(id);
  }
}

module.exports = {
  updateCalList,
  setupNewIcal,
  setupNewManual,
  addCalendar,
  viewCombinedCalendar,
  viewFilteredCalendar,
  uploadIcal,
  uploadManual,
  openCalendar,
  cellList,
  setCell,
  resetCalendar,
  initializeCellListeners,
};
