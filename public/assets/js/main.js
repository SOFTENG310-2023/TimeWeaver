const inputIcalBox = document.getElementById("ical-input-box");
const inputNameBox = document.getElementById("name-input-box");
const list = document.getElementById("calendar-list");

let calList = [];

function addTask() {
  console.log("Adding Task");
  if (inputIcalBox.value === "" || inputNameBox.value === "") {
    alert("Fill out the fields please");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputIcalBox.value + inputNameBox.value;
    list.appendChild(li);
    calList.push(inputNameBox.value);
    inputIcalBox.value = "";
    inputNameBox.value = "";
  }
}

const calDisplaylist = document.getElementById("calendar-select-list");

function generateCheckedList() {
  for (const element of calList) {
    let li = document.createElement("li");
    li.innerHTML = element;
    calDisplaylist.appendChild(li);
  }
}

const formatModal = $.modal({
  title: "Choose Calendar Upload Method",
  class: "mini",
  closeIcon: true,
  classContent: "centered",
  content: `
    <div>
    <button onclick="uploadIcal()" class="ui right labeled icon button green">
<i class="right arrow icon"></i>
Upload an Ical Link
</button>
    <br/><br/>
    <button onclick="uploadManual()" class="ui right labeled icon button green">
<i class="right arrow icon"></i>
Add Calendar Manually
</button>
    </div>`,
});

const addIcalModal = $.modal({
  title: "Add Ical Link",
  class: "mini",
  closeIcon: true,
  classContent: "centered",
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
    <div class="ui approve button green" onclick="setupNewCalendar('Ical')">Done</div>`,
});

const addManualModal = $.modal({
  title: "Add Ical Link",
  class: "mini",
  closeIcon: true,
  classContent: "centered",
  content: `
    <div class="ui labeled input">
    <div class="ui blue label">Name</div>
    <input id="manual-name-input" type="text" placeholder="Eg. Sam">
    </div>

    <h5>Add your Calendar Manually</h5>

    <div class="ui labeled input">
    <h4>Insert Manual Addition Here</h4></div>
    <br></br>
    <div class="ui approve button green" onclick="setupNewCalendar('Manual')">Done</div>`,
});

function setupNewCalendar(mode) {
  console.log(document);
  const icalName = document.getElementById("ical-name-input");
  const manualName = document.getElementById("manual-name-input");
  const ical = document.getElementById("ical-input");
  addIcalModal.modal("hide");
  addManualModal.modal("hide");

  if (mode == "Ical") {
    calList.push(icalName.value);
    icalName.textContent = "";
    icalName.innerHTML = "";
  } else {
    calList.push(manualName.value);
    manualName.textContent = "";
  }
  updateCalList();
}

const NON_DYNAMIC_CHILDREN = 3;

function updateCalList() {
  const dynamicSection = document.getElementById("dynamicTabs");

  const referenceNode = dynamicSection.children[1];

  console.log("adding children");
  for (
    let element = dynamicSection.children.length - NON_DYNAMIC_CHILDREN;
    element < calList.length;
    element++
  ) {
    const title = document.createElement("span");
    title.innerHTML = calList[element];
    console.log("Element = " + element);
    const link = document.createElement("a");
    link.setAttribute("class", "item");
    link.appendChild(title);
    link.setAttribute("onclick", `openCalendar(event, '${calList[element]}')`);

    dynamicSection.insertBefore(link, referenceNode);
  }
  console.log(document);
}

function openCalendar(event, name) {
  console.log(event);
  console.log(name);
  const title = document.getElementById("calendar-title");
  title.textContent = name + "'s Calendar";
}

function addCalendar() {
  formatModal.modal("show");
}

function uploadIcal() {
  console.log("Uploading Ical");
  formatModal.modal("hide");
  addIcalModal.modal("show");
}

function uploadManual() {
  console.log("Uploading Manually");
  formatModal.modal("hide");
  addManualModal.modal("show");
}

function viewCombinedCalendar() {
  const title = document.getElementById("calendar-title");
  title.textContent = "Combined Calendar";
}
