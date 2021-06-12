const createTree = (ctx) => {
  return function drawTree(
    startX,
    startY,
    len,
    angle,
    branchWidth,
    color1,
    color2
  ) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.shadowBlur = 15
    ctx.shadowColor = 'black'

    ctx.translate(startX, startY);
    ctx.rotate((angle * Math.PI) / 180);

    ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len);
    if (angle > 0) {
      ctx.bezierCurveTo(10, -len/2, 20, -len/2, 0, -len)
    } else {
      ctx.bezierCurveTo(10, -len / 2, -20, -len / 2, 0, -len);
    }
    ctx.stroke();

    if (len < 15) {
      ctx.beginPath()
      if (Math.random() > 0.5) {
        ctx.arc(0, -len, 20, 0, Math.PI/2)
      } else {
        ctx.arc(0, -len, 20, Math.PI, Math.PI/2, true);
      }
      ctx.fill()
      ctx.restore();
      return;
    }

    drawTree(0, -len, len * 0.75, angle + 10, branchWidth * 0.7, color1, color2);
    drawTree(0, -len, len * 0.75, angle - 10, branchWidth * 0.7, color1, color2);

    ctx.restore();
  };
};

const start = (canvas) => {
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
    drawTree(width / 2, height - 80, 150, 0, 30, "pink", "rgba(100, 240, 100)");
  };

  setup();
};

export default {
  start,
};
