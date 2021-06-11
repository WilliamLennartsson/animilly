import ImageProcessing from "../playground/imageProcessing.js";
import Playground from "../playground/index.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  Playground.collatz(canvas);

  // const animation = new ImageProcessing(canvas);
  // animation.start();
};
