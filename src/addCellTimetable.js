// Objectifies event block cell information
function addCellTimetable(id, user, numPeople) {
    return {
        id: id,
        users: [user],
        numPeople: numPeople,
    };
}

module.exports = addCellTimetable;
