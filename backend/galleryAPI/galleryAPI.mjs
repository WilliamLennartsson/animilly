import { v4 } from "uuid";
const messages = new Set();
const users = new Map();

const galleries = new Map();

const defaultUser = {
  id: "anon",
  name: "Anonymous",
};

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("REQUEST_JOIN_ROOM", (data) => this.handleJoinGallery(data));

    socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value) => this.handleMessage(value));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  handleJoinGallery(data) {
    console.log("Handling join gallery");
    const { user, galleryName } = data;

    // TODO: Create player from user
    const rgbToHex = (r, g, b) =>
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    const randomRGBValue = () => Math.floor(Math.random() * 255);
    const randomHex = () =>
      rgbToHex(randomRGBValue(), randomRGBValue(), randomRGBValue());

    const rndColour = randomHex();
    console.log(`rndColour`, rndColour);
    const player = {
      id: v4(),
      displayName: user.displayName,
      userId: user.id,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      model: {
        type: "BASIC_MESH",
        color: rndColour,
      },
    };

    if (user && galleryName) {
      this.socket.join(galleryName);
      this.emitToRoom(galleryName, "PLAYER_JOINED", player);
    }
  }

  emitToRoom(room, command, message) {
    this.io.to(room).emit(command, message);
  }
  emitToRoom_exludeSender(room, command, message) {
    this.socket.to(room).emit(command, message);
  }

  // sendMessage(message) {
  //   this.io.sockets.emit("message", message);
  // }

  // getMessages() {
  //   messages.forEach((message) => this.sendMessage(message));
  // }

  // handleMessage(value) {
  //   const message = {
  //     id: v4(),
  //     user: users.get(this.socket) || defaultUser,
  //     value,
  //     time: Date.now(),
  //   };

  //   messages.add(message);
  //   this.sendMessage(message);

  //   setTimeout(() => {
  //     messages.delete(message);
  //     this.io.sockets.emit("deleteMessage", message.id);
  //   }, messageExpirationTimeMS);
  // }

  disconnect() {
    users.delete(this.socket);
  }
}

function GalleryApp(io) {

  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

export default GalleryApp;

// const REQUEST_MOVE = "REQUEST_MOVE";
// const REQUEST_JOIN_ROOM = "REQUEST_JOIN_ROOM";
// // Sockets
// io.sockets.on("connection", (socket) => {
//   const token = socket.handshake.query.token;
//   const galleryId = socket.handshake.query.galleryId;
//   const userId = socket.handshake.query.userId;
//   console.log(`socket.handshake.`, socket.handshake.query);
//   if (token && userId) {
//   }
//   // const player = {
//   //   userId: userId,
//   //   username: "Pelle",
//   //   position: { x: 0, y: 0, z: 0 },
//   //   rotation: 0,
//   //   actions: [],
//   // };

//   // state[galleryId].players.push(player);

//   socket.on(REQUEST_JOIN_ROOM, (data) => {
//     console.log(`Command: `, REQUEST_JOIN_ROOM);
//     console.log(`data`, data);
//   });

//   socket.on("disconnect", () => {
//     const userIndex = state[galleryId].players.indexOf(player);
//     state[galleryId].players.splice(userIndex, 1);
//     console.log("user disconnected");
//   });

//   // if (!state[galleryId]) state[galleryId] = { id: galleryId, players: [] };

//   // socket.join(galleryId);

//   socket.on("move", (dir) => {
//     io.emit("move", dir);
//     console.log("move: " + dir);
//   });
// });
