const { createClient } = require("@supabase/supabase-js");
const config = require("../../utils/config");
const calendarRouter = require("express").Router();

/**
 * Create a new calendar under a group
 */
calendarRouter.post("/", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  const { calendar, selected_slots } = req.body;
  // Process calendar data
  const { data: calendarData, error: calendarError } = await supabase
    .from("calendar")
    .insert([calendar])
    .select();

  if (calendarError) {
    return res.status(500).json({ error: calendarError.message });
  }

  const updatedSelected_Slots = selected_slots.map((slot) => ({
    ...slot,
    calendar_id: calendarData[0].id,
  }));

  // Process selected slots data
  const { data: slotsData, error: slotsError } = await supabase
    .from("selected_slots")
    .insert(updatedSelected_Slots)
    .select();

  if (slotsError) {
    return res.status(500).json({ error: slotsError.message });
  }

  return res.status(201).json({
    calendar: calendarData,
    selected_slots: slotsData,
  });
});

module.exports = calendarRouter;
