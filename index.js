const { createClient } = require("@supabase/supabase-js");
const config = require("./src/utils/config");

// Allows us to grab data from ical urls
const fetch = require("node-fetch");

// Query parser
const qs = require("qs");

const express = require("express");
const getIcalRouter = require("./src/api/routers/get-ical.js");
const userRouter = require("./src/api/routers/user.js");
const groupRouter = require("./src/api/routers/group.js");

const app = express();

// Defaults to port 8080 in development
const port = process.env.port || 8080;

// Routes all files in public relative to the root url
app.use(express.static("public"));

app.use(express.json());

app.use("/api/get-ical", getIcalRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);

app.set("query parser", (str) => {
  return qs.parse(str, {
    /* custom options */
  });
});

const server = app.listen(port, () => {
  console.log(`TimeWeaver is running on port ${port}`);
});

module.exports = { app, server };
