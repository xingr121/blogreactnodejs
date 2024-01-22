const express = require("express");
const router = express.Router();
const { articles } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/", async (req, res) => {
  const listOfArticles = await articles.findAll();
  res.json(listOfArticles);
});
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const article = await articles.findByPk(id);
  res.json(article);
});
router.post("/", validateToken, async (req, res) => {
  const article = req.body;
  article.userName = req.user.userName;
  article.userId = req.user.id;
  await articles.create(article);
  res.json(article);
});

module.exports = router;
