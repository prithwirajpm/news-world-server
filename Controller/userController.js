const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const multer = require('multer');


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
                username,email,password,profile:""
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

  
  // userEdit
exports.editUserProfile = async (req, res) => {
    const userId = req.payload;
    const { profile } = req.body;
    const uploadProfileImg = req.file?req.file.filename:profile
  
    try {
      const updateUserProfile = await users.findByIdAndUpdate(
        { _id: userId },
        {
          "profile": uploadProfileImg,
        },
        { new: true }
      );
  
      await updateUserProfile.save();
      res.status(200).json(updateUserProfile);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  

// getUser

exports.getUserIdes = async (req,res)=>{
  try {
    const community = await users.find()
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json("internel server Error",error)
  }
}



// EditProfile

exports.editUser  = async(req,res)=>{

  const userId = req.payload
  console.log("hii");
  const {username,email,password,profile} = req.body
  const uploadUserImage = req.file?req.file.filename:profile
  try{
         const updateUser = await users.findByIdAndUpdate({_id:userId},{
             username,email,password,"profile":uploadUserImage
          },{new:true})
          await updateUser.save()
         res.status(200).json(updateUser)
  }catch(err){
          res.status(401).json(err)
  }
}
  