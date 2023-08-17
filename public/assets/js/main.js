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
