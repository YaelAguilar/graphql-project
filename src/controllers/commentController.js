const {comments, comment } = require('../services/commentService');

    comments: () => comments;
    comment: () => comment;

module.exports = {
    comments,
    comment,
}