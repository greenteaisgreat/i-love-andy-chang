const { timeStamp } = require('console');
const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://nbornstein:MeTaLgEaR7@grad-assess.mjsd8wx.mongodb.net/';


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

const model = new mongoose.Schema({
  item: {type: String, required: true},
  created_at: {type: Date, default: Date.now(), required: true}
});

const Task = mongoose.model('Task', model);

module.exports = Task; // <-- export your model
