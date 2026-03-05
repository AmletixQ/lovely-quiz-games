import { useEffect, useRef } from "react";

interface Props {
  count?: number; // count of hearts
  speedMin?: number;
  speedMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  density?: number;
}

export default function FallingHearts({
  count = 20,
  speedMin = 8,
  speedMax = 18,
  sizeMin = 12,
  sizeMax = 28,
  density = 1.2,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const hearts: HTMLDivElement[] = [];

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = `
      absolute pointer-events-none select-none animate-fall drop-shadow-[0_1px_2px_rgba(255,105,180,0.6)]
    `;

      heart.innerHTML = ["🩷", "❤️", "💖", "❤️‍🩹", "💘", "💕", "💗", "❤️‍🔥"][
        Math.floor(Math.random() * 8)
      ];

      const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
      const left = Math.random() * 100;
      const duration = Math.random() * (speedMax - speedMin) + speedMin;
      const delay = Math.random() * 5;
      // const sway = Math.random() * 40 - 20; // лёгкое покачивание влево-вправо
      const rotateStart = Math.random() * 60 - 30;

      heart.style.fontSize = `${size}px`;
      heart.style.left = `${left}%`;
      heart.style.top = "-40px";
      heart.style.animation = `fall ${duration}s linear ${delay}s infinite`;
      heart.style.transform = `rotate(${rotateStart}deg)`;
      heart.style.opacity = "0.85";

      container.appendChild(heart);
      hearts.push(heart);

      if (hearts.length > count * 2) {
        const old = hearts.shift();
        if (old?.parentNode) old.parentNode.removeChild(old);
      }
    };

    const interval = setInterval(() => {
      for (let i = 0; i < density; i++) {
        if (Math.random() < 0.7) {
          createHeart();
        }
      }
    }, 800);

    for (let i = 0; i < count; i++) {
      createHeart();
    }

    return () => {
      clearInterval(interval);
      hearts.forEach((h) => h.remove());
    };
  }, [count, speedMin, speedMax, sizeMin, sizeMax, density]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -5 }}
      aria-hidden="true"
    />
  );
}
