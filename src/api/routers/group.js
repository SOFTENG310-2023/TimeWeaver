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

module.exports = groupRouter;