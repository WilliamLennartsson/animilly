import seedrandom from "seedrandom";
import { painting1 } from "./paintings/painting1";
import { painting2 } from "./paintings/painting2";

const paintings = {
  painting1: "painting1",
  painting2: "painting2",
  painting3: "painting3",
  painting4: "painting4",
};

const paintingsArray = Object.values(paintings);

class PaintingManager {
  static Paintings = paintings;
  static PaintingsArray = paintingsArray;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.seed = "ALLLLÅÅAÄÄÄÄÄÄ!!!!";
    this.rng = seedrandom(this.seed);
    // this.setRNGSeed("ALLLLÅÅÅÅÅÅÅÅ!!!!!!");

    this.resize();
    // Listeners
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  setRNGSeed(seed) {
    this.rng = seedrandom(seed);
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  paint(painting) {
    this.setRNGSeed(this.seed);
    switch (painting) {
      case PaintingManager.Paintings.painting1:
        painting1(this.canvas, this.ctx, this.rng, this.width, this.height);
        break;
      case PaintingManager.Paintings.painting2:
        painting2(this.canvas, this.ctx, this.rng, this.width, this.height);
        break;
      default:
        break;
    }
  }
}

export default PaintingManager;
