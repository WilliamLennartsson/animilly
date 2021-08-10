import { randomBellCurve } from "../../utils/bellCurve";

/** -- COLORS -- */
export const toRGBA = (r, g, b, a) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/** -- END COLORS -- */

/** -- POSITIONS -- */
export const randomPos = (maxX, maxY) => {
  return { x: Math.random() * maxX, y: Math.random() * maxY };
};

export const randomGaussianPos = (maxX, maxY) => {
  return { x: randomBellCurve() * maxX, y: randomBellCurve() * maxY };
};

export const randomPosArray = (numOfPoints, maxX, maxY) => {
  const posArr = [];
  for (let i = 0; i < numOfPoints; i++) {
    posArr.push(randomPos(maxX, maxY));
  }
  return posArr;
};
/** -- END POSITIONS -- */