import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import setupMongoose from "./db/setup.mjs";
import userRoute from "./routes/userRoute.mjs";
import galleryRoute from "./routes/galleryRoute.mjs";
import config from "./db/config.mjs";
import GalleryApp from "./galleryAPI/galleryAPI.mjs";
const app = express();
const server = http.createServer(app);
// TODO: RedisIO for multiple synced servers
const PORT = config.PORT; // <- add env
console.log(`config server file`, config);
console.log(`PORT`, PORT);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const allowlist = ["http://localhost:8080"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Middlewares
app.use(express.json());
app.use(cors({ origin: allowlist[0] })); // TODO: Fix corsDelegate
app.use(helmet());

// Routes
app.use("/users", userRoute);
app.use("/galleries", galleryRoute);

// Mongoose
setupMongoose();

GalleryApp(io)

server.listen(PORT, () => {
  console.log("listening on " + PORT);
});

const joinRoom = (player, roomId) => {};

const authMiddleware = (socket, next) => {
  const handshakeData = socket.request;
  console.log("IO auth middleware:", handshakeData["token"]);
  next();
};

// io.use(authMiddleware);
