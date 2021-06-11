
export const createCollatzSequence = (n) => {
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
