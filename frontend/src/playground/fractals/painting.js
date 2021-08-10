const colors = ["#70f503", "#00541e"];

export const painting = (canvas, ctx, width, height) => {
  const ground = () => {
    const len = 150;
    const startX = 0;
    const startY = height - 300;
    const numX = 50;
    const numY = 5;
    const xStep = (width - startX) / numX;
    const yStep = (height - startY) / numY;
    
    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        const x = (i * xStep) + startX
        const y = (j * yStep) + startY;

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();

        ctx.strokeStyle = colors[0];
        ctx.fillStyle = colors[1];
        ctx.lineWidth = 10;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "black";


        ctx.bezierCurveTo(-len / 2, 10, -len / 2, 40, -len, 0);

        ctx.stroke();
        ctx.restore();
      }
    }
  };

  ground();
};
