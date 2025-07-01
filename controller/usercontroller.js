const user=require('../model/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register=async(req, res)=>{
    const { name,email,password}=req.body
    try {
        const userexist=await user.findOne({email})
        if (userexist){
            return res.json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newuser = new user({
            name,
            email,
            password: hashedPassword
        });
        await newuser.save();
        const token = jwt.sign({ id:newuser._id},process.env.JWT_SECRET)
        res.json({token})
    }catch(err){
        res.send(err.message)
    }
};

const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const userexist=await user.findOne({email})
        if (!userexist) {
            return res.send({ message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, userexist.password)
        if (!isMatch) {
            return res.send({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: userexist._id }, process.env.JWT_SECRET)
        res.json({ token })
    } catch (err) {
        res.send(err.message)
    }
};

module.exports = {
    register,
    login}