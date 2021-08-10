import { createTree } from "../../fractals/fractalTree";
import { toRGBA } from "../utils";
import { createWave } from "../wave";

const NUM_BRANCHES = 20;
const NUM_TREES = 10;

export const painting1 = (canvas, ctx, rng, width, height) => {
  console.log("Creating painting 1");
  // ctx.fillStyle = toRGBA(72, 112, 120, 1);
  // ctx.fillRect(0, 0, width, height);
  const yDivide = height * rng();

  const drawScene = () => {
    // Background
    ctx.fillStyle = toRGBA(59, 85, 163, 1);
    ctx.fillRect(0, 0, width, height);

    drawSky(0, 0, width, yDivide);
    drawWaves();
    drawHouse();
    // drawTrees()
  };

  const drawHouse = () => {
    const x = 50;
    const y = yDivide;
    const w = 200;
    const h = 200;

    // Rooftop coordinates
    const topPointX = w * 0.5 + x;
    const topPointY = y - h * 0.5;

    ctx.fillStyle = toRGBA(40, 40, 40, 1);
    ctx.fillRect(x, y, w, h);

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(topPointX, topPointY);
    ctx.lineTo(x + w, y);

    ctx.fill()
    ctx.restore();
  };

  const drawSky = (x, y, w, h) => {
    ctx.fillStyle = toRGBA(45, 130, 175, 0.3);

    ctx.fillRect(x, y, w, h);
  };

  const drawWaves = () => {
    const wave = createWave(ctx, rng);
    for (let i = 0; i < NUM_BRANCHES; i++) {
      const angle = 0; // Math.sin(Math.PI * 0.1)// Math.sin(width / 5 * i)
      const translateAmount = rng() * (height - yDivide);

      ctx.save();
      ctx.translate(0, translateAmount);
      ctx.rotate(-angle);

      wave(-20, yDivide, width, height);
      ctx.restore();
    }
  };

  const drawTrees = () => {
    const tree = createTree(ctx, rng);
    for (let i = 0; i < NUM_TREES; i++) {
      const x = rng() * width;
      const y = yDivide + rng() * (height - yDivide);
      const len = rng() * 150 + 100;
      const angle = Math.PI * 0.2;
      const branchWidth = rng() * 13 + 7;
      const color1 = toRGBA(20, 20, 20, 0.8);
      const color2 = toRGBA(14, 138, 40, 0.8);

      tree(x, y, len, angle, branchWidth, color1, color2);
    }
  };

  drawScene();
};
