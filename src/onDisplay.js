function resetDisplayCells() {
  const table = document.getElementById("calendar-display-table");
  const rows = table.getElementsByTagName("tr");
  for (const row of rows) {
    const rowCells = row.getElementsByTagName("td");
    for (const cell of rowCells) {
      cell.style.backgroundColor = null;
    }
  }
}

function onDisplay(json, personCount) {
  resetDisplayCells();
  const jsonData = JSON.parse(json);
  // Loop through each Cell object in the JSON data
  for (const cell of jsonData.cells) {
    // Calculate the opacity based on the ratio of numPeople and users array length
    const opacity = cell.numPeople === 0 ? 0 : cell.numPeople / personCount;

    // Find the corresponding table cell in the HTML
    const cellElement = document.getElementById(cell.id);

    // Apply the calculated background color and opacity to the cell if found
    if (cellElement) {
      // Set background color with dynamic opacity using rgba
      cellElement.style.backgroundColor = "rgba(128, 0, 0, " + opacity + ")"; // setting colour to red with specified opacity
    }
  }
}

module.exports = onDisplay;
