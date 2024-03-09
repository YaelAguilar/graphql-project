const {GraphQLSchema, GraphQLObjectType} = require ('graphql');
const { register, login, users, user } = require('../controllers/userController');
const { posts, post, createNewPost, updatePost, deletePost } = require('../controllers/postController');
const { comments, comment, addComment, updateComment, deleteComment } = require('../controllers/commentController');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        users, //query 1
        user, //query 2
        posts, //query con paginacion 1
        post, //query 3
        comments, //query 4 
        comment, //query 5
    },
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'root mutation',
    fields: {
        register, //mutacion para registro
        login, //mutacion para login
        createNewPost, //mutacion 1
        updatePost, //mutacion 2
        deletePost, //mutacion 3
        addComment,
        updateComment,
        deleteComment,
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

