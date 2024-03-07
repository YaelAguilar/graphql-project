const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInt } = require('graphql');
const { CommentType } = require('../graphql/types');
const { Comment } = require('../models');

//query para obtener lista de comentarios (4)
const comments = {
    type: new GraphQLList(CommentType),
    description: "Recuperada lista de comentarios",
    resolve: () => Comment.find(),
  };  
  
  //query para obtener un comentario (5)
  const comment = {
    type: CommentType,
    description: "Recuperado un comentario",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => Comment.findById(id),
  };

  module.exports = { comments, comment };      