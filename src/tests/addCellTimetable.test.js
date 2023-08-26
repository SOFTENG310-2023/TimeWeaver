const createCellInstance = require("../addCellTimetable");

describe("Unit testing for addCellTimetable function", () => {
    test("Function should add a cell to an empty cells array", () => {
        const user = "Alex";
        const id = "mon-0800";
        const numPeople = 1;

        const expectedOutputUserCustomObj = {
            ID: "mon-0800",
            users: ["Alex"],
            numPeople: 1,
        };
        expect(createCellInstance(id, user, numPeople)).toEqual(
            expectedOutputUserCustomObj
        );
    });
});
