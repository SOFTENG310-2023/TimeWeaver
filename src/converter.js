function converter(json, user) {
  const obj = JSON.parse(json);
  console.log(obj);
  console.log(obj.events);
  const newObj = [];
  for (const event of obj.events) {
    // const event : obj.events
    console.log(event);
    console.log(event.start);
    const DayID = dayID(event.start);
    const startTimeID = timeID(event.start);
    const endTimeID = timeID(event.end);
    const eventLength = numThirties(endTimeID) - numThirties(startTimeID);
    let dif = 0;
    for (let i = 0; i < eventLength; i++) {
      if (
        (startTimeID[2] === "3" && i % 2 === 0) ||
        (startTimeID[2] === "0" && i % 2 !== 0)
      ) {
        const newCell = {
          id: `${DayID}-${String(parseInt(startTimeID) + dif)}`,
          users: [user],
          numPeople: 1,
        };
        newObj.push(newCell);
        dif = dif + 30;
      } else {
        const newCell = {
          id: `${DayID}-${String(parseInt(startTimeID) + dif)}`,
          users: [user],
          numPeople: 1,
        };
        newObj.push(newCell);
        dif = dif + 70;
      }
    }
  }
  return JSON.stringify({ cells: newObj });
}

function timeID(eventTime) {
  const array = eventTime.split(" ");
  eventTime = array[1].replace(":", "");
  if (array[2] === "PM") {
    return toString(parseInt(eventTime) + 1200);
  }
  return eventTime;
}

function dayID(day) {
  return day.slice(0, 3).toLowerCase();
}

function numThirties(eventTime) {
  return (
    (parseInt(eventTime.slice(0, 2)) * 60 + parseInt(eventTime.slice(2, 4))) /
    30
  );
}

module.exports = converter;
