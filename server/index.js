const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .then(() => {
    return server.listen({ port: PORT }).then((res) => {
      console.log(`Server runnning at ${res.url}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
