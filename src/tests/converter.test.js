const converter = require("../converter");

describe("Unit tests for converter function", () => {
  test("Function should return 3", async () => {
    user = "Alex";
    const injson = {
      events: [
        {
          start: "Monday 07:30 AM",
          end: "Monday 08:00 AM",
        },
      ],
    };

    const outjson = {
      cells: [
        {
          id: "mon-0730",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    expect(converter(JSON.stringify(injson), user)).toBe(
      JSON.stringify(outjson),
    );
  });

  test("Function should return 3", async () => {
    user = "Alex";
    const injson = {
      events: [
        {
          start: "Monday 07:30 AM",
          end: "Monday 08:30 AM",
        },
      ],
    };

    const outjson = {
      cells: [
        {
          id: "mon-0730",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          id: "mon-0800",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    expect(converter(JSON.stringify(injson), user)).toBe(
      JSON.stringify(outjson),
    );
  });

  test("Function should return 3", async () => {
    user = "Alex";
    const injson = {
      events: [
        {
          start: "Monday 07:30 PM",
          end: "Monday 08:00 PM",
        },
      ],
    };

    const outjson = {
      cells: [
        {
          id: "mon-0730",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    expect(converter(JSON.stringify(injson), user)).toBe(
      JSON.stringify(outjson),
    );
  });

  test("Function should return 3", async () => {
    user = "Alex";
    const injson = {
      events: [
        {
          start: "Monday 07:30 PM",
          end: "Monday 08:30 PM",
        },
      ],
    };

    const outjson = {
      cells: [
        {
          id: "mon-0730",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          id: "mon-0800",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    expect(converter(JSON.stringify(injson), user)).toBe(
      JSON.stringify(outjson),
    );
  });

  test("Function should return 3", async () => {
    user = "Alex";
    const injson = {
      events: [
        {
          start: "Thursday 11:00 AM",
          end: "Thursday 01:00 PM",
        },
      ],
    };

    const outjson = {
      cells: [
        {
          id: "thu-1100",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          id: "thu-1130",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          id: "thu-1200",
          users: ["Alex"],
          numPeople: 1,
        },
        {
          id: "thu-1230",
          users: ["Alex"],
          numPeople: 1,
        },
      ],
    };
    expect(converter(JSON.stringify(injson), user)).toBe(
      JSON.stringify(outjson),
    );
  });
});
