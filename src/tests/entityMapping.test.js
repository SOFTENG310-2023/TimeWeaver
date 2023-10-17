const {
  selectedSlotIDConverter,
} = require("../helpers/entity_mapping/calendarMapping");

describe("Unit tests for calendar entity mapping functions", () => {
  test("Time slot to HTML ID Converter 1", () => {
    const slot = {
      day: "Monday",
      timeslot: "07:30:00",
    };
    expect(selectedSlotIDConverter(slot)).toBe("mon-0730");
  });
});
