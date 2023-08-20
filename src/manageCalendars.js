const commonModalAttributes = {
  class: "mini",
  closeIcon: true,
  classContent: "centered",
};

/** Formantic Modal Designs */
const formatModal = $.modal({
  title: "Choose Calendar Upload Method",
  ...commonModalAttributes,
  content: `
    <div>
    <button id="upload-ical" class="ui right labeled icon button green">
<i class="right arrow icon"></i>
Upload an Ical Link
</button>
    <br/><br/>
    <button  id="upload-manual" class="ui right labeled icon button green">
<i class="right arrow icon"></i>
Add Calendar Manually
</button>
    </div>`,
});

const addIcalModal = $.modal({
  title: "Add Ical Link",
  ...commonModalAttributes,
  content: `
    <div class="ui labeled input">
    <div class="ui blue label">Name</div>
    <input id="ical-name-input" type="text" placeholder="Eg. Sam">
    </div>

    <h5>Paste your Ical Link Here:</h5>

    <div class="ui labeled input">

    <div id = "ical-input" class="ui blue label">ICal Link</div>
    
    <input type="text" placeholder="<Ical Link>">
    </div>
    <br></br>
    <div class="ui approve button green" id="setup-new-calendar-ical" >Done</div>`,
});

const addManualModal = $.modal({
  title: "Add Ical Link",
  ...commonModalAttributes,
  content: `
    <div class="ui labeled input">
    <div class="ui blue label">Name</div>
    <input id="manual-name-input" type="text" placeholder="Eg. Sam">
    </div>

    <h5>Add your Calendar Manually</h5>

    <div class="ui labeled input">
    <h4>Insert Manual Addition Here</h4></div>
    <br></br>
    <div class="ui approve button green" id="setup-new-calendar-manual">Done</div>`,
});

/** HTML Element Declarations */
const title = document.getElementById("calendar-title");
const icalName = document.getElementById("ical-name-input");
const manualName = document.getElementById("manual-name-input");
const ical = document.getElementById("ical-input");
const dynamicSection = document.getElementById("dynamicTabs");

const NON_DYNAMIC_NAV_ELEMENTS = 3;

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

/** Handles the Display of the Given Individual Calendar When Nav Element is Clicked */
function openCalendar(name) {
  title.textContent = name + "'s Calendar";
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
}

/** Handles the Display of the Combined Calendar When Nav Element is Clicked */
function viewCombinedCalendar() {
  title.textContent = "Combined Calendar";
}

function setupNewIcal() {
  addIcalModal.modal("hide");
  calList.push(icalName.value);
  icalName.value = "";
  updateCalList();
}

function setupNewManual() {
  addManualModal.modal("hide");
  calList.push(manualName.value);
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
    title.innerHTML = calList[i];

    const link = document.createElement("a");
    link.setAttribute("class", "item");
    link.appendChild(title);
    link.addEventListener("click", function () {
      openCalendar(calList[i]);
    });

    dynamicSection.insertBefore(link, referenceNode);
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
  formatModal,
  addManualModal,
  addIcalModal,
  calList,
};
