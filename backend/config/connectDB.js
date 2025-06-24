const mongoose = require('mongoose');


const connectDB = async (req, res) => {

  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {

      console.log("Db connected");
    }
  } catch (err) {
    console.log(err.message);

  }


}

module.exports = connectDB;