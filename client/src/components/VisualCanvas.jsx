// src/components/VisualCanvas.jsx
import React, { useRef, useEffect } from 'react';

export const VisualCanvas = ({ section }) => { // Changed prop from config to section
  const canvasRef = useRef(null);

  // 1. ADD THIS SAFETY GATE[cite: 16]
  if (!section || !section.canvas) {
    return null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

    // Use section data for particle generation
    let particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speedY: Math.random() * 1 + 0.5,
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
      // Automatically match particle color to text color with transparency
      ctx.fillStyle = (section.content?.textColor || '#ffffff') + '88';

      particles.forEach(p => {
        if (section.canvas?.objects === 'Heart') drawHeart(p.x, p.y, p.size);
        else if (section.canvas?.objects === 'Circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        p.y -= p.speedY;
        if (p.y < -20) p.y = canvas.height + 20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    if (section.canvas?.hasObject) render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [section.canvas, section.content.textColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};