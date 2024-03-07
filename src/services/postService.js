const { Post } = require('../models');

const getPosts = async (first = 10, offset = 0) => {
  return await Post.find().skip(offset).limit(first);
};

const getPostById = async (id) => {
  return await Post.findById(id);
};

module.exports = { getPosts, getPostById };
