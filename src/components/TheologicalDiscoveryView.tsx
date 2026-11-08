import React, { useState } from 'react';
import { THEOLOGICAL_MOTIFS, TheologicalMotif } from '../data/theologicalMotifs';
import { Sparkles, BookOpen, Send, Compass, ArrowRight, Loader2, HelpCircle, CheckCircle2 } from 'lucide-react';

export const TheologicalDiscoveryView: React.FC = () => {
  const [selectedMotif, setSelectedMotif] = useState<TheologicalMotif>(THEOLOGICAL_MOTIFS[0]);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'synthesis' | 'languages' | 'covenants' | 'typology'>('synthesis');

  const handleRunAiQuery = async (queryText?: string) => {
    const q = (queryText || customQuery).trim();
    if (!q) return;

    setIsLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/theology-explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          theme: selectedMotif.theme,
          passage: selectedMotif.otRoots[0]?.passage || 'Canonical Overview'
        })
      });

      const json = await response.json();
      if (json.data) {
        setAiResult(json.data);
      } else {
        // Fallback to local curated synthesis for selected motif
        setAiResult({
          synthesis: selectedMotif.synthesis,
          originalLanguages: selectedMotif.originalTerms.map(t => ({
            term: `${t.term} (${t.transliteration})`,
            language: t.language,
            definition: t.meaning,
            theologicalWeight: t.theologicalSignificance
          })),
          otConnections: selectedMotif.otRoots.map(r => ({
            passage: r.passage,
            context: r.context,
            foreshadowing: 'Foreshadows Christological realization'
          })),
          ntFulfillments: selectedMotif.ntFulfillment.map(f => ({
            passage: f.passage,
            christologicalFocus: f.christologicalFocus,
            exegesis: 'Apostolic canonical synthesis'
          })),
          covenantArc: selectedMotif.covenantArc,
          typologicalInsight: 'Shadow fulfilled in substance in Jesus of Nazareth'
        });
      }
    } catch (err) {
      console.error(err);
      // Graceful offline fallback
      setAiResult({
        synthesis: selectedMotif.synthesis,
        originalLanguages: selectedMotif.originalTerms.map(t => ({
          term: `${t.term} (${t.transliteration})`,
          language: t.language,
          definition: t.meaning,
          theologicalWeight: t.theologicalSignificance
        })),
        otConnections: selectedMotif.otRoots.map(r => ({
          passage: r.passage,
          context: r.context,
          foreshadowing: 'Canonical preparation'
        })),
        ntFulfillments: selectedMotif.ntFulfillment.map(f => ({
          passage: f.passage,
          christologicalFocus: f.christologicalFocus,
          exegesis: 'Apostolic realization'
        })),
        covenantArc: selectedMotif.covenantArc,
        typologicalInsight: 'Old Testament archetype realized in the New Covenant'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100dvh-96px)] bg-observatory-grid text-zinc-200 px-3.5 sm:px-6 py-6 sm:py-8 pb-24 lg:pb-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="border-b border-amber-500/15 pb-5 sm:pb-6">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            Semantic Canonical Exploration & Original Languages
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-100">
            AI-Assisted Theological Discovery
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl font-editorial text-[16px]">
            Synthesize biblical theology, trace motifs across the double-helix, inspect Hebrew/Greek linguistic nuances, and investigate Christological fulfillments.
          </p>
        </div>

        {/* Dynamic Query Input Box */}
        <div className="bg-[#0f172a] p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Theological Exploration Engine</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <input
              type="text"
              placeholder="e.g. How does the Passover Lamb connect to the Cross and Revelation's Throne Room?"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAiQuery()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 sm:px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
            />
            <button
              onClick={() => handleRunAiQuery()}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                  <span>Explore</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Suggested Questions:</span>
            {selectedMotif.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomQuery(q);
                  handleRunAiQuery(q);
                }}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-200 border border-slate-800 transition-colors text-[11px] cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Thematic Anchor Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {THEOLOGICAL_MOTIFS.map((motif) => {
            const isSelected = selectedMotif.id === motif.id;
            return (
              <button
                key={motif.id}
                onClick={() => {
                  setSelectedMotif(motif);
                  setAiResult(null);
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="text-[11px] text-amber-400 font-mono mb-1">Canonical Motif</div>
                <div className="text-xs font-bold font-serif-title text-slate-100 line-clamp-1">
                  {motif.theme}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {motif.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Display Active Motif or Live AI Result */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
          {/* Internal Tab Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 border-b border-slate-800 text-xs font-medium overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('synthesis')}
              className={`py-3.5 border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'synthesis'
                  ? 'border-amber-400 text-amber-200 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Theological Exposition
            </button>
            <button
              onClick={() => setActiveTab('languages')}
              className={`py-3.5 border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'languages'
                  ? 'border-amber-400 text-amber-200 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hebrew &amp; Greek Lexicons
            </button>
            <button
              onClick={() => setActiveTab('covenants')}
              className={`py-3.5 border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'covenants'
                  ? 'border-amber-400 text-amber-200 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Covenantal Arc &amp; Scriptures
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'synthesis' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-serif-title text-slate-100 mb-1">
                    {aiResult ? 'Exposition & Canonical Synthesis' : selectedMotif.theme}
                  </h3>
                  <div className="text-xs text-amber-300 font-serif">
                    {selectedMotif.tagline}
                  </div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                  <p className="text-sm text-slate-200 leading-relaxed font-editorial text-[17px] whitespace-pre-line">
                    {aiResult ? aiResult.synthesis : selectedMotif.synthesis}
                  </p>
                </div>

                {/* Covenant Progress Bar */}
                <div className="bg-amber-950/15 border border-amber-900/30 p-4 rounded-xl">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    Covenantal Trajectory
                  </div>
                  <div className="text-xs text-amber-100 font-mono">
                    {aiResult?.covenantArc || selectedMotif.covenantArc}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'languages' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Original Biblical Terms (Hebrew / Greek)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(aiResult?.originalLanguages || selectedMotif.originalTerms).map((term: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
                        <span className="text-2xl font-serif text-amber-300 font-bold">
                          {term.term}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {term.language} · {term.transliteration || ''}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300">
                        <span className="text-slate-400 font-semibold">Semantic Range: </span>
                        <span>{term.meaning || term.definition}</span>
                      </div>

                      <div className="text-xs text-amber-200/90 bg-amber-950/20 p-3 rounded-lg border border-amber-900/30 font-editorial text-[15px] leading-relaxed">
                        {term.theologicalSignificance || term.theologicalWeight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'covenants' && (
              <div className="space-y-6">
                {/* OT Roots vs NT Fulfillment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* OT Roots */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Old Testament Canonical Anchors
                    </div>
                    <div className="space-y-2.5">
                      {(aiResult?.otConnections || selectedMotif.otRoots).map((root: any, i: number) => (
                        <div key={i} className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                          <div className="font-mono font-semibold text-amber-300">
                            {root.passage}
                          </div>
                          <p className="text-slate-300 font-editorial text-[15px]">
                            {root.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NT Fulfillments */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      New Testament Apostolic Fulfillment
                    </div>
                    <div className="space-y-2.5">
                      {(aiResult?.ntFulfillments || selectedMotif.ntFulfillment).map((ful: any, i: number) => (
                        <div key={i} className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                          <div className="font-mono font-semibold text-sky-300">
                            {ful.passage}
                          </div>
                          <p className="text-slate-300 font-editorial text-[15px]">
                            {ful.christologicalFocus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
