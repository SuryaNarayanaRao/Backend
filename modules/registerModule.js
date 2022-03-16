const mongo=require('../Shared/connect')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



/* Registering the data to the Database */
module.exports.signup=async(req,res,next)=>{

    /* Check wheather Email is already present in db or not */
    const existUser=await mongo.db.collection("register").findOne({email:req.body.email})
    if(existUser){
        return res.status(400).send({msg:"Email already Exists"})
    }
        const salt=await bcrypt.genSalt(5);
        // console.log("Salt Value"+salt);
        req.body.password=await bcrypt.hash(req.body.password,salt);
        // console.log("hasing value"+req.body.password)
        var data=await mongo.db.collection("register").insertOne(req.body);
        res.send(data);
    }

    /* Login using user Credentials */
    module.exports.signin=async(req,res,next)=>{

        /* Check for existing user or not */
        const existUser=await mongo.db.collection("register").findOne({email:req.body.email})
        if(!existUser){
            return res.send(400).send({msg:"Email is not exitst"})
        }

        const isValid= await bcrypt.compare(req.body.password,existUser.password)
        if(!isValid) return res.status(400).send({msg:"Incorrect Password"})


        const token=jwt.sign(existUser,"AGILE",{expiresIn:'1hr'})
        res.send(token);

 }




module.exports.posting=async(req,res,next)=>{
    try {
        console.log("data updatedd");
        var data = await mongo.db.collection("register").insertOne(req.body);
        res.send(data);
        next();
        // console.log(this.db)
        
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}


module.exports.login=async(req,res,next)=>{

   

    try {
        var data = await mongo.db.collection("register").findOne({email:req.body.email});
        console.log(data);

        if(data){
            res.send(data)
        }
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}
/* Get all the user Details */
 module.exports.userdata=async(req,res,next)=>{
    try {
        var data = await mongo.db.collection("register").find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
 }
    