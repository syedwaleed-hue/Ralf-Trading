import { useEffect } from "react";

export default function ClickGlow() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const glow = document.createElement("div");

      glow.style.position = "fixed";
      glow.style.left = `${e.clientX - 75}px`;
      glow.style.top = `${e.clientY - 75}px`;
      glow.style.width = "150px";
      glow.style.height = "150px";
      glow.style.borderRadius = "50%";
      glow.style.pointerEvents = "none";
      glow.style.zIndex = "9999";
      glow.style.background =
        "radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)";

      glow.style.transform = "scale(0.5)";
      glow.style.opacity = "1";
      glow.style.transition = "transform .7s ease-out, opacity .7s ease-out";

      document.body.appendChild(glow);

      requestAnimationFrame(() => {
        glow.style.transform = "scale(2)";
        glow.style.opacity = "0";
      });

      setTimeout(() => {
        glow.remove();
      }, 700);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
