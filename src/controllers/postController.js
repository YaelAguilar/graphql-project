const { GraphQLList, GraphQLID, GraphQLInt } = require('graphql');
const { PostType } = require('../graphql/types');
const { getPosts, getPostById } = require('../services/postService');

const posts = {
  type: new GraphQLList(PostType),
  description: "Recupera una lista paginada de posts",
  args: {
    first: {
      type: GraphQLInt,
      description: 'Número de posts a recuperar en la página.',
    },
    offset: {
      type: GraphQLInt,
      description: 'Número de posts a saltar desde el inicio.',
    },
  },
  resolve: (_, { first = 10, offset = 0 }) => {
    return getPosts(first, offset);
  },
};

const post = {
  type: PostType,
  description: "Recupera un solo post",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => getPostById(id),
};

module.exports = { posts, post };


/*const { GraphQLList, GraphQLID, GraphQLInt } = require('graphql');
const { PostType } = require('../graphql/types');
const { Post } = require('../models');

const posts = {
    type: new GraphQLList(PostType),
    description: "Recupera una lista paginada de posts",
    args: {
      first: {
        type: GraphQLInt,
        description: 'Número de posts a recuperar en la página.',
      },
      offset: {
        type: GraphQLInt,
        description: 'Número de posts a saltar desde el inicio.',
      },
    },
    resolve: (_, { first = 10, offset = 0 }) => {
      return Post.find().skip(offset).limit(first);
    },
  
  /*
  query para obtener lista de posts (sin paginacion)
  const posts = {
      type: new GraphQLList(PostType),
      description: "Recupera una lista de posts",
      resolve: () => Post.find(),
    };
  
  };

const post = {
    type: PostType,
    description: "Recupera un solo post",
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Post.findById(id),
  };   
  
  module.exports = { posts, post };    */