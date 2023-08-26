// Objectifies event block cell information
function createCellInstance(id, user, numPeople) {
  return {
    id: id,
    users: [user],
    numPeople: numPeople,
  };
}

module.exports = createCellInstance;
