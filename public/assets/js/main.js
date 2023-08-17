function addCellTimetable(id, user, userCustomJSON) {
  const cell = createCellInstance(id, user, 1);
  userCustomJSON.jsons.push(cell);
}

function createCellInstance(id, user, numPeople) {
  return {
    ID: id,
    users: user,
    numPeople: numPeople,
  };
}
