import mongoose from "mongoose";
import config from './config.mjs'

const initMongoose = () => {
  const connectionString = config.CONNECTION_STRING
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch((err) => console.error("Connection error", err));
};
export default initMongoose;
