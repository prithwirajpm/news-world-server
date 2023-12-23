const user = require("../Models/userSchema")
exports.viewUsers = async (req,res)=>{
    try {
      const community = await user.find()
      res.status(200).json(community)
    } catch (error) {
      res.status(500).json("internel server Error",error)
    }
  }