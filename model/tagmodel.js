
//Tag – tags like bestseller, classic, biography, etc. (many-to-many with books)
const mongoose=require('mongoose')
const Book = require('./bookmodel')
const User = require('./usermodel')

const tagSchema=new mongoose.Schema({
    name:{type:String,required:true, enum:['bestseller','classic','biography']},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true}
})

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag

