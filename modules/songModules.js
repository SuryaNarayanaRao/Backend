// const { Binary } = require("bson");
const mongo = require("../Shared/connect");
const binary = mongo.Binary;
var fs=require("fs");
const  db  = require("mongodb");

module.exports.updateSong = async (req, res, next) => {
  try {
    console.log("Song Listed");
    var data = await mongo.db.collection("song").insertOne(req.body);
    res.send(data);
    console.log("fetching")
    // next();

    // res.send(res);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


module.exports.getsong = async (req, res, next) => {
  try {
    var data = await mongo.db.collection("song").find().toArray();
    res.send(data);
   // console.log(data[0].path)
} catch(err) {
    console.log(err);
    res.status(500).send(err);
}
};


module.exports.particularsong= (req, res) => {
  const bucket = new mongo.GridFSBucket(db, { bucketName: "newbucket" });

  db.collection("songsbinary").find().toArray()

  bucket.openDownloadStreamByName('test_song').pipe(fs.createWriteStream('./new1.mp3'));
};

module.exports.playList = async (req, res, next) => {
  try {
    var data = await mongo.db.collection("song").updateOne({email:req.body.email});
    res.send(data);
   // console.log(data[0].path)
} catch(err) {
    console.log(err);
    res.status(500).send(err);
}
};