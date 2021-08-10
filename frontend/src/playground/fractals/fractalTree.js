export const createTree = (ctx, rng) => {
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
    ctx.shadowBlur = 15;
    ctx.shadowColor = "black";

    ctx.translate(startX, startY);
    ctx.rotate((angle * Math.PI) / 180);

    ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len);
    const curve = Math.floor((rng ? rng() : Math.random()) * 100)
    if (angle > 0) {
      ctx.bezierCurveTo(10, -len / 2, curve, -len / 2, 0, -len);
    } else {
      ctx.bezierCurveTo(10, -len / 2, -curve, -len / 2, 0, -len);
    }
    ctx.stroke();

    if (len < 15) {
      ctx.beginPath();
      if (angle > 0) {
        ctx.arc(0, -len, 20, 0, Math.PI / 2);
      } else {
        ctx.arc(0, -len, 20, Math.PI, Math.PI / 2, true);
      }
      ctx.fill();
      ctx.restore();
      return;
    }

    drawTree(
      0,
      -len,
      len * 0.75,
      angle + 10,
      branchWidth * 0.7,
      color1,
      color2
    );
    drawTree(
      0,
      -len,
      len * 0.75,
      angle - 10,
      branchWidth * 0.7,
      color1,
      color2
    );

    ctx.restore();
  };
};
