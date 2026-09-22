'use client';

import { useRef } from 'react';

export default function SkillCard({ name, icon }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  const maxTilt = 25;

  const handleMouseMove = (e) => {
    if (!cardRef.current || !iconRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2);

    iconRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleMouseLeave = () => {
    if (!iconRef.current) return;
    iconRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-chip reveal visible"
    >
      <img
        ref={iconRef}
        src={icon}
        alt={name}
        className="skill-icon-tilt"
        style={{ transition: 'transform 0.1s ease-out' }}
      />
      <span className="skill-name">{name}</span>
    </div>
  );
}