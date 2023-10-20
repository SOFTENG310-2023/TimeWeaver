const { app, server } = require("../index");
const request = require("supertest");
const { describe } = require("../src/schemas/domain/CalendarSlot");

describe("Check main files are accessible", () => {
  afterAll(() => {
    server.close();
  });

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
  describe("POST /api/user/create-account", () => {
    it("should create a new account", async () => {
      const res = await request(app).post("/api/user/create-account").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("POST /api/user/login", () => {
    it("should log in with valid credentials", async () => {
      const res = await request(app).post("/api/user/login").send({
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
    });

    it("should not log in with invalid credentials", async () => {
      const res = await request(app).post("/api/user/login").send({
        email: "johndoe@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("POST /api/user/after-creation", () => {
    it("should update user table", async () => {
      const res = await request(app).post("/api/user/after-creation").send({
        id: "123",
        name: "John Doe",
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});

describe("Group API", () => {
  describe("GET /api/group/", () => {
    it("get all groups and its associated calendars", async () => {
      const res = await request(app).get("/api/group/");
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("POST /api/group/", () => {
    it("should create a new group", async () => {
      const res = await request(app).post("/api/group/").send({
        name: "John Doe",
      });
      expect(res.statusCode).toEqual(201);
    });

    describe("DELETE /api/group/:id", () => {
      it("should delete a group", async () => {
        const res = await request(app).delete("/api/group/1");
        expect(res.statusCode).toEqual(201);
      });

      it("should not delete a group", async () => {
        const res = await request(app).delete("/api/group/123123123");
        expect(res.statusCode).toEqual(404);
      });
    });
  });
});

describe("Calendar API", () => {
  describe("POST /api/calendar/", () => {
    it("should create a new calendar under a group", async () => {
      const res = await request(app).post("/api/calendar/").send({
        calendar: "John Doe",
        selected_slots: "John Doe",
      });
      expect(res.statusCode).toEqual(201);
    });
  });
});

describe("Get iCal API", () => {
  describe("GET /api/get-ical/", () => {
    it("should get the iCal file", async () => {
      const res = await request(app).get("/api/get-ical/");
      expect(res.statusCode).toEqual(200);
    });
  });
});
