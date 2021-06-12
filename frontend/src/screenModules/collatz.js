import Collatz from "../playground/collatz/index.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  Collatz.collatz(canvas);
};
