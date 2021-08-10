import PaintingManager from "../playground/genart/index.js";

window.onload = () => {
  const canvas = document.getElementById("animationCanvas");
  const paintingManager = new PaintingManager(canvas);
  const buttons = document.querySelectorAll(".paintingButton");

  buttons.forEach((button, index) => {
    const paintigToDraw = PaintingManager.PaintingsArray[index];
    if (paintigToDraw) {
      console.log("Binding button:", button.innerText, ' to painting :', paintigToDraw, 'Index:', index)
      button.addEventListener('click', () => {
        paintingManager.paint(paintigToDraw)
      })
    }
  })

  paintingManager.paint(PaintingManager.Paintings.painting2);
};
