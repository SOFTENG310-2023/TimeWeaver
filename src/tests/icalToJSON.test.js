const axios = require("axios");
const nock = require("nock");
const fs = require("fs");
const icalToJSON = require("../icalToJSON");

describe.skip("icalToJSON tests", () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("Format iCal dates", async () => {
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

    // Mocking the request
    nock("http://example.com").get("/formatting.ical").reply(200, mockData);

    await icalToJSON("http://example.com/formatting.ical");

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    expect(eventsOutput[0].start).toBe("Friday 3rd March 10:00 AM");
    expect(eventsOutput[0].end).toBe("Friday 3rd March 11:00 AM");
  });

  test("Should correctly convert hours to 12-hour AM/PM format", async () => {
    // Mock data with an event at 14:30 (2:30 PM) and another at 00:00 (12:00 AM)
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

    nock("http://example.com").get("/events.ical").reply(200, mockData);

    await icalToJSON("http://example.com/events.ical");
    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    // Test for the afternoon event
    expect(eventsOutput[0].summary).toBe("Afternoon Event");
    expect(eventsOutput[0].start).toBe("Monday 1st May 2:30 PM");
    expect(eventsOutput[0].end).toBe("Monday 1st May 3:30 PM");

    // Test for the midnight event
    expect(eventsOutput[1].summary).toBe("Midnight Event");
    expect(eventsOutput[1].start).toBe("Tuesday 2nd May 12:00 AM");
    expect(eventsOutput[1].end).toBe("Tuesday 2nd May 1:00 AM");
  });

  test("Detect a single non-recurring event", async () => {
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

    nock("http://example.com").get("/singleEvent.ical").reply(200, mockData);

    await icalToJSON("http://example.com/singleEvent.ical");
    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );
    expect(eventsOutput.length).toBe(1);
  });

  test("Detect multiple non-recurring events", async () => {
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

    nock("http://example.com").get("/twoEvents.ical").reply(200, mockData);

    await icalToJSON("http://example.com/twoEvents.ical");

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );
    expect(eventsOutput.length).toBe(2);
  });

  test("Detect a single recurring event", async () => {
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

    nock("http://example.com")
      .get("/weeklyRecurring10Weeks.ical")
      .reply(200, mockData);

    await icalToJSON("http://example.com/weeklyRecurring10Weeks.ical");
    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );
    expect(eventsOutput.length).toBe(11);
  });

  test("Verify that the final event in a recurring series ends exactly on the specified UNTIL date", async () => {
    // Mock data for a weekly recurring event
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

    nock("http://example.com")
      .get("/weeklyRecurring10WeeksEndCheck.ical")
      .reply(200, mockData);

    await icalToJSON("http://example.com/weeklyRecurring10WeeksEndCheck.ical");
    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );
    expect(eventsOutput[eventsOutput.length - 1].end).toBe(
      "Tuesday 13th June 11:00 AM",
    );
  });

  test("Parse a single, non-recurring event", async () => {
    // Mock data for a single, non-recurring event
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

    // Using nock to mock a successful HTTP request.
    nock("http://example.com").get("/singleEvent.ical").reply(200, mockData);

    await icalToJSON("http://example.com/singleEvent.ical");

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    expect(eventsOutput.length).toBe(1); // Expect 1 occurrence of the event
    expect(eventsOutput[0].summary).toBe("SOFTENG 370");
    expect(eventsOutput[0].start).toBe("Tuesday 2nd May 2:00 PM");
    expect(eventsOutput[0].end).toBe("Tuesday 2nd May 3:00 PM");
  });

  test("Parse multiple non-recurring single events", async () => {
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

    // Using nock to mock a successful HTTP request.
    nock("http://example.com")
      .get("/multipleSingleEvents.ical")
      .reply(200, mockData);

    await icalToJSON("http://example.com/multipleSingleEvents.ical");

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    expect(eventsOutput.length).toBe(2);
    expect(eventsOutput[0].summary).toBe("SOFTENG 370");
    expect(eventsOutput[0].start).toBe("Tuesday 2nd May 2:00 PM");
    expect(eventsOutput[0].end).toBe("Tuesday 2nd May 3:00 PM");

    expect(eventsOutput[1].summary).toBe("SOFTENG 250");
    expect(eventsOutput[1].start).toBe("Wednesday 3rd May 10:00 AM");
    expect(eventsOutput[1].end).toBe("Wednesday 3rd May 11:00 AM");
  });

  test("Parse a single weekly recurring event", async () => {
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

    // Using nock to mock a successful HTTP request.
    nock("http://example.com")
      .get("/weeklyRecurringSingleEvent.ical")
      .reply(200, mockData);

    await icalToJSON("http://example.com/weeklyRecurringSingleEvent.ical");

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    expect(eventsOutput.length).toBe(4);
    expect(eventsOutput[0].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[0].start).toBe("Tuesday 2nd May 10:00 AM");
    expect(eventsOutput[0].end).toBe("Tuesday 2nd May 11:00 AM");

    expect(eventsOutput[1].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[1].start).toBe("Tuesday 9th May 10:00 AM");
    expect(eventsOutput[1].end).toBe("Tuesday 9th May 11:00 AM");

    expect(eventsOutput[2].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[2].start).toBe("Tuesday 16th May 10:00 AM");
    expect(eventsOutput[2].end).toBe("Tuesday 16th May 11:00 AM");

    expect(eventsOutput[3].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[3].start).toBe("Tuesday 23rd May 10:00 AM");
    expect(eventsOutput[3].end).toBe("Tuesday 23rd May 11:00 AM");
  });

  test("Parse multiple weekly recurring events", async () => {
    // Mock data for multiple events that recur weekly for two weeks
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

    // Using nock to mock a successful HTTP request.
    nock("http://example.com")
      .get("/weeklyRecurringMultipleEventsTwoWeeks.ical")
      .reply(200, mockData);

    await icalToJSON(
      "http://example.com/weeklyRecurringMultipleEventsTwoWeeks.ical",
    );

    const eventsOutput = JSON.parse(
      fs.readFileSync("eventsOutput.json", "utf8"),
    );

    expect(eventsOutput[0].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[0].start).toBe("Tuesday 2nd May 10:00 AM");
    expect(eventsOutput[0].end).toBe("Tuesday 2nd May 11:00 AM");

    expect(eventsOutput[1].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[1].start).toBe("Tuesday 9th May 10:00 AM");
    expect(eventsOutput[1].end).toBe("Tuesday 9th May 11:00 AM");

    expect(eventsOutput[2].summary).toBe("SOFTENG 250 Recurring");
    expect(eventsOutput[2].start).toBe("Tuesday 16th May 10:00 AM");
    expect(eventsOutput[2].end).toBe("Tuesday 16th May 11:00 AM");

    expect(eventsOutput[3].summary).toBe("SOFTENG 350 Recurring");
    expect(eventsOutput[3].start).toBe("Tuesday 2nd May 12:00 PM");
    expect(eventsOutput[3].end).toBe("Tuesday 2nd May 1:00 PM");

    expect(eventsOutput[4].summary).toBe("SOFTENG 350 Recurring");
    expect(eventsOutput[4].start).toBe("Tuesday 9th May 12:00 PM");
    expect(eventsOutput[4].end).toBe("Tuesday 9th May 1:00 PM");

    expect(eventsOutput[5].summary).toBe("SOFTENG 350 Recurring");
    expect(eventsOutput[5].start).toBe("Tuesday 16th May 12:00 PM");
    expect(eventsOutput[5].end).toBe("Tuesday 16th May 1:00 PM");
  });
});
