const Note = require("./Note");
const User = require("./User");
const AgeRange = require("./AgeRange");

const db = {
  User,
  AgeRange,
  Note
};

module.exports = db;