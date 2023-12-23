const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

// register
exports.register = async(req,res)=>{
    console.log('Inside register controller function');
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account alerday exist !!! please Login....")
        }else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Faild, Error : ${err}`)
    }
   
} 

// login
exports.login = async(req,res)=>{
console.log("Inside Login function");
const {email,password}=req.body
try{
    const existingUser = await users.findOne({email,password})
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},"supersecreatkey1234")
        res.status(200).json({
            existingUser,token
        })
    }else{
        res.status(404).json(`Incorrect Email / Password`)
    }
}catch{
    res.status(401).json(`Login API Failed, Error: ${err}`)
}
}

// AdminRegister
exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {  
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        res.status(406).json("Account already exist");
      } else {
        const newUser = new users({
          username,
          email,
          password,
          isAdmin: true,  // set isAdmin to true for admin user
        });
        await newUser.save()
        res.status(200).json(newUser)
      }
    } catch(err) {
      res.status(401).json(err.message);
    }
  }