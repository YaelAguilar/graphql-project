const { GraphQLList, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } = require('graphql');
const { PostType } = require('../graphql/types');
const { getPosts, getPostById, createPost, updateAPost, deleteAPost } = require('../services/postService');

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

const createNewPost = {
  type: PostType,
  description: "Crear un nuevo post en el blog",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, args, { verifiedUser }) => createPost(verifiedUser, args.title, args.body),
};

const updatePost = {
  type: PostType,
  description: "se actualizo el post",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { id, title, body }, { verifiedUser }) =>
    updateAPost(verifiedUser, id, title, body),
};

const deletePost = {
  type: GraphQLString,
  description: "Borrar post",
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, args, { verifiedUser }) => deleteAPost(verifiedUser, args.postId),
};

module.exports = { posts, post, createNewPost, updatePost, deletePost };


