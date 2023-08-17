function combineObjects(user1, user2) {
    const result = {
        cells: [],
    };
    for (let i = 0; i < user1.cells.length; i++) {
        const template = {
            ID: "",
            users: [""],
            numPeople: 0,
        };
        for (let j = 0; j < user2.cells.length; j++) {
            if (user1.cells[i] !== undefined && user2.cells[j] !== undefined) {
                if (user1.cells[i].ID === user2.cells[j].ID) {
                    template.users = [
                        ...user1.cells[i].users,
                        ...user2.cells[j].users,
                    ];
                    template.ID = user1.cells[i].ID;
                    template.numPeople =
                        user1.cells[i].numPeople + user2.cells[j].numPeople;
                    result.cells.push(template);
                    delete user1.cells[i];
                    delete user2.cells[j];
                }
            }
        }
        if (user1.cells[i] !== undefined) {
            template.users = user1.cells[i].users;
            template.ID = user1.cells[i].ID;
            template.numPeople = user1.cells[i].numPeople;
            result.cells.push(template);
        }
    }
    for (let i = 0; i < user2.cells.length; i++) {
        const template = {
            ID: "",
            users: [""],
            numPeople: 0,
        };
        if (user2.cells[i] !== undefined) {
            template.users = user2.cells[i].users;
            template.ID = user2.cells[i].ID;
            template.numPeople = user2.cells[i].numPeople;
            result.cells.push(template);
        }
    }
    return result;
}
