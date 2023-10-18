const { createClient } = require("@supabase/supabase-js");
const config = require("../../utils/config");
const groupRouter = require("express").Router();

/**
 * Get all groups and its associated calendars
 */
groupRouter.get("/", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from("calendar_group").select(`
            *,
            calendar (
                *,
                selected_slots (
                    *
                )
            )
        `);

  if (error)
    return res.status(500).json({
      error: error.message,
    });

  return res.json(data);
});

/**
 * Create a new group
 */
groupRouter.post("/", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  const group = req.body;
  const { data, error } = await supabase.from("calendar_group").insert([group]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
});

module.exports = groupRouter;
