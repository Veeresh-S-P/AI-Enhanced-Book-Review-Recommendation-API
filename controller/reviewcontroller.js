const review= require('../model/reviewmodel')
const createreview=async(req,res)=>{
    const {bookId,userId,reviewText,rating}=req.body
    try {
        const newReview = new review({
            bookId,
            userId,
            reviewText,
            rating
        });
        await newReview.save()
        res.status(201).json(newReview)
    }catch(err){
        res.status(500).send(err.message)
    }
}

const updatereview=async(req,res)=>{
    const {id}=req.params
    const {reviewText,rating }=req.body;
    try{
        const updatedReview=await review.findByIdAndUpdate(id,{
            reviewText,
            rating
        }
        );
        res.json(updatedReview)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deletereview=async(req,res)=>{
    const {id}=req.params
    try{
        await review.findByIdAndDelete(id)
        res.status(204).send()
    }catch(err){
        res.status(500).send(err.message);
    }
}   

module.exports = {
    createreview,
    updatereview,
    deletereview
}