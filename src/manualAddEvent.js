let cellList = [];

/** Heavy Inspiration from https://stackoverflow.com/questions/1207939/adding-an-onclick-event-to-a-table-row */
function initializeCellListeners() {
  const table = document.getElementById("calendar-table");
  const rows = table.getElementsByTagName("tr");
  for (const row of rows) {
    const rowCells = row.getElementsByTagName("td");

    for (const cell of rowCells) {
      cell.classList.remove("cellSelected");
      cell.style.backgroundColor = "white";
      cell.addEventListener("click", function () {
        setCell(cell);
      });
    }
  }
}

function emptyCellList() {
  cellList = [];
}

function setCell(cell) {
  console.log(cell);

  if (cell.classList.contains("cellSelected")) {
    cell.classList.remove("cellSelected");
    cell.style.backgroundColor = "white";
    cellList.remove(cell.id);
  } else {
    cell.classList.add("cellSelected");
    cell.style.backgroundColor = "purple";
    cellList.add(cell.id);
  }
}

module.exports = { initializeCellListeners, cellList };
