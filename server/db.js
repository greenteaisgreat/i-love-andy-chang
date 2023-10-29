const mongoose = require('mongoose');
const URI = 'mongodb+srv://nbornstein:MeTaLgEaR7@grad-assess.mjsd8wx.mongodb.net/';

const connectToDB = async() => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB!');
  }
  catch (err) {
    console.log('There was an error connecting to the database');
  }
}

module.exports = connectToDB;