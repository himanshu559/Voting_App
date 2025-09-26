const {model,Schema} = require('mongoose');
//const passport = require('passport');
//const bcrypt = require('bcrypt');
const candidateSchema = new Schema({
  
  name:{
     type:String ,
     required : true
  },
  party:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  votes:[
    {
      user:{ 
       type: mongoose.Schema.types.ObjectId,
      ref:"User",
      required: true
    },
    votedAt:{
      type: Date,
      default: Date.now()
    }
  }
  ],
  voteCount:{
    type:Number,
    default: 0
  }
  
 
});
const Candidate = model('candidate',candidateSchema);
module.exports = Candidate;