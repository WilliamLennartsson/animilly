import dotenv from "dotenv";
dotenv.config();

const config = {
  CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
};

export default config;
