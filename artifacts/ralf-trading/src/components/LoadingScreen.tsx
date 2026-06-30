import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import logo from '@assets/Logo_1782745341412.webp';
import { useMusic } from '@/context/MusicContext';

export const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { enterSite } = useMusic();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(logoRef.current, { opacity: 0, scale: 0.92 });
    gsap.set(buttonRef.current, { opacity: 0, y: 18 });

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      })
        .to(pathRef.current, { opacity: 0, duration: 0.4 }, '+=0.15');
    }

    tl.to(
      logoRef.current,
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.3',
    ).to(
      buttonRef.current,
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.4',
    );

    return () => { tl.kill(); };
  }, []);

  const handleEnter = () => {
    enterSite();
    setIsFadingOut(true);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle radial glow — pure CSS, zero JS cost */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.07) 0%, transparent 65%)',
            'radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Chart line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M0,380 L200,380 L400,380 L500,370 L600,350 L700,200 L800,20 L1000,0"
            fill="none"
            stroke="#25D366"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]"
          />
        </svg>
      </div>

      {/* Logo + button */}
      <div className="relative z-30 flex flex-col items-center mt-20">
        <img
          ref={logoRef}
          src={logo}
          alt="RALF Trading"
          className="w-48 md:w-64 mb-12 drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
        />

        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="px-8 py-3 bg-transparent text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 uppercase tracking-widest font-serif text-sm shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
        >
          Enter RALF Trading
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
