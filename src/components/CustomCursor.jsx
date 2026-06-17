import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        const { x, y } = posRef.current;
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

        const rx = ringPosRef.current.x + (x - ringPosRef.current.x) * 0.12;
        const ry = ringPosRef.current.y + (y - ringPosRef.current.y) * 0.12;
        ringPosRef.current = { x: rx, y: ry };
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-ring fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none"
        style={{ zIndex: 99999, transition: 'opacity 0.2s' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 40,
          height: 40,
          zIndex: 99998,
          border: `1px solid rgba(59, 130, 246, ${isHovering ? 0.8 : 0.4})`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'border-color 0.2s, width 0.3s, height 0.3s',
          background: isHovering ? 'rgba(59,130,246,0.06)' : 'transparent',
        }}
      />
    </>
  );
}