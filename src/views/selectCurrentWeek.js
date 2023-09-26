/**
 * Gets the Date information for the current Week, starting at the most recent monday
 * Significant Inspiration from https://stackoverflow.com/questions/35088088/javascript-for-getting-the-previous-monday  (Modified)
 * License https://creativecommons.org/licenses/by-sa/3.0/
 * @returns an Array of Date Objects representing the days
 */
function getCurrentDateInfo() {
  const date = new Date();
  const day = date.getDay();
  let firstMonday = new Date();
  if (day == 0) {
    firstMonday = new Date(date.getTime() - 6 * (60 * 60 * 24 * 1000));
  } else if (day != 1) {
    firstMonday = new Date(date.getTime() - (day - 1) * (60 * 60 * 24 * 1000));
  }

  let dates = [firstMonday];

  for (let i = 1; i < 7; i++) {
    dates.push(new Date(firstMonday.getTime() + i * 60 * 60 * 24 * 1000));
  }

  return dates;
}

/**
 * Checks whether a given date is in the current 7 day range
 * @param {string} date in the format "Friday 20th October 4:00 PM"
 * @returns a boolean value based on whether the date is in the current Date Range
 */
function isInCurrentWeek(date) {
  const dateSections = date.split(" ");

  const month = dateSections[2];
  const day = dateSections[1].slice(0, -2);
  const currentWeekDates = getCurrentDateInfo();

  const match = currentWeekDates.map((date2) => {
    const month2 = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date2,
    );
    const day2 = date2.getDate();

    // Date comparison is only done by comparing month and day
    if (month === month2 && parseInt(day) === day2) {
      return true;
    }

    return false;
  });
  return match.includes(true);
}

/**
 * Filters events based on whether they begin and end in the current week
 * @param {Array} events array of event objects, each with a start and end date value in string format
 * @returns the same list with the events that don't have both their start and end in the current week filtered out
 */
function selectCurrentWeek(events) {
  return events.filter(
    (x) => isInCurrentWeek(x.start) && isInCurrentWeek(x.end),
  );
}

module.exports = { selectCurrentWeek, isInCurrentWeek, getCurrentDateInfo };
