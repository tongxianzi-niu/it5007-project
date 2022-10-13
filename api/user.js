const { UserInputError } = require("apollo-server-express");
const { getDb, getNextSequence } = require("./db.js");
const { v4: uuidv4 } = require('uuid');

function validate(user) {
  const errors = [];
  if (user.email.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (errors.length > 0) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

// add new user to database
async function add(_, { user }) {
  const db = getDb();
  validate(user);

  const newUser = Object.assign({}, user);
  newUser.created = new Date();
  newUser.versionNo = 1
  newUser._id = uuidv4()

  const result = await db.collection("users").insertOne(newUser);
  const savedUser = await db
    .collection("users")
    .findOne({ _id: result.insertedId });
  return savedUser;
}

// get user by email
async function get(_, { email }) {
  const db = getDb();

  const result = await db.collection("users").findOne({ email: email });
  return result;
}

async function list() {
  const db = getDb();
  const users = await db.collection("users").find({}).toArray();
  return users;
}

async function signIn(_, { email, password }) {
  const db = getDb();

  const result = await db
    .collection("users")
    .findOne({ $and: [{ email: email }, { password: password }] });
  return result === null ? false : true;
}

module.exports = { add, get, list, signIn };
