const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("./models/User");

app.use(cors());
app.use(express.json());

//database connection
mongoose.connect(
  "mongodb+srv://jogarao:1234@cluster1.tlddu.mongodb.net/Rconnect?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
//sample insertion - tobe removed
app.get("/", async (req, res) => {
  const user = {
    firstName: "charan",
    lastName: "vinay",
  };
  const userToInsert = new UserModel(user);
  await userToInsert.save();
  res.send(userToInsert);
});

app.listen(3001, () => {
  console.log("you are connected");
});
