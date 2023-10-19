const userRouter = require("express").Router();
const config = require("../../utils/config");
const { createClient } = require("@supabase/supabase-js");

userRouter.get("/", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

  const { data, error } = await supabase.from("selected_slots").select();

  res.json(data);
});

module.exports = userRouter;
