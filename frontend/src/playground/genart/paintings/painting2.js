import { toRGBA } from "../utils";

export const painting2 = (canvas, ctx, rng, width, height) => {
  console.log("Creating painting 2");
  ctx.fillStyle = "#343434";
  ctx.fillRect(0, 0, width, height);

  const particlesArray = []
  const NUM_PARTICLES = 100
  const NO_LOOP = true

  const init = (x, y, w, h) => {
    // Background
    ctx.fillStyle = toRGBA(100, 100, 140, 1);
    ctx.fillRect(x, y, width, height);

    // Particle setup
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const x = rng() * width
      const y = rng() * height
      particlesArray.push(new Particle(x, y))
    }
    requestAnimationFrame(update)
  };

  const update = (delta) => {
    // Particle render
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particlesArray.forEach(p => p.draw(ctx))
    }
    // Continue draw loop
    if (!NO_LOOP) {
      requestAnimationFrame(update);
    }
  }

  init()
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y
    this.size = 50
    this.color = toRGBA(100, 200, 100, 1)
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
    ctx.stroke();
    ctx.fill()
    
  }
}