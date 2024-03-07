const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const { UserType } = require('../graphql/types');
const { User } = require('../models');

//query para obtener lista de usuarios (1)
const users = {
    type: new GraphQLList(UserType),
    description: "Recupera una lista de usuarios.",
    resolve: () => User.find(),
  };

//query para obtener un usuario (2)
const user = {
    type: UserType,
    description: "Recupera un usuario",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => User.findById(id),
  };  

module.exports = { users, user };  