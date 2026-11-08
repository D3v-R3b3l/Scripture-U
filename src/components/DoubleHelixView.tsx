import React, { useRef, useState, useEffect, useMemo } from 'react';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';
import { PROPHECY_LINKS, ProphecyLink } from '../data/prophecies';
import { ActiveTab } from './Navbar';
import {
  Play,
  Pause,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Filter,
  ArrowRight,
  BookOpen,
  Sparkles,
  Compass,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  GitBranch,
  Clock,
  Maximize2,
  Minimize2,
  X,
  Eye
} from 'lucide-react';

interface DoubleHelixViewProps {
  onSelectBook: (book: BibleBook) => void;
  onSelectProphecy: (prophecy: ProphecyLink) => void;
  onNavigateTab?: (tab: ActiveTab) => void;
}

interface HelixParticle {
  t: number;
  angleOffset: number;
  radiusOffset: number;
  yJitter: number;
  size: number;
  strand: 'OT' | 'NT' | 'core';
  alpha: number;
  speed: number;
}

export const DoubleHelixView: React.FC<DoubleHelixViewProps> = ({
  onSelectBook,
  onSelectProphecy,
  onNavigateTab
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Respect OS prefers-reduced-motion setting
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // 3D Camera & Helix State
  const [rotationAngle, setRotationAngle] = useState<number>(0.45);
  const [pitchAngle, setPitchAngle] = useState<number>(0.08);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(() => !prefersReducedMotion);
  // Zoom supports 0.22x (full canon visible with generous margins) up to 2.40x (micro-strand inspection)
  const [zoom, setZoom] = useState<number>(0.88);
  const [scrollProgress, setScrollProgress] = useState<number>(0.35);
  const [selectedCovenant, setSelectedCovenant] = useState<string>('All');
  const [selectedStrand, setSelectedStrand] = useState<'both' | 'OT' | 'NT'>('both');

  // Live Focused Dossier Item for Right Observatory Wing
  const [focusedDossier, setFocusedDossier] = useState<
    { type: 'book'; data: BibleBook } | { type: 'prophecy'; data: ProphecyLink }
  >({
    type: 'prophecy',
    data: PROPHECY_LINKS[0]
  });

  const [hoveredItem, setHoveredItem] = useState<{
    type: 'book' | 'prophecy';
    data: BibleBook | ProphecyLink;
    x: number;
    y: number;
  } | null>(null);

  // Interactive Research Journey Walkthrough Modal State
  const [guideOpen, setGuideOpen] = useState<boolean>(true);
  const [guideStep, setGuideStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  // Mouse & Touch drag/tap/pinch refs
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchMovedDistRef = useRef<number>(0);
  const pinchDistRef = useRef<number | null>(null);

  const otBooks = useMemo(() => BIBLE_BOOKS.filter(b => b.testament === 'OT'), []);
  const ntBooks = useMemo(() => BIBLE_BOOKS.filter(b => b.testament === 'NT'), []);

  // Filtered prophecy links
  const filteredProphecies = useMemo(() => {
    if (selectedCovenant === 'All') return PROPHECY_LINKS;
    return PROPHECY_LINKS.filter(p => p.covenant === selectedCovenant);
  }, [selectedCovenant]);

  // Covenant counts for right-hand telemetry bars
  const covenantTelemetry = useMemo(() => {
    const covenants = ['Edenic', 'Abrahamic', 'Mosaic', 'Davidic', 'New Covenant'];
    return covenants.map(cov => {
      const count = PROPHECY_LINKS.filter(p => p.covenant === cov).length;
      const pct = Math.round((count / PROPHECY_LINKS.length) * 100);
      return { name: cov, count, pct };
    });
  }, []);

  // Pre-compute volumetric ember & stardust particle cloud around the double helix
  const particles = useMemo<HelixParticle[]>(() => {
    const list: HelixParticle[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < 240; i++) {
      const strandRand = rand();
      const strand: 'OT' | 'NT' | 'core' =
        strandRand < 0.46 ? 'OT' : strandRand < 0.9 ? 'NT' : 'core';
      list.push({
        t: rand() * 44 - 1,
        angleOffset: (rand() - 0.5) * 0.65,
        radiusOffset: (rand() - 0.5) * 34,
        yJitter: (rand() - 0.5) * 18,
        size: 0.9 + rand() * 2.6,
        strand,
        alpha: 0.25 + rand() * 0.7,
        speed: 0.2 + rand() * 0.6
      });
    }
    return list;
  }, []);

  const markStepVisited = (idx: number) => {
    setGuideStep(idx);
    setCompletedSteps(prev => (prev.includes(idx) ? prev : [...prev, idx]));
  };

  // Fit entire 66-book Double-Helix on screen simultaneously
  const handleFitFullHelix = () => {
    setZoom(0.36);
    setScrollProgress(0.5);
    setPitchAngle(0.05);
  };

  // Keyboard navigation for Walkthrough Modal & Canvas Zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && guideOpen) {
        setGuideOpen(false);
      } else if (guideOpen && e.key === 'ArrowRight') {
        markStepVisited((guideStep + 1) % 5);
      } else if (guideOpen && e.key === 'ArrowLeft') {
        markStepVisited((guideStep + 4) % 5);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guideOpen, guideStep]);

  // Current canonical era label based on scrollProgress
  const currentCanonicalEra = useMemo(() => {
    if (zoom <= 0.44) return 'Full Canon View (Genesis → Revelation)';
    if (scrollProgress < 0.25) return 'Creation & Patriarchs';
    if (scrollProgress < 0.55) return 'Kingdom & Prophets';
    if (scrollProgress < 0.82) return 'Gospels & Apostles';
    return 'Apocalypse & New Creation';
  }, [scrollProgress, zoom]);

  // Main Bioluminescent 3D Canvas Render Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAutoSpin && !isDraggingRef.current) {
        setRotationAngle(prev => prev + dt * 0.36);
      }

      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const isCompactScreen = width < 768;
      const isWideDesktop = width >= 1280;

      // 1. Deep Obsidian Void + Molten Amber Core Nebula
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, width, height);

      const centerXOffset = isWideDesktop ? width * 0.44 : width * 0.5;
      const centerY = height * 0.5;

      // Warm incandescent core glow along the helix axis
      const axisGlow = ctx.createRadialGradient(
        centerXOffset,
        centerY,
        10,
        centerXOffset,
        centerY,
        Math.max(width, height) * 0.52
      );
      axisGlow.addColorStop(0, 'rgba(234, 88, 12, 0.16)');
      axisGlow.addColorStop(0.28, 'rgba(217, 119, 6, 0.07)');
      axisGlow.addColorStop(0.6, 'rgba(14, 116, 144, 0.03)');
      axisGlow.addColorStop(1, 'rgba(4, 5, 8, 0)');
      ctx.fillStyle = axisGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Precision Orthographic Observatory Grid & Axis Ticks
      const gridStep = isCompactScreen ? 44 : 56;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.035)';
      ctx.beginPath();
      for (let gx = centerXOffset % gridStep; gx < width; gx += gridStep) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = centerY % gridStep; gy < height; gy += gridStep) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Central vertical axis hairline & measurement ticks
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.beginPath();
      ctx.moveTo(centerXOffset, 0);
      ctx.lineTo(centerXOffset, height);
      ctx.stroke();

      for (let ty = 30; ty < height; ty += 28) {
        const tickW = ty % 112 === 30 ? 8 : 3.5;
        ctx.strokeStyle =
          ty % 112 === 30 ? 'rgba(251, 191, 36, 0.24)' : 'rgba(148, 163, 184, 0.1)';
        ctx.beginPath();
        ctx.moveTo(centerXOffset - tickW, ty);
        ctx.lineTo(centerXOffset + tickW, ty);
        ctx.stroke();
      }

      // 3. 3D Helix Geometry & Full-Canon Zoom Centering Math
      const totalSteps = 42;
      const baseRadius = Math.min(155, Math.max(75, width * (isCompactScreen ? 0.25 : 0.145)));
      const helixRadius = baseRadius * Math.max(0.42, zoom);
      const totalHelixSpan = height * 2.1 * zoom;
      const stepHeight = totalHelixSpan / totalSteps;
      // When zoomed out (totalHelixSpan <= height * 0.78), panSpan becomes 0 so the entire helix is centered from top to bottom
      const panSpan = Math.max(0, totalHelixSpan - height * 0.76);
      const verticalOffset = (0.5 - scrollProgress) * panSpan;

      const project = (x3d: number, y3d: number, z3d: number) => {
        const cosR = Math.cos(rotationAngle);
        const sinR = Math.sin(rotationAngle);
        const xRot = x3d * cosR + z3d * sinR;
        const zRot = -x3d * sinR + z3d * cosR;

        const cosP = Math.cos(pitchAngle);
        const sinP = Math.sin(pitchAngle);
        const yRot = y3d * cosP - zRot * sinP;
        const zFinal = y3d * sinP + zRot * cosP;

        const fov = isCompactScreen ? 600 : 720;
        const scale = fov / (fov + zFinal);
        const screenX = centerXOffset + xRot * scale;
        const screenY = centerY + yRot * scale + verticalOffset;

        return { x: screenX, y: screenY, z: zFinal, scale };
      };

      interface RenderItem {
        z: number;
        draw: (ctx: CanvasRenderingContext2D) => void;
        hitTest?: (mx: number, my: number) => boolean;
        itemData?: { type: 'book' | 'prophecy'; data: BibleBook | ProphecyLink };
      }

      const items: RenderItem[] = [];

      // 4. Continuous Bioluminescent Backbone Ribbon Segments (140 smooth segments per strand)
      const ribbonSegments = 140;
      for (let i = 0; i < ribbonSegments; i++) {
        const t1 = (i / ribbonSegments) * totalSteps;
        const t2 = ((i + 1) / ribbonSegments) * totalSteps;
        const a1 = t1 * 0.42;
        const a2 = t2 * 0.42;
        const y1 = (t1 - totalSteps / 2) * stepHeight;
        const y2 = (t2 - totalSteps / 2) * stepHeight;

        // OT Backbone Segment (Molten Amber/Copper)
        if (selectedStrand !== 'NT') {
          const p1 = project(Math.cos(a1) * helixRadius, y1, Math.sin(a1) * helixRadius);
          const p2 = project(Math.cos(a2) * helixRadius, y2, Math.sin(a2) * helixRadius);
          const avgZ = (p1.z + p2.z) * 0.5;
          const avgScale = (p1.scale + p2.scale) * 0.5 * Math.max(0.55, Math.min(1.2, zoom));
          const depthAlpha = Math.max(
            0.2,
            Math.min(0.95, 1.15 - (avgZ + helixRadius) / (helixRadius * 2.5))
          );

          items.push({
            z: avgZ + 2,
            draw: (c) => {
              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.strokeStyle = `rgba(234, 88, 12, ${depthAlpha * 0.42})`;
              c.lineWidth = Math.max(2.0, 8.0 * avgScale);
              c.lineCap = 'round';
              c.stroke();

              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.strokeStyle = `rgba(253, 224, 71, ${depthAlpha * 0.88})`;
              c.lineWidth = Math.max(1.0, 2.4 * avgScale);
              c.stroke();
            }
          });
        }

        // NT Backbone Segment (Crystalline Silver-Ice / Cyan)
        if (selectedStrand !== 'OT') {
          const p1 = project(
            Math.cos(a1 + Math.PI) * helixRadius,
            y1,
            Math.sin(a1 + Math.PI) * helixRadius
          );
          const p2 = project(
            Math.cos(a2 + Math.PI) * helixRadius,
            y2,
            Math.sin(a2 + Math.PI) * helixRadius
          );
          const avgZ = (p1.z + p2.z) * 0.5;
          const avgScale = (p1.scale + p2.scale) * 0.5 * Math.max(0.55, Math.min(1.2, zoom));
          const depthAlpha = Math.max(
            0.2,
            Math.min(0.95, 1.15 - (avgZ + helixRadius) / (helixRadius * 2.5))
          );

          items.push({
            z: avgZ + 2,
            draw: (c) => {
              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.strokeStyle = `rgba(56, 189, 248, ${depthAlpha * 0.38})`;
              c.lineWidth = Math.max(2.0, 7.6 * avgScale);
              c.lineCap = 'round';
              c.stroke();

              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.strokeStyle = `rgba(224, 242, 254, ${depthAlpha * 0.88})`;
              c.lineWidth = Math.max(1.0, 2.2 * avgScale);
              c.stroke();
            }
          });
        }
      }

      // 5. Fine Secondary Molecular Base-Pair Filaments (72 structural rungs along the twist)
      if (selectedStrand === 'both') {
        const microRungs = 72;
        for (let r = 0; r <= microRungs; r++) {
          const t = (r / microRungs) * totalSteps;
          const angle = t * 0.42;
          const yPos = (t - totalSteps / 2) * stepHeight;

          const otP = project(Math.cos(angle) * helixRadius, yPos, Math.sin(angle) * helixRadius);
          const ntP = project(
            Math.cos(angle + Math.PI) * helixRadius,
            yPos,
            Math.sin(angle + Math.PI) * helixRadius
          );
          const avgZ = (otP.z + ntP.z) * 0.5;
          const avgScale = (otP.scale + ntP.scale) * 0.5;

          items.push({
            z: avgZ + 8,
            draw: (c) => {
              const grad = c.createLinearGradient(otP.x, otP.y, ntP.x, ntP.y);
              grad.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
              grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
              grad.addColorStop(1, 'rgba(125, 211, 252, 0.22)');

              c.beginPath();
              c.moveTo(otP.x, otP.y);
              c.lineTo(ntP.x, ntP.y);
              c.strokeStyle = grad;
              c.lineWidth = Math.max(0.6, 1.1 * avgScale);
              c.stroke();
            }
          });
        }
      }

      // 6. Major Glowing Prophecy & Typology Bridges (Interactive Rungs)
      filteredProphecies.forEach((prophecy) => {
        const rungIndex = prophecy.helixPairIndex;
        const t = (rungIndex / 25) * totalSteps;
        const angle = t * 0.42;
        const yPos = (t - totalSteps / 2) * stepHeight;

        const otP = project(Math.cos(angle) * helixRadius, yPos, Math.sin(angle) * helixRadius);
        const ntP = project(
          Math.cos(angle + Math.PI) * helixRadius,
          yPos,
          Math.sin(angle + Math.PI) * helixRadius
        );

        const avgZ = (otP.z + ntP.z) / 2;
        const isFocused =
          focusedDossier.type === 'prophecy' && focusedDossier.data.id === prophecy.id;

        items.push({
          z: avgZ - 4,
          draw: (c) => {
            if (selectedStrand !== 'both') return;

            const lineGrad = c.createLinearGradient(otP.x, otP.y, ntP.x, ntP.y);
            lineGrad.addColorStop(0, 'rgba(251, 146, 60, 0.9)');
            lineGrad.addColorStop(0.5, 'rgba(254, 240, 138, 1)');
            lineGrad.addColorStop(1, 'rgba(125, 211, 252, 0.9)');

            c.beginPath();
            c.moveTo(otP.x, otP.y);
            c.lineTo(ntP.x, ntP.y);
            c.strokeStyle = lineGrad;
            c.lineWidth = Math.max(1.2, (isFocused ? 3.8 : 2.4) * otP.scale * Math.max(0.65, zoom));
            c.stroke();

            const midX = (otP.x + ntP.x) / 2;
            const midY = (otP.y + ntP.y) / 2;
            const midScale = (otP.scale + ntP.scale) / 2 * Math.max(0.65, Math.min(1.15, zoom));
            const nodeR = Math.max(2.8, (isFocused ? 6.8 : 5.0) * midScale);

            c.beginPath();
            c.arc(midX, midY, nodeR * 2.1, 0, Math.PI * 2);
            c.fillStyle = isFocused ? 'rgba(251, 191, 36, 0.35)' : 'rgba(245, 158, 11, 0.18)';
            c.fill();

            c.beginPath();
            c.arc(midX, midY, nodeR, 0, Math.PI * 2);
            c.fillStyle = '#fffbeb';
            c.shadowColor = '#f59e0b';
            c.shadowBlur = 12 * midScale;
            c.fill();
            c.shadowBlur = 0;
          },
          hitTest: (mx, my) => {
            const midX = (otP.x + ntP.x) / 2;
            const midY = (otP.y + ntP.y) / 2;
            return Math.hypot(mx - midX, my - midY) < (isCompactScreen ? 20 : 15);
          },
          itemData: { type: 'prophecy', data: prophecy }
        });
      });

      // 7. Volumetric 3D Ember & Stardust Particles
      const timeSec = currentTime * 0.001;
      particles.forEach((pt, idx) => {
        if (selectedStrand === 'OT' && pt.strand === 'NT') return;
        if (selectedStrand === 'NT' && pt.strand === 'OT') return;

        const animatedT = (pt.t + (isAutoSpin ? timeSec * pt.speed * 0.35 : 0)) % totalSteps;
        const baseAngle =
          animatedT * 0.42 + (pt.strand === 'NT' ? Math.PI : 0) + pt.angleOffset;
        const r =
          (pt.strand === 'core' ? helixRadius * 0.35 : helixRadius) +
          pt.radiusOffset * Math.max(0.5, zoom);
        const yPos = (animatedT - totalSteps / 2) * stepHeight + pt.yJitter * zoom;

        const p = project(Math.cos(baseAngle) * r, yPos, Math.sin(baseAngle) * r);
        if (p.y < -20 || p.y > height + 20) return;

        const twinkle = 0.65 + 0.35 * Math.sin(timeSec * 2.2 + idx);
        const alpha = pt.alpha * twinkle * Math.min(1, p.scale);
        const rad = Math.max(0.8, pt.size * p.scale * Math.max(0.65, zoom));

        items.push({
          z: p.z + 5,
          draw: (c) => {
            c.beginPath();
            c.arc(p.x, p.y, rad, 0, Math.PI * 2);
            if (pt.strand === 'OT' || pt.strand === 'core') {
              c.fillStyle =
                idx % 3 === 0
                  ? `rgba(254, 240, 138, ${alpha})`
                  : `rgba(249, 115, 22, ${alpha * 0.9})`;
            } else {
              c.fillStyle =
                idx % 3 === 0
                  ? `rgba(224, 242, 254, ${alpha})`
                  : `rgba(56, 189, 248, ${alpha * 0.85})`;
            }
            c.fill();
          }
        });
      });

      // 8. OT Strand Book Nodes (39 Hebrew Books) + Architectural Leader Lines
      otBooks.forEach((book, index) => {
        const t = (index / (otBooks.length - 1)) * totalSteps;
        const angle = t * 0.42;
        const yPos = (t - totalSteps / 2) * stepHeight;

        const p = project(Math.cos(angle) * helixRadius, yPos, Math.sin(angle) * helixRadius);
        const zoomScale = Math.max(0.6, Math.min(1.25, zoom));
        const radius = Math.max(3.0, (isCompactScreen ? 5.8 : 7.0) * p.scale * zoomScale);
        const isFocused = focusedDossier.type === 'book' && focusedDossier.data.id === book.id;
        const isCapBook = index === 0 || index === otBooks.length - 1;

        items.push({
          z: p.z,
          draw: (c) => {
            if (selectedStrand === 'NT') return;

            c.beginPath();
            c.arc(p.x, p.y, radius * (isFocused ? 2.4 : 1.7), 0, Math.PI * 2);
            c.fillStyle = isFocused ? 'rgba(251, 191, 36, 0.4)' : 'rgba(234, 88, 12, 0.22)';
            c.fill();

            const sphereGrad = c.createRadialGradient(
              p.x - radius * 0.3,
              p.y - radius * 0.3,
              radius * 0.1,
              p.x,
              p.y,
              radius
            );
            sphereGrad.addColorStop(0, '#fef9c3');
            sphereGrad.addColorStop(0.45, '#f59e0b');
            sphereGrad.addColorStop(1, '#9a3412');

            c.beginPath();
            c.arc(p.x, p.y, radius, 0, Math.PI * 2);
            c.fillStyle = sphereGrad;
            c.shadowColor = '#f97316';
            c.shadowBlur = 12 * p.scale;
            c.fill();
            c.shadowBlur = 0;

            // Show label for front-facing books (or Genesis/Malachi endpoints when zoomed out)
            const showLabel =
              isCapBook ||
              isFocused ||
              (zoom < 0.52 ? index % 4 === 0 && p.z < 30 : p.z < (isCompactScreen ? 25 : 55));

            if (showLabel && p.y > 22 && p.y < height - 28) {
              const calloutLen = isCompactScreen ? 12 : 24 * p.scale * Math.max(0.65, zoom);
              const dir = p.x >= centerXOffset ? 1 : -1;
              const endX = p.x + dir * (radius + calloutLen);

              c.beginPath();
              c.moveTo(p.x + dir * (radius + 2), p.y);
              c.lineTo(endX, p.y);
              c.strokeStyle = isCapBook ? 'rgba(253, 224, 71, 0.75)' : 'rgba(251, 191, 36, 0.45)';
              c.lineWidth = isCapBook ? 1.4 : 1;
              c.stroke();

              c.beginPath();
              c.arc(endX, p.y, 1.8, 0, Math.PI * 2);
              c.fillStyle = '#fde047';
              c.fill();

              const fontSize = Math.max(
                9,
                Math.round((isCompactScreen ? 9.5 : 11) * p.scale * Math.max(0.78, zoom))
              );
              c.font = `600 ${fontSize}px "Cinzel", serif`;
              c.textAlign = dir === 1 ? 'left' : 'right';
              c.fillStyle = isCapBook ? '#fef08a' : 'rgba(254, 243, 199, 0.96)';
              c.fillText(book.name, endX + dir * 6, p.y + 3);
              c.textAlign = 'left';
            }
          },
          hitTest: (mx, my) => Math.hypot(mx - p.x, my - p.y) < radius + (isCompactScreen ? 14 : 10),
          itemData: { type: 'book', data: book }
        });
      });

      // 9. NT Strand Book Nodes (27 Greek Books) + Architectural Leader Lines
      ntBooks.forEach((book, index) => {
        const t = (index / (ntBooks.length - 1)) * totalSteps;
        const angle = t * 0.42 + Math.PI;
        const yPos = (t - totalSteps / 2) * stepHeight;

        const p = project(Math.cos(angle) * helixRadius, yPos, Math.sin(angle) * helixRadius);
        const zoomScale = Math.max(0.6, Math.min(1.25, zoom));
        const radius = Math.max(3.0, (isCompactScreen ? 5.8 : 7.0) * p.scale * zoomScale);
        const isFocused = focusedDossier.type === 'book' && focusedDossier.data.id === book.id;
        const isCapBook = index === 0 || index === ntBooks.length - 1;

        items.push({
          z: p.z,
          draw: (c) => {
            if (selectedStrand === 'OT') return;

            c.beginPath();
            c.arc(p.x, p.y, radius * (isFocused ? 2.4 : 1.7), 0, Math.PI * 2);
            c.fillStyle = isFocused ? 'rgba(125, 211, 252, 0.4)' : 'rgba(14, 165, 233, 0.2)';
            c.fill();

            const sphereGrad = c.createRadialGradient(
              p.x - radius * 0.3,
              p.y - radius * 0.3,
              radius * 0.1,
              p.x,
              p.y,
              radius
            );
            sphereGrad.addColorStop(0, '#ffffff');
            sphereGrad.addColorStop(0.45, '#7dd3fc');
            sphereGrad.addColorStop(1, '#0369a1');

            c.beginPath();
            c.arc(p.x, p.y, radius, 0, Math.PI * 2);
            c.fillStyle = sphereGrad;
            c.shadowColor = '#38bdf8';
            c.shadowBlur = 12 * p.scale;
            c.fill();
            c.shadowBlur = 0;

            const showLabel =
              isCapBook ||
              isFocused ||
              (zoom < 0.52 ? index % 3 === 0 && p.z < 30 : p.z < (isCompactScreen ? 25 : 55));

            if (showLabel && p.y > 22 && p.y < height - 28) {
              const calloutLen = isCompactScreen ? 12 : 24 * p.scale * Math.max(0.65, zoom);
              const dir = p.x >= centerXOffset ? 1 : -1;
              const endX = p.x + dir * (radius + calloutLen);

              c.beginPath();
              c.moveTo(p.x + dir * (radius + 2), p.y);
              c.lineTo(endX, p.y);
              c.strokeStyle = isCapBook ? 'rgba(186, 230, 253, 0.8)' : 'rgba(125, 211, 252, 0.45)';
              c.lineWidth = isCapBook ? 1.4 : 1;
              c.stroke();

              c.beginPath();
              c.arc(endX, p.y, 1.8, 0, Math.PI * 2);
              c.fillStyle = '#bae6fd';
              c.fill();

              const fontSize = Math.max(
                9,
                Math.round((isCompactScreen ? 9.5 : 11) * p.scale * Math.max(0.78, zoom))
              );
              c.font = `600 ${fontSize}px "Cinzel", serif`;
              c.textAlign = dir === 1 ? 'left' : 'right';
              c.fillStyle = isCapBook ? '#e0f2fe' : 'rgba(224, 242, 254, 0.96)';
              c.fillText(book.name, endX + dir * 6, p.y + 3);
              c.textAlign = 'left';
            }
          },
          hitTest: (mx, my) => Math.hypot(mx - p.x, my - p.y) < radius + (isCompactScreen ? 14 : 10),
          itemData: { type: 'book', data: book }
        });
      });

      // Painter's algorithm depth sort (back-to-front)
      items.sort((a, b) => b.z - a.z);
      items.forEach(it => it.draw(ctx));

      (canvas as any).__renderItems = items;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    rotationAngle,
    pitchAngle,
    isAutoSpin,
    zoom,
    scrollProgress,
    selectedCovenant,
    selectedStrand,
    filteredProphecies,
    otBooks,
    ntBooks,
    particles,
    focusedDossier
  ]);

  // Handle Resize with ResizeObserver
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Helper to hit-test and select item at canvas coordinates (mx, my)
  const triggerHitAt = (mx: number, my: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const items: any[] = (canvas as any).__renderItems || [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].hitTest && items[i].hitTest(mx, my)) {
        const itemData = items[i].itemData;
        if (itemData) {
          if (itemData.type === 'book') {
            const b = itemData.data as BibleBook;
            setFocusedDossier({ type: 'book', data: b });
            onSelectBook(b);
          } else {
            const p = itemData.data as ProphecyLink;
            setFocusedDossier({ type: 'prophecy', data: p });
            onSelectProphecy(p);
          }
        }
        break;
      }
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      setRotationAngle(prev => prev + dx * 0.008);
      setPitchAngle(prev => Math.max(-0.6, Math.min(0.6, prev + dy * 0.005)));
    } else {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const items: any[] = (canvas as any).__renderItems || [];
      let found: any = null;

      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].hitTest && items[i].hitTest(mx, my)) {
          found = items[i];
          break;
        }
      }

      if (found && found.itemData) {
        setHoveredItem({
          type: found.itemData.type,
          data: found.itemData.data,
          x: Math.min(Math.max(mx, 140), canvas.width - 140),
          y: Math.max(my, 110)
        });
      } else {
        setHoveredItem(null);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(z => Math.min(2.4, +(z + 0.08).toFixed(2)));
    } else {
      setZoom(z => Math.max(0.22, +(z - 0.08).toFixed(2)));
    }
  };

  // Touch handlers for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      lastMousePosRef.current = { x: tx, y: ty };
      touchStartPosRef.current = { x: tx, y: ty };
      touchMovedDistRef.current = 0;
      pinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchDistRef.current = d;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      const dx = tx - lastMousePosRef.current.x;
      const dy = ty - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: tx, y: ty };
      touchMovedDistRef.current += Math.hypot(dx, dy);

      setRotationAngle(prev => prev + dx * 0.009);
      setPitchAngle(prev => Math.max(-0.6, Math.min(0.6, prev + dy * 0.005)));
    } else if (e.touches.length === 2 && pinchDistRef.current !== null) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (newDist - pinchDistRef.current) * 0.004;
      pinchDistRef.current = newDist;
      setZoom(z => Math.max(0.22, Math.min(2.4, +(z + delta).toFixed(2))));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    pinchDistRef.current = null;

    if (touchMovedDistRef.current < 12 && e.changedTouches.length === 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.changedTouches[0].clientX - rect.left;
      const my = e.changedTouches[0].clientY - rect.top;
      triggerHitAt(mx, my);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    triggerHitAt(mx, my);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Helper to close walkthrough on mobile when triggering a live action so user sees the helix change
  const autoCloseOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setGuideOpen(false);
    }
  };

  // Interactive 5-Step Research Journey Walkthrough Data
  const walkthroughSteps = [
    {
      stepNum: 1,
      badge: 'Step 01 / 05 · Canonical Geometry',
      title: 'Explore the Twin Strands of Scripture',
      description:
        'The molten amber strand traces the 39 Hebrew Old Testament books; the crystalline ice-blue strand traces the 27 Greek New Testament books. Trigger an action below or view the full 66-book helix at once:',
      renderActions: () => (
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => {
              setSelectedStrand('OT');
              setScrollProgress(0.08);
              setFocusedDossier({ type: 'book', data: BIBLE_BOOKS[0] });
              autoCloseOnMobile();
            }}
            className={`px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              selectedStrand === 'OT'
                ? 'bg-amber-500/25 text-amber-200 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-zinc-900/90 text-amber-300 border-zinc-700 hover:border-amber-500/50'
            }`}
          >
            Focus OT (Hebrew)
          </button>
          <button
            onClick={() => {
              setSelectedStrand('NT');
              setScrollProgress(0.55);
              const john = BIBLE_BOOKS.find(b => b.name === 'John') || BIBLE_BOOKS[39];
              setFocusedDossier({ type: 'book', data: john });
              autoCloseOnMobile();
            }}
            className={`px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              selectedStrand === 'NT'
                ? 'bg-sky-500/25 text-sky-200 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                : 'bg-zinc-900/90 text-sky-300 border-zinc-700 hover:border-sky-500/50'
            }`}
          >
            Focus NT (Greek)
          </button>
          <button
            onClick={() => {
              setSelectedStrand('both');
              handleFitFullHelix();
              autoCloseOnMobile();
            }}
            className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-100 border border-zinc-700 hover:border-amber-400/50 transition-all cursor-pointer whitespace-nowrap"
          >
            Fit Entire 66-Book Helix
          </button>
          <button
            onClick={() => {
              setScrollProgress(0.02);
              setFocusedDossier({ type: 'book', data: BIBLE_BOOKS[0] });
              onSelectBook(BIBLE_BOOKS[0]);
            }}
            className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/45 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Inspect Genesis #1</span>
          </button>
        </div>
      )
    },
    {
      stepNum: 2,
      badge: 'Step 02 / 05 · Inter-Testamental Rungs',
      title: 'Cross the Prophecy & Typology Bridges',
      description:
        'Each luminous horizontal bridge connects an Old Testament Messianic promise or typological shadow to its New Testament fulfillment. Select a bridge below to inspect both passages:',
      renderActions: () => {
        const firstProphecy = PROPHECY_LINKS[0];
        const sufferingServant =
          PROPHECY_LINKS.find(p => p.otPassage.includes('Isaiah 53')) || PROPHECY_LINKS[1] || firstProphecy;
        return (
          <div className="flex flex-wrap gap-2 pt-1">
            {firstProphecy && (
              <button
                onClick={() => {
                  setSelectedStrand('both');
                  setScrollProgress(0.05);
                  setFocusedDossier({ type: 'prophecy', data: firstProphecy });
                  onSelectProphecy(firstProphecy);
                }}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{firstProphecy.otPassage} → {firstProphecy.ntPassage}</span>
              </button>
            )}
            {sufferingServant && (
              <button
                onClick={() => {
                  setSelectedStrand('both');
                  setScrollProgress(0.45);
                  setFocusedDossier({ type: 'prophecy', data: sufferingServant });
                  onSelectProphecy(sufferingServant);
                }}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-500/40 hover:bg-sky-500/30 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{sufferingServant.title}</span>
              </button>
            )}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('prophecy')}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-100 border border-zinc-700 hover:border-amber-400/50 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Open Prophecy Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </button>
            )}
          </div>
        );
      }
    },
    {
      stepNum: 3,
      badge: 'Step 03 / 05 · Covenantal Architecture',
      title: 'Filter by Progressive Biblical Covenants',
      description:
        'Redemptive history unfolds through progressive covenants—from Eden and Abraham to Sinai, David, and the New Covenant in Christ. Isolate any covenant below on the 3D helix:',
      renderActions: () => (
        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Edenic', 'Abrahamic', 'Mosaic', 'Davidic', 'New Covenant'].map(cov => (
              <button
                key={cov}
                onClick={() => {
                  setSelectedStrand('both');
                  setSelectedCovenant(cov);
                }}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  selectedCovenant === cov
                    ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                    : 'bg-zinc-900/90 text-zinc-200 border-zinc-700 hover:border-amber-500/40'
                }`}
              >
                {cov}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-amber-300">
            Active Rungs: {filteredProphecies.length} prophetic {filteredProphecies.length === 1 ? 'bridge' : 'bridges'} ({selectedCovenant})
          </div>
        </div>
      )
    },
    {
      stepNum: 4,
      badge: 'Step 04 / 05 · Deep Exegesis & Mapping',
      title: 'Connect Arcs, Timelines & Original Texts',
      description:
        'Move from 3D canonical geometry into granular research: explore the 63,779 Cross-Reference Rainbow Arc Diagram in the Knowledge Graph, trace epochs in Narrative Timelines, or study texts in the Canon Catalog.',
      renderActions: () => (
        <div className="flex flex-wrap gap-2 pt-1">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('graph')}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/45 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Open Cross-Reference Arc Graph</span>
              </button>
              <button
                onClick={() => onNavigateTab('timeline')}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-zinc-900 text-sky-200 border border-zinc-700 hover:border-sky-400/50 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Narrative Timelines</span>
              </button>
              <button
                onClick={() => onNavigateTab('reader')}
                className="px-3 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-100 border border-zinc-700 hover:border-amber-400/50 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Canon Reader</span>
              </button>
            </>
          )}
        </div>
      )
    },
    {
      stepNum: 5,
      badge: 'Step 05 / 05 · Wisdom & Theological Synthesis',
      title: 'Turn Knowledge into Discernment & Love',
      description:
        'Scriptural study reaches its telos when truth forms Christlike wisdom and love (Philippians 1:9–11). Practice discernment in The Economy of Wisdom or synthesize motifs with Theological AI.',
      renderActions: () => (
        <div className="flex flex-wrap gap-2 pt-1">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('wisdom')}
                className="px-3.5 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-zinc-950 hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
                <span>Enter Economy of Wisdom</span>
              </button>
              <button
                onClick={() => onNavigateTab('theology')}
                className="px-3.5 py-2 min-h-[38px] rounded-lg text-xs font-semibold bg-zinc-900 text-amber-200 border border-amber-500/40 hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Launch Theological AI</span>
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  const activeWalkthrough = walkthroughSteps[guideStep] || walkthroughSteps[0];

  return (
    <div className="relative w-full h-[calc(100dvh-102px)] lg:h-[calc(100dvh-58px)] min-h-[540px] bg-[#040508] flex flex-col select-none overflow-hidden">
      {/* Top Observatory Command Strip (Strictly single-line & horizontally scrollable on narrow viewports) */}
      <div className="z-20 bg-[#06080d]/95 backdrop-blur-md border-b border-amber-500/15 px-2.5 sm:px-5 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2 w-full max-w-full overflow-hidden">
        {/* Left: Horizontally Scrollable Covenant Filter Matrix */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 min-w-0">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-mono uppercase tracking-wider shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden xs:inline">Covenant:</span>
          </div>
          {['All', 'Edenic', 'Abrahamic', 'Mosaic', 'Davidic', 'New Covenant'].map((cov) => (
            <button
              key={cov}
              onClick={() => setSelectedCovenant(cov)}
              aria-pressed={selectedCovenant === cov}
              className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCovenant === cov
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/45 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.18)]'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              {cov}
            </button>
          ))}
        </div>

        {/* Right: Strand Toggles, Full-Canon Zoom Controls & Walkthrough Toggle (Single-Line Guaranteed) */}
        <div className="flex items-center justify-between md:justify-end gap-1.5 overflow-x-auto scrollbar-none py-0.5 shrink-0">
          {/* Strand Filter — whitespace-nowrap prevents "OT & NT" from wrapping onto 3 lines */}
          <div
            role="group"
            aria-label="Testament Strand Filter"
            className="flex items-center gap-1 bg-zinc-950/90 p-0.5 rounded-lg border border-amber-500/20 text-xs shrink-0"
          >
            <button
              onClick={() => setSelectedStrand('both')}
              aria-pressed={selectedStrand === 'both'}
              className={`px-2.5 py-1.5 min-h-[34px] rounded-md cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                selectedStrand === 'both'
                  ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/35'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              OT &amp; NT
            </button>
            <button
              onClick={() => setSelectedStrand('OT')}
              aria-pressed={selectedStrand === 'OT'}
              className={`px-2 py-1.5 min-h-[34px] rounded-md cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                selectedStrand === 'OT'
                  ? 'bg-amber-500/30 text-amber-200 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              OT (39)
            </button>
            <button
              onClick={() => setSelectedStrand('NT')}
              aria-pressed={selectedStrand === 'NT'}
              className={`px-2 py-1.5 min-h-[34px] rounded-md cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                selectedStrand === 'NT'
                  ? 'bg-sky-500/30 text-sky-200 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              NT (27)
            </button>
          </div>

          {/* Spin, Zoom In/Out, Fit Entire Helix & Reset Controls */}
          <div
            role="group"
            aria-label="3D Helix Camera and Zoom Controls"
            className="flex items-center gap-0.5 bg-zinc-950/90 p-0.5 rounded-lg border border-amber-500/20 shrink-0"
          >
            <button
              onClick={() => setIsAutoSpin(!isAutoSpin)}
              aria-label={isAutoSpin ? 'Pause Helix Rotation' : 'Start Helix Rotation'}
              aria-pressed={isAutoSpin}
              title={isAutoSpin ? 'Pause Rotation' : 'Auto Rotate'}
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              {isAutoSpin ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>
            <button
              onClick={() => setZoom(z => Math.min(2.4, +(z + 0.16).toFixed(2)))}
              aria-label="Zoom In"
              title="Zoom In"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(z => Math.max(0.22, +(z - 0.16).toFixed(2)))}
              aria-label="Zoom Out"
              title="Zoom Out (down to Full Canon view)"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitFullHelix}
              aria-label="Fit entire Double-Helix on screen"
              title="Fit Entire Double-Helix (All 66 Books)"
              className={`px-2 min-h-[34px] flex items-center gap-1 rounded-md text-[11px] font-mono whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                zoom <= 0.42
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'text-zinc-200 hover:text-amber-200 hover:bg-zinc-800'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Fit All</span>
            </button>
            <button
              onClick={() => {
                setRotationAngle(0.45);
                setPitchAngle(0.08);
                setZoom(0.88);
                setScrollProgress(0.35);
                setSelectedCovenant('All');
                setSelectedStrand('both');
              }}
              aria-label="Reset camera perspective"
              title="Reset Perspective"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Walkthrough Guide Button */}
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            aria-expanded={guideOpen}
            aria-controls="helix-walkthrough-modal"
            className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              guideOpen
                ? 'bg-amber-500/25 text-amber-100 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.28)]'
                : 'bg-zinc-950 text-zinc-200 border-zinc-700 hover:border-amber-400/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Guide ({guideStep + 1}/5)</span>
            {guideOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main 3D Bioluminescent Double-Helix Stage + Focused Modal Overlay */}
      <div
        ref={containerRef}
        className="flex-1 w-full relative cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D Double-Helix of the 66 Books of Scripture and 25 Prophetic Fulfillment Bridges"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full block touch-none"
        />

        {/* Quick Zoom Level Readout Pill (Bottom-Right of Canvas) */}
        <div className="absolute bottom-3 right-3 xl:right-[355px] z-10 flex items-center gap-2 bg-zinc-950/85 backdrop-blur-md border border-amber-500/20 rounded-lg px-2.5 py-1 text-[11px] font-mono text-zinc-300 pointer-events-auto">
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          {zoom > 0.42 ? (
            <button
              onClick={handleFitFullHelix}
              className="text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Fit Full Helix
            </button>
          ) : (
            <button
              onClick={() => setZoom(0.95)}
              className="text-sky-300 hover:text-sky-200 underline cursor-pointer"
            >
              Close-Up View
            </button>
          )}
        </div>

        {/* Hover Tooltip Card (Desktop / Pointer) */}
        {hoveredItem && !guideOpen && (
          <div
            className="hidden sm:block absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 glass-obsidian rounded-xl p-3.5 max-w-xs text-left"
            style={{ left: hoveredItem.x, top: hoveredItem.y }}
          >
            {hoveredItem.type === 'book' ? (
              (() => {
                const book = hoveredItem.data as BibleBook;
                return (
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      <span>{book.testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                      <span className="text-amber-300">{book.originalName}</span>
                    </div>
                    <div className="text-sm font-bold text-amber-100 font-serif-title">{book.name}</div>
                    <div className="text-xs font-mono text-zinc-200 mt-1 line-clamp-2">{book.theme}</div>
                    <div className="text-[11px] font-mono text-amber-300/90 mt-1.5 italic">
                      &ldquo;{book.keyVerseText}&rdquo;
                    </div>
                    <div className="text-[10px] text-amber-400 mt-2 font-mono uppercase tracking-wider">
                      Click to inspect canonical book →
                    </div>
                  </div>
                );
              })()
            ) : (
              (() => {
                const prop = hoveredItem.data as ProphecyLink;
                return (
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                      <span>{prop.category}</span>
                      <span className="text-zinc-400">{prop.covenant}</span>
                    </div>
                    <div className="text-xs font-bold text-amber-100 font-serif-title">{prop.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-200 mt-1.5 font-mono">
                      <span className="text-amber-300">{prop.otPassage}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                      <span className="text-sky-300">{prop.ntPassage}</span>
                    </div>
                    <div className="text-[10px] text-amber-400 mt-2 font-mono uppercase tracking-wider">
                      Click to inspect prophecy bridge →
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* FOCUSED WALKTHROUGH MODAL & BACKDROP SCRIM:
            - On smaller screens: Full-screen blur and fade backdrop + non-clipped modal sheet with sticky bottom buttons
            - On desktop screens: Spotlight dim/blur backdrop so the open Guide Modal commands unmistakable visual focus */}
        {guideOpen && (
          <>
            {/* Backdrop Blur & Fade Scrim (Click outside to focus directly on the 3D Helix) */}
            <div
              onClick={() => setGuideOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 lg:absolute lg:inset-0 z-30 bg-black/80 lg:bg-black/55 backdrop-blur-md lg:backdrop-blur-[3px] transition-opacity animate-in fade-in duration-200"
            />

            <aside
              id="helix-walkthrough-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="walkthrough-guide-title"
              className="fixed inset-x-3 top-[118px] bottom-[84px] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] sm:top-[128px] sm:bottom-auto sm:max-h-[74dvh] lg:absolute lg:top-4 lg:left-5 lg:translate-x-0 lg:w-[415px] xl:w-[435px] lg:max-h-[calc(100%-32px)] z-40 bg-[#080b12]/98 backdrop-blur-2xl border-2 border-amber-400/60 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(245,158,11,0.22)] rounded-2xl flex flex-col overflow-hidden"
            >
              {/* Pinned Top Header */}
              <div className="px-4 py-3 border-b border-amber-500/20 flex items-center justify-between gap-2 shrink-0 bg-[#0a0e17]">
                <div className="flex items-center gap-2 min-w-0">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 truncate">
                    Research Journey Walkthrough
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-200 shrink-0">
                    FOCUS MODE
                  </span>
                </div>

                <button
                  onClick={() => setGuideOpen(false)}
                  aria-label="Minimize walkthrough guide and focus on 3D Helix"
                  className="min-h-[34px] px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore Helix</span>
                  <X className="w-3.5 h-3.5 ml-0.5 text-zinc-400" />
                </button>
              </div>

              {/* Scrollable Middle Content (Never clips buttons!) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {/* Editorial Display Title on Desktop */}
                <div className="hidden lg:block border-b border-amber-500/15 pb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-amber-400/90 mb-1">
                    <span>Canonical Architecture</span>
                    <span>66 Books · 25 Rungs</span>
                  </div>
                  <h1 className="text-2xl font-bold font-serif-title text-amber-50 tracking-wide leading-tight">
                    Double-Helix{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500">
                      Scripture
                    </span>
                  </h1>
                  <p className="text-xs font-mono text-zinc-300 mt-1.5 leading-relaxed">
                    Intertwined Hebrew Old Testament &amp; Greek New Testament strands bridged by Messianic prophecy.
                  </p>
                </div>

                {/* Interactive 5-Step Roadmap Strip */}
                <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Research Journey Steps">
                  {[
                    { label: 'Strands' },
                    { label: 'Prophecy' },
                    { label: 'Covenants' },
                    { label: 'Exegesis' },
                    { label: 'Wisdom' }
                  ].map((item, idx) => {
                    const isCurrent = idx === guideStep;
                    const isDone = completedSteps.includes(idx);
                    return (
                      <button
                        key={item.label}
                        role="tab"
                        aria-selected={isCurrent}
                        onClick={() => markStepVisited(idx)}
                        className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[44px] rounded-lg border text-center transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                            : isDone
                            ? 'bg-zinc-900/90 border-amber-500/35 text-amber-300 hover:border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-0.5 text-[10px] font-mono font-bold">
                          <span>0{idx + 1}</span>
                          {isDone && !isCurrent && <CheckCircle2 className="w-2.5 h-2.5 text-amber-400" />}
                        </div>
                        <span className="text-[10px] font-medium truncate w-full">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Body */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                    {activeWalkthrough.badge}
                  </div>
                  <h2
                    id="walkthrough-guide-title"
                    className="text-base sm:text-lg font-bold font-serif-title text-amber-50 leading-snug"
                  >
                    {activeWalkthrough.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] font-mono text-zinc-200 leading-relaxed">
                    {activeWalkthrough.description}
                  </p>

                  {/* Step-Specific Interactive Actions */}
                  <div className="bg-black/70 border border-amber-500/25 rounded-xl p-3 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                      <span>Try This Step Now:</span>
                      <span className="text-amber-400 font-semibold">Live Interactive Control</span>
                    </div>
                    {activeWalkthrough.renderActions()}
                  </div>
                </div>
              </div>

              {/* Pinned Bottom Navigation Footer (Never clipped on mobile or desktop) */}
              <div className="px-4 py-3 border-t border-amber-500/20 bg-[#0a0e17] flex items-center justify-between gap-2 text-xs shrink-0">
                <button
                  disabled={guideStep === 0}
                  onClick={() => markStepVisited(Math.max(0, guideStep - 1))}
                  className={`min-h-[38px] flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    guideStep === 0
                      ? 'text-zinc-600 bg-zinc-900/40 cursor-not-allowed'
                      : 'text-zinc-200 bg-zinc-900 hover:text-white hover:bg-zinc-800 border border-zinc-700 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-[11px] font-mono text-zinc-400">
                  Step {guideStep + 1} of 5
                </span>

                <button
                  onClick={() => {
                    if (guideStep < walkthroughSteps.length - 1) {
                      markStepVisited(guideStep + 1);
                    } else {
                      setGuideOpen(false);
                    }
                  }}
                  className="min-h-[38px] flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-zinc-950 font-bold hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <span>{guideStep < walkthroughSteps.length - 1 ? 'Next Step' : 'Finish & Explore'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </aside>
          </>
        )}

        {/* RIGHT OBSERVATORY WING: Live Exegetical Dossier & Covenant Telemetry */}
        <aside
          aria-label="Canonical Dossier & Telemetry"
          className={`hidden xl:flex absolute top-4 right-5 w-[335px] max-h-[calc(100%-32px)] overflow-y-auto z-20 glass-obsidian rounded-xl p-4 flex-col gap-3.5 transition-opacity duration-200 ${
            guideOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Section 1: Active Node Dossier */}
          <div className="border-b border-amber-500/15 pb-3">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-amber-400/90 mb-1.5">
              <span>
                {focusedDossier.type === 'book' ? 'Canonical Book Dossier' : 'Prophetic Bridge Dossier'}
              </span>
              <span className="text-emerald-400 font-semibold">● ACTIVE</span>
            </div>

            {focusedDossier.type === 'book' ? (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold font-serif-title text-amber-100">
                    {focusedDossier.data.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-300">
                    {focusedDossier.data.originalName}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  {focusedDossier.data.testament === 'OT' ? 'Hebrew OT' : 'Greek NT'} ·{' '}
                  {focusedDossier.data.division} · {focusedDossier.data.chapters} Chapters
                </div>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed">
                  {focusedDossier.data.theme}
                </p>
                <blockquote className="p-2.5 rounded-lg bg-black/60 border border-amber-500/25 text-xs font-mono italic text-amber-100/95">
                  &ldquo;{focusedDossier.data.keyVerseText}&rdquo;
                  <footer className="text-[10px] font-mono not-italic text-amber-400 mt-1">
                    — {focusedDossier.data.keyVerse}
                  </footer>
                </blockquote>
                <button
                  onClick={() => onSelectBook(focusedDossier.data)}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Full Canonical Dossier</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-amber-300">
                  {focusedDossier.data.category} · {focusedDossier.data.covenant} Covenant
                </div>
                <h3 className="text-base font-bold font-serif-title text-amber-100 leading-snug">
                  {focusedDossier.data.title}
                </h3>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
                    <div className="text-[9px] uppercase text-amber-400">OT Promise</div>
                    <div className="text-amber-200 font-semibold truncate">
                      {focusedDossier.data.otPassage}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-sky-500/10 border border-sky-500/30">
                    <div className="text-[9px] uppercase text-sky-400">NT Fulfillment</div>
                    <div className="text-sky-200 font-semibold truncate">
                      {focusedDossier.data.ntPassage}
                    </div>
                  </div>
                </div>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed line-clamp-3">
                  {focusedDossier.data.theologicalSignificance}
                </p>
                <button
                  onClick={() => onSelectProphecy(focusedDossier.data)}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Side-by-Side Exegesis</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Covenantal Distribution Telemetry */}
          <div className="border-b border-amber-500/15 pb-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">
              <span>Covenant Rung Density</span>
              <span className="text-amber-400">{PROPHECY_LINKS.length} Bridges</span>
            </div>
            <div className="space-y-1.5">
              {covenantTelemetry.map((item) => {
                const isSelected = selectedCovenant === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() =>
                      setSelectedCovenant(selectedCovenant === item.name ? 'All' : item.name)
                    }
                    className="w-full text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-0.5">
                      <span
                        className={
                          isSelected
                            ? 'text-amber-300 font-bold'
                            : 'text-zinc-300 group-hover:text-white'
                        }
                      >
                        {item.name}
                      </span>
                      <span className="text-amber-400">
                        {item.count} rungs ({item.pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-sky-400 transition-all duration-300"
                        style={{ width: `${Math.max(12, item.pct * 1.8)}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Quick Canonical Jump Nodes */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">
              Key Canonical Anchors
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Genesis 1', bookName: 'Genesis', scroll: 0.02 },
                { label: 'Isaiah 53', bookName: 'Isaiah', scroll: 0.44 },
                { label: 'John 1', bookName: 'John', scroll: 0.62 },
                { label: 'Revelation 21', bookName: 'Revelation', scroll: 0.96 }
              ].map((anchor) => (
                <button
                  key={anchor.bookName}
                  onClick={() => {
                    const found = BIBLE_BOOKS.find(b => b.name === anchor.bookName);
                    if (zoom < 0.5) setZoom(0.88);
                    setScrollProgress(anchor.scroll);
                    if (found) {
                      setFocusedDossier({ type: 'book', data: found });
                    }
                  }}
                  className="px-2.5 py-2 rounded-lg bg-zinc-900/90 hover:bg-amber-500/15 border border-zinc-800 hover:border-amber-500/40 text-xs font-mono text-zinc-200 hover:text-amber-200 text-left flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{anchor.label}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Canonical Depth Scrub Bar (With space for Mobile Bottom Dock) */}
      <div className="z-20 bg-[#06080d]/95 backdrop-blur-md border-t border-amber-500/15 px-3 sm:px-6 py-2 pb-16 lg:pb-2.5 flex items-center gap-3 sm:gap-4 text-xs">
        <button
          onClick={() => {
            if (zoom < 0.5) setZoom(0.88);
            setScrollProgress(0.02);
          }}
          className="flex items-center gap-1.5 shrink-0 text-zinc-200 hover:text-amber-200 cursor-pointer py-1"
          title="Jump to Genesis"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-200 font-serif-title">Genesis</span>
        </button>

        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="hidden sm:flex justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <span>Creation &amp; Patriarchs</span>
            <span>Kingdom &amp; Prophets</span>
            <span>Gospels &amp; Apostles</span>
            <span>New Jerusalem</span>
          </div>
          <div className="flex sm:hidden justify-between text-[10px] font-mono text-zinc-300 truncate">
            <span>Canonical Depth</span>
            <span className="text-amber-300 font-medium truncate ml-2">{currentCanonicalEra}</span>
          </div>
          <input
            type="range"
            aria-label="Canonical Depth Scrubber"
            min="0"
            max="1"
            step="0.005"
            value={scrollProgress}
            onChange={(e) => {
              if (zoom < 0.45) setZoom(0.75);
              setScrollProgress(parseFloat(e.target.value));
            }}
            className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <button
          onClick={() => {
            if (zoom < 0.5) setZoom(0.88);
            setScrollProgress(0.96);
          }}
          className="flex items-center gap-1.5 shrink-0 text-zinc-200 hover:text-sky-200 cursor-pointer py-1"
          title="Jump to Revelation"
        >
          <span className="font-semibold text-sky-200 font-serif-title">Revelation</span>
        </button>
      </div>
    </div>
  );
};
