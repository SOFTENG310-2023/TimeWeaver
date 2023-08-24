/**
 * Combines cells from two user objects into a single result object.
 * @param {object} user1 - The first user object containing cells.
 * @param {object} user2 - The second user object containing cells.
 * @returns {object} The combined result object with cells.
 */
function combineObjects(user1, user2) {
    // Initialize the result object with an empty array for cells.
    const result = {
        cells: [],
    };

    // Iterate through the cells of the first user.
    for (let i = 0; i < user1.cells.length; i++) {
        // Iterate through the cells of the second user.
        for (let j = 0; j < user2.cells.length; j++) {
            // Check if both cell objects exist and have the same ID.
            if (user1.cells[i] !== undefined && user2.cells[j] !== undefined) {
                if (user1.cells[i].ID === user2.cells[j].ID) {
                    // Create a combined cell instance and add it to the result.
                    const combineCellInstance = createCombineCellInstance(
                        user1.cells[i],
                        user2.cells[j]
                    );
                    result.cells.push(combineCellInstance);

                    // Delete the processed cells from both user objects.
                    delete user1.cells[i];
                    delete user2.cells[j];
                }
            }
        }

        // If the cell in the first user still exists, create a cell instance and add it to the result.
        if (user1.cells[i] !== undefined) {
            const cellInstance = createCellInstance(user1.cells[i]);
            result.cells.push(cellInstance);
        }
    }

    // Iterate through the cells of the second user to handle remaining cells not matched.
    for (let i = 0; i < user2.cells.length; i++) {
        if (user2.cells[i] !== undefined) {
            // Create a cell instance and add it to the result.
            const cellInstance = createCellInstance(user2.cells[i]);
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
function createCellInstance(singleUser) {
    return {
        // Copying the ID, users, and numPeople properties from the single user.
        ID: singleUser.ID,
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
        ID: firstUser.ID,
        users: [...firstUser.users, ...secondUser.users],
        numPeople: firstUser.numPeople + secondUser.numPeople,
    };
}

module.exports = combineObjects;
