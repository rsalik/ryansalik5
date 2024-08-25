function _array2DRippleUpdate<T>(
  setter: (x: number, y: number, value: T) => void,
  x: number,
  y: number,
  sizeX: number,
  sizeY: number,
  value: T,
  delay: number,
  updated: boolean[][]
) {
  if (x < 0 || x >= sizeX || y < 0 || y >= sizeY) return;
  if (updated[x][y]) return;

  setter(x, y, value);
  updated[x][y] = true;

  setTimeout(() => {
    if (!updated[x][y - 1]) _array2DRippleUpdate(setter, x, y - 1, sizeX, sizeY, value, delay, updated);
    if (!updated[x][y + 1]) _array2DRippleUpdate(setter, x, y + 1, sizeX, sizeY, value, delay, updated);
    if (!updated[x - 1] || !updated[x - 1][y])
      _array2DRippleUpdate(setter, x - 1, y, sizeX, sizeY, value, delay, updated);
    if (!updated[x + 1] || !updated[x + 1][y])
      _array2DRippleUpdate(setter, x + 1, y, sizeX, sizeY, value, delay, updated);
  }, delay);
}

export function array2DRippleUpdate<T>(
  setter: (x: number, y: number, value: T) => void,
  x: number,
  y: number,
  sizeX: number,
  sizeY: number,
  value: T,
  delay = 28
) {
  const updated = new Array(sizeX).fill(false).map(() => new Array(sizeY).fill(false));

  const cancel = () => {
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        updated[i][j] = true;
      }
    }
  };

  _array2DRippleUpdate(setter, x, y, sizeX, sizeY, value, delay, updated);

  return cancel;
}

// Ok yes this is not an animation but too lazy to make a new file
export function colorMix(hex1: string, hex2: string, weight: number) {
  const [rA, gA, bA] = hex1.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const [rB, gB, bB] = hex2.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * weight)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * weight)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * weight)
    .toString(16)
    .padStart(2, '0');
  return '#' + r + g + b;
}
