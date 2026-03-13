"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.scss";

// Must match the dimensions used in page.module.scss
const CANVAS_W = 2560;
const CANVAS_H = 1440;

const TWINKLE_STARS = 20;

// Nebula hues — muted enough to feel like a hint of colour, not neon
const NEBULA_COLORS = [
  "#c084fc", // purple
  "#f472b6", // pink
  "#4ade80", // green
  "#67e8f9", // cyan-blue
] as const;

function createTwinkleStar(): HTMLDivElement {
  const color = Math.random() < 0.4
    ? NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)]
    : "#fff";
  const colored = color !== "#fff";
  // Colored stars are always 2px so the glow has something to bloom from
  const size = colored || Math.random() < 0.25 ? 2 : 1;

  const el = document.createElement("div");
  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${Math.floor(Math.random() * CANVAS_W)}px;
    top: ${Math.floor(Math.random() * CANVAS_H)}px;
    border-radius: 50%;
    opacity: ${colored ? 0.85 : 1};
    ${colored ? `box-shadow: 0 0 4px 1px ${color}, 0 0 10px 2px ${color};` : ""}
  `;
  el.animate(
    [{ opacity: 0.9 }, { opacity: 0.1 }, { opacity: 0.9 }],
    {
      duration: 3000 + Math.random() * 4000,
      delay: -Math.random() * 5000,
      iterations: Infinity,
      easing: "ease-in-out",
    },
  );
  return el;
}

export default function Starfield() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scale = Math.max(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
      el.style.transform = `scale(${scale})`;
    };

    update();
    // Fade in after scale is applied so there's no position jump
    requestAnimationFrame(() => { el.style.opacity = "1"; });

    const stars = Array.from({ length: TWINKLE_STARS }, createTwinkleStar);
    stars.forEach((s) => el.appendChild(s));

    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      stars.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div ref={ref} className={styles.starfield} aria-hidden="true">
      <div className={styles.starsSmall} />
      <div className={styles.starsMedium} />
      <div className={styles.starsLargeA} />
      <div className={styles.starsLargeB} />
    </div>
  );
}
