import React, { useRef, useEffect } from 'react';

export const VisualCanvas = ({ config }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set internal resolution
    canvas.width = 400;
    canvas.height = 533;

    let particles = Array.from({ length: config.canvas.objectCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * config.canvas.objectSize + 2,
      speedY: Math.random() * 1 + 0.5,
      opacity: Math.random()
    }));

    const drawHeart = (x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - 3, x - 5, y - 3, x - 5, y);
      ctx.bezierCurveTo(x - 5, y + 3, x, y + 5, x, y + 9);
      ctx.bezierCurveTo(x, y + 5, x + 5, y + 3, x + 5, y);
      ctx.bezierCurveTo(x + 5, y - 3, x, y - 3, x, y);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = config.text.textColor + '33'; // Matches text color with low opacity

      particles.forEach(p => {
        if (config.canvas.objects === 'Heart') drawHeart(p.x, p.y, p.size);
        else if (config.canvas.objects === 'Circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Motion logic: 'Wave' or 'Bounce' (simplified)
        p.y -= p.speedY;
        if (p.y < -20) p.y = canvas.height + 20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    if (config.canvas.hasObject) render();
    else ctx.clearRect(0, 0, canvas.width, canvas.height);

    return () => cancelAnimationFrame(animationFrameId);
  }, [config.canvas, config.text.textColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};