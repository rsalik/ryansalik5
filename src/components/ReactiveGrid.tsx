import { array2DRippleUpdate, colorMix } from '@/util/animation';
import { useCallback, useEffect, useRef, useState } from 'react';

const CELL_COUNT = 15;
const PADDING = 40;

const GRID_BKG = 'transparent';
const GRID_BKG_ACTIVE = '#E7851a';
const GRID_BKG_ACTIVE2 = '#e7391a';

const GRID_LINE = colorMix('#0f172a', '#ffffff', 0.08);
const GRID_LINE2 = colorMix('#020617', '#ffffff', 0.03);
const GRID_LINE_ACTIVE = colorMix(GRID_BKG_ACTIVE, GRID_LINE, 0.05);
const GRID_LINE_ACTIVE2 = colorMix(GRID_BKG_ACTIVE2, GRID_LINE, 0.05);

const SCALE_FACTOR = 4;

const LINE_WIDTH = SCALE_FACTOR * 2;

const ReactiveGrid = ({ children, setActive }: { children: React.ReactNode; setActive?: (x: boolean) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gridStatus, setGridStatus] = useState<Array<Array<boolean>>>([]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [cellCount, setCellCount] = useState(CELL_COUNT);
  const [cellWidth, setCellWidth] = useState(1);
  const [cellHeight, setCellHeight] = useState(1);
  const [padding, setPadding] = useState(PADDING);

  let rippleCancel = useRef<() => void>(() => {});
  let rippleUpdateValue = useRef<boolean>(true);

  const setCell = (x: number, y: number, value: boolean) => {
    setGridStatus((prevGrid) => {
      if (!prevGrid[x]) return prevGrid;
      prevGrid[x][y] = value;

      return [...prevGrid];
    });
  };

  // Window Resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      setCellCount(window.innerWidth > 640 ? CELL_COUNT : Math.floor(CELL_COUNT * 1.5));
      setPadding(window.innerWidth > 640 ? PADDING : Math.floor(PADDING / 2));

      if (!canvasRef.current) return;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Canvas Sizing
  useEffect(() => {
    if (!canvasRef.current) return;

    rippleCancel.current();

    const canvas = canvasRef.current;

    canvas.width = (width - 2 * padding) * SCALE_FACTOR;
    canvas.height = (height - 2 * padding) * SCALE_FACTOR;

    canvas.style.width = `${width - 2 * padding}px`;
    canvas.style.height = `${height - 2 * padding}px`;

    let cellWidth = (canvas.width - LINE_WIDTH) / cellCount;
    let cellHeight = (canvas.height - LINE_WIDTH) / cellCount;

    // Adjust cell size to fit screen
    if (cellWidth > cellHeight)
      cellHeight = (canvas.height - LINE_WIDTH) / Math.round((canvas.height - LINE_WIDTH) / cellWidth);
    else cellWidth = (canvas.width - LINE_WIDTH) / Math.round((canvas.width - LINE_WIDTH) / cellHeight);

    setCellWidth(cellWidth);
    setCellHeight(cellHeight);

    // Properly size gridStatus array
    const cellCountX = Math.floor(canvas.width / cellWidth);
    const cellCountY = Math.floor(canvas.height / cellHeight);

    const newGrid = [];

    let size = Math.max(cellCountX, cellCountY) + 2;

    for (let i = 0; i < size; i++) newGrid.push(new Array(size).fill(!rippleUpdateValue.current));

    setGridStatus(newGrid);
  }, [width, height, cellCount, padding]);

  // Mouse Move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.pageX);
      setMouseY(e.pageY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Draw Grid
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellCountX = Math.floor(canvas.width / cellWidth);
    const cellCountY = Math.floor(canvas.height / cellHeight);

    for (let i = 0; i < cellCountX; i++) {
      for (let j = 0; j < cellCountY; j++) {
        const x = i * cellWidth + LINE_WIDTH / 2;
        const y = j * cellHeight + LINE_WIDTH / 2;

        const mix = Math.pow((i + j) / (cellCountX + cellCountY), .88);

        const inactiveLine = colorMix(GRID_LINE, GRID_LINE2, mix);

        const activeBkg = colorMix(GRID_BKG_ACTIVE, GRID_BKG_ACTIVE2, mix);
        const activeLine = colorMix(GRID_LINE_ACTIVE, GRID_LINE_ACTIVE2, mix);

        // Add 0.5 to prevent two cells from highlighting at once
        if (
          mouseX >= x / SCALE_FACTOR + padding + 0.5 &&
          mouseX <= (x + cellWidth) / SCALE_FACTOR + padding &&
          mouseY >= y / SCALE_FACTOR + padding + 0.5 &&
          mouseY <= (y + cellHeight) / SCALE_FACTOR + padding
        ) {
          ctx.fillStyle = gridStatus[i]?.[j] ? activeLine : inactiveLine;
        } else {
          ctx.fillStyle = gridStatus[i]?.[j] ? activeBkg : GRID_BKG;
        }

        ctx.fillRect(x, y, cellWidth, cellHeight);

        ctx.strokeStyle = gridStatus[i]?.[j] ? activeLine : inactiveLine;
        ctx.lineWidth = SCALE_FACTOR * 2;

        ctx.strokeRect(x, y, cellWidth, cellHeight);
      }
    }
  }, [mouseX, mouseY, width, height, cellCount, padding, cellHeight, cellWidth, gridStatus]);

  // Window Click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.pageX < padding || e.pageX > width - padding || e.pageY < padding || e.pageY > height - padding) return;

      const x = Math.floor(((e.pageX - padding) / cellWidth) * SCALE_FACTOR);
      const y = Math.floor(((e.pageY - padding) / cellHeight) * SCALE_FACTOR);

      rippleCancel.current();

      // Ripple effect from click
      rippleCancel.current = array2DRippleUpdate(
        setCell,
        x,
        y,
        gridStatus.length,
        gridStatus[0]?.length,
        rippleUpdateValue.current
      );

      rippleUpdateValue.current = !rippleUpdateValue.current;

      if (setActive) setActive(!rippleUpdateValue.current);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [gridStatus, cellWidth, cellHeight, padding, gridStatus.length, setActive]);

  return (
    <div className={`w-screen h-screen relative bg-gradient-to-t from-slate-950 to-slate-900`}>
      <canvas ref={canvasRef} className="absolute top-5 left-5 sm:top-10 sm:left-10" />
      {children}
    </div>
  );
};

export default ReactiveGrid;
