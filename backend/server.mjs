import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import setupMongoose from "./db/setup.mjs";
import userRoute from "./routes/userRoute.mjs";
import galleryRoute from "./routes/galleryRoute.mjs";
const app = express();
const server = http.createServer(app);
// TODO: RedisIO for multiple synced servers

const PORT = process.env.PORT || 3000; // <- add env

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
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

const state = {
  "98123102930okok": {
    players: [
      {
        username: "Pelle",
        position: { x: 0, y: 0, z: 0 },
        rotation: 0,
        actions: ["MOVE_LEFT", "JUMP"],
      },
    ],
  },
};

// Sockets
io.on("connection", (socket) => {
  const token = socket.handshake.query.token;
  const galleryId = socket.handshake.query.galleryId;
  const userId = socket.handshake.query.userId;

  const player = {
    userId: userId,
    username: "Pelle",
    position: { x: 0, y: 0, z: 0 },
    rotation: 0,
    actions: [],
  };
  
  state[galleryId].players.push(player);

  socket.on("disconnect", () => {
    const userIndex = state[galleryId].players.indexOf(player);
    state[galleryId].players.splice(userIndex, 1)
    console.log("user disconnected");
  });

  if (!state[galleryId]) state[galleryId] = { id: galleryId, players: [] };

  socket.join(galleryId);

  socket.on("move", (dir) => {
    io.emit("move", dir);
    console.log("move: " + dir);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:3000");
});

const joinRoom = (player, roomId) => {};

const authMiddleware = (socket, next) => {
  const handshakeData = socket.request;
  console.log("IO auth middleware:", handshakeData._query["token"]);
  next();
};

io.use(authMiddleware);
