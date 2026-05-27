'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'motion/react';

const FRAME_COUNT = 80;
const currentFrame = (index: number) =>
  `/frames/King_and_chess_pieces_sliding_202605212329_000/King_and_chess_pieces_sliding_202605212329_${index.toString().padStart(3, '0')}.jpg`;

interface CinematicBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

export default function CinematicBackground({ scrollYProgress }: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        // Draw the first frame once loaded
        if (i === 0) {
          renderFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgArray[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust for sharpness on resize (in real app, we might debounce this)
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const img = imgArray[index];
    if (img.complete && img.naturalWidth > 0) {
      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
      const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        centerShift_x,
        centerShift_y,
        img.naturalWidth * ratio,
        img.naturalHeight * ratio
      );
    }
  };

  // Listen to framer-motion's scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    requestAnimationFrame(() => renderFrame(frameIndex, images));
  });

  // Handle resize re-renders
  useEffect(() => {
    const handleResize = () => {
      const latest = scrollYProgress.get();
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latest * FRAME_COUNT))
      );
      renderFrame(frameIndex, images);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-black/40" /> {/* Subtle overlay for better text readability */}
    </div>
  );
}
