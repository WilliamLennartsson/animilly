import Fractals from "../playground/fractals/index.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  Fractals.start(canvas);
};
