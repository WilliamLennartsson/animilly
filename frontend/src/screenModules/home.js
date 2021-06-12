import ImageProcessing from "../playground/imageProcessing.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  const animation = new ImageProcessing(canvas);
  animation.start();
};
