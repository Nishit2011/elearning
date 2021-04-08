const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`Mongodb connect to ${conn.connection.host}`.bold.cyan);
};
module.exports = connectDB;
