export function findThetaFor(value: number): number {
  if (isOutOfRange(value)) {
    return value;
  }
  const theta: number = convergeThetaValue(value);
  return (1 - Math.cos(theta / 2)) / 2;
}

function isOutOfRange(value: number): boolean {
  return value <= 0 || value >= 1;
}

function convergeThetaValue(value: number): number {
  let theta = Math.pow(12 * value * Math.PI, 1 / 3);
  for (let idx = 0; idx < 10; ++idx) {
    theta = (Math.sin(theta) - theta * Math.cos(theta) + 2 * value * Math.PI) / (1 - Math.cos(theta));
  }
  return theta;
}
