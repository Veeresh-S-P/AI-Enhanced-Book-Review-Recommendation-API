const book =require('../model/bookmodel')


const getAllBooks=async(req,res)=>{
    try {
        const books = await book.find().populate('reviews')
        const booksWithRatings = await (books.map(async (b) => {
            const ratings = b.reviews.map(r => r.rating)
            const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
            return {
                ...b._doc,
                averageRating,
                numberOfReviews: ratings.length,
                latestReviews: b.reviews.slice(-3)
            };
        }));
        res.json(booksWithRatings)
    } catch(err){
        res.send(err.message)
    }
}

const createBook=async(req,res)=>{
    const {title,genre,price} = req.body
    try {
        const newBook = new book({title,genre,price})
        await newBook.save();
        res.json(newBook)
    } catch (err) {
        res.send(err.message)
    }
}

const updateBook=async(req,res)=>{
    const { id } = req.params
    const { title, genre, price } = req.body;
    try {
        const updatedBook = await book.findByIdAndUpdate(id, {
            title,
            genre,
            price
        }, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.send(err.message);
    }
}

const deleteBook=async(req,res)=>{
    const{id}=req.params
    try{   
        await book.findByIdAndDelete(id)
        res.status(204).send()
    }catch(err){
      console.log(err.message)
    }
}



const topreviedbooks=async (req,res) => {
    const n=req.query
    try{
        const topreview= await Book.aggregate(
        {
           $lookup:{
            from:"Review",
            localField:"_id",
            foreignField:"bookid",
            as :"Review Details"
           },


            $addFields:{
                reviewcount:{$size:"$Review Details"}
            },
           $sort:{reviewcount:-1},

           $limit:{n}
        })
        res.json({topreview})
    }catch(err){
        console.log(err.message)
    }
}


// Get most active users (by number of reviews written)
// GET /analytics/top-reviewers?n=3


const getactiveusers=async (req,res) => {
    const {n}=req.query
    try{
        const topusers= await User.aggregate([
            {
                $lookup:{
                    from:"Review",
                    localField:"_id",
                    foreignField:"userid",
                    as :"Review Details"
                }
            },
            {
                $addFields:{
                    reviewcount:{$size:"$Review Details"}
                }
            },
            {
                $sort:{reviewcount:-1}
            },
            {
                $limit:n
            }
        ])
        res.json({topusers})
    }catch(err){
        console.log(err.message)
    }
}




module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    topreviedbooks,
    getactiveusers
}
   