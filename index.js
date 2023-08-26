// Allows us to grab data from ical urls
const fetch = require("node-fetch");

// Query parser
const qs = require("qs");

// A very simple express application that just serves static files
const express = require("express");
const app = express();

// Defaults to port 8080 in development
const port = process.env.port || 8080;

// Routes all files in public relative to the root url
app.use(express.static("public"));

app.set("query parser", (str) => {
  return qs.parse(str, {
    /* custom options */
  });
});

// Sets up the proxy
app.get("/api/get-ical", async (req, res) => {
  const icalUrl = req.query.ical;

  try {
    const icalUrlRes = await fetch(icalUrl);
    if (!icalUrlRes.ok) {
      throw new Error("Failed to fetch iCalendar data");
    }

    const icalContent = await icalUrlRes.text();
    res.set("Content-Type", "plain/text");
    res.send(icalContent);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the iCalendar data.",
    });
  }
});

const server = app.listen(port, () => {
  console.log(`TimeWeaver is running on port ${port}`);
});

module.exports = { app, server };
