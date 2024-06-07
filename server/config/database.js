const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Database connection successful");
  } catch (e) {
    console.log("Error occurred while connecting to DB");
    console.error(e);
    process.exit(1);
  }
};

