const { app, server } = require("../index");
const request = require("supertest");

// Shut down the server after the tests finish
afterAll(() => {
  server.close();
});

describe("Check main files are accessible", () => {
  test("Responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=UTF-8");
    expect(res.statusCode).toBe(200);
  });

  test("Responds to /assets/css/main.css", async () => {
    const res = await request(app).get("/assets/css/main.css");
    expect(res.statusCode).toBe(200);
  });

  test("Responds to /assets/js/bundle.js", async () => {
    const res = await request(app).get("/assets/js/bundle.js");
    expect(res.statusCode).toBe(200);
  });
});

describe("User API", () => {
  test.skip("should create a new account", async () => {
    const res = await request(app).post("/api/user/create-account").send({
      name: "John Doe1",
      email: "johndoe1@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
  });

  test.skip("should not create a new account", async () => {
    const res = await request(app).post("/api/user/create-account").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(500);
  });

  test.skip("should update the user's table", async () => {
    const res = await request(app).post("/api/user/after-creation").send({
      id: "acaece76-6ba7-4e76-8f5d-0a816fb296f5",
      name: "test",
    });
    expect(res.statusCode).toEqual(200);
  });

  test.skip("should log in with valid credentials", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
  });

  test.skip("should not log in with invalid credentials", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "johndoe@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(500);
  });

  test.skip("should not get a user by its id", async () => {
    const res = await request(app).get("/api/user/1");
    expect(res.statusCode).toEqual(500);
  });
});

describe("Group API", () => {
  let id = 1;
  test.skip("get all groups and its associated calendars", async () => {
    const res = await request(app).get("/api/group/");
    expect(res.statusCode).toEqual(200);
  });

  test.skip("should create a new group", async () => {
    const res = await request(app).post("/api/group/").send({
      name: "John Doe",
    });
    expect(res.statusCode).toEqual(201);
    id = res.body.id;
  });

  test.skip("should delete a group", async () => {
    const res = await request(app).delete("/api/group/" + id);
    expect(res.statusCode).toEqual(201);
  });

  test.skip("should not delete a group", async () => {
    const res = await request(app).delete("/api/group/" + id + "1");
    expect(res.statusCode).toEqual(500);
  });
});

describe("Calendar API", () => {
  test.skip("should create a new calendar under a group", async () => {
    const res = await request(app)
      .post("/api/calendar/")
      .send({
        calendar: {
          group_id: "d37fa5e3-a42a-4b72-b7fd-2968e33d4b1a",
          name: "John",
        },
        selected_slots: [{ day: "Wednesday", timeslot: "11:30:00" }],
      });
    expect(res.statusCode).toEqual(201);
  });

  test.skip("should not create a new calendar from slots Error", async () => {
    const res = await request(app)
      .post("/api/calendar/")
      .send({
        calendar: {
          group_id: "d37fa5e3-a42a-4b72-b7fd-2968e33d4b1a",
          name: "John",
        },
        selected_slots: [{ day: "Wednesday", timeslot: "25:00:00" }],
      });
    expect(res.statusCode).toEqual(500);
  });

  test.skip("should not create a new calendar from calendar Error", async () => {
    const res = await request(app)
      .post("/api/calendar/")
      .send({
        calendar: {
          group_id: "d37fa5e3-a42a-4b72-b7fd-asdfasdfasdf",
          name: "John",
        },
        selected_slots: [{ day: "Wednesday", timeslot: "25:00:00" }],
      });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Get iCal API", () => {
  test("should get the iCal file", async () => {
    const icalUrl =
      "https://uoacal.auckland.ac.nz/calendar/4947dde81b172014869447f17e420ede860059c15c45e96f17b0bce947278f72a2bc9510fbf00ed973b49efaaae942de64ffd7987f81e1579a4d26d9fc53da00";
    const res = await request(app)
      .get("/api/get-ical/")
      .query({ ical: icalUrl });
    expect(res.statusCode).toEqual(200);
  });

  test("should not get the iCal file", async () => {
    const icalUrl =
      "https://uoacal.auckland.ac.nz/calendar/4947dde81b172014869447f17e420ede860059c15c45e96f17b0bce947278f72a2bc9510fbf00ed973b49efaaae942de64ffd7987f81e1579a4d26d9fc53da001";
    const res = await request(app)
      .get("/api/get-ical/")
      .query({ ical: icalUrl });
    expect(res.statusCode).toEqual(500);
  });
});
