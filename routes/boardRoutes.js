const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// board 게시
router.post("/", async (req, res) => {
  const { title, price, date, content, image_path, category } = req.body;

  if (!title || !price || !date) {
    return res.status(400).json({ error: "필수 항목이 누락되었습니다." });
  }

  try {
    const sql = `
      INSERT INTO boards (title, price, date, content, image_path, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.query(sql, [title, price, date, content, image_path, category]);
    res.status(201).json({ message: "등록 완료" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// boards 조회
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM boards ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// board 단건 조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM boards WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
