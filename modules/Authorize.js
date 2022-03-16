const jwt = require("jsonwebtoken");

exports.AuthorizeUser = async (req,res,next) => {
    /* Check whether access token exists or not */
    if(!req.headers['token']) 
        return res.status(401).send({msg : "Unauthorised : Access Token not found"})
    
    /* Token Verification */
    try{
        req.body.user = await jwt.verify(req.headers['token'], "AGILE");
        next();
    } catch(err) {
        res.status(401).send({msg : "Unauthorised : Invalid Access Token"})
    }
}