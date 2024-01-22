const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { userName, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      userName: userName,
      email: email,
      password: hash,
    });
    res.json("successd");
  });
});
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await users.findOne({ where: { userName: userName } });

  if (!user) res.json({ error: "User does not exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "wrong username and password" });
    const accessToken = sign(
      { userName: user.userName, id: user.id },
      "important"
    );
    res.json({ token: accessToken, userName: userName, id: user.id });
  });
});
router.get("/valid", validateToken, (req, res) => {
  res.json(req.user);
});
module.exports = router;
