import ImageProcessing from "../imageProcessing";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  const animation = new ImageProcessing(canvas);
  animation.start();
};
