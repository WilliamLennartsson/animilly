import {
  createCollatzSequence,
  CollatzConfig,
  CollatzAnimation,
  CollatzAnimationHandler,
} from "./collatz.js";

const collatz = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  let animationFrame;

  const animationHandler = new CollatzAnimationHandler();

  const clearBackground = () => {
    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  };

  const resetTransform = (x, y) => {
    ctx.resetTransform();
    ctx.translate(x, y);
  };

  const renderCollatzSequence = (sequence, reversed, len, angle, color) => {
    if (reversed) angle = -angle;
    // Sequence
    sequence.forEach((value, i) => {
      renderCollatzSection(value, len, angle, color);
    });
  };

  const renderCollatzSection = (value, len, angle, color) => {
    const isEven = value % 2 == 0;
    // Rotation direction
    if (isEven) {
      ctx.rotate(angle / 2);
    } else {
      ctx.rotate(-angle);
    }
    // Draw
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    ctx.translate(0, -len);
  };

  const renderCollatzTree = (config = new CollatzConfig()) => {
    // console.log(`config`, config);
    if (config.animate) {
      const animation = new CollatzAnimation(config);
      console.log("Adding new animation to queue");
      animationHandler.add(animation);
      if (!animationFrame) requestAnimationFrame(update);
    } else {
      for (let i = 1; i <= config.numBranches; i++) {
        resetTransform(config.x, config.y);
        const collatz = createCollatzSequence(config.calculateN(i));
        const sequence = collatz.sequence.reverse();
        renderCollatzSequence(
          sequence,
          config.reversed,
          config.sectionLength,
          config.angle,
          config.color
        );
      }
    }
  };

  // TODO: Animate
  const update = () => {
    const updatesPerFrame = 3; // Math.floor(Math.random() * 10) + 1
    for (let i = 0; i < updatesPerFrame; i++) {
      const animation = animationHandler.current;
      if (animation <= 0) {
        console.log("No animations in queue");
        animationFrame = null;
        return;
      }
      if (animation.sectionIndex == 0) {
        resetTransform(animation.config.x, animation.config.y);
      }

      const section = animation.section;
      // console.log(animation.sequenceIndex, animation.sectionIndex, animation.section)
      if (section !== null) {
        renderCollatzSection(
          section,
          animation.config.sectionLength,
          animation.config.angle,
          animation.config.color
        );
      }
      animationHandler.step();
    }
    animationFrame = requestAnimationFrame(update);
  };

  clearBackground();
  // Wierd starWeb
  // renderCollatzTree({
  //   x: width * 0.5,
  //   y: height * 0.5,
  //   numBranches: 500,
  //   reversed: false,
  //   sectionLength: 25,
  //   angle: Math.PI / 1.25,
  // });

  // renderCollatzTree(new CollatzConfig({
  //   x: 100,
  //   y: 100
  // }));
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.15,
      y: height,
      numBranches: 300,
      reversed: true,
      sectionLength: 4,
      angle: Math.PI / 8,
      animate: false,
      color: "rgba(190, 255, 190, 0.2)",
    })
  );
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.35,
      y: height,
      numBranches: 200,
      reversed: false,
      sectionLength: 4,
      angle: Math.PI / 14,
      animate: false,
      color: "rgba(200, 255, 255, 0.2)",
    })
  );
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.5,
      y: height,
      numBranches: 100,
      reversed: false,
      sectionLength: 12,
      angle: Math.PI / 8,
      animate: true,
      color: "rgba(255, 210, 140, 0.4)",
    })
  );
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.75,
      y: height,
      numBranches: 200,
      reversed: true,
      sectionLength: 2,
      angle: Math.PI / 8,
      calculateN: (i) => i * (Math.random() * 5),
      animate: false,
      color: "rgba(255, 150, 255, 0.2)",
    })
  );
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.85,
      y: height,
      numBranches: 200,
      reversed: true,
      sectionLength: 6,
      angle: Math.PI / 24,
      animate: false,
      color: "rgba(255, 255, 255, 0.2)",
    })
  );
  renderCollatzTree(
    new CollatzConfig({
      x: width * 0.95,
      y: height,
      numBranches: 300,
      reversed: false,
      sectionLength: 3,
      angle: Math.PI / 24,
      calculateN: i => i * 1000,
      animate: false,
      color: "rgba(40, 200, 255, 0.2)",
    })
  );
};

export default {
  collatz,
};
