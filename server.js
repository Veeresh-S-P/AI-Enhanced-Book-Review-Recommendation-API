const express=require('express');
const app=express();
require('dotenv').config()
const userRouter = require('./routes/userroute')
app.use(express.json());
const connection=require('./config/db')
connection();



app.use('/api/users', userRouter)
app.listen(8080, ()=>{
    console.log('Server running on 8080')
})