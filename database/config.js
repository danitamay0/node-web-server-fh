const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
     /* useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,*/
    });

    console.log("DB Connected!");
  } catch (err) {
    console.log(err);
    throw new Error("Error to connect DB");
  }
};

module.exports = { dbConnection };
