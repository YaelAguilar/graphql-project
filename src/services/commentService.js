const { Comment } = require('../models');

const getComments = () => {
  return Comment.find();
};

const getCommentById = (id) => {
  return Comment.findById(id);
};

const addAComment = (verifiedUser, postId, comment) => {
  const newComment = new Comment({
    userId: verifiedUser._id,
    postId,
    comment,
  });
  return newComment.save();
};

const updateAComment = async (verifiedUser, id, comment) => {
  if (!verifiedUser) throw new Error("UnAuthorized");

  const commentUpdated = await Comment.findOneAndUpdate(
    {
      _id: id,
      userId: verifiedUser._id,
    },
    {
      comment,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!commentUpdated) throw new Error("No comment with the given ID");

  return commentUpdated;
};

const deleteAComment = async (verifiedUser, id) => {
  if (!verifiedUser) throw new Error("Unauthorized");

  const commentDelete = await Comment.findOneAndDelete({
    _id: id,
    userId: verifiedUser._id,
  });

  if (!commentDelete) throw new Error("No comment with the given ID for the user");

  return "Comment deleted";
};

module.exports = { getComments, getCommentById, addAComment, updateAComment, deleteAComment };


