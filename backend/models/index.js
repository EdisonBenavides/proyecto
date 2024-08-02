const Note = require("./Note");
const User = require("./User");
const AgeRange = require("./ageRange");

const db = {
  User,
  AgeRange,
  Note
};

module.exports = db;