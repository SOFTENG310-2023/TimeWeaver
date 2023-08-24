// Note that the test suite is currently being skipped using jest due to a bug present in referencing jQuery and Fomantic UI JS dependencies. As soon as this bug is fixed, tests will be running automatically with jest.
const onDisplay = require("../onDisplay");

// Mocking the entire getNumberOfCalendars function
jest.mock("../manageCalendars", () => ({
  getNumberOfCalendars: jest.fn(() => 5), // Mock the function to always return 5
}));

describe.skip("onDisplay.js test suite", () => {
  test("onDisplay applies correct background color and opacity", () => {
    const jsonData = [
      {
        id: "mon-0730",
        users: ["Alex"],
        numPeople: 1,
      },
    ];

    // Run the onDisplay function with the cell
    onDisplay(jsonData);

    // Assert that the background color and opacity are correctly applied
    const mockCellElement = document.getElementById("mon-0730");
    expect(mockCellElement.style.backgroundColor).toBe("rgba(128, 0, 0, 0.2)");
  });

  test("onDisplay applies correct background color and opacity for multiple cells", () => {
    const jsonData = [
      {
        id: "mon-0730",
        users: ["Alex"],
        numPeople: 1,
      },
      {
        id: "tue-0930",
        users: ["Alice", "Bob"],
        numPeople: 2,
      },
    ];

    onDisplay(jsonData);

    const mockCellElement1 = document.getElementById("mon-0730");
    expect(mockCellElement1.style.backgroundColor).toBe("rgba(128, 0, 0, 0.2)");

    const mockCellElement2 = document.getElementById("tue-0930");
    expect(mockCellElement2.style.backgroundColor).toBe("rgba(128, 0, 0, 0.4)");
  });

  test("onDisplay applies zero opacity when numPeople is 0", () => {
    const jsonData = [
      {
        id: "wed-1100",
        users: [],
        numPeople: 0,
      },
    ];

    onDisplay(jsonData);

    const mockCellElement = document.getElementById("wed-1100");
    expect(mockCellElement.style.backgroundColor).toBe("rgba(128, 0, 0, 0)");
  });

  test("onDisplay handles missing cell elements gracefully", () => {
    const jsonData = [
      {
        id: "thu-1500",
        users: ["Eva"],
        numPeople: 1,
      },
    ];

    // Mocking a scenario where getElementById returns null
    document.getElementById = jest.fn((id) => null);

    onDisplay(jsonData);

    // No assertions needed, just making sure the function does not throw errors
  });
});
