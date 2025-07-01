const mongoose=require('mongoose')

const bookSchema = new mongoose.Schema({

title:{type:string, required:true},
genre:{type:string, required:true},
price:{type:string, required:true},
reviews: [{type: mongoose.Schema.Types.ObjectId,ref: 'Review'}],

})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book


