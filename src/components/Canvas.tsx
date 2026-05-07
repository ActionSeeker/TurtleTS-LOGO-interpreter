import { useEffect, useRef, useState } from 'react';
import type { Line } from '../types/Line';
import type { CanvasProps } from '../types/CanvasProps';

const Canvas = ({ turtleState }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/TurtleTS-cursor.svg';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || !imageRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    ctx.save();
    ctx.translate(centerX, centerY); // Move (0,0) to the middle of the screen

    // 1. Draw Path Lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    turtleState.lines.forEach((line: Line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });

    // 2. Draw Graphic Cursor
    const { x, y, angle } = turtleState;
    const size = 40;

    ctx.save();
    ctx.translate(x, y); // Position relative to center
    ctx.rotate(((angle + 90) * Math.PI) / 180);
    ctx.drawImage(imageRef.current, -size / 2, -size / 2, size, size);
    ctx.restore();

    ctx.restore(); // Restore back to original canvas top-left origin
  }, [isLoaded, turtleState]);

  return (
    <canvas
      ref={canvasRef}
      className="dos-screen h-full w-full cursor-crosshair"
    />
  );
};

export default Canvas;
