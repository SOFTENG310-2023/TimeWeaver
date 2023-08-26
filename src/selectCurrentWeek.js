/** Inspiration: https://stackoverflow.com/questions/35088088/javascript-for-getting-the-previous-monday */
function getCurrentDateInfo() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday = new Date();
  if (date.getDay() == 0) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }

  let dates = [prevMonday];

  for (let i = 1; i < 7; +i++) {
    dates.push(new Date(prevMonday.getTime() + i * 60 * 60 * 24 * 1000));
  }

  const currentDays = dates.map((date) => date.getDay());
  const currentMonth = dates.map((date) => date.getMonth());
  const currentDate = dates.map((date) => date.getDate());

  console.log(currentDays);
  console.log(currentMonth);
  console.log(currentDate);

  return dates;
}

const months = new Map();

function isInCurrentWeek(date) {
  console.log(date);
  const date2 = date.split(" ");

  const month = date2[2];
  const day = date2[1].slice(0, -2);

  const currentWeekDates = getCurrentDateInfo();

  const match = currentWeekDates.map((date2) => {
    const month2 = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date2,
    );
    const day2 = date2.getDate();

    if (month === month2 && parseInt(day) === day2) {
      console.log(day);
      console.log(month);
      return true;
    }

    return false;
  });
  return match.includes(true);
}

module.exports = isInCurrentWeek;
