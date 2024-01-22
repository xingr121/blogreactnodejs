const express = require("express");
const router = express.Router();
const { comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/:articleId", async (req, res) => {
  const ArticleId = req.params.articleId;
  const Comments = await comments.findAll({ where: { articleId: ArticleId } });
  res.json(Comments);
});
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const userName = req.user.userName;
  comment.userName = userName;
  await comments.create(comment);
  res.json(comment);
});
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("delete success");
});
module.exports = router;
