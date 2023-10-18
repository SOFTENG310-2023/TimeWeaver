const userRouter = require("express").Router();
const config = require("../../utils/config");
const { createClient } = require("@supabase/supabase-js");

userRouter.post("/create-account", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.json(data);
});

userRouter.post("/login", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.json(data);
});

module.exports = userRouter;
