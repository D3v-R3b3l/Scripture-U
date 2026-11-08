import React, { useRef, useState, useEffect, useMemo } from 'react';
import { GRAPH_NODES, GRAPH_EDGES, GraphNode, GraphNodeType } from '../data/knowledgeGraph';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';
import { PROPHECY_LINKS, ProphecyLink } from '../data/prophecies';
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Sparkles,
  X,
  ChevronRight,
  GitBranch,
  Activity,
  CircleDot,
  Rainbow,
  ArrowRight,
  Layers,
  Filter
} from 'lucide-react';

interface KnowledgeGraphViewProps {
  onSelectNodeDetail?: (node: GraphNode) => void;
  onSelectBookDetail?: (book: BibleBook) => void;
  onSelectProphecyDetail?: (prophecy: ProphecyLink) => void;
}

export type GraphViewMode = 'arcs' | 'network' | 'chord';

export type ArcPresetFilter =
  | 'all'
  | 'messianic'
  | 'isaiah'
  | 'psalms'
  | 'torah'
  | 'alpha-omega';

export interface CanonicalCrossRefArc {
  id: string;
  sourceBookIndex: number; // 0..65
  sourceChapter: number;
  targetBookIndex: number; // 0..65
  targetChapter: number;
  sourceGlobalChapter: number; // 1..1189
  targetGlobalChapter: number; // 1..1189
  category: 'Messianic Prophecy' | 'Covenant Thread' | 'Typological Shadow' | 'NT Quotation' | 'Apocalyptic Echo' | 'Wisdom Resonance';
  title: string;
  sourceRef: string;
  targetRef: string;
  weight: number;
  color: string;
  prophecyLink?: ProphecyLink;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  onSelectNodeDetail,
  onSelectBookDetail,
  onSelectProphecyDetail
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Primary Visualization Mode: Defaults to the Canonical Rainbow Arc Diagram ('arcs')
  const [viewMode, setViewMode] = useState<GraphViewMode>('arcs');
  const [arcPreset, setArcPreset] = useState<ArcPresetFilter>('all');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Focused Selection State (Supports Book, Cross-Ref Arc, or Theological GraphNode)
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedArc, setSelectedArc] = useState<CanonicalCrossRefArc | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Hover state for live crosshair HUD
  const [hoveredBookIdx, setHoveredBookIdx] = useState<number | null>(null);
  const [hoveredArc, setHoveredArc] = useState<CanonicalCrossRefArc | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Pan and Zoom State
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.0);

  // Dragging node vs panning canvas
  const dragNodeRef = useRef<(GraphNode & { x: number; y: number; vx: number; vy: number; radius: number }) | null>(null);
  const isPanningRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerMovedDistRef = useRef<number>(0);

  // 1. Pre-compute Cumulative Chapter Offsets across all 66 Books (1,189 total chapters)
  const bookLayoutMeta = useMemo(() => {
    let cumulative = 0;
    const list = BIBLE_BOOKS.map((book, idx) => {
      const startChapter = cumulative + 1;
      cumulative += book.chapters;
      const endChapter = cumulative;
      return {
        book,
        index: idx,
        startChapter,
        endChapter,
        midChapter: (startChapter + endChapter) * 0.5
      };
    });
    return { books: list, totalChapters: cumulative || 1189 };
  }, []);

  // Helper to get spectral color for an arc based on source/target canonical division & distance
  const getSpectralArcColor = (srcIdx: number, tgtIdx: number, alpha = 0.65) => {
    const spanRatio = Math.abs(tgtIdx - srcIdx) / 65;
    const isInterTestamental = (srcIdx < 39 && tgtIdx >= 39) || (srcIdx >= 39 && tgtIdx < 39);

    if (srcIdx === 0 && tgtIdx === 65) {
      return `rgba(251, 191, 36, ${Math.min(1, alpha + 0.25)})`; // Alpha-Omega Gold
    }
    if (srcIdx < 5) {
      // Pentateuch origins: Emerald-Teal to Cyan-Blue
      return isInterTestamental
        ? `rgba(45, 212, 191, ${alpha})`
        : `rgba(16, 185, 129, ${alpha})`;
    }
    if (srcIdx >= 5 && srcIdx < 17) {
      // Historical books: Royal Blue to Sky Cyan
      return `rgba(56, 189, 248, ${alpha})`;
    }
    if (srcIdx >= 17 && srcIdx < 22) {
      // Wisdom & Psalms: Luminous Violet / Purple-Blue
      return `rgba(168, 85, 247, ${alpha})`;
    }
    if (srcIdx >= 22 && srcIdx < 39) {
      // Major & Minor Prophets: Molten Amber / Rose / Crimson
      return spanRatio > 0.45
        ? `rgba(245, 158, 11, ${alpha})`
        : `rgba(244, 63, 94, ${alpha})`;
    }
    // Intra-NT arcs: Crystalline Ice-Blue / Indigo
    return `rgba(129, 140, 248, ${alpha})`;
  };

  // 2. Build Comprehensive 340-Arc Canonical Cross-Reference Dataset (Combining Prophecy Links + Canonical Cross-References across all 66 Books)
  const allCrossRefArcs = useMemo<CanonicalCrossRefArc[]>(() => {
    const arcs: CanonicalCrossRefArc[] = [];
    const meta = bookLayoutMeta.books;

    const findBookIndexByName = (passage: string): { idx: number; ch: number } => {
      for (let i = meta.length - 1; i >= 0; i--) {
        if (passage.startsWith(meta[i].book.name)) {
          const rest = passage.slice(meta[i].book.name.length).trim();
          const chMatch = rest.match(/^(\d+)/);
          const ch = chMatch ? Math.min(meta[i].book.chapters, parseInt(chMatch[1], 10)) : 1;
          return { idx: i, ch };
        }
      }
      return { idx: 0, ch: 1 };
    };

    // A. Add all 25 curated Prophecy Matrix links with exact passages
    PROPHECY_LINKS.forEach((p, idx) => {
      const ot = findBookIndexByName(p.otPassage);
      const nt = findBookIndexByName(p.ntPassage);
      const srcMeta = meta[ot.idx];
      const tgtMeta = meta[nt.idx];
      arcs.push({
        id: `prophecy-arc-${p.id}`,
        sourceBookIndex: ot.idx,
        sourceChapter: ot.ch,
        targetBookIndex: nt.idx,
        targetChapter: nt.ch,
        sourceGlobalChapter: srcMeta.startChapter + ot.ch - 1,
        targetGlobalChapter: tgtMeta.startChapter + nt.ch - 1,
        category: 'Messianic Prophecy',
        title: p.title,
        sourceRef: p.otPassage,
        targetRef: p.ntPassage,
        weight: 5,
        color: getSpectralArcColor(ot.idx, nt.idx, 0.82),
        prophecyLink: p
      });
      // Add secondary harmonic echo arc for major prophecy hubs
      if (idx % 2 === 0 && nt.idx < 65) {
        const revMeta = meta[65];
        arcs.push({
          id: `prophecy-echo-${p.id}`,
          sourceBookIndex: ot.idx,
          sourceChapter: ot.ch,
          targetBookIndex: 65,
          targetChapter: (idx % 22) + 1,
          sourceGlobalChapter: srcMeta.startChapter + ot.ch - 1,
          targetGlobalChapter: revMeta.startChapter + (idx % 22),
          category: 'Apocalyptic Echo',
          title: `${p.title} (Consummation Echo)`,
          sourceRef: p.otPassage,
          targetRef: `Revelation ${(idx % 22) + 1}:1`,
          weight: 3,
          color: getSpectralArcColor(ot.idx, 65, 0.55)
        });
      }
    });

    // B. Curated High-Impact Canonical Cross-Reference Pillars (Creation, Covenants, Psalms, Isaiah, Gospels, Epistles, Revelation)
    const canonicalPillars: {
      src: number;
      srcCh: number;
      tgt: number;
      tgtCh: number;
      cat: CanonicalCrossRefArc['category'];
      title: string;
    }[] = [
      // Genesis to NT & OT
      { src: 0, srcCh: 1, tgt: 42, tgtCh: 1, cat: 'Covenant Thread', title: 'In the Beginning: Creation Word & Incarnate Logos' },
      { src: 0, srcCh: 2, tgt: 65, tgtCh: 22, cat: 'Apocalyptic Echo', title: 'Tree of Life in Eden Restored in New Jerusalem' },
      { src: 0, srcCh: 3, tgt: 44, tgtCh: 5, cat: 'Typological Shadow', title: 'First Adam in Eden vs. Last Adam in Romans' },
      { src: 0, srcCh: 12, tgt: 47, tgtCh: 3, cat: 'Covenant Thread', title: 'Abrahamic Blessing to All Nations Fulfilled in Christ' },
      { src: 0, srcCh: 14, tgt: 57, tgtCh: 7, cat: 'Typological Shadow', title: 'Melchizedek King-Priest & Eternal Priesthood of Christ' },
      { src: 0, srcCh: 15, tgt: 44, tgtCh: 4, cat: 'NT Quotation', title: 'Abraham Believed God & Justification by Faith' },
      { src: 0, srcCh: 22, tgt: 57, tgtCh: 11, cat: 'Typological Shadow', title: 'Binding of Isaac on Moriah & Resurrection Faith' },
      { src: 0, srcCh: 28, tgt: 42, tgtCh: 1, cat: 'Typological Shadow', title: 'Jacob’s Ladder & Angels Ascending on the Son of Man' },
      // Exodus, Leviticus, Numbers, Deuteronomy
      { src: 1, srcCh: 12, tgt: 45, tgtCh: 5, cat: 'Typological Shadow', title: 'Passover Lamb Blood & Christ Our Passover Sacrificed' },
      { src: 1, srcCh: 16, tgt: 42, tgtCh: 6, cat: 'Typological Shadow', title: 'Manna in the Wilderness & True Bread from Heaven' },
      { src: 1, srcCh: 24, tgt: 57, tgtCh: 9, cat: 'Covenant Thread', title: 'Blood of the Covenant at Sinai & New Covenant Blood' },
      { src: 2, srcCh: 16, tgt: 57, tgtCh: 9, cat: 'Typological Shadow', title: 'Day of Atonement (Yom Kippur) & Heavenly Sanctuary' },
      { src: 2, srcCh: 19, tgt: 39, tgtCh: 22, cat: 'NT Quotation', title: 'Love Your Neighbor as Yourself (Holiness Code to Gospel)' },
      { src: 3, srcCh: 21, tgt: 42, tgtCh: 3, cat: 'Typological Shadow', title: 'Bronze Serpent Lifted Up in Wilderness & Golgotha' },
      { src: 4, srcCh: 6, tgt: 39, tgtCh: 4, cat: 'NT Quotation', title: 'Shema & Temptation in the Wilderness Citations' },
      { src: 4, srcCh: 18, tgt: 43, tgtCh: 3, cat: 'Messianic Prophecy', title: 'A Prophet Like Moses Raised Up for Israel' },
      { src: 4, srcCh: 21, tgt: 47, tgtCh: 3, cat: 'NT Quotation', title: 'Cursed is Everyone Who Hangs on a Tree' },
      // Historical & Davidic
      { src: 7, srcCh: 4, tgt: 39, tgtCh: 1, cat: 'Covenant Thread', title: 'Boaz & Ruth the Moabitess in the Royal Messianic Genealogy' },
      { src: 9, srcCh: 7, tgt: 41, tgtCh: 1, cat: 'Covenant Thread', title: 'Davidic Throne Covenant & Gabriel’s Annunciation' },
      { src: 10, srcCh: 8, tgt: 42, tgtCh: 2, cat: 'Typological Shadow', title: 'Solomon’s Temple Glory & The Temple of Christ’s Body' },
      // Job, Psalms, Proverbs
      { src: 17, srcCh: 19, tgt: 45, tgtCh: 15, cat: 'Wisdom Resonance', title: 'I Know That My Redeemer Lives & Bodily Resurrection' },
      { src: 18, srcCh: 2, tgt: 43, tgtCh: 4, cat: 'NT Quotation', title: 'Why Do the Nations Rage & The Anointed Son' },
      { src: 18, srcCh: 8, tgt: 57, tgtCh: 2, cat: 'NT Quotation', title: 'Son of Man Crowned with Glory and Honor' },
      { src: 18, srcCh: 16, tgt: 43, tgtCh: 2, cat: 'Messianic Prophecy', title: 'You Will Not Abandon My Soul to Sheol (Pentecost)' },
      { src: 18, srcCh: 22, tgt: 39, tgtCh: 27, cat: 'Messianic Prophecy', title: 'My God, Why Have You Forsaken Me & Pierced Hands' },
      { src: 18, srcCh: 23, tgt: 42, tgtCh: 10, cat: 'Typological Shadow', title: 'The Lord is My Shepherd & The Good Shepherd' },
      { src: 18, srcCh: 40, tgt: 57, tgtCh: 10, cat: 'NT Quotation', title: 'Sacrifice and Offering You Did Not Desire: Behold I Come' },
      { src: 18, srcCh: 68, tgt: 48, tgtCh: 4, cat: 'NT Quotation', title: 'He Ascended on High and Gave Gifts to Humanity' },
      { src: 18, srcCh: 110, tgt: 57, tgtCh: 5, cat: 'Messianic Prophecy', title: 'Sit at My Right Hand: Priest Forever After Melchizedek' },
      { src: 18, srcCh: 118, tgt: 59, tgtCh: 2, cat: 'NT Quotation', title: 'The Stone the Builders Rejected Has Become the Cornerstone' },
      { src: 19, srcCh: 3, tgt: 57, tgtCh: 12, cat: 'Wisdom Resonance', title: 'Fear of the Lord & Fatherly Discipline of Wisdom' },
      { src: 19, srcCh: 8, tgt: 50, tgtCh: 1, cat: 'Wisdom Resonance', title: 'Divine Wisdom at Creation & Christ the Wisdom of God' },
      // Isaiah, Jeremiah, Ezekiel, Daniel, Minor Prophets
      { src: 22, srcCh: 6, tgt: 42, tgtCh: 12, cat: 'NT Quotation', title: 'Isaiah’s Temple Vision: He Saw Christ’s Glory' },
      { src: 22, srcCh: 7, tgt: 39, tgtCh: 1, cat: 'Messianic Prophecy', title: 'Behold the Virgin Shall Conceive: Immanuel' },
      { src: 22, srcCh: 9, tgt: 39, tgtCh: 4, cat: 'Messianic Prophecy', title: 'Galilee of the Gentiles: A Great Light Has Dawned' },
      { src: 22, srcCh: 11, tgt: 65, tgtCh: 5, cat: 'Messianic Prophecy', title: 'Shoot from the Stump of Jesse & Root of David' },
      { src: 22, srcCh: 40, tgt: 40, tgtCh: 1, cat: 'NT Quotation', title: 'Voice Crying in the Wilderness: Prepare the Way' },
      { src: 22, srcCh: 53, tgt: 59, tgtCh: 2, cat: 'Messianic Prophecy', title: 'By His Wounds You Have Been Healed (Suffering Servant)' },
      { src: 22, srcCh: 61, tgt: 41, tgtCh: 4, cat: 'Messianic Prophecy', title: 'The Spirit of the Lord is Upon Me (Nazareth Scroll)' },
      { src: 22, srcCh: 65, tgt: 65, tgtCh: 21, cat: 'Apocalyptic Echo', title: 'Behold I Create New Heavens and a New Earth' },
      { src: 23, srcCh: 31, tgt: 57, tgtCh: 8, cat: 'Covenant Thread', title: 'The New Covenant Written on the Heart' },
      { src: 25, srcCh: 36, tgt: 42, tgtCh: 3, cat: 'Covenant Thread', title: 'Clean Water & New Spirit: Born of Water and Spirit' },
      { src: 25, srcCh: 37, tgt: 65, tgtCh: 11, cat: 'Apocalyptic Echo', title: 'Valley of Dry Bones & Breath of Resurrection Life' },
      { src: 25, srcCh: 47, tgt: 65, tgtCh: 22, cat: 'Apocalyptic Echo', title: 'River of Life Flowing from the Temple Threshold' },
      { src: 26, srcCh: 7, tgt: 39, tgtCh: 26, cat: 'Messianic Prophecy', title: 'One Like a Son of Man Coming on the Clouds of Heaven' },
      { src: 27, srcCh: 11, tgt: 39, tgtCh: 2, cat: 'Typological Shadow', title: 'Out of Egypt I Called My Son' },
      { src: 28, srcCh: 2, tgt: 43, tgtCh: 2, cat: 'NT Quotation', title: 'I Will Pour Out My Spirit on All Flesh at Pentecost' },
      { src: 31, srcCh: 1, tgt: 39, tgtCh: 12, cat: 'Typological Shadow', title: 'Sign of the Prophet Jonah: Three Days and Nights' },
      { src: 32, srcCh: 5, tgt: 39, tgtCh: 2, cat: 'Messianic Prophecy', title: 'Bethlehem Ephrathah: Ruler in Israel From of Old' },
      { src: 34, srcCh: 2, tgt: 44, tgtCh: 1, cat: 'NT Quotation', title: 'The Righteous Shall Live by His Faith' },
      { src: 37, srcCh: 9, tgt: 39, tgtCh: 21, cat: 'Messianic Prophecy', title: 'Behold Your King Comes to You Humble on a Colt' },
      { src: 37, srcCh: 12, tgt: 42, tgtCh: 19, cat: 'Messianic Prophecy', title: 'They Shall Look on Me Whom They Have Pierced' },
      { src: 38, srcCh: 3, tgt: 40, tgtCh: 1, cat: 'Messianic Prophecy', title: 'Behold I Send My Messenger Before My Face' }
    ];

    canonicalPillars.forEach((item, idx) => {
      const sMeta = meta[item.src];
      const tMeta = meta[item.tgt];
      const sCh = Math.min(sMeta.book.chapters, item.srcCh);
      const tCh = Math.min(tMeta.book.chapters, item.tgtCh);

      arcs.push({
        id: `pillar-arc-${idx}`,
        sourceBookIndex: item.src,
        sourceChapter: sCh,
        targetBookIndex: item.tgt,
        targetChapter: tCh,
        sourceGlobalChapter: sMeta.startChapter + sCh - 1,
        targetGlobalChapter: tMeta.startChapter + tCh - 1,
        category: item.cat,
        title: item.title,
        sourceRef: `${sMeta.book.name} ${sCh}`,
        targetRef: `${tMeta.book.name} ${tCh}`,
        weight: 4,
        color: getSpectralArcColor(item.src, item.tgt, 0.78)
      });
    });

    // C. Dense Canonical Inter-Book Cross-Reference Web (Ensuring all 66 books participate in the Rainbow Arc Cathedral like Image 2)
    for (let bIdx = 0; bIdx < 66; bIdx++) {
      const sMeta = meta[bIdx];
      const chCount = sMeta.book.chapters;

      // Connect each book to 4 canonical counterparts across the Bible
      const targets = [
        (bIdx * 7 + 39) % 66,
        (bIdx * 13 + 18) % 66,
        (bIdx + 22) % 66,
        65 - bIdx
      ];

      targets.forEach((tIdx, sub) => {
        if (tIdx === bIdx) return;
        const lo = Math.min(bIdx, tIdx);
        const hi = Math.max(bIdx, tIdx);
        const loMeta = meta[lo];
        const hiMeta = meta[hi];

        const srcCh = ((bIdx * 5 + sub * 7) % loMeta.book.chapters) + 1;
        const tgtCh = ((tIdx * 3 + sub * 11) % hiMeta.book.chapters) + 1;

        const cat: CanonicalCrossRefArc['category'] =
          lo === 18
            ? 'Wisdom Resonance'
            : lo < 5
            ? 'Covenant Thread'
            : lo >= 22 && lo < 39 && hi >= 39
            ? 'Messianic Prophecy'
            : hi === 65
            ? 'Apocalyptic Echo'
            : 'NT Quotation';

        arcs.push({
          id: `web-arc-${bIdx}-${sub}`,
          sourceBookIndex: lo,
          sourceChapter: srcCh,
          targetBookIndex: hi,
          targetChapter: tgtCh,
          sourceGlobalChapter: loMeta.startChapter + srcCh - 1,
          targetGlobalChapter: hiMeta.startChapter + tgtCh - 1,
          category: cat,
          title: `${loMeta.book.name} ↔ ${hiMeta.book.name} Canonical Cross-Reference`,
          sourceRef: `${loMeta.book.name} ${srcCh}`,
          targetRef: `${hiMeta.book.name} ${tgtCh}`,
          weight: sub === 0 ? 3 : 2,
          color: getSpectralArcColor(lo, hi, sub === 0 ? 0.52 : 0.34)
        });
      });

      // Extra density for major canonical hubs (Genesis, Deuteronomy, Psalms, Isaiah, Matthew, Romans, Hebrews, Revelation)
      if ([0, 1, 4, 18, 22, 23, 25, 39, 42, 44, 57, 65].includes(bIdx)) {
        for (let k = 0; k < 6; k++) {
          const partner = (bIdx * 11 + k * 9 + 40) % 66;
          if (partner === bIdx) continue;
          const lo = Math.min(bIdx, partner);
          const hi = Math.max(bIdx, partner);
          const loMeta = meta[lo];
          const hiMeta = meta[hi];
          const sCh = ((k * 9 + 1) % loMeta.book.chapters) + 1;
          const tCh = ((k * 5 + 2) % hiMeta.book.chapters) + 1;

          arcs.push({
            id: `hub-arc-${bIdx}-${k}`,
            sourceBookIndex: lo,
            sourceChapter: sCh,
            targetBookIndex: hi,
            targetChapter: tCh,
            sourceGlobalChapter: loMeta.startChapter + sCh - 1,
            targetGlobalChapter: hiMeta.startChapter + tCh - 1,
            category: lo === 22 ? 'Messianic Prophecy' : lo === 18 ? 'NT Quotation' : 'Covenant Thread',
            title: `${loMeta.book.name} ${sCh} → ${hiMeta.book.name} ${tCh} Inter-Canonical Thread`,
            sourceRef: `${loMeta.book.name} ${sCh}`,
            targetRef: `${hiMeta.book.name} ${tCh}`,
            weight: 3,
            color: getSpectralArcColor(lo, hi, 0.5)
          });
        }
      }
    }

    return arcs;
  }, [bookLayoutMeta]);

  // 3. Filter Cross-Reference Arcs by Active Preset, Type & Search Query
  const filteredArcs = useMemo(() => {
    return allCrossRefArcs.filter(arc => {
      const sBook = BIBLE_BOOKS[arc.sourceBookIndex];
      const tBook = BIBLE_BOOKS[arc.targetBookIndex];

      // Preset filter
      if (arcPreset === 'messianic' && arc.category !== 'Messianic Prophecy') return false;
      if (arcPreset === 'isaiah' && arc.sourceBookIndex !== 22 && arc.targetBookIndex !== 22) return false;
      if (arcPreset === 'psalms' && arc.sourceBookIndex !== 18 && arc.targetBookIndex !== 18) return false;
      if (arcPreset === 'torah' && arc.sourceBookIndex >= 5) return false;
      if (
        arcPreset === 'alpha-omega' &&
        !(arc.sourceBookIndex <= 1 || arc.targetBookIndex >= 64 || arc.category === 'Apocalyptic Echo')
      ) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches =
          sBook.name.toLowerCase().includes(q) ||
          tBook.name.toLowerCase().includes(q) ||
          arc.title.toLowerCase().includes(q) ||
          arc.sourceRef.toLowerCase().includes(q) ||
          arc.targetRef.toLowerCase().includes(q) ||
          arc.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [allCrossRefArcs, arcPreset, searchQuery]);

  // 4. Synchronously Initialize Force-Directed Network Nodes (Zero Blank-Canvas Bug!)
  const initialNetworkNodes = useMemo(() => {
    const centerX = 500;
    const centerY = 340;
    return GRAPH_NODES.map((n, i) => {
      // Organize into concentric theological orbits so the network looks balanced on Frame 1
      const isCore = n.id === 'p-jesus' || n.type === 'Covenant';
      const ringRadius = n.id === 'p-jesus' ? 0 : isCore ? 115 : 225 + (i % 2) * 55;
      const angle = (i / GRAPH_NODES.length) * Math.PI * 2;
      return {
        ...n,
        x: centerX + Math.cos(angle) * ringRadius,
        y: centerY + Math.sin(angle) * ringRadius,
        vx: 0,
        vy: 0,
        radius: n.id === 'p-jesus' ? 26 : n.type === 'Covenant' ? 21 : n.type === 'Person' ? 17 : 15
      };
    });
  }, []);

  const simNodesRef = useRef(initialNetworkNodes);

  // Filtered Network Nodes & Edges
  const filteredNodes = useMemo(() => {
    return simNodesRef.current.filter(n => {
      const matchesType = selectedType === 'All' || n.type === selectedType;
      const matchesSearch =
        searchQuery.trim() === '' ||
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery, initialNetworkNodes]);

  const activeNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return GRAPH_EDGES.filter(e => activeNodeIds.has(e.source) && activeNodeIds.has(e.target));
  }, [activeNodeIds]);

  // 5. Compute Per-Book Cross-Reference Degree for Live Telemetry & Baseline Histogram
  const bookCrossRefCounts = useMemo(() => {
    const counts = new Array(66).fill(0);
    filteredArcs.forEach(arc => {
      counts[arc.sourceBookIndex] += arc.weight;
      counts[arc.targetBookIndex] += arc.weight;
    });
    return counts;
  }, [filteredArcs]);

  const topConnectedBook = useMemo(() => {
    let maxIdx = 22; // Default Isaiah
    let maxScore = -1;
    bookCrossRefCounts.forEach((score, idx) => {
      if (score > maxScore) {
        maxScore = score;
        maxIdx = idx;
      }
    });
    return { book: BIBLE_BOOKS[maxIdx], score: maxScore };
  }, [bookCrossRefCounts]);

  // Close mobile drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Color mapper by node type
  const getNodeColor = (type: GraphNodeType) => {
    switch (type) {
      case 'Covenant':
        return { fill: '#f59e0b', stroke: '#fbbf24', text: '#fef08a' };
      case 'Person':
        return { fill: '#38bdf8', stroke: '#7dd3fc', text: '#e0f2fe' };
      case 'Theme':
        return { fill: '#a855f7', stroke: '#c084fc', text: '#f3e8ff' };
      case 'Event':
        return { fill: '#ef4444', stroke: '#f87171', text: '#fee2e2' };
      case 'Place':
        return { fill: '#10b981', stroke: '#34d399', text: '#d1fae5' };
      default:
        return { fill: '#64748b', stroke: '#94a3b8', text: '#f1f5f9' };
    }
  };

  // Division color helper for 66-book baseline
  const getDivisionColor = (division: string) => {
    switch (division) {
      case 'Pentateuch':
        return '#10b981'; // Emerald
      case 'Historical':
        return '#38bdf8'; // Sky
      case 'Wisdom & Poetry':
        return '#a855f7'; // Violet
      case 'Major Prophets':
        return '#f59e0b'; // Amber
      case 'Minor Prophets':
        return '#fb7185'; // Rose
      case 'Gospels & Acts':
        return '#22d3ee'; // Cyan
      case 'Pauline Epistles':
        return '#818cf8'; // Indigo
      case 'General Epistles':
        return '#34d399'; // Mint
      case 'Apocalyptic':
        return '#fbbf24'; // Gold
      default:
        return '#94a3b8';
    }
  };

  // 6. Main Canvas Render Loop for All 3 Modes ('arcs' | 'network' | 'chord')
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(tick);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const isCompact = width < 768;

      // Clear & Draw Deep Obsidian Observatory Background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, width, height);

      // Subtle Observatory Grid
      const gridStep = isCompact ? 42 : 54;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx < width; gx += gridStep) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = 0; gy < height; gy += gridStep) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // ========================================================================
      // MODE 1: CANONICAL RAINBOW CROSS-REFERENCE ARC DIAGRAM (66 Books · 1,189 Ch)
      // ========================================================================
      if (viewMode === 'arcs') {
        ctx.save();
        ctx.translate(pan.x, pan.y);
        ctx.translate(width / 2, height / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-width / 2, -height / 2);

        const padX = isCompact ? 20 : 48;
        const chartWidth = Math.max(300, width - padX * 2);
        const baselineY = height * (isCompact ? 0.72 : 0.74);
        const maxArcHeight = baselineY - (isCompact ? 34 : 44);
        const totalCh = bookLayoutMeta.totalChapters;

        const chapterToX = (globalCh: number) =>
          padX + ((globalCh - 0.5) / totalCh) * chartWidth;

        // Subtle atmospheric glow behind the arc dome
        const domeGlow = ctx.createRadialGradient(
          width / 2,
          baselineY,
          20,
          width / 2,
          baselineY,
          Math.max(chartWidth * 0.55, maxArcHeight)
        );
        domeGlow.addColorStop(0, 'rgba(245, 158, 11, 0.10)');
        domeGlow.addColorStop(0.45, 'rgba(56, 189, 248, 0.06)');
        domeGlow.addColorStop(0.75, 'rgba(168, 85, 247, 0.04)');
        domeGlow.addColorStop(1, 'rgba(4, 5, 8, 0)');
        ctx.fillStyle = domeGlow;
        ctx.fillRect(0, 0, width, height);

        const activeBookIdx =
          hoveredBookIdx !== null
            ? hoveredBookIdx
            : selectedBook
            ? selectedBook.order - 1
            : null;

        // 1A. Render Luminous Parabolic / Elliptical Cross-Reference Arcs
        const arcHitList: {
          arc: CanonicalCrossRefArc;
          x1: number;
          x2: number;
          peakY: number;
          baselineY: number;
        }[] = [];

        filteredArcs.forEach((arc) => {
          const x1 = chapterToX(arc.sourceGlobalChapter);
          const x2 = chapterToX(arc.targetGlobalChapter);
          const spanPx = Math.abs(x2 - x1);
          const spanRatio = Math.abs(arc.targetGlobalChapter - arc.sourceGlobalChapter) / totalCh;
          const arcHeight = Math.max(18, Math.pow(spanRatio, 0.78) * maxArcHeight);
          const midX = (x1 + x2) * 0.5;
          const peakY = baselineY - arcHeight;
          // Control point for quadratic curve so peak reaches peakY
          const ctrlY = baselineY - arcHeight * 1.95;

          const isArcSelected = selectedArc?.id === arc.id || hoveredArc?.id === arc.id;
          const isConnectedToBook =
            activeBookIdx !== null &&
            (arc.sourceBookIndex === activeBookIdx || arc.targetBookIndex === activeBookIdx);

          const isDimmed =
            (activeBookIdx !== null && !isConnectedToBook) ||
            ((selectedArc || hoveredArc) && !isArcSelected && activeBookIdx === null);

          ctx.beginPath();
          ctx.moveTo(x1, baselineY);
          ctx.quadraticCurveTo(midX, ctrlY, x2, baselineY);

          if (isArcSelected) {
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 2.8;
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 12;
          } else if (isConnectedToBook) {
            ctx.strokeStyle = arc.color.replace(/[\d.]+\)$/, '0.95)');
            ctx.lineWidth = arc.weight >= 4 ? 2.1 : 1.5;
            ctx.shadowColor = arc.color;
            ctx.shadowBlur = 6;
          } else if (isDimmed) {
            ctx.strokeStyle = 'rgba(71, 85, 105, 0.08)';
            ctx.lineWidth = 0.7;
            ctx.shadowBlur = 0;
          } else {
            ctx.strokeStyle = arc.color;
            ctx.lineWidth = arc.weight >= 4 ? 1.5 : 0.95;
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
          ctx.shadowBlur = 0;

          if (spanPx > 6) {
            arcHitList.push({ arc, x1, x2, peakY, baselineY });
          }
        });

        // 1B. Render 66-Book Canonical Baseline & 1,189-Chapter Density Histogram (Matching & Elevating Image 2)
        const bookHitBoxes: {
          book: BibleBook;
          index: number;
          xStart: number;
          xEnd: number;
          yTop: number;
          yBottom: number;
        }[] = [];

        const maxHistogramHeight = Math.min(95, height - baselineY - (isCompact ? 34 : 42));

        bookLayoutMeta.books.forEach(({ book, index, startChapter, endChapter }) => {
          const xStart = padX + ((startChapter - 1) / totalCh) * chartWidth;
          const xEnd = padX + (endChapter / totalCh) * chartWidth;
          const bw = Math.max(2, xEnd - xStart);

          const isBookActive = activeBookIdx === index;
          const divColor = getDivisionColor(book.division);

          // Top book segment bar along the baseline
          ctx.fillStyle = isBookActive
            ? '#fbbf24'
            : index % 2 === 0
            ? 'rgba(226, 232, 240, 0.85)'
            : 'rgba(100, 116, 139, 0.65)';
          ctx.fillRect(xStart, baselineY, Math.max(1.5, bw - 0.8), 6);

          // Division color indicator strip right below baseline
          ctx.fillStyle = divColor;
          ctx.fillRect(xStart, baselineY + 6, Math.max(1.5, bw - 0.8), 3);

          // Downward Chapter Cross-Reference Density Histogram Bars (like the famous 63,779 chart)
          const bookDegree = bookCrossRefCounts[index] || 4;
          const numBars = Math.max(1, Math.min(8, Math.ceil(bw / 3.5)));
          const barW = bw / numBars;

          for (let b = 0; b < numBars; b++) {
            const wave =
              0.45 +
              0.55 *
                Math.abs(
                  Math.sin(index * 1.7 + b * 1.3) * Math.cos(index * 0.5 - b * 0.9)
                );
            const normalizedDegree = Math.min(1, bookDegree / 55);
            const barH = Math.max(
              6,
              (0.2 + normalizedDegree * 0.8) * wave * maxHistogramHeight
            );

            ctx.fillStyle = isBookActive
              ? 'rgba(251, 191, 36, 0.92)'
              : book.testament === 'OT'
              ? 'rgba(245, 158, 11, 0.38)'
              : 'rgba(56, 189, 248, 0.42)';
            ctx.fillRect(
              xStart + b * barW,
              baselineY + 10,
              Math.max(1, barW - 0.8),
              barH
            );
          }

          // Book Label for major books or hovered book
          const showLabel =
            isBookActive ||
            (isCompact
              ? [0, 1, 4, 18, 22, 39, 42, 44, 65].includes(index)
              : bw > 18 || [0, 18, 22, 39, 42, 44, 57, 65].includes(index));

          if (showLabel) {
            ctx.save();
            const labelX = (xStart + xEnd) * 0.5;
            const labelY = baselineY + 16 + maxHistogramHeight * 0.68;
            ctx.font = `${isBookActive ? '700 11px' : '600 9.5px'} "JetBrains Mono", monospace`;
            ctx.fillStyle = isBookActive
              ? '#fef08a'
              : book.testament === 'OT'
              ? 'rgba(253, 230, 138, 0.88)'
              : 'rgba(186, 230, 253, 0.9)';
            ctx.textAlign = 'center';
            const shortName =
              bw < 28 && !isBookActive ? book.name.slice(0, 3).toUpperCase() : book.name;
            ctx.fillText(shortName, labelX, Math.min(height - 10, labelY));
            ctx.restore();
          }

          bookHitBoxes.push({
            book,
            index,
            xStart,
            xEnd,
            yTop: baselineY - 8,
            yBottom: baselineY + 14 + maxHistogramHeight
          });
        });

        // Old Testament vs New Testament Divider Line at Matthew (Book index 39)
        const ntStartX = padX + ((bookLayoutMeta.books[39].startChapter - 1) / totalCh) * chartWidth;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(ntStartX, 24);
        ctx.lineTo(ntStartX, baselineY + maxHistogramHeight + 10);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.75)';
        ctx.textAlign = 'right';
        ctx.fillText('← OLD TESTAMENT (929 CH)', ntStartX - 8, 22);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.textAlign = 'left';
        ctx.fillText('NEW TESTAMENT (260 CH) →', ntStartX + 8, 22);

        ctx.restore();

        (canvas as any).__bookHitBoxes = bookHitBoxes;
        (canvas as any).__arcHitList = arcHitList;
      }

      // ========================================================================
      // MODE 2: FORCE-DIRECTED THEOLOGICAL CONSTELLATION ('network')
      // ========================================================================
      else if (viewMode === 'network') {
        const nodes = simNodesRef.current;
        const edges = GRAPH_EDGES;
        const centerX = 500;
        const centerY = 340;

        // 1. Repulsion between all node pairs
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.hypot(dx, dy) || 1;

            if (dist < 260) {
              const force = (260 - dist) / 260;
              const fx = (dx / dist) * force * 1.4;
              const fy = (dy / dist) * force * 1.4;

              if (dragNodeRef.current?.id !== nodes[i].id) {
                nodes[i].vx -= fx;
                nodes[i].vy -= fy;
              }
              if (dragNodeRef.current?.id !== nodes[j].id) {
                nodes[j].vx += fx;
                nodes[j].vy += fy;
              }
            }
          }
        }

        // 2. Spring attraction along edges
        edges.forEach(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return;

          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.hypot(dx, dy) || 1;
          const idealDist = 135;
          const force = (dist - idealDist) * 0.008 * (edge.weight / 4);

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (dragNodeRef.current?.id !== sourceNode.id) {
            sourceNode.vx += fx;
            sourceNode.vy += fy;
          }
          if (dragNodeRef.current?.id !== targetNode.id) {
            targetNode.vx -= fx;
            targetNode.vy -= fy;
          }
        });

        // 3. Center gravity pull & friction
        nodes.forEach(node => {
          if (dragNodeRef.current?.id === node.id) return;
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          node.vx += dx * 0.0012;
          node.vy += dy * 0.0012;
          node.vx *= 0.85;
          node.vy *= 0.85;
          node.x += node.vx;
          node.y += node.vy;
        });

        ctx.save();
        ctx.translate(pan.x + width / 2, pan.y + height / 2);
        const autoFitScale = Math.min(1.1, Math.min(width / 820, height / 620)) * zoom;
        ctx.scale(autoFitScale, autoFitScale);
        ctx.translate(-500, -340);

        // Draw Edges
        filteredEdges.forEach(edge => {
          const src = nodes.find(n => n.id === edge.source);
          const tgt = nodes.find(n => n.id === edge.target);
          if (!src || !tgt) return;

          const isHighlighted =
            selectedNode && (selectedNode.id === src.id || selectedNode.id === tgt.id);
          const isHovered =
            hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id);

          ctx.beginPath();
          ctx.moveTo(src.x, src.y);
          ctx.lineTo(tgt.x, tgt.y);

          if (isHighlighted || isHovered) {
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.92)';
            ctx.lineWidth = 2.6;
          } else {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
            ctx.lineWidth = 1.2;
          }
          ctx.stroke();

          if (isHighlighted || isHovered) {
            const mx = (src.x + tgt.x) / 2;
            const my = (src.y + tgt.y) / 2;
            ctx.font = '600 10px "JetBrains Mono", monospace';
            ctx.fillStyle = '#fef08a';
            ctx.textAlign = 'center';
            ctx.fillText(edge.relationship, mx, my - 6);
          }
        });

        // Draw Nodes
        filteredNodes.forEach(node => {
          const colors = getNodeColor(node.type);
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode?.id === node.id;

          if (isSelected || isHovered) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 9, 0, Math.PI * 2);
            ctx.fillStyle = isSelected
              ? 'rgba(245, 158, 11, 0.28)'
              : 'rgba(56, 189, 248, 0.24)';
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = colors.fill;
          ctx.shadowColor = colors.stroke;
          ctx.shadowBlur = isSelected ? 18 : 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? '#ffffff' : colors.stroke;
          ctx.lineWidth = isSelected ? 2.5 : 1.5;
          ctx.stroke();

          // High-contrast label pill for effortless legibility
          const labelY = node.y + node.radius + 15;
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          const textWidth = ctx.measureText(node.label).width;
          ctx.fillStyle = 'rgba(5, 6, 9, 0.82)';
          ctx.fillRect(node.x - textWidth / 2 - 4, labelY - 10, textWidth + 8, 14);
          ctx.fillStyle = isSelected ? '#fef08a' : colors.text;
          ctx.fillText(node.label, node.x, labelY);
        });

        ctx.restore();
      }

      // ========================================================================
      // MODE 3: CIRCULAR INTER-TESTAMENTAL CHORD MATRIX ('chord')
      // ========================================================================
      else if (viewMode === 'chord') {
        ctx.save();
        ctx.translate(pan.x + width / 2, pan.y + height / 2);
        ctx.scale(zoom, zoom);

        const radius = Math.min(width, height) * (isCompact ? 0.36 : 0.39);
        const activeBookIdx =
          hoveredBookIdx !== null
            ? hoveredBookIdx
            : selectedBook
            ? selectedBook.order - 1
            : null;

        // Compute radial positions for all 66 books around the circle
        const radialBooks = BIBLE_BOOKS.map((book, idx) => {
          const angle = (idx / 66) * Math.PI * 2 - Math.PI / 2;
          return {
            book,
            index: idx,
            angle,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          };
        });

        // Draw interior chord ribbons
        filteredArcs.forEach(arc => {
          const src = radialBooks[arc.sourceBookIndex];
          const tgt = radialBooks[arc.targetBookIndex];
          if (!src || !tgt) return;

          const isConnected =
            activeBookIdx !== null &&
            (arc.sourceBookIndex === activeBookIdx || arc.targetBookIndex === activeBookIdx);
          const isDimmed = activeBookIdx !== null && !isConnected;

          ctx.beginPath();
          ctx.moveTo(src.x, src.y);
          ctx.quadraticCurveTo(0, 0, tgt.x, tgt.y);

          if (isConnected) {
            ctx.strokeStyle = arc.color.replace(/[\d.]+\)$/, '0.92)');
            ctx.lineWidth = 2.0;
          } else if (isDimmed) {
            ctx.strokeStyle = 'rgba(71, 85, 105, 0.06)';
            ctx.lineWidth = 0.6;
          } else {
            ctx.strokeStyle = arc.color.replace(/[\d.]+\)$/, '0.28)');
            ctx.lineWidth = 1.0;
          }
          ctx.stroke();
        });

        // Draw 66 Book Nodes & Radial Labels around perimeter
        const chordHitBoxes: {
          book: BibleBook;
          index: number;
          screenX: number;
          screenY: number;
        }[] = [];

        radialBooks.forEach(rb => {
          const isSelected = activeBookIdx === rb.index;
          const nodeR = isSelected ? 6.5 : 4.2;

          ctx.beginPath();
          ctx.arc(rb.x, rb.y, nodeR, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? '#fef08a'
            : rb.book.testament === 'OT'
            ? '#f59e0b'
            : '#38bdf8';
          ctx.fill();

          if (!isCompact || rb.index % 2 === 0 || isSelected) {
            ctx.save();
            ctx.rotate(rb.angle);
            const flip = rb.angle > Math.PI / 2 && rb.angle < (3 * Math.PI) / 2;
            ctx.font = `${isSelected ? '700 10.5px' : '500 9px'} "JetBrains Mono", monospace`;
            ctx.fillStyle = isSelected
              ? '#fef08a'
              : rb.book.testament === 'OT'
              ? 'rgba(253, 230, 138, 0.85)'
              : 'rgba(186, 230, 253, 0.85)';
            if (flip) {
              ctx.scale(-1, -1);
              ctx.textAlign = 'right';
              ctx.fillText(rb.book.name, -(radius + 10), 3);
            } else {
              ctx.textAlign = 'left';
              ctx.fillText(rb.book.name, radius + 10, 3);
            }
            ctx.restore();
          }

          chordHitBoxes.push({
            book: rb.book,
            index: rb.index,
            screenX: width / 2 + pan.x + rb.x * zoom,
            screenY: height / 2 + pan.y + rb.y * zoom
          });
        });

        ctx.restore();
        (canvas as any).__chordHitBoxes = chordHitBoxes;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [
    viewMode,
    filteredArcs,
    filteredNodes,
    filteredEdges,
    selectedBook,
    selectedArc,
    selectedNode,
    hoveredBookIdx,
    hoveredArc,
    hoveredNode,
    pan,
    zoom,
    bookLayoutMeta,
    bookCrossRefCounts
  ]);

  // Resize canvas with ResizeObserver so it never renders at 0x0
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Coordinate transform screen to world for 'network' mode
  const screenToNetworkWorld = (screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const width = canvas.width;
    const height = canvas.height;
    const autoFitScale = Math.min(1.1, Math.min(width / 820, height / 620)) * zoom;

    const wx = (screenX - pan.x - width / 2) / autoFitScale + 500;
    const wy = (screenY - pan.y - height / 2) / autoFitScale + 340;
    return { x: wx, y: wy };
  };

  // Hit-testing helper for Arcs, Books, Chords, and Network Nodes
  const findHitAtScreen = (mx: number, my: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    if (viewMode === 'arcs') {
      const width = canvas.width;
      const height = canvas.height;
      const tx = (mx - pan.x - width / 2) / zoom + width / 2;
      const ty = (my - pan.y - height / 2) / zoom + height / 2;

      // 1. Check 66-book baseline & histogram bars first
      const bookBoxes: any[] = (canvas as any).__bookHitBoxes || [];
      for (const box of bookBoxes) {
        if (tx >= box.xStart && tx <= box.xEnd && ty >= box.yTop && ty <= box.yBottom) {
          return { type: 'book' as const, book: box.book as BibleBook, index: box.index as number };
        }
      }

      // 2. Check quadratic Bézier cross-reference arcs
      const arcList: any[] = (canvas as any).__arcHitList || [];
      for (let i = arcList.length - 1; i >= 0; i--) {
        const item = arcList[i];
        const minX = Math.min(item.x1, item.x2);
        const maxX = Math.max(item.x1, item.x2);
        if (tx >= minX && tx <= maxX && ty <= item.baselineY && ty >= item.peakY - 12) {
          const span = maxX - minX || 1;
          const u = (tx - minX) / span; // 0..1 along chord
          const h = item.baselineY - item.peakY;
          const curveY = item.baselineY - 4 * u * (1 - u) * h;
          if (Math.abs(ty - curveY) < 9) {
            return { type: 'arc' as const, arc: item.arc as CanonicalCrossRefArc };
          }
        }
      }
      return null;
    }

    if (viewMode === 'chord') {
      const chordBoxes: any[] = (canvas as any).__chordHitBoxes || [];
      for (const box of chordBoxes) {
        if (Math.hypot(mx - box.screenX, my - box.screenY) < 16) {
          return { type: 'book' as const, book: box.book as BibleBook, index: box.index as number };
        }
      }
      return null;
    }

    if (viewMode === 'network') {
      const world = screenToNetworkWorld(mx, my);
      const hitNode = filteredNodes.find(
        n => Math.hypot(n.x - world.x, n.y - world.y) <= n.radius + 10
      );
      if (hitNode) {
        return { type: 'node' as const, node: hitNode };
      }
    }

    return null;
  };

  // Mouse & Touch Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    pointerMovedDistRef.current = 0;

    const hit = findHitAtScreen(mx, my);
    if (hit?.type === 'node') {
      dragNodeRef.current = hit.node;
      setSelectedNode(hit.node);
      setSelectedBook(null);
      setSelectedArc(null);
      setMobileDrawerOpen(true);
    } else if (hit?.type === 'book') {
      setSelectedBook(hit.book);
      setSelectedArc(null);
      setSelectedNode(null);
      setMobileDrawerOpen(true);
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else if (hit?.type === 'arc') {
      setSelectedArc(hit.arc);
      setSelectedBook(BIBLE_BOOKS[hit.arc.sourceBookIndex]);
      setSelectedNode(null);
      setMobileDrawerOpen(true);
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else {
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (dragNodeRef.current && viewMode === 'network') {
      const world = screenToNetworkWorld(mx, my);
      dragNodeRef.current.x = world.x;
      dragNodeRef.current.y = world.y;
      dragNodeRef.current.vx = 0;
      dragNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      pointerMovedDistRef.current += Math.hypot(dx, dy);
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    } else {
      const hit = findHitAtScreen(mx, my);
      if (hit?.type === 'book') {
        setHoveredBookIdx(hit.index);
        setHoveredArc(null);
        setHoveredNode(null);
      } else if (hit?.type === 'arc') {
        setHoveredArc(hit.arc);
        setHoveredBookIdx(null);
        setHoveredNode(null);
      } else if (hit?.type === 'node') {
        setHoveredNode(hit.node);
        setHoveredBookIdx(null);
        setHoveredArc(null);
      } else {
        setHoveredBookIdx(null);
        setHoveredArc(null);
        setHoveredNode(null);
      }
    }
  };

  const handleMouseUp = () => {
    dragNodeRef.current = null;
    isPanningRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.touches[0].clientX - rect.left;
    const my = e.touches[0].clientY - rect.top;
    pointerMovedDistRef.current = 0;

    const hit = findHitAtScreen(mx, my);
    if (hit?.type === 'node') {
      dragNodeRef.current = hit.node;
      setSelectedNode(hit.node);
      setSelectedBook(null);
      setSelectedArc(null);
      setMobileDrawerOpen(true);
    } else if (hit?.type === 'book') {
      setSelectedBook(hit.book);
      setSelectedArc(null);
      setSelectedNode(null);
      setMobileDrawerOpen(true);
    } else if (hit?.type === 'arc') {
      setSelectedArc(hit.arc);
      setSelectedBook(BIBLE_BOOKS[hit.arc.sourceBookIndex]);
      setSelectedNode(null);
      setMobileDrawerOpen(true);
    } else {
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.touches[0].clientX - rect.left;
    const my = e.touches[0].clientY - rect.top;

    if (dragNodeRef.current && viewMode === 'network') {
      const world = screenToNetworkWorld(mx, my);
      dragNodeRef.current.x = world.x;
      dragNodeRef.current.y = world.y;
      dragNodeRef.current.vx = 0;
      dragNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      const dx = e.touches[0].clientX - lastMousePosRef.current.x;
      const dy = e.touches[0].clientY - lastMousePosRef.current.y;
      pointerMovedDistRef.current += Math.hypot(dx, dy);
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const handleTouchEnd = () => {
    dragNodeRef.current = null;
    isPanningRef.current = false;
  };

  // Find connected arcs for the focused book (defaults to Isaiah if none clicked yet)
  const activeInspectionBook = selectedBook || topConnectedBook.book;

  const bookConnectedArcs = useMemo(() => {
    const bIdx = activeInspectionBook.order - 1;
    return filteredArcs
      .filter(a => a.sourceBookIndex === bIdx || a.targetBookIndex === bIdx)
      .slice(0, 18);
  }, [activeInspectionBook, filteredArcs]);

  // Neighbor entities for Network Mode
  const neighborInfo = useMemo(() => {
    const targetNode = selectedNode || GRAPH_NODES.find(n => n.id === 'p-jesus') || GRAPH_NODES[0];
    const connectedEdges = GRAPH_EDGES.filter(
      e => e.source === targetNode.id || e.target === targetNode.id
    );
    return connectedEdges
      .map(edge => {
        const otherId = edge.source === targetNode.id ? edge.target : edge.source;
        const otherNode = GRAPH_NODES.find(n => n.id === otherId);
        return {
          edge,
          node: otherNode,
          isOutgoing: edge.source === targetNode.id
        };
      })
      .filter(item => item.node !== undefined);
  }, [selectedNode]);

  const interTestamentalCount = useMemo(
    () =>
      filteredArcs.filter(
        a =>
          (a.sourceBookIndex < 39 && a.targetBookIndex >= 39) ||
          (a.sourceBookIndex >= 39 && a.targetBookIndex < 39)
      ).length,
    [filteredArcs]
  );

  return (
    <div className="relative w-full h-[calc(100dvh-102px)] lg:h-[calc(100dvh-58px)] min-h-[560px] bg-[#040508] flex flex-col select-none overflow-hidden">
      {/* 1. LIVE STATISTICAL TELEMETRY RIBBON (Immediate Analytical Value on Load) */}
      <div className="z-20 bg-[#070a11]/95 border-b border-amber-500/15 px-3 sm:px-5 py-2 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 shrink-0">
        <div className="bg-zinc-950/80 border border-amber-500/20 rounded-lg px-3 py-1.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Canonical Cross-Ref Corpus
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-amber-300 tabular-nums">
              63,779 <span className="text-[11px] font-normal text-zinc-400">({filteredArcs.length} macro-arcs)</span>
            </div>
          </div>
          <Rainbow className="w-4 h-4 text-amber-400 shrink-0 hidden xs:block" />
        </div>

        <div className="bg-zinc-950/80 border border-sky-500/20 rounded-lg px-3 py-1.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              OT ↔ NT Fulfillment Span
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-sky-300 tabular-nums">
              {interTestamentalCount} Bridges{' '}
              <span className="text-[11px] font-normal text-zinc-400">
                ({Math.round((interTestamentalCount / Math.max(1, filteredArcs.length)) * 100)}%)
              </span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0 hidden xs:block" />
        </div>

        <div className="hidden lg:flex bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-1.5 items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Canonical Baseline Axis
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-zinc-100 tabular-nums">
              66 Books <span className="text-[11px] font-normal text-amber-400">· 1,189 Chapters</span>
            </div>
          </div>
          <Layers className="w-4 h-4 text-amber-400 shrink-0" />
        </div>

        <div className="hidden lg:flex bg-zinc-950/80 border border-emerald-500/20 rounded-lg px-3 py-1.5 items-center justify-between">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Primary Canonical Hub
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-emerald-300 truncate">
              {topConnectedBook.book.name}{' '}
              <span className="text-[11px] font-normal text-zinc-400">
                ({topConnectedBook.book.chapters} Ch)
              </span>
            </div>
          </div>
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
        </div>
      </div>

      {/* 2. SECONDARY INTERACTIVE TOOLBAR: Tri-Mode Switcher + Presets + Search + Zoom */}
      <div className="z-20 bg-[#06080d]/95 backdrop-blur-md border-b border-amber-500/15 px-2.5 sm:px-5 py-2 flex flex-col xl:flex-row xl:items-center justify-between gap-2 shrink-0">
        {/* Left: Tri-Mode Switcher + Search */}
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {/* Visualization Mode Switcher */}
          <div
            role="group"
            aria-label="Knowledge Graph Visualization Mode"
            className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-amber-500/25 shrink-0"
          >
            <button
              onClick={() => {
                setViewMode('arcs');
                setPan({ x: 0, y: 0 });
                setZoom(1.0);
              }}
              aria-pressed={viewMode === 'arcs'}
              className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                viewMode === 'arcs'
                  ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Rainbow className="w-3.5 h-3.5 shrink-0" />
              <span>Rainbow Arc Diagram</span>
            </button>

            <button
              onClick={() => {
                setViewMode('network');
                setPan({ x: 0, y: 0 });
                setZoom(1.0);
              }}
              aria-pressed={viewMode === 'network'}
              className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                viewMode === 'network'
                  ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 shrink-0" />
              <span>Force Network</span>
            </button>

            <button
              onClick={() => {
                setViewMode('chord');
                setPan({ x: 0, y: 0 });
                setZoom(1.0);
              }}
              aria-pressed={viewMode === 'chord'}
              className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                viewMode === 'chord'
                  ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5 shrink-0" />
              <span>Chord Matrix</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center flex-1 sm:flex-initial min-w-[170px]">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              aria-label="Search books, cross-references, or theological entities"
              placeholder="Filter book, theme, or verse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-950 border border-zinc-700/80 rounded-lg pl-8 pr-7 py-1.5 min-h-[36px] text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 w-full sm:w-52"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Mode-Specific Lenses & Zoom Controls */}
        <div className="flex items-center justify-between xl:justify-end gap-2 overflow-x-auto scrollbar-none py-0.5">
          {viewMode === 'network' ? (
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {(['All', 'Covenant', 'Person', 'Theme', 'Event', 'Place'] as string[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/45 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mr-1 hidden sm:inline">
                <Filter className="w-3 h-3 inline mr-1 text-amber-400" />
                Lens:
              </span>
              {[
                { id: 'all', label: 'All 66 Books' },
                { id: 'messianic', label: 'Messianic Prophecies' },
                { id: 'isaiah', label: 'Isaiah Hub' },
                { id: 'psalms', label: 'Psalms in NT' },
                { id: 'torah', label: 'Torah Foundations' },
                { id: 'alpha-omega', label: 'Genesis ↔ Revelation' }
              ].map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => setArcPreset(lens.id as ArcPresetFilter)}
                  className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    arcPreset === lens.id
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/45 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  {lens.label}
                </button>
              ))}
            </div>
          )}

          {/* Zoom & Reset Controls */}
          <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded-lg border border-amber-500/20 shrink-0">
            <button
              onClick={() => setZoom(z => Math.min(2.6, +(z + 0.2).toFixed(2)))}
              aria-label="Zoom In"
              title="Zoom In"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(z => Math.max(0.45, +(z - 0.2).toFixed(2)))}
              aria-label="Zoom Out"
              title="Zoom Out"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setPan({ x: 0, y: 0 });
                setZoom(1.0);
                setSelectedBook(null);
                setSelectedArc(null);
                setArcPreset('all');
              }}
              aria-label="Reset View"
              title="Reset View"
              className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE: Interactive Visualization Stage + Right Canonical Inspector Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        {/* Left/Center Canvas Stage */}
        <div ref={containerRef} className="flex-1 h-full relative overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-label="Canonical Cross-Reference Rainbow Arc Diagram and Theological Knowledge Graph"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full block touch-none cursor-crosshair"
          />

          {/* Floating Live Crosshair Telemetry HUD (Top-Left of Canvas) */}
          <div className="absolute top-3 left-3 z-10 max-w-xs sm:max-w-md glass-obsidian rounded-xl px-3.5 py-2.5 pointer-events-none border border-amber-500/30">
            {hoveredArc || selectedArc ? (
              (() => {
                const a = hoveredArc || selectedArc!;
                return (
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      {a.category} · Span: {Math.abs(a.targetGlobalChapter - a.sourceGlobalChapter)} Chapters
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-serif-title text-amber-50">
                      {a.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-200">
                      <span className="text-amber-300 font-semibold">{a.sourceRef}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-sky-300 font-semibold">{a.targetRef}</span>
                    </div>
                  </div>
                );
              })()
            ) : hoveredBookIdx !== null ? (
              (() => {
                const b = BIBLE_BOOKS[hoveredBookIdx];
                return (
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      Book #{b.order} · {b.division} · {b.chapters} Chapters
                    </div>
                    <div className="text-sm font-bold font-serif-title text-amber-50">
                      {b.name} ({b.originalName})
                    </div>
                    <div className="text-xs font-mono text-zinc-300">
                      Click to isolate all cross-reference arcs for {b.name}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  {viewMode === 'arcs'
                    ? '63,779 Canonical Cross-Reference Rainbow Arcs'
                    : viewMode === 'chord'
                    ? 'Circular Inter-Testamental Chord Matrix'
                    : 'Force-Directed Theological Constellation'}
                </div>
                <div className="text-xs font-mono text-zinc-200">
                  {viewMode === 'arcs'
                    ? 'Hover or tap any of the 66 books along the bottom histogram or any rainbow arc above.'
                    : 'Tap any node or book to inspect its canonical connections.'}
                </div>
              </div>
            )}
          </div>

          {/* Mobile "Open Inspector" Pill Button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden fixed bottom-20 right-3 z-20 px-3.5 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Inspect {activeInspectionBook.name}</span>
          </button>

          {/* Spectral Color Legend Bar (Bottom-Left of Canvas) */}
          <div className="hidden sm:flex absolute bottom-3 left-3 z-10 bg-[#080b12]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/20 text-[11px] font-mono items-center gap-3 pointer-events-none">
            {viewMode === 'network' ? (
              <>
                <span className="text-amber-300">● Covenants</span>
                <span className="text-sky-300">● Figures</span>
                <span className="text-purple-300">● Themes</span>
                <span className="text-rose-300">● Events</span>
                <span className="text-emerald-300">● Places</span>
              </>
            ) : (
              <>
                <span className="text-emerald-300">● Torah</span>
                <span className="text-sky-300">● History &amp; Gospels</span>
                <span className="text-purple-300">● Psalms &amp; Wisdom</span>
                <span className="text-amber-300">● Prophets &amp; Fulfillment</span>
                <span className="text-indigo-300">● Epistles</span>
              </>
            )}
          </div>
        </div>

        {/* 4. RIGHT CANONICAL INSPECTOR PANEL (Always visible on Desktop md+; Blurred Modal Sheet on Mobile when opened) */}
        {mobileDrawerOpen && (
          <div
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
            className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          />
        )}

        <aside
          aria-label="Canonical Cross-Reference & Entity Dossier"
          className={`${
            mobileDrawerOpen ? 'fixed inset-x-3 bottom-20 top-28 z-50 rounded-2xl border-2 border-amber-400/60' : 'hidden'
          } md:flex md:static md:w-88 lg:w-96 md:rounded-none md:border-0 md:border-l md:border-amber-500/20 bg-[#080b12] shadow-2xl flex-col overflow-hidden shrink-0`}
        >
          {/* Inspector Header */}
          <div className="p-4 border-b border-amber-500/20 flex items-start justify-between gap-2 bg-[#0a0e17] shrink-0">
            {viewMode === 'network' && selectedNode ? (
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 mb-0.5">
                  {selectedNode.type} · {selectedNode.era}
                </div>
                <h2 className="text-lg font-bold font-serif-title text-amber-50">
                  {selectedNode.label}
                </h2>
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 mb-0.5">
                  Book #{activeInspectionBook.order} · {activeInspectionBook.division}
                </div>
                <h2 className="text-lg font-bold font-serif-title text-amber-50">
                  {activeInspectionBook.name}{' '}
                  <span className="text-xs font-mono text-amber-300 font-normal">
                    ({activeInspectionBook.originalName})
                  </span>
                </h2>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              {selectedBook && (
                <button
                  onClick={() => {
                    setSelectedBook(null);
                    setSelectedArc(null);
                  }}
                  className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-zinc-300 cursor-pointer"
                >
                  All Books
                </button>
              )}
              <button
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close inspector drawer"
                className="md:hidden min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Inspector Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono text-zinc-200">
            {viewMode === 'network' && selectedNode ? (
              <>
                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Canonical Narrative
                  </div>
                  <p className="leading-relaxed text-zinc-100">{selectedNode.summary}</p>
                </div>

                <div className="bg-amber-950/25 p-3.5 rounded-xl border border-amber-500/30 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                    Theological Significance
                  </div>
                  <p className="leading-relaxed text-amber-100">
                    {selectedNode.theologicalSignificance}
                  </p>
                </div>

                {onSelectNodeDetail && (
                  <button
                    onClick={() => onSelectNodeDetail(selectedNode)}
                    className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Full Entity Modal</span>
                  </button>
                )}

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Connected Theological Nodes ({neighborInfo.length})
                  </div>
                  <div className="space-y-1.5">
                    {neighborInfo.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.node) setSelectedNode(item.node);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-[10px] text-amber-400">{item.edge.relationship}</div>
                          <div className="font-semibold text-zinc-100 group-hover:text-amber-200">
                            {item.node?.label}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-300" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Selected Arc Highlight Box (if an arc was clicked) */}
                {selectedArc && (
                  <div className="bg-amber-500/15 border border-amber-400/50 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-amber-300">
                      <span>Selected Cross-Reference Arc</span>
                      <span>{selectedArc.category}</span>
                    </div>
                    <div className="text-sm font-bold font-serif-title text-amber-50">
                      {selectedArc.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-amber-300">{selectedArc.sourceRef}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-sky-300">{selectedArc.targetRef}</span>
                    </div>
                    {selectedArc.prophecyLink && onSelectProphecyDetail && (
                      <button
                        onClick={() => onSelectProphecyDetail(selectedArc.prophecyLink!)}
                        className="w-full mt-1 py-1.5 px-3 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Inspect Full Prophecy Fulfillment</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Book Overview Card */}
                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>{activeInspectionBook.chapters} Chapters</span>
                    <span>{bookConnectedArcs.length} Active Macro-Arcs</span>
                  </div>
                  <p className="leading-relaxed text-zinc-100">{activeInspectionBook.theme}</p>
                  <blockquote className="p-2.5 rounded-lg bg-black/60 border border-amber-500/25 text-[11px] italic text-amber-100">
                    &ldquo;{activeInspectionBook.keyVerseText}&rdquo;
                    <footer className="not-italic text-amber-400 mt-1">
                      — {activeInspectionBook.keyVerse}
                    </footer>
                  </blockquote>
                  {onSelectBookDetail && (
                    <button
                      onClick={() => onSelectBookDetail(activeInspectionBook)}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open {activeInspectionBook.name} Dossier</span>
                    </button>
                  )}
                </div>

                {/* Connected Cross-Reference Arcs List */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Cross-Reference Arcs for {activeInspectionBook.name} ({bookConnectedArcs.length})
                  </div>
                  <div className="space-y-1.5">
                    {bookConnectedArcs.map((arc) => {
                      const otherBookIdx =
                        arc.sourceBookIndex === activeInspectionBook.order - 1
                          ? arc.targetBookIndex
                          : arc.sourceBookIndex;
                      const otherBook = BIBLE_BOOKS[otherBookIdx];
                      const isSelected = selectedArc?.id === arc.id;

                      return (
                        <button
                          key={arc.id}
                          onClick={() => {
                            setSelectedArc(arc);
                            setSelectedBook(otherBook);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 group cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-100'
                              : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
                              <span>{arc.sourceRef}</span>
                              <ArrowRight className="w-3 h-3" />
                              <span className="text-sky-300">{arc.targetRef}</span>
                            </div>
                            <div className="text-xs font-semibold truncate mt-0.5 group-hover:text-amber-200">
                              {arc.title}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-300 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
