const Board = require("../models/boardModel");

exports.createBoard = async (data) => {
  const { title, price, date } = data;

  if (!title || !price || !date) {
    throw new Error("필수 항목이 누락되었습니다.");
  }

  return await Board.createBoard(data);
};

exports.getAllBoards = async () => {
  return await Board.getAllBoards();
};

exports.getBoardById = async (id) => {
  return await Board.getBoardById(id);
};

exports.deleteBoard = async (id) => {
  const [result] = await Board.deleteBoard(id);

  if (result.affectedRows === 0) {
    throw new Error("해당 게시글이 존재하지 않습니다.");
  }

  return { message: "삭제 완료" };
};

exports.updateBoard = async ({ id, title, price, content }) => {
  const [result] = await Board.updateBoard({ id, title, price, content });

  if (result.affectedRows === 0) {
    throw new Error("수정할 게시글이 존재하지 않습니다.");
  }

  return { message: "수정 완료" };
};
