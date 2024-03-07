const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const { CommentType } = require('../graphql/types');
const { Comment } = require('../models');

const comments = {
    type: new GraphQLList(CommentType),
    description: "Recuperada lista de comentarios",
    resolve: () => Comment.find(),
  };  
  
  const comment = {
    type: CommentType,
    description: "Recuperado un comentario",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => Comment.findById(id),
  };

  module.exports = { comments, comment };      