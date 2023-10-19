/**
 * Combines cells from two user objects into a single result object.
 * @param {{
 *  cells: {
 *    id: string,
 *    users: string[],
 *    numPeople: number}[]
 * }} user1 - The first user object containing cells.
 * @param {object} user2 - The second user object containing cells.
 * @returns {object} The combined result object with cells.
 */
function combine(user1, user2) {
  // Initialize the result object with an empty array for cells.
  const result = {
    cells: [],
  };

  user1.cells.sort((a, b) => a.id.localeCompare(b.id));
  user2.cells.sort((a, b) => a.id.localeCompare(b.id));

  let i = 0;
  let j = 0;

  // Merge the cells from both users into the result object
  while (i < user1.cells.length && j < user2.cells.length) {
    let comparison = user1.cells[i].id.localeCompare(user2.cells[j].id);
    if (comparison < 0) {
      result.cells.push(addCellTimetable(user1.cells[i]));
      i++;
    } else if (comparison > 0) {
      result.cells.push(addCellTimetable(user2.cells[j]));
      j++;
    } else {
      const combineCellInstance = createCombineCellInstance(
        user1.cells[i],
        user2.cells[j],
      );
      result.cells.push(combineCellInstance);
      i++;
      j++;
    }
  }
  while (i < user1.cells.length) {
    result.cells.push(addCellTimetable(user1.cells[i]));
    i++;
  }
  while (j < user2.cells.length) {
    result.cells.push(addCellTimetable(user2.cells[j]));
    j++;
  }

  return result;
}

/**
 * Creates a new cell instance based on a single user's cell information.
 * @param {object} singleUser - The user object representing a single cell.
 * @returns {object} A new cell instance with properties from the single user's cell.
 */
function addCellTimetable(singleUser) {
  return {
    // Copying the ID, users, and numPeople properties from the single user.
    id: singleUser.id,
    users: singleUser.users,
    numPeople: singleUser.numPeople,
  };
}

/**
 * Creates a combined cell instance by merging information from two user's cells.
 * @param {object} firstUser - The first user object representing a cell to combine.
 * @param {object} secondUser - The second user object representing another cell to combine.
 * @returns {object} A new combined cell instance with merged properties.
 */
function createCombineCellInstance(firstUser, secondUser) {
  return {
    id: firstUser.id,
    users: [...firstUser.users, ...secondUser.users],
    numPeople: firstUser.numPeople + secondUser.numPeople,
  };
}

module.exports = combine;
