const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose.connect(url).then(
    () => console.log("Connected to db"),
    (err) => console.log(err)
  );
};

module.exports = connectDB;
