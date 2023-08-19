// function calls calls method to create a cell object then adds that object to the inputted array obj
function addCellTimetable(id, user, userCustomObj) {
  const cell = createCellInstance(id, user, 1); // creates cell instance
  userCustomObj.cells.push(cell); // adds cell to inputted array
  return userCustomObj;
}

// function creates an instance of a cell object and then returns that instance
function createCellInstance(id, user, numPeople) {
  return {
    ID: id,
    users: [user],
    numPeople: numPeople,
  };
}

module.exports = addCellTimetable;
