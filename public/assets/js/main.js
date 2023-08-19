// Required libraries for HTTP requests, file operations, and iCal parsing
const axios = require('axios');
const fs = require('fs');
const ical = require('ical.js');

/**
 * Fetches iCal data from a given URL and parses it into an ical.Component for further processing.
 * @param {string} url - The URL of the iCal data.
 * @returns {Promise<ical.Component>} - Parsed iCal data.
 */
async function fetchDataAndParse(url) {
    const response = await axios.get(url);
    const jcalData = ical.parse(response.data);
    return new ical.Component(jcalData);
}

/**
 * Processes a single event component to handle recurring events and single events.
 * @param {ical.Component} eventComp - An individual event component.
 * @returns {Array} - Array of events generated from the event component.
 */
function processEvent(eventComp) {
    const summary = eventComp.getFirstPropertyValue('summary');
    let start = eventComp.getFirstPropertyValue('dtstart').toJSDate();
    let end = eventComp.getFirstPropertyValue('dtend').toJSDate();
    const rrule = eventComp.getFirstPropertyValue('rrule');
    const events = [];

    // If the event is recurring, generate all occurrences up to the specified end date
    if (rrule) {
        const untilDate = rrule.until ? rrule.until.toJSDate() : null;
        while (start <= untilDate) {
            events.push(createEvent(summary, start, end));

            // Currently only supports weekly recurring events.           
            if (rrule.freq === "WEEKLY") {
                start = addWeek(start);
                end = addWeek(end);
            }
        }
    } else {
        // If it's not recurring, just add the single event
        events.push(createEvent(summary, start, end));
    }

    return events;
}

/**
 * Creates an event object with formatted dates.
 * @param {string} summary - Event summary.
 * @param {Date} start - Start time of the event.
 * @param {Date} end - End time of the event.
 * @returns {Object} - Formatted event object.
 */
function createEvent(summary, start, end) {
    return {
        summary: summary,
        start: formatEventDate(start),
        end: formatEventDate(end)
    };
}

/**
 * Adds a week to the provided date, for handling weekly recurring events
 * @param {Date} date - Original date.
 * @returns {Date} - Date after adding one week.
 */
function addWeek(date) {
    return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}

/**
 * Writes the parsed events to a JSON file.
 * @param {Array} events - Array of parsed events.
 */
function writeEventsToFile(events) {
    fs.writeFileSync('JIFD.json', JSON.stringify(events, null, 4), 'utf8');
}

/**
 * Main parsing function: fetches, processes, and writes the iCal events to a file.
 * @param {string} url - The URL of the iCal data.
 * @returns {Promise<string>} - Message indicating completion.
 */
async function parse(url) {
    try {
        const comp = await fetchDataAndParse(url);
        let allEvents = [];

        // Process each event component and accumulate results
        comp.getAllSubcomponents('vevent').forEach(eventComp => {
            const eventsFromComp = processEvent(eventComp);
            allEvents = [...allEvents, ...eventsFromComp];
        });
        
        writeEventsToFile(allEvents);

        return "Events written to eventsOutput.json";
    } catch (error) {
        console.error("Error fetching or processing iCal data:", error);
    }
}

/**
 * Formats the provided date into a more human-readable string.
 * @param {Date} date - Date to be formatted.
 * @returns {string} - Formatted date string.
 */
function formatEventDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return 'st';
            case 2:  return 'nd';
            case 3:  return 'rd';
            default: return 'th';
        }
    };
    
    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[date.getMonth()];
    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();

    return `${dayName} ${dayOfMonth}${nth(dayOfMonth)} ${monthName} ${hours}:${minutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
}

// The main execution starts here. We fetch the iCal URL from command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Usage: node yourScriptName.js <iCal_URL>');
    process.exit(1);
}

const icalURL = args[0];
parse(icalURL).then(data => {
    console.log(JSON.stringify(data, null, 4));
});

