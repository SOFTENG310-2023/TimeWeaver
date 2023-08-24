function converter(json, user) {
  const obj = JSON.parse(json);
  const newObj = [];
  for (const event of obj.events) {
    const dayID = getDayID(event.start);
    const startTimeID = getTimeID(event.start);
    const endTimeID = getTimeID(event.end);
    const eventLength = numThirties(endTimeID) - numThirties(startTimeID);
    let timeID = startTimeID;
    for (let i = 0; i < eventLength; i++) {
      const newCell = {
        id: `${dayID}-${timeID}`,
        users: [user],
        numPeople: 1,
      };
      newObj.push(newCell);

      const hours = parseInt(timeID.substring(0, 2));
      const minutes = parseInt(timeID.substring(2, 4));

      if (minutes === 30) {
        if (hours < 10) {
          timeID = `0${hours + 1}00`;
        } else {
          timeID = `${hours + 1}00`;
        }
      } else {
        if (hours < 10) {
          timeID = `0${hours}30`;
        } else {
          timeID = `${hours}30`;
        }
      }
    }
  }
  return JSON.stringify({ cells: newObj });
}

function getTimeID(eventTime) {
  const array = eventTime.split(" ");
  eventTime = array[1].replace(":", "");
  if (array[2] === "PM") {
    return (parseInt(eventTime) + 1200).toString();
  }
  return eventTime;
}

function getDayID(day) {
  const array = day.split(" ");
  return day.slice(0, 3).toLowerCase();
}

function numThirties(eventTime) {
  return (
    (parseInt(eventTime.slice(0, 2)) * 60 + parseInt(eventTime.slice(2, 4))) /
    30
  );
}

module.exports = converter;
