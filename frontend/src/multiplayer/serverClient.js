const { Manager } = require("socket.io-client");

const REQ_MOVE = 'move'

const setupIO = () => {
  const galleryId = 'gallery123'
  const authToken = '123'
  
  const manager = new Manager("http://localhost:3000", {
    reconnectionDelayMax: 10000,
    query: {
      "galleryId": galleryId,
      "token": authToken
    },
  });

  const socket = manager.socket("/", {
    auth: {
      token: "123",
    },
  });
  return { manager, socket }
}

export default class GameClient {
  constructor(params) {
    const { manager, socket } = setupIO();
    this.manager = manager
    this.socket = socket
  }

  requestMove(player, dir) {
    this.socket.emit(REQ_MOVE, res => {
      console.log(`REQUEST MOVE res`, res)
    })
  }
}
export const init = (user) => {
  const { manager, socket } = setupIO();

  var messages = document.getElementById("messages");
  var form = document.getElementById("form");
  var input = document.getElementById("input");

  socket.emit("chat message", 'Hejhej');
  // form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit("chat message", input.value);
  //     input.value = "";
  //   }
  // });

  // socket.on("chat message", function (msg) {
  //   var item = document.createElement("li");
  //   item.textContent = msg;
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });
};
