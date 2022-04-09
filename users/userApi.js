const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("we are on user");
});

router.get("/specific", (req, res) => {
  res.send("specifi post");
});

module.exports = router;
