import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    // Transparent background so the body color shows through
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 55;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;

    container.appendChild(renderer.domElement);

    // ═══════════════════════════════════════════════════════════════════════════
    // Soft glow texture for particles (single canvas, reused)
    // ═══════════════════════════════════════════════════════════════════════════
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 235, 170, 1)');
    gradient.addColorStop(0.25, 'rgba(212, 175, 55, 0.65)');
    gradient.addColorStop(0.55, 'rgba(180, 140, 20, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(canvas);
    glowTexture.colorSpace = THREE.SRGBColorSpace;

    // ═══════════════════════════════════════════════════════════════════════════
    // Gold dust streams — particles follow gentle sine-wave ribbons
    // ═══════════════════════════════════════════════════════════════════════════
    const streamCount = 14;
    const particlesPerStream = 64;
    const particleCount = streamCount * particlesPerStream;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const streamIndices = new Int32Array(particleCount);
    const streamProgress = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount * 2); // per-particle x/y scatter

    const streams = Array.from({ length: streamCount }, () => ({
      amplitude: 8 + Math.random() * 18,
      frequency: 0.025 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      speed: 1.2 + Math.random() * 2.2,
      yOffset: (Math.random() - 0.5) * 55,
      z: (Math.random() - 0.5) * 45 - 5,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    for (let i = 0; i < particleCount; i++) {
      const s = i % streamCount;
      streamIndices[i] = s;
      streamProgress[i] = (Math.random() - 0.5) * 140; // x range
      offsets[i * 2] = (Math.random() - 0.5) * 5;
      offsets[i * 2 + 1] = (Math.random() - 0.5) * 4;
      sizes[i] = Math.random() * 1.8 + 0.6;

      const p = streams[s];
      const x = streamProgress[i];
      const y =
        p.yOffset +
        p.amplitude * Math.sin(x * p.frequency + p.phase) +
        offsets[i * 2 + 1];

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 1.2,
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      vertexColors: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    particles.frustumCulled = true;
    scene.add(particles);

    // ═══════════════════════════════════════════════════════════════════════════
    // Large drifting bokeh orbs for depth
    // ═══════════════════════════════════════════════════════════════════════════
    const orbGeometry = new THREE.SphereGeometry(1, 12, 12);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 30 - 25
      );
      const scale = 2 + Math.random() * 5;
      orb.scale.setScalar(scale);
      orb.userData = {
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.012,
        phase: Math.random() * Math.PI * 2,
      };
      orb.frustumCulled = true;
      scene.add(orb);
      orbs.push(orb);
    }

    const clock = new THREE.Clock();

    // ═══════════════════════════════════════════════════════════════════════════
    // Animation loop — only mutates typed arrays, no new allocations
    // ═══════════════════════════════════════════════════════════════════════════
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05); // cap delta to avoid jumps
      const time = clock.getElapsedTime();
      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const s = streamIndices[i];
        const p = streams[s];

        // Advance along the ribbon
        streamProgress[i] += p.speed * p.direction * delta * 12;

        // Wrap around the horizontal bounds for continuous flow
        let x = streamProgress[i] + offsets[i * 2];
        const limit = 75;
        if (x > limit) {
          x -= limit * 2;
          streamProgress[i] = x - offsets[i * 2];
        } else if (x < -limit) {
          x += limit * 2;
          streamProgress[i] = x - offsets[i * 2];
        }

        const y =
          p.yOffset +
          p.amplitude * Math.sin(x * p.frequency + p.phase) +
          offsets[i * 2 + 1] +
          Math.sin(time * 0.4 + i * 0.05) * 0.5;

        const z = p.z + Math.sin(time * 0.25 + i * 0.1) * 1.5;

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
      }
      geometry.attributes.position.needsUpdate = true;

      // Drift orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        const data = orb.userData as {
          vx: number;
          vy: number;
          phase: number;
        };
        orb.position.x += data.vx;
        orb.position.y += data.vy + Math.sin(time * 0.35 + data.phase) * 0.004;

        if (orb.position.x > 55) orb.position.x = -55;
        if (orb.position.x < -55) orb.position.x = 55;
        if (orb.position.y > 40) orb.position.y = -40;
        if (orb.position.y < -40) orb.position.y = 40;
      }

      // Very subtle camera drift for parallax-free organic feel
      camera.position.x = Math.sin(time * 0.04) * 0.8;
      camera.position.y = Math.cos(time * 0.04) * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      glowTexture.dispose();
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      orbs.forEach((orb) => scene.remove(orb));
      scene.remove(particles);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
