const { create } = require("domain");

// function calls method to create a cell object then adds that object to the inputted array obj
function addCellTimetable(id, user) {
  const cell = createCellInstance(id, user, 1);
  userCustomObj.cells.push(cell); // adds cell to inputted array
  return userCustomObj;
}

function createCellInstance(id, user, numPeople) {
  return {
    id: id,
    users: [user],
    numPeople: numPeople,
  };
}

module.exports = createCellInstance;
