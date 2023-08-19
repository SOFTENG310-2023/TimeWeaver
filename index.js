// A very simple express application that just serves static files
const express = require("express");
const app = express();

// Defaults to port 8080 in development
const port = process.env.port || 8080;

// Routes all files in public relative to the root url
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`TimeWeaver is running on port ${port}`);
});
