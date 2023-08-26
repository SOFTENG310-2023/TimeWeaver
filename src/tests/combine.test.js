const combineObjects = require("../combine");
describe.skip("combineObjects", () => {
  test("Both users have empty cells", () => {
    const user1 = { cells: [] };
    const user2 = { cells: [] };
    expect(combineObjects(user1, user2)).toEqual({ cells: [] });
  });

  test("One user has empty cells, the other has cells", () => {
    const user1 = { cells: [] };
    const user2 = {
      cells: [{ ID: "mon-0730", users: ["Alice"], numPeople: 1 }],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [{ ID: "mon-0730", users: ["Alice"], numPeople: 1 }],
    });
  });

  test("Both users have cells with unique IDs", () => {
    const user1 = {
      cells: [{ ID: "mon-0730", users: ["Alice"], numPeople: 1 }],
    };
    const user2 = {
      cells: [{ ID: "tue-0730", users: ["Bob"], numPeople: 1 }],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice"], numPeople: 1 },
        { ID: "tue-0730", users: ["Bob"], numPeople: 1 },
      ],
    });
  });

  test("Both users have empty cells and undefined values", () => {
    const user1 = { cells: [undefined] };
    const user2 = { cells: [undefined] };
    expect(combineObjects(user1, user2)).toEqual({ cells: [] });
  });

  test("Both users have overlapping cells", () => {
    const user1 = {
      cells: [
        { ID: "mon-0730", users: ["Alice"], numPeople: 1 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "mon-0730", users: ["Bob"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
      ],
    });
  });

  test("Both users have overlapping and unique cells", () => {
    const user1 = {
      cells: [
        { ID: "mon-0730", users: ["Alice"], numPeople: 1 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "mon-0730", users: ["Bob"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
        { ID: "fri-1000", users: ["Eve"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
        { ID: "fri-1000", users: ["Eve"], numPeople: 1 },
      ],
    });
  });

  test("Both users have empty cells and undefined values", () => {
    const user1 = {
      cells: [
        { ID: "mon-0730", users: ["Alice"], numPeople: 1 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "mon-0730", users: ["Bob"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "tue-1000", users: ["David"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople and overlapping IDs", () => {
    const user1 = {
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "tue-0730", users: ["David", "Eve"], numPeople: 2 },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        {
          ID: "tue-0730",
          users: ["Charlie", "David", "Eve"],
          numPeople: 3,
        },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople and overlapping IDs (reordered)", () => {
    const user1 = {
      cells: [
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
        { ID: "tue-0730", users: ["David", "Eve"], numPeople: 2 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        {
          ID: "tue-0730",
          users: ["Charlie", "David", "Eve"],
          numPeople: 3,
        },
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople and unique cells", () => {
    const user1 = {
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
        { ID: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
        { ID: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
      ],
    });
  });

  test("Users have cells with matching numPeople and overlapping IDs (different order)", () => {
    const user1 = {
      cells: [
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
      ],
    };
    const user2 = {
      cells: [
        { ID: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
        { ID: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "tue-0730", users: ["Charlie"], numPeople: 1 },
        { ID: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
        { ID: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
        { ID: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
      ],
    });
  });

  test("Users have cells with matching numPeople (min 5) and overlapping IDs", () => {
    const user1 = {
      cells: [
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        {
          ID: "tue-0730",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        {
          ID: "tue-0730",
          users: ["Frank", "Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 6,
        },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople (min 5) and overlapping IDs (reordered)", () => {
    const user1 = {
      cells: [
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
      ],
    };
    const user2 = {
      cells: [
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
        {
          ID: "tue-0730",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        {
          ID: "tue-0730",
          users: ["Frank", "Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 6,
        },
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        { ID: "tue-1000", users: ["Eve"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople (min 5) and unique cells", () => {
    const user1 = {
      cells: [
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
      ],
    };
    const user2 = {
      cells: [
        {
          ID: "tue-1000",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
        { ID: "fri-1000", users: ["Olivia"], numPeople: 1 },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
        {
          ID: "tue-1000",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
        { ID: "fri-1000", users: ["Olivia"], numPeople: 1 },
      ],
    });
  });

  test("Users have cells with matching numPeople (min 5) and overlapping IDs (different order)", () => {
    const user1 = {
      cells: [
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
      ],
    };
    const user2 = {
      cells: [
        { ID: "fri-1000", users: ["Olivia"], numPeople: 1 },
        {
          ID: "tue-1000",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
      ],
    };
    expect(combineObjects(user1, user2)).toEqual({
      cells: [
        { ID: "tue-0730", users: ["Frank"], numPeople: 1 },
        {
          ID: "mon-0730",
          users: ["Alice", "Bob", "Charlie", "David", "Eve"],
          numPeople: 5,
        },
        { ID: "fri-1000", users: ["Olivia"], numPeople: 1 },
        {
          ID: "tue-1000",
          users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
          numPeople: 5,
        },
      ],
    });
  });
});
