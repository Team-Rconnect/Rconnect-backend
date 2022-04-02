const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//database connection
mongoose.connect(
  "mongodb+srv://jogarao:1234@cluster1.tlddu.mongodb.net/Rconnect?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.listen(3001, () => {
  console.log("you are connected");
});
