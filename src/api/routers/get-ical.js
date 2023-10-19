const getIcalRouter = require("express").Router();

getIcalRouter.get("/", async (req, res) => {
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

module.exports = getIcalRouter;
