const { createClient } = require("@supabase/supabase-js");
const config = require("../../utils/config");
const groupRouter = require("express").Router();

// Helper function to add a user to a group
// This creates a new row to the group_users table in supabase with the given user id and group id
async function addUserToGroup(supabaseClient, userId, groupId) {
  const { data, error } = await supabaseClient
    .from("group_users")
    .insert({
      user_id: userId,
      group_id: groupId,
    })
    .select();

  return { data, error };
}

/**
 * Get all groups and its associated calendars
 */
groupRouter.get("/", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  await supabase.auth.setSession({
    access_token: req.header("Authorization").split(" ")[1],
    refresh_token: req.header("Refresh")
  });
  
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
  await supabase.auth.setSession({
    access_token: req.header("Authorization").split(" ")[1],
    refresh_token: req.header("Refresh")
  });

  const { data, error } = await supabase
    .from("calendar_group")
    .insert({
      name: req.body.name,
      owner_id: req.body.owner_id,
    })
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  await addUserToGroup(supabase, req.body.owner_id, data[0].id);

  return res.status(201).json(data[0]);
});

/**
 * Delete an existing group by its id
 */
groupRouter.delete("/:id", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  const groupId = req.params.id;
  const { data, error } = await supabase
    .from("calendar_group")
    .delete()
    .eq("id", groupId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data.length) {
    return res.status(404).json({ error: "Group ID not found." });
  }

  return res.status(201).json(data);
});

module.exports = groupRouter;


/**
 * Add a user to a group
 */
groupRouter.post("/:id/user", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  await supabase.auth.setSession({
    access_token: req.header("Authorization").split(" ")[1],
    refresh_token: req.header("Refresh")
  });

  const groupId = req.body.groupId;
  const userId = req.body.userId;

  const { data, error } = await addUserToGroup(supabase, userId, groupId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data[0])
});