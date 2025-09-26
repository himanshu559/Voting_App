const express = require('express');
const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URL =  process.env.MONGODB_URL;

const connectDB = async () =>{
  try{
      const conn = await mongoose.connect(MONGODB_URL,{
       useNewUrlParser: true,
      });

    console.log(`mongoDB connected ${conn.connection.host}`);  
  }catch(error){
       console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;