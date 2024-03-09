const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql');
const { CommentType } = require('../graphql/types');
const { getComments, getCommentById, addAComment, updateAComment, deleteAComment } = require('../services/commentService');

const comments = {
  type: new GraphQLList(CommentType),
  description: "Recuperada lista de comentarios",
  resolve: () => {
    return getComments();
  },
};

const comment = {
  type: CommentType,
  description: "Recuperado un comentario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => getCommentById(id),
};

const addComment = {
  type: CommentType,
  description: "Crea un nuevo comentario",
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { postId, comment }, { verifiedUser }) => {
    return addAComment(verifiedUser, postId, comment);
  },
};

const updateComment = {
  type: CommentType,
  description: "Actualizar comentario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { id, comment }, { verifiedUser }) => {
    return updateAComment(verifiedUser, id, comment);
  },
};

const deleteComment = {
  type: GraphQLString,
  description: "Eliminar un comentario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    return deleteAComment(verifiedUser, id);
  },
};

module.exports = { comments, comment, addComment, updateComment, deleteComment };
