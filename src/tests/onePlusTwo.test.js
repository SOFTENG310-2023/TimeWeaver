const onePlusTwo = require("../onePlusTwo");

describe("onePlusTwo.js example test suite", () => {
  test("Function should return 3", async () => {
    expect(onePlusTwo()).toBe(3);
  });
});
