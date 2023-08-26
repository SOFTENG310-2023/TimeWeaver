const combineObjects = require("../combine");
describe("combineObjects", () => {
    test("Both users have empty cells", () => {
        const user1 = { cells: [] };
        const user2 = { cells: [] };
        expect(combineObjects(user1, user2)).toEqual({ cells: [] });
    });

    test("One user has empty cells, the other has cells", () => {
        const user1 = { cells: [] };
        const user2 = {
            cells: [{ id: "mon-0730", users: ["Alice"], numPeople: 1 }],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [{ id: "mon-0730", users: ["Alice"], numPeople: 1 }],
        });
    });

    test("Both users have cells with unique ids", () => {
        const user1 = {
            cells: [{ id: "mon-0730", users: ["Alice"], numPeople: 1 }],
        };
        const user2 = {
            cells: [{ id: "tue-0730", users: ["Bob"], numPeople: 1 }],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice"], numPeople: 1 },
                { id: "tue-0730", users: ["Bob"], numPeople: 1 },
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
                { id: "mon-0730", users: ["Alice"], numPeople: 1 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                { id: "mon-0730", users: ["Bob"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
            ],
        });
    });

    test("Both users have overlapping and unique cells", () => {
        const user1 = {
            cells: [
                { id: "mon-0730", users: ["Alice"], numPeople: 1 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                { id: "mon-0730", users: ["Bob"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
                { id: "fri-1000", users: ["Eve"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
                { id: "fri-1000", users: ["Eve"], numPeople: 1 },
            ],
        });
    });

    test("Both users have empty cells and undefined values", () => {
        const user1 = {
            cells: [
                { id: "mon-0730", users: ["Alice"], numPeople: 1 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                { id: "mon-0730", users: ["Bob"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "tue-1000", users: ["David"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople and overlapping ids", () => {
        const user1 = {
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                { id: "tue-0730", users: ["David", "Eve"], numPeople: 2 },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                {
                    id: "tue-0730",
                    users: ["Charlie", "David", "Eve"],
                    numPeople: 3,
                },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople and overlapping ids (reordered)", () => {
        const user1 = {
            cells: [
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
            ],
        };
        const user2 = {
            cells: [
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
                { id: "tue-0730", users: ["David", "Eve"], numPeople: 2 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                {
                    id: "tue-0730",
                    users: ["Charlie", "David", "Eve"],
                    numPeople: 3,
                },
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople and unique cells", () => {
        const user1 = {
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                { id: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
                { id: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
                { id: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
            ],
        });
    });

    test("Users have cells with matching numPeople and overlapping ids (different order)", () => {
        const user1 = {
            cells: [
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
            ],
        };
        const user2 = {
            cells: [
                { id: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
                { id: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "tue-0730", users: ["Charlie"], numPeople: 1 },
                { id: "mon-0730", users: ["Alice", "Bob"], numPeople: 2 },
                { id: "fri-1000", users: ["Frank", "Grace"], numPeople: 2 },
                { id: "tue-1000", users: ["David", "Eve"], numPeople: 2 },
            ],
        });
    });

    test("Users have cells with matching numPeople (min 5) and overlapping ids", () => {
        const user1 = {
            cells: [
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                {
                    id: "tue-0730",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                {
                    id: "tue-0730",
                    users: [
                        "Frank",
                        "Grace",
                        "Hannah",
                        "Isaac",
                        "Jack",
                        "Kelly",
                    ],
                    numPeople: 6,
                },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople (min 5) and overlapping ids (reordered)", () => {
        const user1 = {
            cells: [
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
            ],
        };
        const user2 = {
            cells: [
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
                {
                    id: "tue-0730",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                {
                    id: "tue-0730",
                    users: [
                        "Frank",
                        "Grace",
                        "Hannah",
                        "Isaac",
                        "Jack",
                        "Kelly",
                    ],
                    numPeople: 6,
                },
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                { id: "tue-1000", users: ["Eve"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople (min 5) and unique cells", () => {
        const user1 = {
            cells: [
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
            ],
        };
        const user2 = {
            cells: [
                {
                    id: "tue-1000",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
                { id: "fri-1000", users: ["Olivia"], numPeople: 1 },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
                {
                    id: "tue-1000",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
                { id: "fri-1000", users: ["Olivia"], numPeople: 1 },
            ],
        });
    });

    test("Users have cells with matching numPeople (min 5) and overlapping ids (different order)", () => {
        const user1 = {
            cells: [
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
            ],
        };
        const user2 = {
            cells: [
                { id: "fri-1000", users: ["Olivia"], numPeople: 1 },
                {
                    id: "tue-1000",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
            ],
        };
        expect(combineObjects(user1, user2)).toEqual({
            cells: [
                { id: "tue-0730", users: ["Frank"], numPeople: 1 },
                {
                    id: "mon-0730",
                    users: ["Alice", "Bob", "Charlie", "David", "Eve"],
                    numPeople: 5,
                },
                { id: "fri-1000", users: ["Olivia"], numPeople: 1 },
                {
                    id: "tue-1000",
                    users: ["Grace", "Hannah", "Isaac", "Jack", "Kelly"],
                    numPeople: 5,
                },
            ],
        });
    });
});
