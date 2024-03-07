const {users, user } = require('../services/userService');

    users: () => users;
    user: () => user;

module.exports = {
    users,
    user,
}