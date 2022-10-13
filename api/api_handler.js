const fs = require("fs");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require("./graphql_date.js");
const user = require("./user.js");
const topic = require("./topic.js");

const resolvers = {
  Query: {
    userList: user.list,
    getUser: user.get,
    signIn: user.signIn,
    topicList: topic.list,
    getUserTopics: topic.getUserTopics,
  },
  Mutation: {
    addUser: user.add,
    updateUserTopics: topic.updateUserTopics,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || "true") === "true";

  const corsOptions = {
    origin: ["http://localhost:8000"],
  };

  console.log("CORS setting:", enableCors);
  server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });
}

module.exports = { installHandler };
