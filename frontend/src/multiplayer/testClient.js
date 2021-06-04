const { Manager } = require("socket.io-client");

const setupIO = () => {
  const manager = new Manager("http://localhost:3000", {
    reconnectionDelayMax: 10000,
    // query: {
    //   "my-key": "my-value",
    // },
  });

  const socket = manager.socket("/", {
    auth: {
      token: "123",
    },
  });
  return { manager, socket }
}

export const init = () => {
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
