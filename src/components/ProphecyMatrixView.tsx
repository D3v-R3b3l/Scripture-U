import React, { useState, useMemo } from 'react';
import { PROPHECY_LINKS, ProphecyLink } from '../data/prophecies';
import { Search, ArrowRight, BookOpen, Sparkles, Filter, ChevronDown, ChevronUp, Layers, CheckCircle } from 'lucide-react';

interface ProphecyMatrixViewProps {
  onSelectProphecyDetail?: (prophecy: ProphecyLink) => void;
}

export const ProphecyMatrixView: React.FC<ProphecyMatrixViewProps> = ({ onSelectProphecyDetail }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCovenant, setSelectedCovenant] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(PROPHECY_LINKS[0]?.id || null);

  const categories = ['All', 'Messianic Prophecy', 'Typological Shadow', 'Covenant Promise', 'Eschatological'];
  const covenants = ['All', 'Edenic', 'Abrahamic', 'Mosaic', 'Davidic', 'New Covenant'];

  const filteredLinks = useMemo(() => {
    return PROPHECY_LINKS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchCov = selectedCovenant === 'All' || p.covenant === selectedCovenant;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.otPassage.toLowerCase().includes(q) ||
        p.ntPassage.toLowerCase().includes(q) ||
        p.theologicalSignificance.toLowerCase().includes(q);

      return matchCat && matchCov && matchSearch;
    });
  }, [selectedCategory, selectedCovenant, searchQuery]);

  return (
    <div className="w-full min-h-[calc(100vh-62px)] bg-observatory-grid text-zinc-200 px-3.5 sm:px-6 py-8 pb-24 lg:pb-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/15 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Inter-Testamental Typology & Prediction
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-100">
              Prophecy & Typology Matrix
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-editorial text-[16px]">
              Examine the precise theological rungs holding the Old and New Testaments together in indivisible unity.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search prophecy, verse, or motif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-sm"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Covenant Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Covenant:</span>
            {covenants.map((cov) => (
              <button
                key={cov}
                onClick={() => setSelectedCovenant(cov)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCovenant === cov
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cov}
              </button>
            ))}
          </div>
        </div>

        {/* Prophecy Matrix Count Indicator */}
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Displaying {filteredLinks.length} Prophecy & Typology Connections</span>
          <span>Click any card to inspect full side-by-side exegesis</span>
        </div>

        {/* Cards Grid */}
        <div className="space-y-4">
          {filteredLinks.map((link) => {
            const isExpanded = expandedId === link.id;
            return (
              <div
                key={link.id}
                className={`bg-[#0f172a] rounded-xl border transition-all ${
                  isExpanded
                    ? 'border-amber-500/50 shadow-xl shadow-amber-500/5'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Header Summary Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : link.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-amber-400">{link.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{link.covenant} Covenant</span>
                    </div>

                    <h3 className="text-base font-bold font-serif-title text-slate-100">
                      {link.title}
                    </h3>

                    {/* Quick Passage Strip */}
                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-mono text-amber-300 font-semibold">{link.otPassage}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono text-sky-300 font-semibold">{link.ntPassage}</span>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details: Side-by-Side Scripture & Hebrew/Greek Lexicon */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/70 space-y-5 animate-in fade-in duration-200">
                    {/* Side-by-Side Scripture View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Old Testament Prediction / Shadow */}
                      <div className="bg-amber-950/15 border border-amber-900/30 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-semibold text-amber-400 uppercase tracking-wider">
                            OT Foreshadowing · {link.otPassage}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-amber-100/90 font-editorial text-[15px] italic">
                          "{link.otText}"
                        </p>
                      </div>

                      {/* New Testament Realization */}
                      <div className="bg-sky-950/15 border border-sky-900/30 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-semibold text-sky-400 uppercase tracking-wider">
                            NT Fulfillment · {link.ntPassage}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-sky-100/90 font-editorial text-[15px] italic">
                          "{link.ntText}"
                        </p>
                      </div>
                    </div>

                    {/* Theological Exegesis */}
                    <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                        Theological Synthesis
                      </div>
                      <p className="text-slate-300 leading-relaxed font-editorial text-[15px]">
                        {link.theologicalSignificance}
                      </p>
                    </div>

                    {/* Original Language Terms Ribbon */}
                    {link.originalLanguageTerms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          Original Lexical Roots:
                        </span>
                        {link.originalLanguageTerms.map((term, tIdx) => (
                          <div
                            key={tIdx}
                            className="bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800 text-xs flex items-center gap-2"
                          >
                            <span className="font-serif font-bold text-amber-300 text-sm">
                              {term.term}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              ({term.transliteration})
                            </span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-300 text-[11px]">{term.meaning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
