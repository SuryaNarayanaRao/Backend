// const express = require("express");
var express= require("express");
var router= express.Router();
var RegisterRoute=require("../modules/registerModule")


module.exports=router.post("/login",RegisterRoute.login)
module.exports=router.post("/registration",RegisterRoute.posting)
// module.exports=router.get("/get1",RegisterRoute.getdetials)
exports=router.post("/signup",RegisterRoute.signup)
exports=router.post("/signin",RegisterRoute.signin)

exports=router.get("/userdetails",RegisterRoute.userdata)