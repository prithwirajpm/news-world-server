const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JwtMiddleware");
    const token =req.headers['authorization'].split(" ")[1]
    // console.log(token);
    try{
    const jwtResponse = jwt.verify(token,"supersecreatkey1234")
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()
}catch(err){
    res.status(401).json("Authorization faild!!!! please Login....")
}
}

module.exports = jwtMiddleware