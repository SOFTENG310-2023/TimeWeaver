function onDisplay(jsonData) {
  // Loop through each Cell object in the JSON data
  for (const cell of jsonData) {
    // Calculate the opacity based on the ratio of numPeople and users array length
    const opacity =
      cell.numPeople === 0 ? 0 : cell.users.length / cell.numPeople;

    // Find the corresponding table cell in the HTML
    const cellElement = document.getElementById(cell.id);

    // Apply the calculated background color and opacity to the cell if found
    if (cellElement) {
      // Set background color with dynamic opacity using rgba
      cellElement.style.backgroundColor = "rgba(128, 0, 0, " + opacity + ")"; // setting colour to red with specified opacity
    }
  }
}
