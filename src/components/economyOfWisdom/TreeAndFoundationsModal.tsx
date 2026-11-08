import React, { useState } from 'react';
import {
  WISDOM_SCRIPTURES,
  CONCEPTUAL_DEFINITIONS,
  CORE_DISTINCTIONS,
  WisdomScripturePassage
} from '../../data/economyOfWisdom/scripturesAndConcepts';
import { BookOpen, X, ShieldAlert, Sparkles, Compass, Scale, Layers, Info } from 'lucide-react';

interface LivingTreeMetaphorProps {
  activeArea: 'source' | 'map' | 'crossroads' | 'economy' | 'fruit';
  onSelectArea: (area: 'source' | 'map' | 'crossroads' | 'economy' | 'fruit') => void;
  completedScenariosCount: number;
  investigationsCount: number;
  reflectionsCount: number;
}

export const LivingTreeMetaphor: React.FC<LivingTreeMetaphorProps> = ({
  activeArea,
  onSelectArea,
  completedScenariosCount,
  investigationsCount,
  reflectionsCount
}) => {
  const [selectedPart, setSelectedPart] = useState<'roots' | 'branches' | 'fruit'>('roots');

  return (
    <div className="bg-[#F5F1E6] border border-[#D6CEBE] rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive SVG Tree Metaphor (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[320px] bg-[#FBF9F5] border border-[#E2D9C8] rounded-lg p-4 relative">
            <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1">
              <span className="uppercase tracking-widest font-semibold text-[#78350F]">Teaching Metaphor</span>
              <span>Click Roots, Branches, or Fruit</span>
            </div>

            <svg
              viewBox="0 0 300 280"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive tree teaching metaphor showing roots of reverence and source, branches of inquiry and judgment, and fruit of love"
            >
              {/* Subtle ground horizon line */}
              <line x1="20" y1="205" x2="280" y2="205" stroke="#D6CEBE" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="26" y="218" fill="#78716C" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
                SOIL OF REVERENCE &amp; GRACE
              </text>

              {/* ROOTS GROUP (Interactive) */}
              <g
                onClick={() => {
                  setSelectedPart('roots');
                  onSelectArea('source');
                }}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                <path
                  d="M150 205 C145 225, 115 245, 75 262 M150 205 C150 230, 148 255, 138 272 M150 205 C158 228, 185 248, 225 262 M135 218 C115 228, 95 232, 62 238 M165 218 C185 228, 205 232, 238 238"
                  fill="none"
                  stroke={selectedPart === 'roots' || activeArea === 'source' ? '#92400E' : '#78716C'}
                  strokeWidth={selectedPart === 'roots' || activeArea === 'source' ? '4' : '2.5'}
                  strokeLinecap="round"
                />
                <circle cx="95" cy="252" r="4.5" fill="#B45309" />
                <circle cx="150" cy="258" r="4.5" fill="#B45309" />
                <circle cx="205" cy="252" r="4.5" fill="#B45309" />
              </g>

              {/* TRUNK & BRANCHES GROUP (Interactive) */}
              <g
                onClick={() => {
                  setSelectedPart('branches');
                  onSelectArea('map');
                }}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                {/* Main Trunk */}
                <path
                  d="M142 205 C144 175, 146 145, 146 120 L154 120 C154 145, 156 175, 158 205 Z"
                  fill={selectedPart === 'branches' || activeArea === 'map' || activeArea === 'crossroads' ? '#57534E' : '#78716C'}
                />
                {/* Branches */}
                <path
                  d="M150 135 C130 115, 95 102, 68 82 M150 125 C150 98, 135 72, 115 52 M150 125 C155 98, 172 72, 190 52 M150 135 C172 115, 205 102, 232 82 M112 108 C100 92, 88 72, 85 58 M188 108 C200 92, 212 72, 215 58"
                  fill="none"
                  stroke={selectedPart === 'branches' || activeArea === 'map' || activeArea === 'crossroads' ? '#44403C' : '#78716C'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* CANOPY & FRUIT GROUP (Interactive) */}
              <g
                onClick={() => {
                  setSelectedPart('fruit');
                  onSelectArea('fruit');
                }}
                className="cursor-pointer transition-opacity hover:opacity-95"
              >
                {/* Soft Foliage Canopy */}
                <ellipse
                  cx="150"
                  cy="78"
                  rx="98"
                  ry="54"
                  fill={selectedPart === 'fruit' || activeArea === 'fruit' || activeArea === 'economy' ? 'rgba(20, 83, 45, 0.16)' : 'rgba(20, 83, 45, 0.10)'}
                  stroke={selectedPart === 'fruit' || activeArea === 'fruit' ? '#14532D' : '#A8A29E'}
                  strokeWidth="1.5"
                />
                {/* Fruit nodes representing expressions of wisdom in love */}
                <circle cx="82" cy="84" r="6.5" fill="#B45309" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="118" cy="54" r="6.5" fill="#B45309" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="150" cy="44" r="7.5" fill="#92400E" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="185" cy="56" r="6.5" fill="#B45309" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="218" cy="84" r="6.5" fill="#B45309" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="134" cy="88" r="6" fill="#D97706" stroke="#FBF9F5" strokeWidth="1.5" />
                <circle cx="170" cy="88" r="6" fill="#D97706" stroke="#FBF9F5" strokeWidth="1.5" />
              </g>

              {/* Labels on Canvas */}
              <text x="150" y="25" textAnchor="middle" fill="#14532D" fontSize="10" fontWeight="600" fontFamily="Cinzel, serif">
                FRUIT: LOVE, PEACE &amp; RIGHTEOUS ACTION
              </text>
              <text x="150" y="158" textAnchor="middle" fill="#292524" fontSize="9.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                BRANCHES: INQUIRY, TESTING &amp; JUDGMENT
              </text>
              <text x="150" y="242" textAnchor="middle" fill="#78350F" fontSize="9.5" fontWeight="600" fontFamily="Cinzel, serif">
                ROOTS: REVERENCE, CHRIST &amp; TRUTH
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Explanation of Selected Metaphor Layer & Non-Mechanical Disclaimer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#D6CEBE] pb-3">
            <button
              onClick={() => {
                setSelectedPart('roots');
                onSelectArea('source');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedPart === 'roots'
                  ? 'bg-[#78350F] text-[#FBF9F5]'
                  : 'bg-[#EBE5D9] text-[#44403C] hover:bg-[#E2D9C8]'
              }`}
            >
              1. Roots: Grounding &amp; Source
            </button>
            <button
              onClick={() => {
                setSelectedPart('branches');
                onSelectArea('map');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedPart === 'branches'
                  ? 'bg-[#44403C] text-[#FBF9F5]'
                  : 'bg-[#EBE5D9] text-[#44403C] hover:bg-[#E2D9C8]'
              }`}
            >
              2. Branches: Inquiry &amp; Judgment
            </button>
            <button
              onClick={() => {
                setSelectedPart('fruit');
                onSelectArea('fruit');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedPart === 'fruit'
                  ? 'bg-[#14532D] text-[#FBF9F5]'
                  : 'bg-[#EBE5D9] text-[#44403C] hover:bg-[#E2D9C8]'
              }`}
            >
              3. Fruit: Love &amp; Stewardship
            </button>
          </div>

          {selectedPart === 'roots' && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-serif-title text-[#1C1917]">
                Roots: Grounded in God’s Truth, Reverence, and Prior Love
              </h3>
              <p className="text-sm text-[#44403C] leading-relaxed font-editorial text-[16px]">
                In Scripture, wisdom begins with the fear of the Lord (Proverbs 9:10) and is hidden in Christ (Colossians 2:3). Before we gather facts or make decisions, our desires and motives are rooted in who we trust. Because God first loved us (1 John 4:19), we are freed from using knowledge to prove our worth.
              </p>
            </div>
          )}

          {selectedPart === 'branches' && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-serif-title text-[#1C1917]">
                Trunk &amp; Branches: Attention, Honest Inquiry, and Discernment
              </h3>
              <p className="text-sm text-[#44403C] leading-relaxed font-editorial text-[16px]">
                Paul prays that love may abound more and more &ldquo;in knowledge and all discernment, so that you may approve the things that are excellent&rdquo; (Philippians 1:9–10). Love does not bypass careful observation, source verification, or critical reasoning; rather, love motivates us to listen carefully and test our assumptions so we do not harm our neighbor through haste or prejudice.
              </p>
            </div>
          )}

          {selectedPart === 'fruit' && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-serif-title text-[#1C1917]">
                Fruit: The Expression of Wisdom in Concrete Love &amp; Repair
              </h3>
              <p className="text-sm text-[#44403C] leading-relaxed font-editorial text-[16px]">
                Wisdom from above is &ldquo;first pure, then peaceful, gentle, reasonable, full of mercy and good fruits&rdquo; (James 3:17). The test of what we have learned is whether it forms us into people who speak truth in love, protect the vulnerable, share burdens fairly, and practice humble repentance when we err—to the glory and praise of God.
              </p>
            </div>
          )}

          {/* Explicit Teaching Metaphor & Non-Mechanical Note */}
          <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg p-3.5 text-xs text-[#57534E] space-y-1">
            <div className="font-semibold text-[#78350F] uppercase tracking-wider text-[11px]">
              Pedagogical Note on This Metaphor
            </div>
            <p className="leading-relaxed">
              This growing tree is an <strong>illustrative teaching metaphor</strong> drawing on John 15:1–12 and Philippians 1:9–11. Spiritual life and wisdom are relational realities empowered by the Holy Spirit—never a mechanical growth formula, optimization algorithm, or numerical score.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-[#78716C] font-mono tabular-nums">
              <span>Scenarios Explored: {completedScenariosCount} / 5</span>
              <span>·</span>
              <span>Sources &amp; Voices Examined: {investigationsCount}</span>
              <span>·</span>
              <span>Journal Reflections Saved: {reflectionsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ScriptureAndConceptsModalProps {
  isOpen: boolean;
  initialTab?: 'scripture' | 'definitions' | 'distinctions' | 'integrity';
  highlightedScriptureRef?: string | null;
  onClose: () => void;
}

export const ScriptureAndConceptsModal: React.FC<ScriptureAndConceptsModalProps> = ({
  isOpen,
  initialTab = 'scripture',
  highlightedScriptureRef,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'scripture' | 'definitions' | 'distinctions' | 'integrity'>(initialTab);
  const [selectedTheme, setSelectedTheme] = useState<string>('All');

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const themes = ['All', 'Organizing', 'Formation Pattern', 'Source', 'Center', 'Purpose', 'Formation', 'Expression', 'Stewardship'];

  const filteredScriptures = WISDOM_SCRIPTURES.filter(s => {
    if (selectedTheme === 'All') return true;
    return s.theme === selectedTheme;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="foundations-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] text-[#1C1917] border border-[#D6CEBE] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#F3EFE6] border-b border-[#D6CEBE] flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#78350F] font-semibold">
              The Economy of Wisdom · Reference Library
            </div>
            <h2 id="foundations-modal-title" className="text-xl font-bold font-serif-title text-[#1C1917]">
              Scriptural Foundation, Conceptual Definitions &amp; Model Integrity
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reference library"
            className="p-1.5 rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-[#E2D9C8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-[#F5F1E6] border-b border-[#D6CEBE] flex flex-wrap items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('scripture')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'scripture'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Scriptural Foundation ({WISDOM_SCRIPTURES.length} Passages)
          </button>
          <button
            onClick={() => setActiveTab('definitions')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'definitions'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Conceptual Definitions (9)
          </button>
          <button
            onClick={() => setActiveTab('distinctions')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'distinctions'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Core Distinctions &amp; Safeguards (11)
          </button>
          <button
            onClick={() => setActiveTab('integrity')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'integrity'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Model Assumptions &amp; Limits
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'scripture' && (
            <div className="space-y-5">
              {/* Translation Attribution Banner */}
              <div className="bg-[#F3EFE6] border border-[#D6CEBE] rounded-lg p-4 text-xs text-[#44403C] space-y-1">
                <div className="font-semibold text-[#1C1917]">
                  Translation Attribution &amp; Hermeneutical Distinction
                </div>
                <p>
                  All verbatim Scripture quotations below are from the <strong>World English Bible (WEB)</strong>, which is in the permanent <strong>Public Domain</strong> with full reuse permissions. Each card explicitly separates <em>Exact Biblical Wording</em> from <em>Literary/Historical Context</em> and <em>Theological Application to This Experience</em>.
                </p>
              </div>

              {/* Theme Filter */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {themes.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedTheme === t
                        ? 'bg-[#78350F] text-[#FBF9F5] font-semibold'
                        : 'bg-[#EBE5D9] text-[#44403C] hover:bg-[#E2D9C8]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Passages List */}
              <div className="space-y-4">
                {filteredScriptures.map((passage: WisdomScripturePassage) => {
                  const isHighlighted =
                    highlightedScriptureRef &&
                    passage.reference.toLowerCase().includes(highlightedScriptureRef.toLowerCase());
                  return (
                    <div
                      key={passage.id}
                      className={`p-5 rounded-xl border transition-all space-y-3 ${
                        isHighlighted
                          ? 'bg-[#FEF3C7]/40 border-[#B45309] shadow-md'
                          : 'bg-white border-[#E2D9C8]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBE5D9] pb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#78350F]" />
                          <span className="text-base font-bold font-serif-title text-[#1C1917]">
                            {passage.reference}
                          </span>
                        </div>
                        <div className="text-xs text-[#78716C]">
                          <span>Theme: {passage.theme}</span>
                          <span className="mx-1.5">·</span>
                          <span>{passage.translation}</span>
                        </div>
                      </div>

                      {/* Exact Biblical Wording */}
                      <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#EBE5D9]">
                        <div className="text-[10px] uppercase tracking-widest text-[#78716C] font-semibold mb-1">
                          Exact Biblical Text (WEB)
                        </div>
                        <p className="font-editorial italic text-[17px] leading-relaxed text-[#1C1917]">
                          &ldquo;{passage.exactText}&rdquo;
                        </p>
                      </div>

                      {/* Context & Theological Relation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#F5F1E6]/70 p-3 rounded-lg">
                          <span className="font-semibold text-[#78350F] block mb-0.5">
                            Literary &amp; Historical Context
                          </span>
                          <p className="text-[#44403C] leading-relaxed">{passage.contextNote}</p>
                        </div>
                        <div className="bg-[#F5F1E6]/70 p-3 rounded-lg">
                          <span className="font-semibold text-[#14532D] block mb-0.5">
                            Relationship to This Experience (Interpretation)
                          </span>
                          <p className="text-[#44403C] leading-relaxed">{passage.theologicalRelation}</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#78716C] italic">
                        Note: {passage.distinctionNote}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'definitions' && (
            <div className="space-y-4">
              <div className="bg-[#F3EFE6] border border-[#D6CEBE] rounded-lg p-4 text-xs text-[#44403C]">
                These nine working definitions establish a shared vocabulary across the five areas of the experience. Notice especially the philosophical humility around <em>Knowledge</em> and the explicit metaphor explanation for <em>The Economy of Wisdom</em>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONCEPTUAL_DEFINITIONS.map(def => (
                  <div
                    key={def.id}
                    className={`p-5 rounded-xl border bg-white space-y-2.5 ${
                      def.id === 'def-economy-of-wisdom'
                        ? 'md:col-span-2 border-[#B45309] bg-[#FEF3C7]/20'
                        : 'border-[#E2D9C8]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between border-b border-[#EBE5D9] pb-2">
                      <h3 className="text-base font-bold font-serif-title text-[#1C1917]">{def.term}</h3>
                      <span className="text-[11px] text-[#78716C] font-mono">
                        {def.relatedScriptures.join(' · ')}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#78350F]">{def.shortDefinition}</p>
                    <p className="text-xs text-[#44403C] leading-relaxed">{def.expandedExplanation}</p>
                    <div className="text-[11px] text-[#57534E] bg-[#F5F1E6] p-2.5 rounded border border-[#E2D9C8]">
                      {def.philosophicalOrTheologicalNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'distinctions' && (
            <div className="space-y-4">
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 text-xs text-[#7F1D1D] space-y-1">
                <div className="font-bold uppercase tracking-wider text-[11px]">
                  Essential Pastoral &amp; Ethical Safeguards
                </div>
                <p>
                  Throughout this experience, <strong>never equate humility with accepting abuse</strong>, <strong>never equate love with enabling harm</strong>, and <strong>never equate suffering or painful outcomes with evidence of spiritual failure</strong>.
                </p>
              </div>

              <div className="space-y-3">
                {CORE_DISTINCTIONS.map((dist, idx) => (
                  <div key={dist.id} className="p-4 rounded-xl bg-white border border-[#E2D9C8] space-y-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-sm font-bold text-[#1C1917]">
                        {idx + 1}. {dist.principle}
                      </h4>
                      <span className="text-[11px] text-[#78716C] shrink-0">{dist.scenarioConnection}</span>
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">{dist.explanation}</p>
                    {dist.safeguardWarning && (
                      <div className="text-xs font-semibold text-[#991B1B] bg-[#FEF2F2] px-3 py-1.5 rounded border border-[#FECACA]">
                        Safeguard: {dist.safeguardWarning}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrity' && (
            <div className="space-y-5 text-xs text-[#292524] leading-relaxed">
              <div className="bg-[#F3EFE6] border border-[#D6CEBE] rounded-xl p-5 space-y-3">
                <h3 className="text-base font-bold font-serif-title text-[#1C1917]">
                  About This Authored Educational Model: Assumptions, Epistemic Categories &amp; Limits
                </h3>
                <p>
                  <em>The Economy of Wisdom</em> is a human-authored educational simulation informed by Christian Scripture. Its purpose is to invite reflection on how our pursuit of knowledge can be formed by reverence for God, centered in Christ, empowered by the Holy Spirit, and directed toward genuine love for God and neighbor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E2D9C8] space-y-2">
                  <h4 className="font-bold text-[#78350F] uppercase tracking-wider text-[11px]">
                    Six Distinct Epistemic Categories
                  </h4>
                  <ul className="space-y-1.5 text-[#44403C]">
                    <li><strong>1. Biblical Text:</strong> Verbatim quotations from the World English Bible (WEB, Public Domain).</li>
                    <li><strong>2. Christian Theological Interpretation:</strong> Explanatory notes connecting passages to the themes of wisdom, love, and formation—including honest acknowledgment of contested interpretations where Christians differ.</li>
                    <li><strong>3. Fictional Scenario Facts:</strong> Authored empirical details within the five scenarios (such as Voucher #409 or the sub-38°F scanner bug) discoverable through investigation.</li>
                    <li><strong>4. Character Beliefs &amp; Testimony:</strong> What characters in the scenarios think, feel, or report, which may be accurate, partial, or mistaken.</li>
                    <li><strong>5. User Assumptions:</strong> Hypotheses held before verification, explicitly tested during the <em>Interpret</em> stage.</li>
                    <li><strong>6. Illustrative Simulation Rules:</strong> Bounded time, attention, and budget allowances designed to model finite human stewardship.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2D9C8] space-y-2">
                  <h4 className="font-bold text-[#14532D] uppercase tracking-wider text-[11px]">
                    What This Simulation Refuses to Claim or Compute
                  </h4>
                  <ul className="space-y-1.5 text-[#44403C]">
                    <li><strong>No Numerical Holiness or Wisdom Score:</strong> Spiritual maturity, love, and salvation are never reducible to points, badges, or leaderboards.</li>
                    <li><strong>No Mechanical Prayer Button:</strong> Pausing for prayer in a scenario re-centers motives and invites self-examination before God, but never functions as a cheat code that automatically reveals hidden empirical facts or guarantees comfort.</li>
                    <li><strong>No Claim to Know God’s Specific Will for Your Real Life:</strong> The simulation evaluates choices within authored fictional scenarios; real-life discernment belongs to the believer before God in prayer, Scripture, and wise community.</li>
                    <li><strong>Separate Evaluation of Judgment vs. Outcome:</strong> Wise, loving choices can face costly or painful opposition, while hasty shortcuts can temporarily look successful.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2D9C8] space-y-1.5">
                <h4 className="font-bold text-[#1C1917] uppercase tracking-wider text-[11px]">
                  Privacy &amp; Local Storage Transparency
                </h4>
                <p className="text-[#44403C]">
                  No account is required. Your scenario history and private reflection journal are saved strictly in your own browser’s local storage (under key <code>scripture_universe_wisdom_state_v1</code>) and are never transmitted to an external server or shared publicly. You may export your reflections as a document or reset all stored data at any time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
