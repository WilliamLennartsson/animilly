const CliffardConstants = [
  [1.4, 1.6, 1.0, 0.7],
  [1.6, -0.6, -1.2, 1.6],
  [1.7, 1.7, 0.6, 1.2],
  [-17, 1.3, -0.1, -1.2],
  [-1.7, 1.8, 1.9, -0,4],
  [-1.8, -2.0, -0.5, -0.9]
]

const getCliffardVars = (index) => {
  return CliffardConstants[index % CliffardConstants.length]  
}


const createPointsAlongY = (numOfPoints, min, max) => {
  // create points. each aligned to left edge of screen,
  // spread out top to bottom.
  const points = [];
  for (let y = min; y < max; y += 5) {
    points.push({
      x: 0,
      y: y,
      vx: 0,
      vy: 0,
    });
  }
  return points;
};

const createPointsAtPoint = (numOfPoints, x, y) => {
  // create points. each aligned to left edge of screen,
  // spread out top to bottom.
  const points = [];
  for (let i = 0; i < numOfPoints; i += 5) {
    points.push(createPoint(x, y));
  }
  return points;
};

const createRandomPoints = (numOfPoints, w, h) => {
  // create points. each aligned to left edge of screen,
  // spread out top to bottom.
  const points = [];
  for (let i = 0; i < numOfPoints; i += 5) {
    points.push(
      createPoint(Math.floor(Math.random() * w), Math.floor(Math.random() * h))
    );
  }
  return points;
};

const createPoint = (x, y) => {
  return {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
  };
};

const flowField = (canvas) => {
  const ctx = canvas.getContext("2d");

  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  ctx.canvas.width = WIDTH;
  ctx.canvas.height = HEIGHT;

  // random attractor params
  // const a = Math.random() * 4 - 2;
  // const b = Math.random() * 4 - 2;
  // const c = Math.random() * 4 - 2;
  // const d = Math.random() * 4 - 2;
  const a = 1.6;
  const b = -0.6;
  const c = -1.2;
  const d = 1.6;

  const points = createPointsAlongY(WIDTH, 0, HEIGHT);
  // const points = createRandomPoints(WIDTH, WIDTH, HEIGHT);

  const init = () => {
    ctx.fillStyle = "#999999";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.lineWidth = 0.1;
    update();
  };

  const update = () => {
    for (let i = 0; i < points.length; i++) {
      // get each point and do what we did before with a single point
      const p = points[i];
      const value = getValue(p.x, p.y);
      p.vx += Math.cos(value) * 0.4;
      p.vy += Math.sin(value) * 0.4;

      // move to current position
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);

      // add velocity to position and line to new position
      p.x += p.vx;
      p.y += p.vy;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      // apply some friction so point doesn't speed up too much
      p.vx *= 0.99;
      p.vy *= 0.99;

      // wrap around edges of screen
      // if (p.x > WIDTH) p.x = 0;
      // if (p.y > HEIGHT) p.y = 0;
      // if (p.x < 0) p.x = WIDTH;
      // if (p.y < 0) p.y = HEIGHT;
    }

    // call this function again in one frame tick
    requestAnimationFrame(update);
  };

  // const getValue = (x, y) => {
  //   return (Math.sin(x * 0.01) + Math.sin(y * 0.01)) * Math.PI * 2;
  // }
  const getValue = (x, y) => {
    // clifford attractor
    // http://paulbourke.net/fractals/clifford/

    // scale down x and y
    const scale = 0.005;
    x = (x - WIDTH / 2) * scale;
    y = (y - HEIGHT / 2) * scale;

    // attactor gives new x, y for old one.
    const x1 = Math.sin(a * y) + c * Math.cos(a * x);
    const y1 = Math.sin(b * x) + d * Math.cos(b * y);

    // find angle from old to new. that's the value.
    return Math.atan2(y1 - y, x1 - x);
  };

  init();
};

export default flowField;
