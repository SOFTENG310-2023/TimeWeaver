function combineObjects(user1, user2) {
    const result = {
        cells: [],
    };
    for (let i = 0; i < user1.cells.length; i++) {
        for (let j = 0; j < user2.cells.length; j++) {
            if (user1.cells[i] !== undefined && user2.cells[j] !== undefined) {
                if (user1.cells[i].ID === user2.cells[j].ID) {
                    const combineCellInstance = createCombineCellInstance(
                        user1.cells[i],
                        user2.cells[j]
                    );
                    result.cells.push(combineCellInstance);
                    delete user1.cells[i];
                    delete user2.cells[j];
                }
            }
        }
        if (user1.cells[i] !== undefined) {
            const cellInstance = createCellInstance(user1.cells[i]);
            result.cells.push(cellInstance);
        }
    }
    for (let i = 0; i < user2.cells.length; i++) {
        if (user2.cells[i] !== undefined) {
            const cellInstance = createCellInstance(user2.cells[i]);
            result.cells.push(cellInstance);
        }
    }
    return result;
}

function createCellInstance(singleUser) {
    return {
        ID: singleUser.ID,
        users: singleUser.users,
        numPeople: singleUser.numPeople,
    };
}

function createCombineCellInstance(firstUser, secondUser) {
    return {
        ID: firstUser.ID,
        users: [...firstUser.users, ...secondUser.users],
        numPeople: firstUser.numPeople + secondUser.numPeople,
    };
}

module.exports = combineObjects;
