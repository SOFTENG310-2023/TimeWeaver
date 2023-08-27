const { urlToJSON } = require("./icalToJSON");
const converter = require("./converter");
const onDisplay = require("./onDisplay");
const combine = require("./combine");
const { selectCurrentWeek } = require("./selectCurrentWeek");
const { addManualModal, addIcalModal, formatModal } = require("./modals");

/** HTML Element Declarations */
const title = document.getElementById("calendar-title");
const icalName = document.getElementById("ical-name-input");
const icalInput = document.getElementById("ical-link-input");
const manualName = document.getElementById("manual-name-input");
const dynamicSection = document.getElementById("dynamicTabs");

const NON_DYNAMIC_NAV_ELEMENTS = 3;

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
  .addEventListener("click", setupNewManual);
document
  .getElementById("setup-new-calendar-ical")
  .addEventListener("click", setupNewIcal);

/** List of Uploaded Calendars */
let calList = [];
/** List of Occupied Calendar Cells */
let cellList = [];
/** Whether the user has opened the "add a new Manual Calendar" Modal before */
let hasInitializedManual = false;

/** Handles the Display of the Given Individual Calendar When Nav Element is Clicked */
function openCalendar(name) {
  title.textContent = name + "'s Calendar";

  const [userInfo] = calList.filter((x) => x.user === name);

  onDisplay(userInfo.calendarJson, 1);
}

function addCalendar() {
  formatModal.modal("show");
}

function uploadIcal() {
  formatModal.modal("hide");
  addIcalModal.modal("show");
}

function uploadManual() {
  formatModal.modal("hide");
  addManualModal.modal("show");
  initializeCellListeners();
}

/** Handles the Display of the Combined Calendar When Nav Element is Clicked */
function viewCombinedCalendar() {
  title.textContent = "Combined Calendar";
  let combination = { cells: [] };

  for (let cal in calList) {
    const obj = calList[cal];
    combination = combine(combination, JSON.parse(obj.calendarJson));
  }

  onDisplay(JSON.stringify(combination), calList.length);
}

/** Handles the setup of a new Calendar based on the Ical Link */
async function setupNewIcal() {
  addIcalModal.modal("hide");

  const icalUrl = icalInput.value;
  const json = await urlToJSON(icalUrl);

  const actual = selectCurrentWeek(json);

  const formatted = actual.map((x) => {
    return {
      start: applyNewFormat(x.start),
      end: applyNewFormat(x.end),
    };
  });

  const userJson = converter(
    JSON.stringify({ events: formatted }),
    icalName.value
  );

  const info = {
    user: icalName.value,
    icalUrl: icalInput.value,
    calendarJson: userJson,
  };
  calList.push(info);

  icalName.value = "";
  icalInput.value = "";
  updateCalList();
}

/** Converts Date Format used by Ical into Date Format used by the converter function */
function applyNewFormat(date) {
  const arr = date.split(" ");
  const output = `${arr[0]} ${arr[3]} ${arr[4]}`;
  return output;
}

/** Handles setup of a new Calendar based on the Manual Input */
function setupNewManual() {
  addManualModal.modal("hide");

  const cells = cellList.map((cell) => {
    return {
      id: cell,
      users: [manualName.value],
      numPeople: 1,
    };
  });

  cellList = [];

  calList.push({
    user: manualName.value,
    icalUrl: "",
    calendarJson: JSON.stringify({ cells: cells }),
  });
  manualName.value = "";

  updateCalList();
}

/** Updates the Top Navigation based on the current Calendar List */
function updateCalList() {
  const referenceNode = dynamicSection.children[1];

  // Repeats for However many items in the calList are not already represented as navigation tabs
  for (
    let i = dynamicSection.children.length - NON_DYNAMIC_NAV_ELEMENTS;
    i < calList.length;
    i++
  ) {
    const title = document.createElement("span");
    title.innerHTML = calList[i].user;

    const link = document.createElement("a");
    link.setAttribute("class", "item");
    link.appendChild(title);
    link.addEventListener("click", function () {
      openCalendar(calList[i].user);
    });

    dynamicSection.insertBefore(link, referenceNode);
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
        cell.addEventListener("click", function () {
          setCell(cell);
          hasInitializedManual = true;
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
    cellList = cellList.filter((x) => x != id); // Convolutted way of removing the cell from the cellList array
  } else {
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
  uploadIcal,
  uploadManual,
  openCalendar,
  calList,
  cellList,
  setCell,
  initializeCellListeners,
};
