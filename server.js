const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();
const faculty = require("./routes/faculty");
const student = require("./routes/student");

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/faculty", faculty);
app.use("/api/student", student);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
});
