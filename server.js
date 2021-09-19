const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const app = express();
const faculty = require("./routes/faculty");
const student = require("./routes/student");

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/faculty", faculty);
app.use("/api/student", student);

//Serve static assets in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
