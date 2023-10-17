/**
 * Combines cells from two user objects into a single result object.
 * @param {object} user1 - The first user object containing cells.
 * @param {object} user2 - The second user object containing cells.
 * @returns {object} The combined result object with cells.
 */
function combine(user1, user2) {
  // Initialize the result object with an empty array for cells.
  const result = {
    cells: [],
  };

  // Iterate through the cells of the first user.
  for (let i = 0; i < user1.cells.length; i++) {
    const cell1 = user1.cells[i];

    // Iterate through the cells of the second user.
    for (let j = 0; j < user2.cells.length; j++) {
      const cell2 = user2.cells[j];

      // Check if both cell objects exist and have the same ID.
      if (
        cell1 &&
        cell2 &&
        cell1.id === cell2.id &&
        cell1.numPeople >= 1 &&
        cell2.numPeople >= 1
      ) {
        // Create a combined cell instance and add it to the result.
        const combineCellInstance = createCombineCellInstance(cell1, cell2);
        result.cells.push(combineCellInstance);

        // Flag the processed cells from both user objects.
        user1.cells[i].numPeople = 0;
        user1.cells[i].users = [];
        user2.cells[j].numPeople = 0;
        user2.cells[j].users = [];
      }
    }

    // If the cell in the first user still exists, create a cell instance and add it to the result.
    if (
      user1.cells[i] !== null &&
      user1.cells[i] !== undefined &&
      user1.cells[i].numPeople >= 1
    ) {
      const cellInstance = addCellTimetable(user1.cells[i]);
      result.cells.push(cellInstance);
    }
  }

  // Iterate through the cells of the second user to handle remaining cells not matched.
  for (const cell2 of user2.cells) {
    if (cell2 !== null && cell2 !== undefined && cell2.numPeople >= 1) {
      // Create a cell instance and add it to the result.
      const cellInstance = addCellTimetable(cell2);
      result.cells.push(cellInstance);
    }
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
