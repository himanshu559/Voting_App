const jwt = require('jsonwebtoken');
const jwtAuthMiddileWare = (req, res,next)=>{


  // firstb check request Header and Authorization or not 
  const authorization =  req.headers.authorization;
 if(!authorization) return res.status(401).json({error:" Not Token found"})


  // extract jwt token from the request header ; 
  const token = req.headers.authorization.split('')[1];
  if(!token) return res.status(401).json({error:"unauthorized"});
  
  try{
    const decoted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoted;
    next();
  }catch(error){
    console.log(error);
    res.status(401).json({error:"Invalid Token"});
  }
}
const generateToken = (userdata)=>{
 return jwt.sign({userdata},process.env.JWT_SECRET,{expiresIn:30});
}

module.exports ={generateToken,jwtAuthMiddileWare};