import { createTree } from './fractalTree.js'
import { painting } from './painting.js'

const fractalTreeDemo = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  const drawTree = createTree(ctx);

  const setup = () => {
    canvas.addEventListener("click", () => {
      handleOnClick();
    });
    handleOnClick();
  };

  const update = () => {
    let animationFrame = requestAnimationFrame(update);
  };

  const handleOnClick = () => {
    console.log("Clicked");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    const branchWidth = Math.floor(Math.random() * 50)
    drawTree(width / 2, height - 80, 150, 0, branchWidth, "pink", "rgba(100, 240, 100)");
  };

  setup();
};

const paintingDemo = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  painting(canvas, ctx, width, height)

}

export default {
  fractalTreeDemo,
  paintingDemo
};
