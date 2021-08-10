
import mandelKingen from "../playground/mandelbrot/index.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  mandelKingen(canvas)
};
