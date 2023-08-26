const {
  selectCurrentWeek,
  getCurrentDateInfo,
  isInCurrentWeek,
} = require("../selectCurrentWeek");

// Edge cases are hard to detect since the date is dynamically generated based on the current date,
// So we just test the previous and next week's date
const date = new Date();
const OneWeekFromNow = new Date(date.getTime() + 7 * 60 * 60 * 24 * 1000);
const OneWeekAgo = new Date(date.getTime() - 7 * 60 * 60 * 24 * 1000);

const currentInput = `* ${date.getDate()}** ${new Intl.DateTimeFormat("en-US", {
  month: "long",
}).format(date)}`;
const futureInput = `* ${OneWeekFromNow.getDate()}** ${new Intl.DateTimeFormat(
  "en-US",
  { month: "long" },
).format(OneWeekFromNow)}`;
const pastInput = `* ${OneWeekAgo.getDate()}** ${new Intl.DateTimeFormat(
  "en-US",
  { month: "long" },
).format(OneWeekAgo)}`;

describe("getCurrentDateInfo", () => {
  test("Correctly handles sets up Date Information", () => {
    const resp = getCurrentDateInfo();

    const current = new Date();

    const day = current.getDay();
    const month = current.getMonth();

    const days = resp.map((date) => date.getDay());
    const months = resp.map((date) => date.getMonth());

    // Since the the time portion of the date is based on current time, we only compare the Date and Month
    expect(days.includes(day)).toBe(true);
    expect(months.includes(month)).toBe(true);

    // Monday is placed at the end of the Array (order in array not important)
    expect(days[0]).toBe(days[6] + 1); // Tuesday = Monday + 1
    expect(days[5]).toBe(days[6] + 6); // Sunday = Monday + 6
  });
});

describe("isInCurrentWeek", () => {
  test("places the returns true for the current day", () => {
    expect(isInCurrentWeek(currentInput)).toBe(true);
    expect(isInCurrentWeek(futureInput)).toBe(false);
    expect(isInCurrentWeek(pastInput)).toBe(false);
  });
});

const events = [
  {
    start: currentInput,
    end: currentInput,
  },
  {
    start: futureInput,
    end: currentInput,
  },
  {
    start: pastInput,
    end: futureInput,
  },
];

describe("selectCurrentWeek", () => {
  test("places the returns true for the current day", () => {
    expect(selectCurrentWeek(events)).toStrictEqual([
      {
        start: currentInput,
        end: currentInput,
      },
    ]);
  });
});
