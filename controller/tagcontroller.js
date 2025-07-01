//Tags: create, list
const tags=require('../model/tagmodel')

const createTag = async (req, res) => {
    const {name} = req.body;
    try {
        const newTag =new tags({name});
        await newTag.save();
        res.json(newTag);
    } catch (err) {
        res.send(err.message);
    }
}


const listTags=async(req, res) => {
    try {
        const allTags=await tags.find();
        res.json(allTags);
    } catch(err){
        res.send(err.message);
    }
}

module.exports = { createTag, listTags };