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

newjson = converter(json);

function converter(json, user) {
  const obj = JSON.parse(json);
  const newObj = [];
  for (const event in obj.events) {
    const startDayID = dayID(event.start);
    const startTimeID = timeID(event.start);
    const endDayID = dayID(event.end);
    const endTimeID = timeID(event.end);
    const eventLength = numThirties(endTimeID) - numThirties(startTimeID);
    const dif = 0;
    for (i in Range(eventLength)) {
      if (
        (startTimeID[2] === "3" && i % 2 === 0) ||
        (startTimeID[2] === "0" && i % 2 !== 0)
      ) {
        const newCell = {
          id: startDayID + toString(parseInt(startTimeID) + dif),
          users: [user],
          numPeople: 1,
        };
        newObj.push(newCell);
        dif = dif + 30;
      } else {
        const newCell = {
          id: startDayID + toString(parseInt(startTimeID) + dif),
          users: [user],
          numPeople: 1,
        };
        newObj.push(newCell);
        dif = dif + 70;
      }
    }
  }
  return newJSON;
}

function timeID(time) {
  const array = time.split(" ");
  const time = array[1].replace(":", "");
  if (array[2] === "PM") {
    return toString(parseInt(time) + 1200);
  }
  return time;
}

function dayID(day) {
  const array = day.split(" ");
  return day.split(0, 3).toLowerCase();
}

function numThirties(time) {
  return (parseInt(time.split(0, 2)) * 60 + parseInt(time.split(2, 4))) / 30;
}
