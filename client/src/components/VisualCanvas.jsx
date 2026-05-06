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
    let animationFrameId; // <--- MUST ADD THIS LINE[cite: 14]

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Re-initialize particles to fill the new width/height
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speedY: Math.random() * 1 + 0.5,
      angle: Math.random() * Math.PI * 2, // Required for 'Wave' and 'Drift'
      velocity: Math.random() * 0.02 + 0.01
    }));

    const drawStar = (x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * size + x,
          -Math.sin((18 + i * 72) / 180 * Math.PI) * size + y);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * (size / 2) + x,
          -Math.sin((54 + i * 72) / 180 * Math.PI) * (size / 2) + y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawBlob = (x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      // Create an organic shape using 4 points with slight offsets
      ctx.bezierCurveTo(x + size, y - size, x + size, y + size, x, y + size);
      ctx.bezierCurveTo(x - size, y + size, x - size, y - size, x, y - size);
      ctx.fill();
    };

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
      ctx.fillStyle = (section.content?.textColor || '#ffffff') + '44';

      particles.forEach(p => {
        // 1. Draw requested shape[cite: 4]
        if (section.canvas?.objects === 'Heart') drawHeart(p.x, p.y, p.size);
        else if (section.canvas?.objects === 'Circle') { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }
        else if (section.canvas?.objects === 'Star') drawStar(p.x, p.y, p.size);
        else if (section.canvas?.objects === 'Blob') drawBlob(p.x, p.y, p.size);
        // 2. Apply Motion Style
        const motionType = section.canvas?.motion || 'Float';

        if (motionType === 'Wave') {
          p.x += Math.sin(p.angle) * 0.5; // Sway side to side[cite: 4]
          p.angle += p.velocity;
        } else if (motionType === 'Drift') {
          p.x += p.speedY * 0.3; // Move diagonally[cite: 4]
        }

        p.y -= p.speedY; // Constant upward float[cite: 4]

        // Reset position when off-screen[cite: 4]
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    if (section.canvas?.hasObject) render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [section.canvas, section.content.textColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};