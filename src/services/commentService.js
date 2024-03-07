const { Comment } = require('../models');

const getComments = async () => {
  return await Comment.find();
};

const getCommentById = async (id) => {
  return await Comment.findById(id);
};

module.exports = { getComments, getCommentById };
