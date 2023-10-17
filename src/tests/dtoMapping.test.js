const {
  selectedSlotConverter,
} = require("../helpers/dto_mapping/calendarMapping");

describe("Unit tests for dtoMapping function", () => {
  test("Time slot converter 1", () => {
    const slot = {
      day: "Monday",
      timeslot: "07:30:00",
    };
    expect(selectedSlotConverter(slot)).toBe("mon-0730");
  });
});
