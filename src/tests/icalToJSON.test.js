const axios = require("axios");
const nock = require("nock");
const fs = require("fs");
const {
  getICalFromURL,
  icalToJSON,
  urlToJSON,
  formatEventDate,
} = require("../helpers/icalToJSON");

describe("icalToJSON tests", () => {
  test("Format ical dates", () => {
    const mockData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The University of Auckland//UoACal 2.0//EN
METHOD:PUBLISH
X-WR-CALNAME:UoA Timetable
X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140808NZST-0411Mlu0gh@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Managing Projects & Innovation
DTSTART;TZID=Pacific/Auckland:20230303T100000 
DTEND;TZID=Pacific/Auckland:20230303T110000 
LOCATION:260-098
SUMMARY:ENGGEN 303
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    expect(result[0].start).toBe("Friday 3rd March 10:00 AM");
    expect(result[0].end).toBe("Friday 3rd March 11:00 AM");
  });

  test("Should correctly convert hours to 12-hour AM/PM format", () => {
    const mockData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TestCorp//TestApp 1.0//EN    
BEGIN:VEVENT
UID:afternoonEvent@test.auckland.ac.nz
DTSTART;TZID=Pacific/Auckland:20230501T143000
DTEND;TZID=Pacific/Auckland:20230501T153000
SUMMARY:Afternoon Event
END:VEVENT
BEGIN:VEVENT
UID:midnightEvent@test.auckland.ac.nz
DTSTART;TZID=Pacific/Auckland:20230502T000000
DTEND;TZID=Pacific/Auckland:20230502T010000
SUMMARY:Midnight Event
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    // Test for the afternoon event
    expect(result[0].summary).toBe("Afternoon Event");
    expect(result[0].start).toBe("Monday 1st May 2:30 PM");
    expect(result[0].end).toBe("Monday 1st May 3:30 PM");

    // Test for the midnight event
    expect(result[1].summary).toBe("Midnight Event");
    expect(result[1].start).toBe("Tuesday 2nd May 12:00 AM");
    expect(result[1].end).toBe("Tuesday 2nd May 1:00 AM");
  });

  test("Detect a simple non-recurring event", () => {
    const mockData = `
BEGIN:VCALENDAR
BEGIN:VEVENT
UID:singleEvent@test.auckland.ac.nz
DESCRIPTION:Single Test Event
DTSTART;TZID=Pacific/Auckland:20230520T140000
DTEND;TZID=Pacific/Auckland:20230520T150000
SUMMARY:Single Event
END:VEVENT
END:VCALENDAR`;
    const result = icalToJSON(mockData);
    expect(result.length).toBe(1);
    expect(result[0].summary).toBe("Single Event");
  });

  test("Detect multiple non-recurring events", () => {
    const mockData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TestCorp//TestApp 1.0//EN
METHOD:PUBLISH
X-WR-CALNAME:Test Calendar
X-WR-CALDESC:Description of Test Calendar
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140809NZST-043749test1@test.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:First Test Event
DTSTART;TZID=Pacific/Auckland:20230501T100000
DTEND;TZID=Pacific/Auckland:20230501T110000
LOCATION:101-100
SUMMARY:Event 1
END:VEVENT
BEGIN:VEVENT
UID:20230817T140810NZST-043750test2@test.auckland.ac.nz
DTSTAMP:20230817T020809Z
DESCRIPTION:Second Test Event
DTSTART;TZID=Pacific/Auckland:20230502T140000
DTEND;TZID=Pacific/Auckland:20230502T150000
LOCATION:102-100
SUMMARY:Event 2
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    expect(result.length).toBe(2);
  });

  test("Detect a single, recurring event", () => {
    const mockData = `
BEGIN:VCALENDAR
BEGIN:VEVENT
UID:weeklyRecur10Weeks@test.auckland.ac.nz
DESCRIPTION:Weekly Recurring Test Event for 10 weeks
DTSTART;TZID=Pacific/Auckland:20230404T100000
DTEND;TZID=Pacific/Auckland:20230404T110000
RRULE:FREQ=WEEKLY;UNTIL=20230615T100000
SUMMARY:Weekly Recurring Event for 11 weeks
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    expect(result.length).toBe(11);
  });

  test("Verify that the final event in a recurring series ends exactly on the specified UNTIL date", () => {
    const mockData = `
BEGIN:VCALENDAR
BEGIN:VEVENT
UID:weeklyRecur10WeeksEndCheck@test.auckland.ac.nz
DESCRIPTION:Weekly Recurring Test Event for 10 weeks with End Date Check
DTSTART;TZID=Pacific/Auckland:20230404T100000
DTEND;TZID=Pacific/Auckland:20230404T110000
RRULE:FREQ=WEEKLY;UNTIL=20230615T100000
SUMMARY:Weekly Recurring Event for 11 weeks with End Date Check
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    expect(result[result.length - 1].end).toBe("Tuesday 13th June 11:00 AM");
  });

  test("Parse a single, non-recurring event", () => {
    const mockData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The University of Auckland//UoACal 2.0//EN
METHOD:PUBLISH
X-WR-CALNAME:UoA Timetable
X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Operating Systems
DTSTART;TZID=Pacific/Auckland:20230502T140000
DTEND;TZID=Pacific/Auckland:20230502T150000
LOCATION:106-100
SUMMARY:SOFTENG 370
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);
    expect(result.length).toBe(1); // Expect 1 occurrence of the event
    expect(result[0].summary).toBe("SOFTENG 370");
    expect(result[0].start).toBe("Tuesday 2nd May 2:00 PM");
    expect(result[0].end).toBe("Tuesday 2nd May 3:00 PM");
  });

  test("Parse multiple non-recurring single events", () => {
    const mockData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The University of Auckland//UoACal 2.0//EN
METHOD:PUBLISH
X-WR-CALNAME:UoA Timetable
X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf1@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Operating Systems
DTSTART;TZID=Pacific/Auckland:20230502T140000
DTEND;TZID=Pacific/Auckland:20230502T150000
LOCATION:106-100
SUMMARY:SOFTENG 370
END:VEVENT
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf2@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Web Development
DTSTART;TZID=Pacific/Auckland:20230503T100000
DTEND;TZID=Pacific/Auckland:20230503T110000
LOCATION:205-100
SUMMARY:SOFTENG 250
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);

    expect(result.length).toBe(2);
    expect(result[0].summary).toBe("SOFTENG 370");
    expect(result[0].start).toBe("Tuesday 2nd May 2:00 PM");
    expect(result[0].end).toBe("Tuesday 2nd May 3:00 PM");

    expect(result[1].summary).toBe("SOFTENG 250");
    expect(result[1].start).toBe("Wednesday 3rd May 10:00 AM");
    expect(result[1].end).toBe("Wednesday 3rd May 11:00 AM");
  });

  test("Parse a single weekly recurring event", () => {
    const mockData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The University of Auckland//UoACal 2.0//EN
METHOD:PUBLISH
X-WR-CALNAME:UoA Timetable
X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf1@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Web Development Recurring Lecture
DTSTART;TZID=Pacific/Auckland:20230502T100000
DTEND;TZID=Pacific/Auckland:20230502T110000
RRULE:FREQ=WEEKLY;UNTIL=20230523T110000Z
LOCATION:205-101
SUMMARY:SOFTENG 250 Recurring
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);

    expect(result.length).toBe(4);
    expect(result[0].summary).toBe("SOFTENG 250 Recurring");
    expect(result[0].start).toBe("Tuesday 2nd May 10:00 AM");
    expect(result[0].end).toBe("Tuesday 2nd May 11:00 AM");

    expect(result[1].summary).toBe("SOFTENG 250 Recurring");
    expect(result[1].start).toBe("Tuesday 9th May 10:00 AM");
    expect(result[1].end).toBe("Tuesday 9th May 11:00 AM");

    expect(result[2].summary).toBe("SOFTENG 250 Recurring");
    expect(result[2].start).toBe("Tuesday 16th May 10:00 AM");
    expect(result[2].end).toBe("Tuesday 16th May 11:00 AM");

    expect(result[3].summary).toBe("SOFTENG 250 Recurring");
    expect(result[3].start).toBe("Tuesday 23rd May 10:00 AM");
    expect(result[3].end).toBe("Tuesday 23rd May 11:00 AM");
  });

  test("Parse multiple weekly recurring events", () => {
    const mockData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The University of Auckland//UoACal 2.0//EN
METHOD:PUBLISH
X-WR-CALNAME:UoA Timetable
X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz
X-WR-TIMEZONE:Pacific/Auckland
X-PUBLISHED-TTL:PT12H
BEGIN:VTIMEZONE
TZID:Pacific/Auckland
X-LIC-LOCATION:Pacific/Auckland
BEGIN:STANDARD
DTSTART:20240407T030000
TZOFFSETFROM:+1300
TZOFFSETTO:+1200
TZNAME:NZST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20230924T020000
TZOFFSETFROM:+1200
TZOFFSETTO:+1300
TZNAME:NZDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf1@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Web Development Recurring Lecture
DTSTART;TZID=Pacific/Auckland:20230502T100000
DTEND;TZID=Pacific/Auckland:20230502T110000
RRULE:FREQ=WEEKLY;UNTIL=20230516T110000Z
LOCATION:205-101
SUMMARY:SOFTENG 250 Recurring
END:VEVENT
BEGIN:VEVENT
UID:20230817T140808NZST-043749nevf2@uoacal.auckland.ac.nz
DTSTAMP:20230817T020808Z
DESCRIPTION:Machine Learning Recurring Lecture
DTSTART;TZID=Pacific/Auckland:20230502T120000
DTEND;TZID=Pacific/Auckland:20230502T130000
RRULE:FREQ=WEEKLY;UNTIL=20230516T130000Z
LOCATION:205-102
SUMMARY:SOFTENG 350 Recurring
END:VEVENT
END:VCALENDAR`;

    const result = icalToJSON(mockData);

    expect(result[0].summary).toBe("SOFTENG 250 Recurring");
    expect(result[0].start).toBe("Tuesday 2nd May 10:00 AM");
    expect(result[0].end).toBe("Tuesday 2nd May 11:00 AM");

    expect(result[1].summary).toBe("SOFTENG 250 Recurring");
    expect(result[1].start).toBe("Tuesday 9th May 10:00 AM");
    expect(result[1].end).toBe("Tuesday 9th May 11:00 AM");

    expect(result[2].summary).toBe("SOFTENG 250 Recurring");
    expect(result[2].start).toBe("Tuesday 16th May 10:00 AM");
    expect(result[2].end).toBe("Tuesday 16th May 11:00 AM");

    expect(result[3].summary).toBe("SOFTENG 350 Recurring");
    expect(result[3].start).toBe("Tuesday 2nd May 12:00 PM");
    expect(result[3].end).toBe("Tuesday 2nd May 1:00 PM");

    expect(result[4].summary).toBe("SOFTENG 350 Recurring");
    expect(result[4].start).toBe("Tuesday 9th May 12:00 PM");
    expect(result[4].end).toBe("Tuesday 9th May 1:00 PM");

    expect(result[5].summary).toBe("SOFTENG 350 Recurring");
    expect(result[5].start).toBe("Tuesday 16th May 12:00 PM");
    expect(result[5].end).toBe("Tuesday 16th May 1:00 PM");
  });

  test("icalToJSON should throw an error for invalid iCal data", () => {
    // Mocking an invalid iCal data
    const invalidIcalData = `INVALID:VCALENDAR
INVALIDDATA...`;

    expect(() => {
      icalToJSON(invalidIcalData);
    }).toThrow("Error fetching or processing iCal data");
  });
});
