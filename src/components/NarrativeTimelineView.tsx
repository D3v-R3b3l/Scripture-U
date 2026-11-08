import React, { useState } from 'react';
import { TIMELINE_ERAS, TimelineEra } from '../data/timelines';
import { Calendar, BookOpen, Clock, Sparkles, CheckCircle2, ChevronRight, Shield, Award } from 'lucide-react';

export const NarrativeTimelineView: React.FC = () => {
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const [filterTestament, setFilterTestament] = useState<'All' | 'OT' | 'NT'>('All');

  const filteredEras = TIMELINE_ERAS.filter(era => {
    if (filterTestament === 'All') return true;
    if (filterTestament === 'OT') return era.testament === 'OT';
    if (filterTestament === 'NT') return era.testament === 'NT';
    return true;
  });

  const activeEra = filteredEras[selectedEraIndex] || filteredEras[0] || TIMELINE_ERAS[0];

  return (
    <div className="w-full min-h-[calc(100vh-62px)] bg-observatory-grid text-zinc-200 px-3.5 sm:px-6 py-8 pb-24 lg:pb-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/15 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Redemptive History & Canonical Chronology
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-100">
              Narrative Timelines
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-editorial text-[16px]">
              Traverse the unified biblical narrative from Primeval Creation and Patriarchal covenants to the Incarnation, Apostolic expansion, and final Apocalypse.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => {
                setFilterTestament('All');
                setSelectedEraIndex(0);
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTestament === 'All'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Eras ({TIMELINE_ERAS.length})
            </button>
            <button
              onClick={() => {
                setFilterTestament('OT');
                setSelectedEraIndex(0);
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTestament === 'OT'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Old Testament
            </button>
            <button
              onClick={() => {
                setFilterTestament('NT');
                setSelectedEraIndex(0);
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTestament === 'NT'
                  ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              New Testament
            </button>
          </div>
        </div>

        {/* Horizontal Era Navigation Strip */}
        <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
            {filteredEras.map((era, idx) => {
              const isSelected = era.id === activeEra.id;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEraIndex(idx)}
                  className={`flex-shrink-0 text-left p-3 rounded-lg border transition-all cursor-pointer w-64 ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono mb-1">
                    <span>{era.period}</span>
                    <span className="text-slate-500">{era.testament}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 font-serif-title line-clamp-1">
                    {era.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {era.covenantFocus}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Era Spotlight & Detailed Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Era Context & Canonical Books */}
          <div className="space-y-6">
            <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-xl space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Era {selectedEraIndex + 1} of {filteredEras.length}
                </span>
                <h2 className="text-xl font-bold font-serif-title text-amber-200 mt-1">
                  {activeEra.name}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{activeEra.period}</div>
              </div>

              <p className="text-xs leading-relaxed text-slate-300 border-t border-slate-800 pt-3">
                {activeEra.summary}
              </p>

              {/* Covenant Focus */}
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                  Covenant Dimension
                </div>
                <div className="text-amber-300 font-medium">{activeEra.covenantFocus}</div>
              </div>

              {/* Key Figures */}
              <div>
                <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                  Key Figures
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeEra.keyFigures.map((person, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* Canonical Books Written / Covered */}
              <div>
                <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                  Associated Canonical Books
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeEra.canonicalBooks.map((bk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 font-serif"
                    >
                      {bk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chronological Milestones River */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Epochal Milestones & Prophetic Moments</span>
            </h3>

            <div className="relative border-l-2 border-slate-800 pl-6 ml-3 space-y-6">
              {activeEra.milestones.map((ms, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Bullet */}
                  <div
                    className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                      ms.isPropheticFulfillment
                        ? 'bg-amber-400 border-amber-200 shadow-md shadow-amber-500/50'
                        : 'bg-slate-900 border-slate-600 group-hover:border-amber-400'
                    }`}
                  />

                  {/* Milestone Card */}
                  <div className="bg-[#0f172a]/90 hover:bg-[#111c33] border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl transition-all shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                          {ms.year}
                        </span>
                        <h4 className="text-sm font-bold font-serif-title text-slate-100">
                          {ms.event}
                        </h4>
                      </div>

                      {ms.isPropheticFulfillment && (
                        <span className="flex items-center gap-1 text-[11px] text-amber-300 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Messianic Fulfillment</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-editorial text-[15px]">
                      {ms.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-amber-300/90">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                        <span>{ms.scripture}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
