'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [canHover, setCanHover] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    setCanHover(true);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mouseX}px`;
        cursorDotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateCursor = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${glowX}px`;
        cursorGlowRef.current.style.top = `${glowY}px`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!canHover) return null;

  return (
    <>
      <div id="cursorDot" ref={cursorDotRef} />
      <div id="cursorGlow" ref={cursorGlowRef} />
    </>
  );
}