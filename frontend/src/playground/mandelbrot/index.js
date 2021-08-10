import { palette } from "./colors.js";
import { getRelativePoint } from "./utils.js";

const mandelKingen = (canvas) => {
  const ctx = canvas.getContext("2d");

  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  ctx.canvas.width = WIDTH;
  ctx.canvas.height = HEIGHT;
  console.log("Kör mandelkingen, kör!");

  let worker;
  let colorPalette = [];
  let REAL_SET = { start: -2, end: 1 };
  let IMAGINARY_SET = { start: -1, end: 1 };
  const ZOOM_FACTOR = 0.1;
  const TASKS = [];

  const start = () => {
    for (let col = 0; col < WIDTH; col++) TASKS[col] = col;
    worker.postMessage({ col: TASKS.shift() });
  };

  const draw = (res) => {
    if (TASKS.length > 0) worker.postMessage({ col: TASKS.shift() });

    const { col, mandelbrotSets } = res.data;
    for (let i = 0; i < HEIGHT; i++) {
      const [m, isMandelbrotSet] = mandelbrotSets[i];
      const c = isMandelbrotSet
        ? [0, 0, 0]
        : colorPalette[m % (colorPalette.length - 1)];
      ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
      ctx.fillRect(col, i, 1, 1);
    }
  };

  const init = () => {
    if (worker) worker.terminate();
    worker = new Worker("worker.js");
    worker.postMessage({
      w: WIDTH,
      h: HEIGHT,
      realSet: REAL_SET,
      imaginarySet: IMAGINARY_SET,
      isSettingUp: true,
    });
    start();
    colorPalette = palette();
    worker.onmessage = draw;
  };

  canvas.addEventListener("dblclick", (e) => {
    const zfw = WIDTH * ZOOM_FACTOR;
    const zfh = HEIGHT * ZOOM_FACTOR;

    REAL_SET = {
      start: getRelativePoint(
        e.pageX - canvas.offsetLeft - zfw,
        WIDTH,
        REAL_SET
      ),
      end: getRelativePoint(e.pageX - canvas.offsetLeft + zfw, WIDTH, REAL_SET),
    };
    IMAGINARY_SET = {
      start: getRelativePoint(
        e.pageY - canvas.offsetTop - zfh,
        HEIGHT,
        IMAGINARY_SET
      ),
      end: getRelativePoint(
        e.pageY - canvas.offsetTop + zfh,
        HEIGHT,
        IMAGINARY_SET
      ),
    };

    init();
  });
  init();
};

export default mandelKingen;
