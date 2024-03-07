const {posts, post } = require('../services/postService');

    posts: () => posts;
    post: () => post;

module.exports = {
    posts,
    post,
}