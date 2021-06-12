export const createCollatzSequence = (n) => {
  if (!n || n == 0) return;
  const sequence = [];
  let steps = 0;

  do {
    steps++;
    n = collatz(n);
    sequence.push(n);
  } while (n != 1);

  return {
    sequence,
    steps,
  };
};

export const collatz = (num) => {
  if (num % 2 == 0) {
    return num / 2;
  } else return num * 3 + 1;
};

const defaultParams = {
  x: 0, // x pos of root
  y: 0, // y pos of root
  numBranches: 10, // Number of branches
  reversed: false, // Bend to the right or left
  sectionLength: 5, // Length of each branchsection
  angle: Math.PI / 12, // Curve angle of each section
  calculateN: (i) => i * 100, // How n should be calculated inside loop
  animate: false, // If the tree should animate
  color: "rgba(255, 255, 255, 0.2)", // Color of tree
};
const createDefaultParams = () => {
  return Object.assign({}, defaultParams)
}

export class CollatzConfig {
  constructor(params = createDefaultParams()) {
    params = Object.assign(createDefaultParams(), params);

    this.x = params.x;
    this.y = params.y;
    this.numBranches = params.numBranches;
    this.reversed = params.reversed;
    this.sectionLength = params.sectionLength;
    this.angle = params.angle;
    this.calculateN = params.calculateN;
    this.animate = params.animate;
    this.color = params.color;
  }
}

export class CollatzAnimation {
  static id = 0;
  static increaseId = () => CollatzAnimation.id++;

  constructor(config) {
    this.config = config;
    this.animationSpeed = 5;
    this.sequenceIndex = 0; // branchID
    this.currentSequence = null; // current branch

    this.sectionIndex = 0;
    CollatzAnimation.increaseId();
    this.setNextBranch();
  }

  get sequence() {
    return this.currentSequence;
  }

  get section() {
    if (!this.currentSequence) return null;
    if (this.sectionIndex >= this.currentSequence.length) return null;
    return this.currentSequence[this.sectionIndex];
  }

  setNextBranch() {
    this.sequenceIndex++;
    if (this.sequenceIndex >= this.config.numBranches) {
      return false;
    }
    const collatz = createCollatzSequence(
      this.config.calculateN(this.sequenceIndex)
    );
    const nextSequence = collatz.sequence.reverse()
    this.currentSequence = nextSequence;
    this.sectionIndex = 0;
    return true;
  }

  step() {
    this.sectionIndex++;
    if (this.sectionIndex >= this.currentSequence.length) {
      const isNextBranch = this.setNextBranch();
      return isNextBranch;
    }
    return true;
  }
}

export class CollatzAnimationHandler {
  constructor() {
    this.animations = [];
    this.currentAnimation = null;
  }

  add(animation) {
    const prevNumAnimatiosn = this.animations.length;
    this.animations.push(animation);
    if (prevNumAnimatiosn == 0) {
      this.queueNext();
    }
  }

  queueNext() {
    if (this.currentAnimation) return false;
    if (this.animations.length == 0) return false;
    this.currentAnimation = this.animations[0];
    return true;
  }

  step() {
    if (!this.currentAnimation) return;

    if (!this.currentAnimation.step()) {
      this.currentAnimation = null;
      this.animations.shift();
      this.queueNext();
    }
  }

  get current() {
    return this.currentAnimation;
  }
}
