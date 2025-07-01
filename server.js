const express=require('express');
const app=express();
require('dotenv').config()
const userRouter = require('./routes/userroute')
const tagRouter = require('./routes/tagroute')
const reviewRouter = require('./routes/reviewroute')
const bookRouter = require('./routes/bookroute')

app.use(express.json());
const connection=require('./config/db')
connection();



app.use('/api/books', bookRouter)   
app.use('/api/reviews', reviewRouter)


app.use('/api/tags', tagRouter)
app.use('/api/users', userRouter)
app.listen(8080, ()=>{
    console.log('Server running on 8080')
})