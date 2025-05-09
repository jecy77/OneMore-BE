const express = require("express");
const router = express.Router();
const Board = require("../models/boardModel");

// 게시글 등록
router.post("/", async (req, res) => {
  const { title, price, date, content, image_path, category } = req.body;

  if (!title || !price || !date) {
    return res.status(400).json({ error: "필수 항목이 누락되었습니다." });
  }

  try {
    await Board.createBoard({
      title,
      price,
      date,
      content,
      image_path,
      category,
    });
    res.status(201).json({ message: "등록 완료" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 전체 조회
router.get("/", async (req, res) => {
  try {
    const [rows] = await Board.getAllBoards();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단건 조회
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await Board.getBoardById(req.params.id);

    if (rows.length === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
