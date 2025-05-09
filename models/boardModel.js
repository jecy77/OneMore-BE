const pool = require("../config/db");

exports.getAllBoards = () => {
  return pool.query("SELECT * FROM boards ORDER BY id DESC");
};

exports.getBoardById = (id) => {
  return pool.query("SELECT * FROM boards WHERE id = ?", [id]);
};

exports.createBoard = ({
  title,
  price,
  date,
  content,
  image_path,
  category,
}) => {
  const sql = `
    INSERT INTO boards (title, price, date, content, image_path, category)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return pool.query(sql, [title, price, date, content, image_path, category]);
};

exports.deleteBoard = (id) => {
  return pool.query("DELETE FROM boards WHERE id = ?", [id]);
};

exports.updateBoard = ({ id, title, price, content }) => {
  const sql = `
      UPDATE boards
      SET title = ?, price = ?, content = ?
      WHERE id = ?
    `;
  return pool.query(sql, [title, price, content, id]);
};
