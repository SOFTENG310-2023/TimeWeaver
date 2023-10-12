require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

module.exports = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
};
