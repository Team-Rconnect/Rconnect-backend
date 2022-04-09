const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  connections: {
    type: Number,
    default: 0,
  },
  userName: String,
  password: String,
  dob: Date,
  title: String,
  about: String,
  skills: [String],
  experience: [
    {
      from: Date,
      to: Date,
      organization: String,
      description: String,
    },
  ],
  experience: [
    {
      from: Date,
      to: Date,
      university: String,
      description: String,
    },
  ],
  projects: [String],
});

const UserModel = mongoose.model("users", User);

module.exports = UserModel;
