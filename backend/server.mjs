import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import setupMongoose from "./db/setup.mjs";
import userRoute from "./routes/userRoute.mjs";
import galleryRoute from "./routes/galleryRoute.mjs";
const app = express();
const server = http.createServer(app);

// This needs to be defined because of es6 module file format (.mjs)
const __dirname = path.resolve(path.dirname(""));
const PORT = 3000; // <- add env

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});
// io.set("transports", ["websocket"]);

// Only for testing io
// app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(express.json());  
// TODO: Helmet?

// Routes
app.use("/users", userRoute);
app.use("/galleries", galleryRoute);

// Mongoose
setupMongoose();

// Sockets
io.on("connection", (socket) => {
  // const token = socket.handshake.query.token;
  // const galleryId = socket.handshake.query.galleryId;

  socket.broadcast.emit("hi");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:3000");
});
