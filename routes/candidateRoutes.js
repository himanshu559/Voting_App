const express = require('express');
const router = express.Router();
const {generateToken,jwtAuthMiddileWare} = require('./../jwt');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // <- check this
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    
    //Generate Token
    const payload = {
     id:response.id,
    
   }
     console.log("Payload Data:-",payload);
     const Token = generateToken(payload);
     console.log(" Token id :- ",Token);
    
     res.status(200).json({response:response,Token:Token});
  } catch (error) {
    console.error("POST / error:", error); // <- log full error
    res.status(500).json({ message: "Internal server Error", error: error.message });
  }
});

// login Route

router.post('/login',async(req,res)=>{
  try {
   // Extract username and password from body;
   const { aadharCardNumber, password} = req.body;
   //fine user by username
   const user = await User.findOne({ aadharCardNumber: aadharCardNumber});
   if(!user || !await user.comparePassword(password)){
    return res.status(401).json({error:"Invalid username and password"});
   }

   // generate Token
    const payload = {
    id:user.id,
   }
   const Token = generateToken(payload);
   res.json({Token});

  } catch (error) {
    console.log(error);
    res.status(500).json(error,"Internal Server Error");
  }
})

// profile routes
router.get('/profile',jwtAuthMiddileWare,async(req,res)=>{
  try {
    
    const userData = req.user;
    const userId = userData.id
    const user = await User.findById(userId);

    res.status(200).json({user});


  } catch (error) {
  console.log(error);
  res.status(500).json({error: 'Internal server Error' })
  }
})

router.put('/profile/password',async(req,res)=>{
  try {
    
   const userId = req.user;
   const {currentPassword,newPassword} =req.body;
   const user = await User.findById(userId);

    if(!await user.comparePassword(currentPassword)){
    return res.status(401).json({error:"Invalid username and password"});
   }

   user.password = newPassword;
   await user.save();
    console.log(" password Updated");
    res.status(200).json({message:" password update"});
  } catch (error) {
    res.status(500).json(error," server internal error");
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }
    res.status(200).json({ message: "Person successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;