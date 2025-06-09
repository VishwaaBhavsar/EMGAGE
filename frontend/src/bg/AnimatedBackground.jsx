import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    class Triangle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.speed = Math.random() * 0.2 + 0.1;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        
        const colors = [
          '32, 78, 207',
          '45, 99, 235',
          '79, 70, 229',
          '159, 122, 234',
          '139, 92, 246',
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size / 2);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.closePath();
        
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.y += this.speed * this.direction;
        
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        } else if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    const triangles = [];
    const triangleCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < triangleCount; i++) {
      triangles.push(new Triangle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1A365D');
      gradient.addColorStop(1, '#FFFFFF');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      triangles.forEach(triangle => {
        triangle.draw();
        triangle.update();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;