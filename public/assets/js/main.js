const json = {
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
      ID: "mon-0730",
      users: ["Alex"],
      numPeople: 1,
    },
    {
      ID: "mon-0800",
      users: ["Alex"],
      numPeople: 1,
    },
  ],
};

newjson = converter(json);

function converter(json, user) {
  const obj = JSON.parse(json);
  for (const event in obj.events) {
    const startArray = event.start.split(" ");
    const dayID = event.start.split(0, 3).toLowerCase();
    const endArray = event.end.split(" ");

    for (i in Range(eventLength)) {
      const newCell = {
        ID: dayID,
        users: [user],
        numPeople: 1,
      };
    }
  }

  return newJSON;
}
