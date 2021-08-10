import { toRGBA } from "./utils";

export const createWave = (ctx, rng) => {
  const drawCurve = (p1, p2, curve = 30, lineWidth = 20) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = toRGBA(22, 54, 29, 0.3);

    const colorRange = (min, max) => (max - min) * rng() + min;

    // Green colors
    // 14, 138, 40
    // 5, 33, 11
    // 31, 54, 36
    const r = colorRange(5, 100);
    const g = colorRange(35, 138);
    const b = colorRange(31, 54);
    ctx.fillStyle = toRGBA(r, g, b, 1);
    ctx.lineWidth = lineWidth;

    const startX = p1.x;
    const startY = p1.y;
    // ctx.translate(startX, startY);
    ctx.moveTo(startX, startY);

    const k = (p2.y - p1.y) / (p2.x - p1.x);
    // calc line's midpoint
    var midX = p1.x + (p2.x - p1.x) * 0.5;
    var midY = p1.y + (p2.y - p1.y) * 0.5;
    // console.log(`k, midX, midY`, k, midX, midY);

    // TODO: This only works if p1 & p2 have same y
    const controlPoint1 = { x: midX, y: midY + curve };
    const controlPoint2 = { x: midX, y: midY - curve };

    // ctx.lineTo(p2.x, p2.y)
    ctx.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      p2.x,
      p2.y
    );
    ctx.stroke();

    ctx.fill();
    ctx.restore();
  };

  return (x, y, w, h) => {
    // ctx.fillStyle = toRGBA(100, 190, 110, 0.7);
    // ctx.fillStyle = toRGBA(255, 255, 255, 0.7);
    // ctx.fillRect(x, y, w, h);

    const numSegments = Math.floor(rng() * 12);
    const prevPoint = { x, y };

    const hillS_CURVE = 100;
    const BRANCH_WIDTH = 10;

    for (let i = 0; i < numSegments; i++) {
      const start = {
        x: prevPoint.x,
        y: prevPoint.y,
      };

      const yVaiation = rng() - 0.5;
      const endX = (w / numSegments) * (i + 1);
      const endY = y + hillS_CURVE * Math.sin(endX) * yVaiation;

      const end = {
        x: endX,
        // x: 500,
        y: endY,
      };

      const lineWidth = rng() * BRANCH_WIDTH + (numSegments - i + 1);
      const segmentCurve = rng() * 300;

      drawCurve(start, end, segmentCurve, lineWidth);
      prevPoint.x = end.x;
      prevPoint.y = end.y;
    }
  };

}