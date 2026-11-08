import React, { useEffect, useRef } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { BibleBook } from '../data/bibleBooks';
import { ProphecyLink } from '../data/prophecies';
import { GraphNode } from '../data/knowledgeGraph';

interface InspectorModalProps {
  item: { type: 'book'; data: BibleBook } | { type: 'prophecy'; data: ProphecyLink } | { type: 'node'; data: GraphNode } | null;
  onClose: () => void;
}

export const InspectorModal: React.FC<InspectorModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape key & focus close button on open for screen-reader and keyboard accessibility
  useEffect(() => {
    if (!item) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#080b12] border border-amber-500/45 rounded-2xl p-4 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-y-auto max-h-[88dvh] text-zinc-100"
      >
        {/* Top Action Bar with Copy & Close */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-amber-500/15">
          <div className="min-w-0">
            {item.type === 'book' && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                  <span>{item.data.testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                  <span>·</span>
                  <span>{item.data.division}</span>
                  <span>·</span>
                  <span>Book #{item.data.order}</span>
                </div>
                <h2 id="inspector-modal-title" className="text-xl sm:text-2xl font-bold font-serif-title text-amber-50">
                  {item.data.name}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-amber-300 mt-0.5">
                  {item.data.originalName}{' '}
                  <span className="text-xs text-zinc-400">({item.data.transliteration})</span>
                </div>
              </>
            )}

            {item.type === 'prophecy' && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                  <span>{item.data.category}</span>
                  <span>·</span>
                  <span>{item.data.covenant} Covenant</span>
                </div>
                <h2 id="inspector-modal-title" className="text-lg sm:text-2xl font-bold font-serif-title text-amber-50">
                  {item.data.title}
                </h2>
              </>
            )}

            {item.type === 'node' && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                  <span>{item.data.type}</span>
                  <span>·</span>
                  <span>{item.data.era}</span>
                </div>
                <h2 id="inspector-modal-title" className="text-xl sm:text-2xl font-bold font-serif-title text-amber-50">
                  {item.data.label}
                </h2>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const textToCopy =
                  item.type === 'book'
                    ? `${item.data.name} - ${item.data.keyVerse}: "${item.data.keyVerseText}"`
                    : item.type === 'prophecy'
                    ? `${item.data.title}\nOT: ${item.data.otPassage} - "${item.data.otText}"\nNT: ${item.data.ntPassage} - "${item.data.ntText}"`
                    : `${item.data.label} (${item.data.type}): ${item.data.summary}\nTheological Weight: ${item.data.theologicalSignificance}`;
                navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              aria-label="Copy details to clipboard"
              className="min-h-[40px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs text-amber-300 hover:text-amber-200 hover:border-amber-500/40 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close inspector modal"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-zinc-300 hover:text-white rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {item.type === 'book' && (
          <div className="space-y-4 pt-4">
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
              <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px] font-mono mb-1.5">
                Canonical Theme
              </div>
              <p className="text-zinc-100 text-xs sm:text-sm font-mono leading-relaxed">{item.data.theme}</p>
            </div>

            <div className="bg-amber-950/25 p-4 rounded-xl border border-amber-500/30 space-y-1">
              <div className="text-amber-400 font-semibold uppercase tracking-wider text-[11px] font-mono">
                Covenant Trajectory
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-mono leading-relaxed">
                {item.data.covenantConnection}
              </p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="font-mono text-xs text-amber-400 font-semibold">
                Key Verse · {item.data.keyVerse}
              </div>
              <p className="text-xs sm:text-sm font-mono text-zinc-100 leading-relaxed">
                &ldquo;{item.data.keyVerseText}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
              <span>{item.data.chapters} Total Chapters</span>
              <span>Canonical Order #{item.data.order} / 66</span>
            </div>
          </div>
        )}

        {item.type === 'prophecy' && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-amber-950/20 border border-amber-500/35 p-4 rounded-xl space-y-2">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                  OT Shadow · {item.data.otPassage}
                </div>
                <p className="text-xs sm:text-sm font-mono text-amber-100 leading-relaxed">
                  &ldquo;{item.data.otText}&rdquo;
                </p>
              </div>

              <div className="bg-sky-950/20 border border-sky-500/35 p-4 rounded-xl space-y-2">
                <div className="text-xs font-mono font-bold text-sky-400 uppercase">
                  NT Realization · {item.data.ntPassage}
                </div>
                <p className="text-xs sm:text-sm font-mono text-sky-100 leading-relaxed">
                  &ldquo;{item.data.ntText}&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-1.5">
              <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px] font-mono">
                Theological Synthesis
              </div>
              <p className="text-zinc-100 font-mono text-xs sm:text-sm leading-relaxed">
                {item.data.theologicalSignificance}
              </p>
            </div>

            {item.data.originalLanguageTerms.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider font-mono">
                  Lexical Roots:
                </span>
                {item.data.originalLanguageTerms.map((term, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono flex items-center gap-2"
                  >
                    <span className="font-bold text-amber-300">{term.term}</span>
                    <span className="text-zinc-400 text-[11px]">({term.transliteration})</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-200">{term.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {item.type === 'node' && (
          <div className="space-y-4 pt-4">
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
              <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px] font-mono mb-1.5">
                Canonical Summary
              </div>
              <p className="text-zinc-100 text-xs sm:text-sm font-mono leading-relaxed">{item.data.summary}</p>
            </div>

            <div className="bg-amber-950/25 p-4 rounded-xl border border-amber-500/30 space-y-1">
              <div className="text-amber-400 font-semibold uppercase tracking-wider text-[11px] font-mono">
                Theological Weight
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-mono leading-relaxed">
                {item.data.theologicalSignificance}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider font-mono">
                Scriptural Anchors
              </div>
              <div className="flex flex-wrap gap-2">
                {item.data.scriptures.map((cit, i) => (
                  <span
                    key={i}
                    className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono text-xs text-amber-300"
                  >
                    {cit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
