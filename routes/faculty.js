const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const keys = {
  secretOrKey: "secret",
};

const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

// @route    POST api/faculty/register
// @desc     Register a faculty
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").isLength({
      min: 1,
    }),
    check("dept", "Please enter department").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, name, dept } = req.body;

    try {
      let faculty = await db.Faculty.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (faculty) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          db.Faculty.create({
            email: email,
            password: hash,
            name: name,
            dept: dept,
          })
            .then((newFaculty) => {
              const payload = {
                email: email,
                name: name,
                dept: dept,
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 360000,
                },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    success: true,
                    token: token,
                  });
                }
              );
            })
            .catch((err) => {
              console.log(err.message);
              res.status(500).send("Status Error");
            });
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/Faculty/login
// @desc     Login a Faculty
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let faculty = await db.Faculty.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!faculty) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exist" }] });
      }

      const isMatch = await bcrypt.compare(password, faculty.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid login" }] });
      }

      const payload = {
        email: email,
        name: faculty.name,
        dept: faculty.dept,
      };

      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            success: true,
            token: token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/faculty/current
// @desc    Return current user
// @access  Private
router.get("/current", auth, async (req, res) => {
  try {
    const profile = await db.Faculty.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/faculty/courses
// @desc    Add a course
// @access  Private
router.post("/courses", auth, (req, res) => {
  const { course, year } = req.body;

  db.Course.create({
    dept: req.user.dept,
    faculty: req.user.name,
    course,
    year,
  })
    .then((course) => {
      try {
        res.send(course);
      } catch (err) {
        res.status(500).send(err);
      }
    })
    .catch((err) => console.log(err.message));
});

// @route   GET api/faculty/courses
// @desc    Get all courses offered by faculty
// @access  Private
router.get("/courses", auth, (req, res) => {
  db.Course.findAll({
    where: {
      faculty: req.user.name,
    },
  })
    .then((courses) => res.json(courses))
    .catch((err) =>
      res.status(404).json({
        nopostfound: "No post found with that ID",
      })
    );
});

// @route   PUT api/faculty/archive/:course/:year
// @desc    change the course offered by faculty to archived
// @access  Private
router.put("/archive/:course/:year", auth, (req, res) => {
  try {
    db.Course.findOne({
      where: {
        faculty: req.user.name,
        course: req.params.course,
        year: req.params.year,
        archived: 0,
      },
    })
      .then((course) => {
        course.archived = 1;
        course.save();
        res.json(course);
      })
      .catch((err) => res.send(err.message));
  } catch (error) {
    console.log(error);
  }
});

// @route   PUT api/faculty/archive/:course/:year
// @desc    change the course offered by faculty to unarchived
// @access  Private
router.put("/unarchive/:course/:year", auth, (req, res) => {
  db.Course.findOne({
    where: {
      faculty: req.user.name,
      course: req.params.course,
      year: req.params.year,
      archived: 1,
    },
  })
    .then((course) => {
      course.archived = 0;
      course.save();
      res.json(course);
    })
    .catch((err) => {
      res.status(404).json({ nopostfound: "No post found with that ID" });
    });
});

// @route   GET api/faculty/courses/:year/:course
// @desc    Get course by year and course name
// @access  Private
router.get("/courses/:year/:course", auth, (req, res) => {
  db.Course.findAll({
    where: {
      year: req.params.year,
      course: req.params.course,
    },
  })
    .then((courses) => res.json(courses))
    .catch((err) => {
      res.status(404).json({
        nopostfound: "No post found with that ID",
      });
    });
});

// @route   GET api/faculty/students
// @desc    Get students of a year
// @access  Private
router.get("/students/:year", auth, (req, res) => {
  db.Student.findAll({
    where: {
      year: req.params.year,
      dept: req.user.dept,
    },
    order: [["roll", "ASC"]],
  })
    .then((students) => res.json(students))
    .catch((err) =>
      res.status(404).json({
        nopostfound: "No post found with that ID",
      })
    );
});

// @route POST api/faculty/attendance/:year/:roll
// @desc Mark attendance
// @access Private
router.post("/attendance/:year/:roll/:course", auth, (req, res) => {
  db.Student.findOne({
    where: {
      roll: req.params.roll,
    },
  })
    .then((student) => {
      const { date, status } = req.body;

      db.Course.findOne({
        where: {
          faculty: req.user.name,
          year: req.params.year,
          dept: req.user.dept,
          course: req.params.course,
        },
      }).then((course) => {
        db.Attendance.create({
          roll: req.params.roll,
          course: req.params.course,
          year: req.params.year,
          name: student.name,
          date: date,
          status: status,
        })
          .then((record) => res.json(record))
          .catch((err) => console.log(err.message));
      });
    })
    .catch((err) =>
      res.status(404).json({
        nopostfound: "No post found with that ID",
      })
    );
});

// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a student
// @access  Private
router.get("/attendance/:year/:roll/:course", auth, (req, res) => {
  db.Attendance.findAll({
    where: {
      roll: req.params.roll,
      year: req.params.year,
      course: req.params.course,
    },
  })
    .then((records) => res.json(records))
    .catch((err) => console.log(err.message));
});

// @route   Update api/faculty/attendance/:year/:roll
// @desc    update attendance of a student
// @access  Private
router.put("/attendance/:year/:roll/:course/:date", auth, (req, res) => {
  const { status } = req.body;

  db.Course.findOne({
    where: {
      faculty: req.user.name,
      year: req.params.year,
      dept: req.user.dept,
      course: req.params.course,
    },
  }).then((course) => {
    db.Attendance.findOne({
      where: {
        roll: req.params.roll,
        year: req.params.year,
        course: course.course,
        date: req.params.date,
      },
    })
      .then((record) => {
        record.status = status;
        record.save();
        res.json(record);
      })
      .catch((err) => console.log(err.message));
  });
});

// @route   GET api/comment/:id
// @desc    Get comment
// @access  Public
router.get("/chat/:course/:year", (req, res) => {
  db.Chat.findAll({
    where: {
      course: req.params.course,
      year: req.params.year,
    },
  })
    .then((comments) => res.json(comments))
    .catch((err) =>
      res.status(404).json({
        error: "No comments found",
      })
    );
});

// @route   GET api/comment/:id
// @desc    Get comment
// @access  Public
router.post("/chat/:course/:year", auth, (req, res) => {
  db.Chat.create({
    from: req.user.name,
    course: req.params.course,
    year: req.params.year,
    msg: req.body.msg,
  })
    .then((chat) => res.json(chat))
    .catch((err) => console.error(err.message));
});

module.exports = router;
