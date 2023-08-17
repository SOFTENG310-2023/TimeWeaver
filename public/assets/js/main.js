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
    <input id "ical-name-input" type="text" placeholder="Eg. Sam">
    </div>


    <h5>Paste your Ical Link Here:</h5>

    <div class="ui labeled input">

    <div id = "ical-input" class="ui blue label">ICal Link</div>
    
    <input type="text" placeholder="<Ical Link>">
    </div>
    <br></br>
    <div class="ui approve button green" onclick="setupNewCalendar()">Done</div>`,
});

function setupNewCalendar() {
  addIcalModal.modal("hide");
  const name = document.getElementById("ical-name-input");
  const ical = document.getElementById("ical-input");
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
}
