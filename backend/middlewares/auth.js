// const User = require('../models/user');
// const jwt = require('jsonwebtoken')

// module.exports = async function(req, res, next) {
//   try {
//     let token = req.headers.authorization;
//     let decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decoded.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'User ID non valable'
//     } else {
//     next();
//   }
//   } catch(err){
//     res.status(403).json({"msg":"Couldnt Authenticate"});
//   }
//   }
//   async(req,res,next)=>{
//     let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
//     if(user === null){
//       res.status(404).json({'msg':"User not found"});
//     }
//     res.status(200).json(user);
//  }; 

