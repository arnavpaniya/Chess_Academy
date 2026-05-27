import React, { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  scrollControlled?: boolean;
}

export default function FadingVideo({ src, className = "", style = {} }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set elegant slow motion playback rate (15% speed for slow cinema feel)
    video.playbackRate = 0.15;

    // Attempt to auto-play (browsers allow muted videos to play automatically)
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn("Video auto-play interrupted or blocked:", error);
      }
    };
    playVideo();
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{
        opacity: 0.45, // elegant background dimming
        ...style,
      }}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
    />
  );
}
