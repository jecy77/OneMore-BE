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
