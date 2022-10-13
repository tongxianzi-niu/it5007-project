const { UserInputError } = require("apollo-server-express");
const { getDb, getNextSequence } = require("./db.js");
const { v4: uuidv4 } = require("uuid");

// add new topic to database
async function add(_, { topic }) {
  const db = getDb();

  const newTopic = Object.assign({}, topic);
  newTopic.created = new Date();
  newTopic._id = uuidv4();

  const result = await db.collection("topics").insertOne(newTopic);
  const savedTopic = await db
    .collection("topics")
    .findOne({ _id: result.insertedId });
  return savedTopic;
}

// add new Topics to user
async function updateUserTopics(_, { userId, topics }) {
  const db = getDb();

  const topicList = topics;
  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: userId },
      { $set: { topics: topicList } },
      { returnOriginal: false, upsert: false }
    );
  return result.value.topics;
}

// get topic by name
async function getUserTopics(_, { userId }) {
  const db = getDb();

  const result = await db.collection("users").findOne({ _id: userId }).topics;
  return result;
}

async function list() {
  const db = getDb();
  const users = await db.collection("topics").find({}).toArray();
  return users;
}

module.exports = { add, getUserTopics, list, updateUserTopics };
