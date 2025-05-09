const express = require("express");
const router = express.Router();
const boardService = require("../services/boardService");

// 게시글 등록
router.post("/", async (req, res) => {
  try {
    await boardService.createBoard(req.body);
    res.status(201).json({ message: "등록 완료" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 전체 조회
router.get("/", async (req, res) => {
  try {
    const [rows] = await boardService.getAllBoards();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단건 조회
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await boardService.getBoardById(req.params.id);

    if (rows.length === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const result = await boardService.deleteBoard(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// 게시글 수정
router.put("/:id", async (req, res) => {
  try {
    const result = await boardService.updateBoard({
      id: req.params.id,
      title: req.body.title,
      price: req.body.price,
      content: req.body.content,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
