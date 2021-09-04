import dotenv from "dotenv";
dotenv.config();

const config = {
  CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000
};

console.log(`config`, config)

export default config;
