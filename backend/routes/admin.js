const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../models/User");

router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

module.exports = router;