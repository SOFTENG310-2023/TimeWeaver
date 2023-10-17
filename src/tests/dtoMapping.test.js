const {
  selectedSlotIDConverter,
} = require("../helpers/dto_mapping/calendarMapping");

describe("Unit tests for dtoMapping function", () => {
  test("Time slot to HTML ID Converter 1", () => {
    const slot = {
      day: "Monday",
      timeslot: "07:30:00",
    };
    expect(selectedSlotConverter(slot)).toBe("mon-0730");
  });
});
