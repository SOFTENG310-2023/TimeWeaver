// function calls method to create a cell object then adds that object to the inputted array obj
function createCellInstance(id, user, numPeople) {
  return {
    id: id,
    users: [user],
    numPeople: numPeople,
  };
}

module.exports = createCellInstance;
