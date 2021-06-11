import { createCollatzSequence } from "./collatz.js";

const collatz = (canvas) => {
  canvas.height = 1080;
  canvas.width = 1920;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  const clearBackground = () => {
    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  };

  const renderCollatzSequence = (sequence, reversed, len, angle) => {
    if (reversed) angle = -angle;

    // Sequence
    sequence.forEach((value, i) => {
      const isEven = value % 2 == 0;

      if (isEven) {
        ctx.rotate(angle / 2);
      } else {
        ctx.rotate(-angle);
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();

      ctx.translate(0, -len);
    });
  };

  const renderCollatzTree = ({
    x = 0,
    y = 0,
    numBranches = 10,
    reversed = false,
    sectionLength = 5,
    angle = Math.PI / 12
  }) => {
    console.log(`x`, x)
    for (let i = 0; i < numBranches; i++) {
      ctx.resetTransform();
      ctx.translate(x, y);
      const collatz = createCollatzSequence(i * 10 + 1);
      const sequence = collatz.sequence.reverse();
      renderCollatzSequence(sequence, reversed, sectionLength, angle);
    }
  };

  clearBackground();
  renderCollatzTree({
    x: width * 0.2,
    y: height - 10,
    numBranches: 50,
    reversed: false,
    sectionLength: 5,
    angle: Math.PI / 12
  });
  renderCollatzTree({
    x: width * 0.5,
    y: height - 10,
    numBranches: 500,
    reversed: true,
    sectionLength: 7,
    angle: Math.PI / 16
  });
  renderCollatzTree({
    x: width * 0.75,
    y: height - 10,
    numBranches: 200,
    reversed: false,
    sectionLength: 5,
    angle: Math.PI / 12
  });

  // TODO: Animate
  // const update = () => {
  //   // Background
  //   ctx.fillStyle = "#000000";
  //   ctx.fillRect(0, 0, width, height);
  //   // Render collatz
  //   requestAnimationFrame(update);
  // };
  // update();
};

export default {
  collatz,
};
