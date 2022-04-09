const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const postRoute = require("./apis/posts/posts");

const userRoute = require("./apis/users/users");
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use("/posts", postRoute);
app.use("/users", userRoute);
//database connection
mongoose.connect(
  "mongodb+srv://jogarao:1234@cluster1.tlddu.mongodb.net/Rconnect?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("connected to DB")
);

app.listen(3001, () => {
  console.log("you are connected to server");
});
