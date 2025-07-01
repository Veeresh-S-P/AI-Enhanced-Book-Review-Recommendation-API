const mongoose = require('mongoose')
require('dotenv').config()
 


const connection = async () => {
  try {
    await mongoose.connect(process.env.mongoURI)
    console.log('dbconnected ')
  } catch (err) {
    console.error('dbconnection failed')
    return;
  }
}

module.exports = connection