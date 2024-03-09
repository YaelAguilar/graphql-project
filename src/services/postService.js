const { Post, User } = require('../models');

const getPosts = async (first = 10, offset = 0) => {
  return await Post.find().skip(offset).limit(first);
};

const getPostById = async (id) => {
  return await Post.findById(id);
};

const createPost = async (verifiedUser, title, body) => {
  if (!verifiedUser) throw new Error("You must be logged in to do that");

  const userFound = await User.findById(verifiedUser._id);
  if (!userFound) throw new Error("Unauthorized");

  const post = new Post({
    authorId: verifiedUser._id,
    title: title,
    body: body,
  });

  return post.save();
};

const updateAPost = async (verifiedUser, id, title, body) => {
  if (!verifiedUser) throw new Error("Unauthorized");

  const postUpdated = await Post.findOneAndUpdate(
    { _id: id, authorId: verifiedUser._id },
    { title, body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!postUpdated) throw new Error("No post for given id");

  return postUpdated;
};

const deleteAPost = async (verifiedUser, postId) => {
  const postDeleted = await Post.findOneAndDelete({
    _id: postId,
    authorId: verifiedUser._id,
  });
  if (!postDeleted) throw new Error("No post with given ID Found for the author");

  return "Post deleted";
};

module.exports = { getPosts, getPostById, createPost, updateAPost, deleteAPost };
