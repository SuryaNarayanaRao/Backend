const mongo = require("./Shared/connect");
const registration = require("./Routers/registerRouter");
const song = require("./Routers/songRouter");
// const fs = require("fs");
const mongodb = require("mongodb");
const binary = mongodb.Binary;
const authorise = require("./modules/Authorize");

const port = process.env.PORT || 4001;

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

var a = mongo.connect();
app.use("/", registration);
// app.use(authorise.AuthorizeUser);
app.use("/song", song);
app.get("/check", (req, res) => {
  res.send("worked");
});

app.listen(port, function () {
  console.log("server connected");
});
