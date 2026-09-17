"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) {
        drawStaticBackground();
      }
    };
    window.addEventListener("resize", handleResize);

    // Initialize floating bio-particles
    const particleCount = Math.min(65, Math.floor(width / 25));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const drawStaticBackground = () => {
      // Deep Ocean Static Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#010f0d");
      bgGrad.addColorStop(0.3, "#021a16");
      bgGrad.addColorStop(0.7, "#03241f");
      bgGrad.addColorStop(1, "#021411");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    };

    if (prefersReducedMotion) {
      drawStaticBackground();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const render = () => {
      time += 0.008;

      // 1. Base Deep Ocean Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      bgGrad.addColorStop(0, "#010e0c");
      bgGrad.addColorStop(0.25, "#021c17");
      bgGrad.addColorStop(0.65, "#042c26");
      bgGrad.addColorStop(1, "#021411");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Volumetric Light Cones / Ocean Rays from Top
      ctx.save();
      const rayGrad = ctx.createRadialGradient(
        width * 0.35 + Math.sin(time * 0.4) * (width * 0.15),
        -height * 0.1,
        20,
        width * 0.5,
        height * 0.6,
        height * 0.95
      );
      rayGrad.addColorStop(0, "rgba(94, 234, 212, 0.07)");
      rayGrad.addColorStop(0.3, "rgba(32, 201, 166, 0.04)");
      rayGrad.addColorStop(0.7, "rgba(8, 127, 106, 0.015)");
      rayGrad.addColorStop(1, "rgba(2, 20, 17, 0)");
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 3. Flowing Sinusoidal Ocean Current Waves
      ctx.save();
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseHeight = height * (0.2 + w * 0.28);
        const waveSpeed = time * (0.8 + w * 0.3);
        const waveAmp = 25 + w * 12;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const y =
            baseHeight +
            Math.sin(x * 0.0025 + waveSpeed + w) * waveAmp +
            Math.cos(x * 0.004 - waveSpeed * 0.7) * (waveAmp * 0.5);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, baseHeight - 40, 0, height);
        if (w === 0) {
          waveGrad.addColorStop(0, "rgba(32, 201, 166, 0.035)");
          waveGrad.addColorStop(1, "rgba(2, 20, 17, 0.08)");
        } else if (w === 1) {
          waveGrad.addColorStop(0, "rgba(14, 159, 132, 0.025)");
          waveGrad.addColorStop(1, "rgba(2, 20, 17, 0.06)");
        } else {
          waveGrad.addColorStop(0, "rgba(94, 234, 212, 0.02)");
          waveGrad.addColorStop(1, "rgba(2, 20, 17, 0.05)");
        }
        ctx.fillStyle = waveGrad;
        ctx.fill();
      }
      ctx.restore();

      // 4. Floating Plankton / Bio-luminescent Particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with gentle drift
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulseOffset) * 0.2;

        // Reset when out of screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulsing glow
        const currentPulse = Math.sin(time * 3 + p.pulseOffset);
        const currentOpacity = Math.max(
          0.05,
          Math.min(0.7, p.opacity + currentPulse * 0.18)
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${currentOpacity})`;
        ctx.fill();

        // Soft halo on slightly larger particles
        if (p.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(32, 201, 166, ${currentOpacity * 0.22})`;
          ctx.fill();
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    // Handle tab visibility to pause animation when inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle vignette overlay to keep focus on floating cards */}
      <div className="absolute inset-0 bg-radial-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
