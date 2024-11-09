const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 3030;

const logDirectory = path.join(__dirname, "src");

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a write stream for logging
const accessLogPath = path.join(logDirectory, "access.log");
const accessLogStream = fs.createWriteStream(accessLogPath, { flags: "a" });

// Setup the logger
app.use(
  morgan(
    ":method :status :res[content-length] - :response-time ms :date[clf] :http-version :url",
    { stream: accessLogStream }
  )
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the home page");
});

app.get("/get-users", (req, res) => {
  res.status(200).send({ message: "List of users" });
});

app.post("/add-user", (req, res) => {
  res.status(201).json({ message: "User added successfully" });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(201).json({ message: `User with ID ${id} updated successfully` });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `User with ID ${id} deleted successfully` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
