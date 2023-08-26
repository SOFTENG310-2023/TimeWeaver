const addCellTimetable = require("../addCellTimetable");

describe.skip("Unit testing for addCellTimetable function", () => {
  test("Function should add a cell to an empty cells array", async () => {
    const inputUserCustomObj = {
      cells: [],
    };
    const user = "Alex";
    const id = "mon-0800";

    const expectedOutputUserCustomObj = {
      cells: [
        {
          ID: "mon-0800",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };

    expect(addCellTimetable(id, user, inputUserCustomObj)).toEqual(
      expectedOutputUserCustomObj,
    );
  });
  test("Function should add a cell to an already existing cell array", async () => {
    const inputUserCustomObj = {
      cells: [
        {
          ID: "mon-0800",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    const user = "Alex";
    const id = "mon-0830";
    const expectedOutputUserCustomObj = {
      cells: [
        {
          ID: "mon-0800",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          ID: "mon-0830",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };

    expect(addCellTimetable(id, user, inputUserCustomObj)).toEqual(
      expectedOutputUserCustomObj,
    );
  });
});
