const {
  groupListEntityConverter,
  calendarListEntityConverter,
  selectedSlotEntityConverter,
  selectedSlotIDConverter,
  selectedSlotDBConverter,
} = require("../helpers/entity_mapping/calendarMapping");
const { CalendarGroupEntity } = require("../schemas/domain");
const { groupSchema } = require("../schemas/calendar");
const z = require("zod");

describe("Calendar Mapping", () => {
  test("Databse Converter should convert front-end schema format to database format", () => {
    const selectedSlot = {
      id: "mon-1130",
    };

    const selectedSlotList = selectedSlotDBConverter(selectedSlot);

    expect(selectedSlotList).toEqual({
      day: "Monday",
      timeslot: "11:30:00",
    });
  });

  test("Selected Slot ID converter should convert selected slot to ID", () => {
    const selectedSlot = {
      day: "Monday",
      timeslot: "11:30:00",
    };

    const selectedSlotID = selectedSlotIDConverter(selectedSlot);

    expect(selectedSlotID).toEqual("mon-1130");
  });

  test("Selected slot entity converter should convert selected slot to entity", () => {
    const selectedSlotEntityList = [
      {
        day: "Monday",
        timeslot: "11:30:00",
      },
    ];

    const selectedSlotEntity = selectedSlotEntityConverter(
      selectedSlotEntityList,
      "John",
    );

    expect(selectedSlotEntity).toEqual([
      {
        id: "mon-1130",
        users: ["John"],
        numPeople: 1,
      },
    ]);
  });

  test("Calendar list entity converter should convert calendar list to entity", () => {
    const calendarEntityList = [
      {
        group_id: "d37fa5e3-a42a-4b72-b7fd-2968e33d4b1a",
        name: "John",
        selected_slots: [
          {
            day: "Monday",
            timeslot: "11:30:00",
          },
        ],
      },
    ];

    const calendarEntity = calendarListEntityConverter(calendarEntityList);

    expect(calendarEntity).toEqual([
      {
        groupId: "d37fa5e3-a42a-4b72-b7fd-2968e33d4b1a",
        user: "John",
        icalUrl: "",
        calendarJson: JSON.stringify({
          cells: [
            {
              id: "mon-1130",
              users: ["John"],
              numPeople: 1,
            },
          ],
        }),
      },
    ]);
  });
});
