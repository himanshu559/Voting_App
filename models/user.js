const {model,Schema} = require('mongoose');
//const passport = require('passport');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
  
  name:{
     type:String ,
     required : true
  },
  age:{
    type:String,
    required: true
  },
  email:{
    type:String,

  },
  mobile:{
    type:String,
  },
  address:{
    type:String,
    required: true
  },
  aadharCardNumber:{
    type:Number,
    required: true,
    unqiue: true
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["voter","admin"],
    default: "voter"
  },
  isvoted:{
   type:Boolean,
   default:false
  }
 
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(this.password, salt);
    this.password = hashpassword;
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    return next(error);
  }
});


userSchema.methods.comparePassword = async function(candidatePassword){
  try {
    const ismatch = await bcrypt.compare(candidatePassword,this.password);
    return ismatch;

  } catch (error) {
     throw error;
  }
}


const User = model('User',userSchema);
module.exports = User;