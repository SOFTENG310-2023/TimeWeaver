// external libraries are required for parsing ical file and processing the url link
// const axios = require("axios");
// const fs = require("fs");
const ical = require("ical.js");

// async function fetchDataAndParse(url) {
//   const response = await axios.get(url);
//   const jcalData = ical.parse(response.data);
//   return new ical.Component(jcalData);
// }

// for handling events that are recurring
function processEvent(eventComp) {
  const summary = eventComp.getFirstPropertyValue("summary");
  let start = eventComp.getFirstPropertyValue("dtstart").toJSDate();
  let end = eventComp.getFirstPropertyValue("dtend").toJSDate();
  const rrule = eventComp.getFirstPropertyValue("rrule");
  const events = [];

  if (rrule) {
    const untilDate = rrule.until ? rrule.until.toJSDate() : null;
    const count = rrule.count || Infinity;

    let iterations = 0;

    while ((!untilDate || start <= untilDate) && iterations < count) {
      events.push(createEvent(summary, start, end));

      if (rrule.freq === "WEEKLY") {
        start = addWeek(start);
        end = addWeek(end);
      }

      iterations++;
    }
  } else {
    events.push(createEvent(summary, start, end));
  }

  return events;
}

function createEvent(summary, start, end) {
  return {
    summary: summary,
    start: formatEventDate(start),
    end: formatEventDate(end),
  };
}

function addWeek(date) {
  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}

// function writeEventsToFile(events) {
//   fs.writeFileSync(
//     "eventsOutput.json",
//     JSON.stringify(events, null, 4),
//     "utf8",
//   );
// }

async function icalToJSON(json) {
  try {
    //const comp = await fetchDataAndParse(url);
    let allEvents = [];

    const jcalData = ical.parse(json);
    const comp = new ical.Component(jcalData);

    comp.getAllSubcomponents("vevent").forEach((eventComp) => {
      const eventsFromComp = processEvent(eventComp);
      allEvents = [...allEvents, ...eventsFromComp];
    });

    // writeEventsToFile(allEvents);
    //return "Events written to eventsOutput.json";
    return allEvents;
  } catch (error) {
    new Error("Error fetching or processing iCal data");
  }
}

// the format in which date is stored in jCAL component is not easy to comprehend
function formatEventDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayName = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];
  let hours = date.getHours();
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

  const amOrPm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12; // midnight is 12 AM
  }

  return `${dayName} ${dayOfMonth}${nth(
    dayOfMonth,
  )} ${monthName} ${hours}:${minutes} ${amOrPm}`;
}

// get the URL from command line arguments
// if (require.main === module) {
//   const args = process.argv.slice(2);

//   if (args.length !== 1) {
//     console.error("Usage: node yourScriptName.js <iCal_URL>");
//     process.exit(1);
//   }

//   const icalURL = args[0];
//   icalToJSON(icalURL).then((data) => {
//     console.log(JSON.stringify(data, null, 4));
//   });
// }

module.exports = { icalToJSON, formatEventDate };
