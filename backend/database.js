const connectDB = async () => {
  try {
    const mongoose = require("mongoose");
// const listen = require("./index");
    const dotenv = require("dotenv");
    dotenv.config();
    const DB = process.env.MONGO_URI;
    const conn = await mongoose.connect(DB);
    console.log("Database Connection Established");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// const DB = mongoose.connect('mongodb+srv://meet:Meet@2310@answerly.gnscqai.mongodb.net/?retryWrites=true&w=majority')