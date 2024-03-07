const express = require("express");
const { graphqlHTTP } = require("express-graphql");
//const schema = require("../src/graphql/schema");
const schema = require('./src/graphql/schema');
//const { authenticate } = require("./middleware/auth");
const { authenticate } = require('./src/middleware/auth');

const app = express();

app.use(authenticate);

app.get("/", (req, res) => res.json({ msg: "Welcome. Go to /graphql" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;