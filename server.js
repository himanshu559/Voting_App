const express = require('express');
const app = express();

const userRouter = require('./routes/userRoute');

const connectDB = require('./db');
connectDB();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;



app.use('/user',userRouter);
app.listen(PORT,()=>{
  console.log(`server is Running  ${PORT}`);
})