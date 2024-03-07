const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql');
const { UserType } = require('../graphql/types');
const { registerUser, loginUser, getUsers, getUserById } = require('../services/userService');

const register = {
  type: GraphQLString,
  description: 'Registrar usuarios',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { username, email, password, displayName }) {
    return await registerUser(username, email, password, displayName);
  },
};

const login = {
  type: GraphQLString,
  description: 'Iniciar Sesión',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }) {
    return await loginUser(email, password);
  },
};

const users = {
  type: new GraphQLList(UserType),
  description: "Recupera una lista de usuarios.",
  resolve: () => {
    return getUsers();
  },
};

const user = {
  type: UserType,
  description: "Recupera un usuario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => getUserById(id),
};

module.exports = { register, login, users, user };


/*const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql');
const { UserType } = require('../graphql/types');
const { User } = require('../models');

const register = {
  type: GraphQLString,
      description: 'Registrar usuarios',
      args: {
          username: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          displayName: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { username, email, password, displayName }) {
          const user = new User({ username, email, password, displayName });
          user.password = await bcrypt.encryptPassword(user.password);
          await user.save();
      
          const token = auth.createJWTToken({
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
          });
          return token;
        },
};

const login = {
  type: GraphQLString,
  description: 'Iniciar Sesion',
  args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }) {
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) throw new Error("Invalid Username");
  
      const validPassword = await bcrypt.comparePassword(password, user.password);
  
      if (!validPassword) throw new Error("Invalid Password");
  
      const token = auth.createJWTToken({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });
  
      return token;
    },

};

const users = {
    type: new GraphQLList(UserType),
    description: "Recupera una lista de usuarios.",
    resolve: () => User.find(),
  };

const user = {
    type: UserType,
    description: "Recupera un usuario",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => User.findById(id),
  };  

module.exports = { register, login, users, user }; */ 