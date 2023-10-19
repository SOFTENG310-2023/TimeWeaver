const userRouter = require("express").Router();
const config = require("../../utils/config");
const { createClient } = require("@supabase/supabase-js");

userRouter.post("/create-account", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
    options: {
      data: {
        name: req.body.name,
      },
    },
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

// This method is called right after a user creates a new account in order to update the user's table (not the auth one)
userRouter.post("/after-creation", async (req, res) => {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

  const { error } = await supabase.from("user").insert([
    {
      id: req.body.id,
      name: req.body.name,
    },
  ]);

  if (error) {
    console.log(error.message);
  }

  return res.json();
});

// This method returns a user's information using the session token
userRouter.get("/:id", async (req, res) => {
  const token = req.params.id;

  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.json(data);
});

module.exports = userRouter;
