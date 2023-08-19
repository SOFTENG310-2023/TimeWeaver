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

  test("Responds to /assets/js/main.js", async () => {
    const res = await request(app).get("/assets/js/main.js");
    expect(res.statusCode).toBe(200);
  });
});
