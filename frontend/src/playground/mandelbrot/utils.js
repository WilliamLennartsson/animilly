export const lagrange = ([X1, Y1], [X2, Y2], x) =>
  (Y1 * (x - X2)) / (X1 - X2) + (Y2 * (x - X1)) / (X2 - X1);

export const getRelativePoint = (pixel, length, set) =>
  set.start + (pixel / length) * (set.end - set.start);
