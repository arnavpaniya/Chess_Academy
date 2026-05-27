import React, { useEffect, useRef, useState } from "react";

export default function CinematicScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollValueRef = useRef(0);
  const targetScrollValueRef = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Preloading image frames states
  const [framesAvailable, setFramesAvailable] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  
  const TOTAL_FRAMES = 100;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames on mount
  useEffect(() => {
    let active = true;
    let successCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad3 = i.toString().padStart(3, '0');
      const pad2 = i.toString().padStart(2, '0');
      const raw = i.toString();
      
      const srcOptions = [
        `/frames/frame_${pad3}.jpg`,
        `/frames/frame_${pad2}.jpg`,
        `/frames/frame_${raw}.jpg`,
        `/frames/${pad3}.jpg`,
        `/frames/${raw}.jpg`,
        `/frames/frame_${pad3}.png`,
        `/frames/frame_${raw}.png`
      ];

      let optionIndex = 0;
      img.src = srcOptions[0];

      img.onload = () => {
        if (!active) return;
        successCount++;
        setLoadedCount(prev => prev + 1);
        // Set available when at least 3 frames are preloaded which checks system mounting success
        if (successCount >= 3 && !framesAvailable) {
          setFramesAvailable(true);
        }
      };

      img.onerror = () => {
        if (!active) return;
        optionIndex++;
        if (optionIndex < srcOptions.length) {
          img.src = srcOptions[optionIndex];
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track container resizing dynamically
    const container = containerRef.current;
    if (container) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: entryWidth, height: entryHeight } = entry.contentRect;
          width = canvas.width = entryWidth;
          height = canvas.height = entryHeight;
        }
      });
      resizeObserverRef.current.observe(container);
    }

    // Passive scroll listener for maximum performance
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      targetScrollValueRef.current = Math.max(0, Math.min(1, ratio));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Helper to draw images with object-fit: "cover" simulation on canvas
    const drawImageProp = (
      c: CanvasRenderingContext2D,
      img: HTMLImageElement,
      w: number,
      h: number
    ) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;

      if (nw < w) {
        nw = w;
        const subR = w / iw;
        nh = ih * subR;
      }
      if (nh < h) {
        nh = h;
        const subR = h / ih;
        nw = iw * subR;
      }

      const sx = (iw - w * (iw / nw)) * 0.5;
      const sy = (ih - h * (ih / nh)) * 0.5;
      const sw = iw - sx * 2;
      const sh = ih - sy * 2;

      c.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };

    // Particles simulation database
    const particleCount = 100;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      phase: number;
      depth: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        phase: Math.random() * 100,
        depth: Math.random() * 0.8 + 0.2,
      });
    }

    // Perspectival Grid Renderer (HUD style overlay)
    const drawPerspectivalGrid = (
      c: CanvasRenderingContext2D,
      progress: number,
      w: number,
      h: number
    ) => {
      c.save();
      c.strokeStyle = "rgba(197, 160, 89, 0.06)";
      c.lineWidth = 1;

      const horizonY = h * 0.35 + progress * h * 0.2;
      const centerX = w * 0.5;

      const gridLines = 24;
      for (let i = -gridLines / 2; i <= gridLines / 2; i++) {
        const xOffset = (i * w) / 6;
        c.beginPath();
        c.moveTo(centerX, horizonY);
        c.lineTo(centerX + xOffset * 2.5, h);
        c.stroke();
      }

      const horizontalLineCount = 14;
      for (let i = 0; i < horizontalLineCount; i++) {
        const ratio = i / horizontalLineCount;
        const yCoord = horizonY + Math.pow(ratio, 2) * (h - horizonY);
        c.beginPath();
        c.moveTo(0, yCoord);
        c.lineTo(w, yCoord);
        c.stroke();
      }

      c.restore();
    };

    // 3D Chess Piece Vector Drawings (HUD HUD style overlay)
    const drawChessKnight = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      scale: number,
      alpha: number,
      angle: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(angle);
      c.scale(scale, scale);
      c.strokeStyle = `rgba(197, 160, 89, ${alpha})`;
      c.fillStyle = `rgba(18, 17, 13, ${alpha * 0.35})`;
      c.lineWidth = 1.5;
      c.shadowBlur = 10;
      c.shadowColor = `rgba(197, 160, 89, ${alpha * 0.3})`;

      c.beginPath();
      c.moveTo(-30, 60);
      c.lineTo(30, 60);
      c.lineTo(25, 45);
      c.lineTo(15, 30);
      c.lineTo(25, 10);
      c.quadraticCurveTo(35, -10, 20, -35);
      c.lineTo(15, -45);
      c.lineTo(5, -45);
      c.lineTo(-2, -35);
      c.quadraticCurveTo(-15, -45, -30, -25);
      c.quadraticCurveTo(-45, -5, -40, 15);
      c.lineTo(-25, 15);
      c.quadraticCurveTo(-15, 5, -5, 15);
      c.lineTo(-15, 30);
      c.lineTo(-25, 45);
      c.closePath();

      c.fill();
      c.stroke();
      c.restore();
    };

    const drawChessKing = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      scale: number,
      alpha: number,
      angle: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(angle);
      c.scale(scale, scale);
      c.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      c.fillStyle = `rgba(10, 10, 10, ${alpha * 0.4})`;
      c.lineWidth = 1.5;
      c.shadowBlur = 15;
      c.shadowColor = `rgba(255, 255, 255, ${alpha * 0.25})`;

      c.beginPath();
      c.moveTo(-20, 50);
      c.lineTo(20, 50);
      c.lineTo(18, 40);
      c.lineTo(10, -10);
      c.lineTo(22, -25);
      c.lineTo(12, -25);
      c.lineTo(15, -40);
      c.lineTo(4, -30);
      c.lineTo(0, -45);
      c.lineTo(-4, -30);
      c.lineTo(-15, -40);
      c.lineTo(-12, -25);
      c.lineTo(-22, -25);
      c.lineTo(-10, -10);
      c.lineTo(-18, 40);
      c.closePath();

      c.fill();
      c.stroke();

      c.beginPath();
      c.moveTo(0, -45);
      c.lineTo(0, -60);
      c.moveTo(-6, -53);
      c.lineTo(6, -53);
      c.stroke();

      c.restore();
    };

    let animId: number;

    const render = () => {
      // Lerp scroll value for liquid-smooth background frames transition
      scrollValueRef.current += (targetScrollValueRef.current - scrollValueRef.current) * 0.085;
      const progress = scrollValueRef.current;

      // Draw the Frame background if available
      let frameDrawn = false;
      if (framesAvailable && imagesRef.current.length > 0) {
        const frameIndex = Math.min(
          imagesRef.current.length - 1,
          Math.max(0, Math.floor(progress * (imagesRef.current.length - 1)))
        );
        const activeImage = imagesRef.current[frameIndex];

        if (activeImage && activeImage.complete && activeImage.naturalWidth > 0) {
          drawImageProp(ctx, activeImage, width, height);
          frameDrawn = true;
        }
      }

      // Fallback base background gradient if frames are not loaded
      if (!frameDrawn) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#010101");
        gradient.addColorStop(0.5, "#070605");
        const bottomTone = progress > 0.5 ? "#100d07" : "#030303";
        gradient.addColorStop(1, bottomTone);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [framesAvailable]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[-10] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        id="cinematic-canvas-bg"
        className="w-full h-full block"
        style={{
          opacity: 0.96, // Full cinematic crisp opacity
        }}
      />
    </div>
  );
}
