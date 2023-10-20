const request = require("supertest");
const { app, server } = require("../index");

describe("User API", () => {
  let token;

  describe("POST /api/user/create-account", () => {
    it("should create a new account", async () => {
      const res = await request(app).post("/api/user/create-account").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
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
