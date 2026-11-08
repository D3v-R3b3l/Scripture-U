import React, { useState, useEffect, useMemo } from 'react';
import {
  ORGANIZING_CONVICTION,
  WISDOM_SCRIPTURES,
  CONCEPTUAL_DEFINITIONS,
  CORE_DISTINCTIONS,
  MOTIVE_OPTIONS,
  ORDINARY_VOCATIONS,
  KNOWLEDGE_MAP_NODES,
  KNOWLEDGE_FEEDBACK_LOOPS,
  KnowledgeMapNode,
  KnowledgeFeedbackLoop
} from '../../data/economyOfWisdom/scripturesAndConcepts';
import {
  WISDOM_SCENARIOS,
  ECONOMY_PRINCIPLES,
  WisdomScenario,
  ScenarioDecisionOption
} from '../../data/economyOfWisdom/scenariosData';
import { LivingTreeMetaphor, ScriptureAndConceptsModal } from './TreeAndFoundationsModal';
import {
  BookOpen,
  Compass,
  Scale,
  Clock,
  Eye,
  Heart,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Download,
  Trash2,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  FileText,
  Users,
  ShieldCheck,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export type WisdomAreaId = 'source' | 'map' | 'crossroads' | 'economy' | 'fruit';
export type ScenarioStage = 'encounter' | 'investigate' | 'interpret' | 'decide' | 'consequences' | 'reflect';

export interface ScenarioRunRecord {
  runId: string;
  scenarioId: string;
  scenarioTitle: string;
  timestamp: string;
  investigatedIds: string[];
  interpretSelections: Record<string, 'Verified Fact' | 'Unverified Assumption' | 'Open Uncertainty'>;
  decisionId: string;
  decisionTitle: string;
  actionType: string;
  repairApplied: boolean;
  timeRemaining: number;
  attentionRemaining: number;
  fundsRemaining: number;
}

export interface ReflectionJournalEntry {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  createdAt: string;
  whatIKnewVsAssumed: string;
  whatIWantedAndOverlooked: string;
  howTruthAndLoveGuided: string;
  repentanceRepairPerseverance: string;
}

interface PersistedWisdomState {
  selectedMotives: string[];
  scenarioRuns: ScenarioRunRecord[];
  journalEntries: ReflectionJournalEntry[];
  generalReflectionNote: string;
}

const STORAGE_KEY = 'scripture_universe_wisdom_state_v1';

const DEFAULT_PERSISTED_STATE: PersistedWisdomState = {
  selectedMotives: ['mot-wonder', 'mot-mastery', 'mot-love', 'mot-communion'],
  scenarioRuns: [],
  journalEntries: [],
  generalReflectionNote: ''
};

export const EconomyOfWisdomView: React.FC = () => {
  // Active Area Navigation
  const [activeArea, setActiveArea] = useState<WisdomAreaId>('source');

  // Reference Library Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'scripture' | 'definitions' | 'distinctions' | 'integrity'>('scripture');
  const [highlightedScripture, setHighlightedScripture] = useState<string | null>(null);

  // Persisted Local State
  const [persisted, setPersisted] = useState<PersistedWisdomState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_PERSISTED_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved Economy of Wisdom state:', e);
    }
    return DEFAULT_PERSISTED_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch (e) {
      console.warn('Could not save Economy of Wisdom state:', e);
    }
  }, [persisted]);

  // Area 2 (The Map) State
  const [selectedMapNode, setSelectedMapNode] = useState<KnowledgeMapNode>(KNOWLEDGE_MAP_NODES[0]);
  const [activeFeedbackLoop, setActiveFeedbackLoop] = useState<KnowledgeFeedbackLoop | null>(KNOWLEDGE_FEEDBACK_LOOPS[6]);

  // Area 3 (The Crossroads) Active Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState<string>(WISDOM_SCENARIOS[0].id);
  const [scenarioStage, setScenarioStage] = useState<ScenarioStage>('encounter');
  const [investigatedIds, setInvestigatedIds] = useState<string[]>([]);
  const [interpretAnswers, setInterpretAnswers] = useState<
    Record<string, 'Verified Fact' | 'Unverified Assumption' | 'Open Uncertainty'>
  >({});
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [repairApplied, setRepairApplied] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  // Area 5 (The Fruit) Draft Reflection State
  const [draftKnewVsAssumed, setDraftKnewVsAssumed] = useState<string>('');
  const [draftWantedAndOverlooked, setDraftWantedAndOverlooked] = useState<string>('');
  const [draftTruthAndLove, setDraftTruthAndLove] = useState<string>('');
  const [draftRepentanceRepair, setDraftRepentanceRepair] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);

  const activeScenario: WisdomScenario = useMemo(() => {
    return WISDOM_SCENARIOS.find(s => s.id === activeScenarioId) || WISDOM_SCENARIOS[0];
  }, [activeScenarioId]);

  // Compute remaining resources in current scenario run
  const currentResources = useMemo(() => {
    let time = activeScenario.initialResources.timeHours;
    let attention = activeScenario.initialResources.attentionUnits;
    let funds = activeScenario.initialResources.fundsDollars;

    investigatedIds.forEach(invId => {
      const item = activeScenario.investigations.find(i => i.id === invId);
      if (item) {
        time -= item.timeCost;
        attention -= item.attentionCost;
        funds -= item.fundsCost;
      }
    });

    if (selectedDecisionId) {
      const dec = activeScenario.decisions.find(d => d.id === selectedDecisionId);
      if (dec && dec.fundsRequired) {
        funds -= dec.fundsRequired;
      }
    }

    return {
      timeHours: Math.max(0, time),
      attentionUnits: Math.max(0, attention),
      fundsDollars: Math.max(0, funds)
    };
  }, [activeScenario, investigatedIds, selectedDecisionId]);

  const selectedDecisionObj: ScenarioDecisionOption | null = useMemo(() => {
    if (!selectedDecisionId) return null;
    return activeScenario.decisions.find(d => d.id === selectedDecisionId) || null;
  }, [activeScenario, selectedDecisionId]);

  // Open Scripture helper
  const openScriptureModal = (refText?: string, tab: 'scripture' | 'definitions' | 'distinctions' | 'integrity' = 'scripture') => {
    setHighlightedScripture(refText || null);
    setModalTab(tab);
    setModalOpen(true);
  };

  // Switch or Reset Scenario Run
  const startScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setScenarioStage('encounter');
    setInvestigatedIds([]);
    setInterpretAnswers({});
    setSelectedDecisionId(null);
    setRepairApplied(false);
    setCompareMode(false);
    setActiveArea('crossroads');
  };

  // Toggle motive in Area 1
  const toggleMotive = (motiveId: string) => {
    setPersisted(prev => {
      const exists = prev.selectedMotives.includes(motiveId);
      if (exists && prev.selectedMotives.length === 1) return prev; // keep at least 1
      const next = exists
        ? prev.selectedMotives.filter(id => id !== motiveId)
        : [...prev.selectedMotives, motiveId];
      return { ...prev, selectedMotives: next };
    });
  };

  // Perform investigation in Area 3
  const handleInvestigate = (invId: string) => {
    if (investigatedIds.includes(invId)) return;
    const item = activeScenario.investigations.find(i => i.id === invId);
    if (!item) return;

    if (
      currentResources.timeHours < item.timeCost ||
      currentResources.attentionUnits < item.attentionCost ||
      currentResources.fundsDollars < item.fundsCost
    ) {
      return;
    }

    setInvestigatedIds(prev => [...prev, invId]);
  };

  // Commit decision in Area 3
  const handleCommitDecision = (dec: ScenarioDecisionOption) => {
    setSelectedDecisionId(dec.id);
    setRepairApplied(false);
    setScenarioStage('consequences');

    // Record run in history for replay & comparison
    const newRun: ScenarioRunRecord = {
      runId: `${activeScenario.id}-${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      investigatedIds: [...investigatedIds],
      interpretSelections: { ...interpretAnswers },
      decisionId: dec.id,
      decisionTitle: dec.title,
      actionType: dec.actionType,
      repairApplied: false,
      timeRemaining: currentResources.timeHours,
      attentionRemaining: currentResources.attentionUnits,
      fundsRemaining: Math.max(0, currentResources.fundsDollars - (dec.fundsRequired || 0))
    };

    setPersisted(prev => ({
      ...prev,
      scenarioRuns: [newRun, ...prev.scenarioRuns]
    }));
  };

  // Apply Repair in Area 3
  const handleApplyRepair = () => {
    setRepairApplied(true);
    setPersisted(prev => {
      const updatedRuns = [...prev.scenarioRuns];
      if (updatedRuns.length > 0 && updatedRuns[0].scenarioId === activeScenario.id) {
        updatedRuns[0] = { ...updatedRuns[0], repairApplied: true };
      }
      return { ...prev, scenarioRuns: updatedRuns };
    });
  };

  // Save Reflection Entry
  const handleSaveReflection = () => {
    if (
      !draftKnewVsAssumed.trim() &&
      !draftWantedAndOverlooked.trim() &&
      !draftTruthAndLove.trim() &&
      !draftRepentanceRepair.trim()
    ) {
      return;
    }

    const entry: ReflectionJournalEntry = {
      id: `refl-${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      createdAt: new Date().toLocaleString(),
      whatIKnewVsAssumed: draftKnewVsAssumed.trim(),
      whatIWantedAndOverlooked: draftWantedAndOverlooked.trim(),
      howTruthAndLoveGuided: draftTruthAndLove.trim(),
      repentanceRepairPerseverance: draftRepentanceRepair.trim()
    };

    setPersisted(prev => ({
      ...prev,
      journalEntries: [entry, ...prev.journalEntries]
    }));

    setDraftKnewVsAssumed('');
    setDraftWantedAndOverlooked('');
    setDraftTruthAndLove('');
    setDraftRepentanceRepair('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // Export Session Summary & Reflections as Markdown/Text file
  const handleExportSummary = () => {
    const lines: string[] = [
      '# THE ECONOMY OF WISDOM — Session & Reflection Summary',
      'Knowing truth. Becoming wise. Growing in love.',
      '',
      `Exported: ${new Date().toLocaleString()}`,
      `Central Question: ${ORGANIZING_CONVICTION.centralQuestion}`,
      `Enduring Question: ${ORGANIZING_CONVICTION.enduringQuestion}`,
      '',
      '## 1. Theological Foundation',
      '- God is the source (Proverbs 2:6; 9:10; James 1:5)',
      '- Christ is the center (Colossians 2:2–3; John 17:3; 15:1–12)',
      '- The Holy Spirit forms and empowers (Romans 12:1–2; Philippians 2:1–13; Galatians 5:22–23)',
      '- Love is the purpose and fruit (Philippians 1:9–11; Matthew 22:37–40; 1 Corinthians 8:1–3; 13:1–7)',
      '- God’s glory is the ultimate direction (Philippians 1:11; 2:11)',
      '',
      '## 2. Scenarios Explored & Decisions Taken'
    ];

    if (persisted.scenarioRuns.length === 0) {
      lines.push('_No scenario runs recorded yet._');
    } else {
      persisted.scenarioRuns.forEach((run, i) => {
        lines.push(
          `${i + 1}. **${run.scenarioTitle}** (${run.timestamp})`,
          `   - Decision: ${run.decisionTitle} [${run.actionType}]`,
          `   - Sources/Voices Investigated: ${run.investigatedIds.length}`,
          `   - Subsequent Repair Taken: ${run.repairApplied ? 'Yes' : 'No'}`,
          `   - Remaining Resources: ${run.timeRemaining}h Time, ${run.attentionRemaining} Attention, $${run.fundsRemaining} Funds`
        );
      });
    }

    lines.push('', '## 3. Private Reflection Journal Entries');
    if (persisted.journalEntries.length === 0) {
      lines.push('_No structured scenario reflections saved yet._');
    } else {
      persisted.journalEntries.forEach((entry, idx) => {
        lines.push(
          `### Entry ${idx + 1}: ${entry.scenarioTitle} (${entry.createdAt})`,
          `- **What I Knew vs. Assumed:** ${entry.whatIKnewVsAssumed || 'N/A'}`,
          `- **What I Wanted & Whose Voice I Overlooked:** ${entry.whatIWantedAndOverlooked || 'N/A'}`,
          `- **Where Truth & Love Guided Judgment:** ${entry.howTruthAndLoveGuided || 'N/A'}`,
          `- **Repentance, Repair & Faithful Perseverance:** ${entry.repentanceRepairPerseverance || 'N/A'}`,
          ''
        );
      });
    }

    if (persisted.generalReflectionNote.trim()) {
      lines.push('## 4. Personal Notes & Prayerful Commitments', persisted.generalReflectionNote.trim(), '');
    }

    lines.push(
      '---',
      'Scripture quotations in this experience are from the World English Bible (WEB, Public Domain).'
    );

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `economy-of-wisdom-reflections-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Full Reset
  const handleResetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPersisted(DEFAULT_PERSISTED_STATE);
    setInvestigatedIds([]);
    setInterpretAnswers({});
    setSelectedDecisionId(null);
    setRepairApplied(false);
    setScenarioStage('encounter');
    setConfirmResetOpen(false);
  };

  // Count distinct completed scenarios
  const completedScenarioIds = useMemo(() => {
    return new Set(persisted.scenarioRuns.map(r => r.scenarioId));
  }, [persisted.scenarioRuns]);

  const totalInvestigationsDone = useMemo(() => {
    return persisted.scenarioRuns.reduce((acc, r) => acc + r.investigatedIds.length, 0) + investigatedIds.length;
  }, [persisted.scenarioRuns, investigatedIds]);

  const selectedMotiveObjects = useMemo(() => {
    return MOTIVE_OPTIONS.filter(m => persisted.selectedMotives.includes(m.id));
  }, [persisted.selectedMotives]);

  return (
    <div className="w-full min-h-[calc(100dvh-96px)] bg-[#FBF9F5] text-[#1C1917] pb-16 selection:bg-[#FEF3C7] selection:text-[#78350F]">
      {/* Top Sinai Dawn Mountain Horizon Hero (Matching Reference Images 1-3) */}
      <section className="relative overflow-hidden bg-[#050609] text-amber-50 border-b border-amber-500/25 px-3.5 sm:px-6 pt-7 sm:pt-10 pb-6 sm:pb-8">
        {/* Atmospheric Molten Sunrise Glow & Layered Mountain Ridge Silhouette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Radial Dawn Sunburst */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-15%] w-[120%] h-[360px] rounded-full blur-3xl opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, 0.52) 0%, rgba(234, 88, 12, 0.36) 35%, rgba(124, 45, 18, 0.18) 65%, transparent 85%)'
            }}
          />
          {/* SVG Layered Mountain Silhouettes with Rim-Lit Amber Ridges */}
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-44 sm:h-56 opacity-90"
          >
            <defs>
              <linearGradient id="sinaiHorizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#9a3412" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#050609" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="ridgeRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" stopOpacity="0.2" />
                <stop offset="48%" stopColor="#fde047" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Distant Ridge */}
            <path
              d="M0,220 L180,155 L340,190 L540,95 L710,160 L910,72 L1120,165 L1290,125 L1440,175 L1440,320 L0,320 Z"
              fill="url(#sinaiHorizonGlow)"
            />
            {/* Rim-lit Crest */}
            <path
              d="M0,220 L180,155 L340,190 L540,95 L710,160 L910,72 L1120,165 L1290,125 L1440,175"
              fill="none"
              stroke="url(#ridgeRimLight)"
              strokeWidth="1.75"
            />
            {/* Foreground Obsidian Sanctuary Ridge */}
            <path
              d="M0,255 L240,195 L460,235 L680,145 L880,215 L1080,150 L1270,210 L1440,185 L1440,320 L0,320 Z"
              fill="#07080c"
              fillOpacity="0.92"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-5 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-300/90">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <span>Interactive Christian Learning Simulation · Philippians 1:9–11 &amp; 2:1–13</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-title text-amber-50 tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                {ORGANIZING_CONVICTION.title}
              </h1>
              <p className="text-base sm:text-xl md:text-2xl font-editorial italic text-amber-200/90">
                {ORGANIZING_CONVICTION.subtitle}
              </p>
            </div>

            {/* Quick Reference Library & Model Assumptions Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => openScriptureModal(undefined, 'scripture')}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#090b10]/85 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 text-xs font-semibold text-amber-100 transition-all cursor-pointer shadow-lg"
              >
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Scripture Library (WEB)</span>
              </button>
              <button
                onClick={() => openScriptureModal(undefined, 'definitions')}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#090b10]/85 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 text-xs font-semibold text-amber-100 transition-all cursor-pointer shadow-lg"
              >
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Definitions &amp; Distinctions</span>
              </button>
              <button
                onClick={() => openScriptureModal(undefined, 'integrity')}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#090b10]/85 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 text-xs font-semibold text-zinc-300 transition-all cursor-pointer shadow-lg"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Model Limits</span>
              </button>
            </div>
          </div>

          {/* Five Foundational Theological Pillars + Central Question (Obsidian Glass Card) */}
          <div className="bg-[#080a0f]/85 backdrop-blur-xl border border-amber-500/25 rounded-xl p-4 sm:p-5 space-y-4 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-start lg:items-center justify-between gap-2 sm:gap-3 border-b border-amber-500/15 pb-3.5">
              {ORGANIZING_CONVICTION.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span className="uppercase font-mono tracking-wider text-[10px] font-bold text-amber-400 shrink-0">
                    {pillar.label}:
                  </span>
                  <span className="font-semibold text-amber-50">{pillar.statement}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pt-1">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/80 font-semibold block">
                  The Central Question
                </span>
                <p className="text-base md:text-xl font-editorial font-semibold text-amber-200">
                  {ORGANIZING_CONVICTION.centralQuestion}
                </p>
              </div>
              <button
                onClick={() => openScriptureModal('Philippians 1:9–11', 'scripture')}
                className="text-xs text-amber-300 hover:text-amber-200 hover:underline font-medium flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Read Philippians 1:9–11 &amp; 2:1–13 in context</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Living Tree Metaphor */}
          <LivingTreeMetaphor
            activeArea={activeArea}
            onSelectArea={setActiveArea}
            completedScenariosCount={completedScenarioIds.size}
            investigationsCount={totalInvestigationsDone}
            reflectionsCount={persisted.journalEntries.length}
          />

          {/* Five Connected Areas Primary Navigation Bar */}
          <nav
            aria-label="Five connected areas of The Economy of Wisdom"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 pt-1"
          >
            {[
              {
                id: 'source' as WisdomAreaId,
                num: '01',
                title: 'The Source',
                subtitle: 'God, Truth & Mixed Motives'
              },
              {
                id: 'map' as WisdomAreaId,
                num: '02',
                title: 'The Map',
                subtitle: 'How Knowledge Grows'
              },
              {
                id: 'crossroads' as WisdomAreaId,
                num: '03',
                title: 'The Crossroads',
                subtitle: '5 Branching Scenarios'
              },
              {
                id: 'economy' as WisdomAreaId,
                num: '04',
                title: 'The Economy',
                subtitle: 'Cost, Stewardship & Fruit'
              },
              {
                id: 'fruit' as WisdomAreaId,
                num: '05',
                title: 'The Fruit',
                subtitle: 'Reflection, Repair & Journal'
              }
            ].map(area => {
              const isActive = activeArea === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className={`text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-500/25 via-amber-900/30 to-[#090b10] text-amber-50 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'bg-[#090b10]/85 text-zinc-300 border-amber-500/20 hover:border-amber-500/45 hover:bg-[#111520]/90'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono mb-1">
                    <span className={isActive ? 'text-amber-300 font-bold' : 'text-amber-500/80'}>AREA {area.num}</span>
                    {area.id === 'crossroads' && (
                      <span className={isActive ? 'text-amber-200' : 'text-zinc-400'}>
                        {completedScenarioIds.size}/5
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-serif-title text-amber-50">{area.title}</div>
                  <div className={`text-[11px] sm:text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-amber-200/90' : 'text-zinc-400'}`}>
                    {area.subtitle}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* =====================================================================
          MAIN CONTENT AREA CONTAINER
      ===================================================================== */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 pt-6 sm:pt-8 space-y-8 sm:space-y-10">
        {/* -------------------------------------------------------------------
            AREA 1: THE SOURCE — GOD, TRUTH, AND THE DESIRE TO KNOW
        ------------------------------------------------------------------- */}
        {activeArea === 'source' && (
          <div className="space-y-8 sm:space-y-10">
            {/* Wonder Opening */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs space-y-5 sm:space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                  Area 01 · The Source
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif-title text-[#1C1917]">
                  God, Truth, and the Desire to Know
                </h2>
                <p className="text-sm md:text-base text-[#44403C] leading-relaxed font-editorial text-[17px]">
                  Before we examine methods or dilemmas, wisdom begins with wonder and self-examination: <em>Why do we seek understanding at all? What makes truth worth pursuing when it is costly? And what is our knowledge ultimately for?</em>
                </p>
              </div>

              {/* Three Foundational Questions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FBF9F5] border border-[#E2D9C8] rounded-xl p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    1. Why Seek Understanding?
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    God created a coherent, intelligible world and made humans in His image with the capacity to attend, name, investigate, and care. Yet in a fallen world, our curiosity is rarely pure: wonder and love are frequently entangled with anxiety, rivalry, or the desire for control.
                  </p>
                  <button
                    onClick={() => openScriptureModal('Proverbs 2:6', 'scripture')}
                    className="text-[11px] font-semibold text-[#78350F] hover:underline cursor-pointer"
                  >
                    Proverbs 2:6 · Proverbs 9:10 →
                  </button>
                </div>

                <div className="bg-[#FBF9F5] border border-[#E2D9C8] rounded-xl p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#14532D]">
                    2. What Makes Truth Worth Pursuing?
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    Reality is not plastic to our wishes. Because God is the God of truth and Christ is the center in whom all treasures of wisdom and knowledge are hidden, honesty with reality—both spiritual and empirical—is an act of reverence, and falsifying reality always harms neighbors.
                  </p>
                  <button
                    onClick={() => openScriptureModal('Colossians 2:2–3', 'scripture')}
                    className="text-[11px] font-semibold text-[#14532D] hover:underline cursor-pointer"
                  >
                    Colossians 2:2–3 · John 17:3 →
                  </button>
                </div>

                <div className="bg-[#FBF9F5] border border-[#E2D9C8] rounded-xl p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                    3. What Is Knowledge Ultimately For?
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    &ldquo;Knowledge puffs up, but love builds up&rdquo; (1 Corinthians 8:1). Understanding reaches its true end not when we win an argument or hoard expertise, but when it equips us to know God more deeply and serve our neighbor’s good in truth.
                  </p>
                  <button
                    onClick={() => openScriptureModal('1 Corinthians 8:1–3', 'scripture')}
                    className="text-[11px] font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    1 Corinthians 8:1–3 · Matthew 22:37–40 →
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Mixed-Motive Explorer */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs space-y-5 sm:space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE5D9] pb-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                    Interactive Diagnostic · Mixed Motives in Learning
                  </div>
                  <h3 className="text-xl font-bold font-serif-title text-[#1C1917] mt-0.5">
                    How Our Motives Shape What We Ask, Notice, and Do
                  </h3>
                  <p className="text-xs text-[#57534E] mt-1 max-w-2xl">
                    In real life, human motives are almost always mixed. Select any combination of the ten motives below to see how they interact—and how reverence for God and love for neighbor re-order them.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#78350F] bg-[#FEF3C7]/50 px-3 py-1.5 rounded-lg border border-[#FDE68A] self-start md:self-auto">
                  Active Motives Selected: {persisted.selectedMotives.length} of 10
                </span>
              </div>

              {/* 10 Motive Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {MOTIVE_OPTIONS.map(motive => {
                  const isSelected = persisted.selectedMotives.includes(motive.id);
                  return (
                    <button
                      key={motive.id}
                      onClick={() => toggleMotive(motive.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5F1E6] border-[#78350F] shadow-xs'
                          : 'bg-[#FBF9F5] border-[#E2D9C8] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#78716C] mb-1">
                        <span>{motive.category.split(' ')[0]}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#78350F]" />}
                      </div>
                      <div className="text-xs font-bold text-[#1C1917]">{motive.name}</div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Synthesis of Selected Mixed Motives */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {selectedMotiveObjects.map(m => (
                  <div key={m.id} className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-2">
                      <span className="text-sm font-bold font-serif-title text-[#1C1917]">{m.name}</span>
                      <span className="text-[11px] text-[#78716C]">{m.category}</span>
                    </div>
                    <p className="text-[#44403C]">{m.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="bg-white p-2.5 rounded border border-[#EBE5D9]">
                        <span className="font-semibold text-[#78350F] block mb-0.5">Questions It Prompts:</span>
                        <ul className="list-disc list-inside text-[#44403C] space-y-0.5">
                          {m.questionsAsked.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-2.5 rounded border border-[#EBE5D9]">
                        <span className="font-semibold text-[#1C1917] block mb-0.5">Evidence It Notices:</span>
                        <p className="text-[#44403C]">{m.evidenceNoticed}</p>
                      </div>
                    </div>
                    <div className="bg-[#FEF2F2]/60 p-2.5 rounded border border-[#FECACA] text-[#7F1D1D]">
                      <strong>Distortion When Unchecked:</strong> {m.blindSpots}
                    </div>
                    <div className="bg-[#F0FDF4] p-2.5 rounded border border-[#BBF7D0] text-[#14532D]">
                      <strong>When Ordered by Reverence &amp; Love:</strong> {m.whenOrderedByLove}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordinary Learning, Science, Craftsmanship, and Practical Skill */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs space-y-5">
              <div className="max-w-3xl space-y-1">
                <div className="text-xs uppercase tracking-widest text-[#14532D] font-semibold">
                  Vocation, Creation &amp; Neighbor-Love
                </div>
                <h3 className="text-xl font-bold font-serif-title text-[#1C1917]">
                  The Dignity of Ordinary Learning, Science, Craftsmanship &amp; Skill
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Wisdom does not turn every factual discovery into an artificial religious allegory. Because God is the Creator of physical reality, learning how bridges bear weight, how cells respond to medicine, or how budgets balance has genuine integrity as stewardship and concrete love for neighbor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ORDINARY_VOCATIONS.map(voc => (
                  <div key={voc.id} className="bg-[#FBF9F5] border border-[#E2D9C8] rounded-xl p-5 space-y-2.5 text-xs">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#78350F]">
                      {voc.domain}
                    </div>
                    <h4 className="text-base font-bold font-serif-title text-[#1C1917]">{voc.title}</h4>
                    <p className="text-[#44403C] leading-relaxed">
                      <strong>Integrity of the Discipline:</strong> {voc.ordinaryIntegrity}
                    </p>
                    <p className="text-[#14532D] leading-relaxed">
                      <strong>Service to Neighbor:</strong> {voc.stewardshipAndNeighborLove}
                    </p>
                    <div className="p-2.5 bg-[#F3EFE6] rounded border border-[#D6CEBE] text-[#57534E] italic">
                      {voc.antiReductionismNote}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveArea('map')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
                >
                  <span>Proceed to Area 02: The Map of How Knowledge Grows</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            AREA 2: THE MAP — HOW KNOWLEDGE GROWS
        ------------------------------------------------------------------- */}
        {activeArea === 'map' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE5D9] pb-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                    Area 02 · The Map
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif-title text-[#1C1917]">
                    How Knowledge Grows &amp; How Feedback Loops Shape Us
                  </h2>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    Explore the twelve epistemic processes—from <em>Attention</em> to <em>Action</em>—alongside the three formative anchors of <em>Scripture</em>, <em>Prayer</em>, and <em>Christian Community</em>. Tap any node below or select one of the seven feedback loops.
                  </p>
                </div>
              </div>

              {/* Feedback Loop Selector Buttons */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#78350F] uppercase tracking-wider">
                  Highlight a Feedback Loop on the Map:
                </div>
                <div className="flex flex-wrap gap-2">
                  {KNOWLEDGE_FEEDBACK_LOOPS.map(loop => {
                    const isSelected = activeFeedbackLoop?.id === loop.id;
                    return (
                      <button
                        key={loop.id}
                        onClick={() => setActiveFeedbackLoop(isSelected ? null : loop)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border text-left ${
                          isSelected
                            ? 'bg-[#78350F] text-[#FBF9F5] border-[#78350F] font-semibold shadow-xs'
                            : 'bg-[#FBF9F5] text-[#44403C] border-[#D6CEBE] hover:bg-[#EBE5D9]'
                        }`}
                      >
                        {loop.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile-First Quick Node Grid (Visible on Mobile & Tablet so users don't have to scroll SVG horizontally) */}
              <div className="lg:hidden space-y-2 bg-[#F5F1E6] p-3.5 rounded-xl border border-[#D6CEBE]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78350F]">
                  Tap Any Process or Formative Node (15 Nodes):
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {KNOWLEDGE_MAP_NODES.map(node => {
                    const isSelected = selectedMapNode.id === node.id;
                    const inLoop = activeFeedbackLoop?.nodePath.includes(node.id);
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedMapNode(node)}
                        className={`px-2 py-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                            : inLoop
                            ? 'bg-[#FEF3C7] text-[#78350F] border-[#B45309]'
                            : 'bg-[#FBF9F5] text-[#292524] border-[#D6CEBE]'
                        }`}
                      >
                        {node.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive SVG Conceptual Map */}
              <div className="w-full overflow-x-auto bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl p-3 sm:p-4">
                <svg
                  viewBox="0 0 1220 320"
                  className="w-full min-w-[780px] h-auto select-none"
                  role="img"
                  aria-label="Interactive conceptual map of how knowledge grows from attention to action with feedback loops"
                >
                  <defs>
                    <marker id="arrow-stone" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#A8A29E" />
                    </marker>
                    <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#B45309" />
                    </marker>
                  </defs>

                  {/* Base Process Connections */}
                  {[
                    ['node-attention', 'node-observation'],
                    ['node-attention', 'node-testimony'],
                    ['node-observation', 'node-study'],
                    ['node-testimony', 'node-experience'],
                    ['node-study', 'node-reasoning'],
                    ['node-experience', 'node-reasoning'],
                    ['node-reasoning', 'node-belief'],
                    ['node-belief', 'node-testing'],
                    ['node-testing', 'node-correction'],
                    ['node-correction', 'node-understanding'],
                    ['node-testing', 'node-understanding'],
                    ['node-understanding', 'node-judgment'],
                    ['node-judgment', 'node-action'],
                    ['node-scripture', 'node-study'],
                    ['node-scripture', 'node-testing'],
                    ['node-prayer', 'node-attention'],
                    ['node-prayer', 'node-judgment'],
                    ['node-community', 'node-testimony'],
                    ['node-community', 'node-correction']
                  ].map(([srcId, tgtId], idx) => {
                    const src = KNOWLEDGE_MAP_NODES.find(n => n.id === srcId);
                    const tgt = KNOWLEDGE_MAP_NODES.find(n => n.id === tgtId);
                    if (!src || !tgt) return null;

                    const inLoop =
                      activeFeedbackLoop &&
                      activeFeedbackLoop.nodePath.includes(srcId) &&
                      activeFeedbackLoop.nodePath.includes(tgtId);

                    return (
                      <line
                        key={idx}
                        x1={src.x}
                        y1={src.y}
                        x2={tgt.x}
                        y2={tgt.y}
                        stroke={inLoop ? '#B45309' : '#D6CEBE'}
                        strokeWidth={inLoop ? '3' : '1.5'}
                        markerEnd={inLoop ? 'url(#arrow-gold)' : 'url(#arrow-stone)'}
                      />
                    );
                  })}

                  {/* Feedback Return Arc from Action/Correction back to Experience/Attention */}
                  <path
                    d="M 1140 212 C 1140 305, 80 305, 80 215"
                    fill="none"
                    stroke={activeFeedbackLoop ? '#B45309' : '#D6CEBE'}
                    strokeWidth={activeFeedbackLoop ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                    markerEnd={activeFeedbackLoop ? 'url(#arrow-gold)' : 'url(#arrow-stone)'}
                  />
                  <text x="610" y="308" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="600">
                    FEEDBACK LOOP: CHOICES &amp; CORRECTION RESHAPE FUTURE EXPERIENCE, HABITS &amp; ATTENTION
                  </text>

                  {/* Map Nodes */}
                  {KNOWLEDGE_MAP_NODES.map(node => {
                    const isSelected = selectedMapNode.id === node.id;
                    const inActiveLoop = activeFeedbackLoop?.nodePath.includes(node.id);

                    const fill =
                      node.category === 'Formative Anchor'
                        ? isSelected
                          ? '#78350F'
                          : '#FEF3C7'
                        : node.category === 'Discernment & Action'
                        ? isSelected
                          ? '#14532D'
                          : '#DCFCE7'
                        : isSelected
                        ? '#1C1917'
                        : '#FFFFFF';

                    const textFill = isSelected ? '#FBF9F5' : '#1C1917';
                    const strokeColor = inActiveLoop ? '#B45309' : isSelected ? '#1C1917' : '#A8A29E';

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedMapNode(node)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={node.x - 56}
                          y={node.y - 20}
                          width="112"
                          height="40"
                          rx="8"
                          fill={fill}
                          stroke={strokeColor}
                          strokeWidth={inActiveLoop || isSelected ? '2.5' : '1.5'}
                        />
                        <text
                          x={node.x}
                          y={node.y + 4}
                          textAnchor="middle"
                          fill={textFill}
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Selected Node & Active Feedback Loop Detail Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Node Detail (7 cols) */}
                <div className="lg:col-span-7 bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBE5D9] pb-2.5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#78350F]">
                        {selectedMapNode.category}
                      </span>
                      <h3 className="text-lg font-bold font-serif-title text-[#1C1917]">
                        Node: {selectedMapNode.label}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMapNode.scriptureRefs.map((ref, idx) => (
                        <button
                          key={idx}
                          onClick={() => openScriptureModal(ref.split(' ')[0], 'scripture')}
                          className="px-2.5 py-1 rounded bg-[#EBE5D9] hover:bg-[#E2D9C8] text-[11px] font-mono text-[#78350F] cursor-pointer"
                        >
                          {ref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#292524] leading-relaxed">
                    <strong>Definition:</strong> {selectedMapNode.definition}
                  </p>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    <strong>Concrete Example:</strong> {selectedMapNode.example}
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-[#E2D9C8] text-xs text-[#78350F]">
                    <strong>Epistemic &amp; Theological Role Distinction:</strong> {selectedMapNode.roleDistinction}
                  </div>
                  <div className="text-[11px] text-[#57534E] flex items-center gap-2 pt-1">
                    <span className="font-semibold">Tested in Scenarios:</span>
                    <span>{selectedMapNode.scenarioLinks.join(' · ')}</span>
                  </div>
                </div>

                {/* Active Feedback Loop Detail (5 cols) */}
                <div className="lg:col-span-5 bg-[#F5F1E6] border border-[#D6CEBE] rounded-xl p-5 space-y-3">
                  {activeFeedbackLoop ? (
                    <>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#78350F]">
                        Active Feedback Loop
                      </div>
                      <h3 className="text-base font-bold font-serif-title text-[#1C1917]">
                        {activeFeedbackLoop.title}
                      </h3>
                      <p className="text-xs text-[#44403C] leading-relaxed">{activeFeedbackLoop.summary}</p>
                      <div className="p-2.5 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#14532D]">
                        <strong>Healthy Formation:</strong> {activeFeedbackLoop.healthyDynamic}
                      </div>
                      <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#7F1D1D]">
                        <strong>Distorted Loop:</strong> {activeFeedbackLoop.distortedDynamic}
                      </div>
                      <p className="text-[11px] text-[#57534E] italic">
                        Scenario Connection: {activeFeedbackLoop.exampleInLife}
                      </p>
                    </>
                  ) : (
                    <div className="text-xs text-[#57534E] py-8 text-center">
                      Select any feedback loop above to inspect how choices, experience, habits, desires, and community interact.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveArea('crossroads')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
                >
                  <span>Proceed to Area 03: The Crossroads (5 Branching Scenarios)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            AREA 3: THE CROSSROADS — CHOOSING UNDER UNCERTAINTY
        ------------------------------------------------------------------- */}
        {activeArea === 'crossroads' && (
          <div className="space-y-8">
            {/* Scenario Selector Strip */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-6 shadow-2xs space-y-5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                    Area 03 · The Crossroads: Choosing Under Uncertainty
                  </div>
                  <h2 className="text-2xl font-bold font-serif-title text-[#1C1917]">
                    Five Branching Scenarios of Discernment &amp; Love
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCompareMode(!compareMode)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      compareMode
                        ? 'bg-[#78350F] text-[#FBF9F5] border-[#78350F]'
                        : 'bg-[#FBF9F5] text-[#44403C] border-[#D6CEBE] hover:bg-[#EBE5D9]'
                    }`}
                  >
                    {compareMode ? 'Return to Active Scenario' : 'Compare Past Runs & Branches'}
                  </button>
                  <button
                    onClick={() => startScenario(activeScenario.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBF9F5] border border-[#D6CEBE] hover:bg-[#EBE5D9] text-xs font-semibold text-[#44403C] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Scenario</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {WISDOM_SCENARIOS.map(scen => {
                  const isSelected = scen.id === activeScenario.id;
                  const isDone = completedScenarioIds.has(scen.id);
                  return (
                    <button
                      key={scen.id}
                      onClick={() => startScenario(scen.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5F1E6] border-[#78350F] shadow-xs'
                          : 'bg-[#FBF9F5] border-[#E2D9C8] hover:bg-[#F5F1E6]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#78350F] mb-1">
                        <span>SCENARIO 0{scen.number}</span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />}
                      </div>
                      <div className="text-sm font-bold font-serif-title text-[#1C1917]">{scen.title}</div>
                      <div className="text-[11px] text-[#57534E] line-clamp-2 mt-1">{scen.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {compareMode ? (
              /* Branch & Replay Comparison View */
              <div className="bg-white border border-[#D6CEBE] rounded-2xl p-6 md:p-8 shadow-2xs space-y-6">
                <div className="border-b border-[#EBE5D9] pb-4">
                  <h3 className="text-xl font-bold font-serif-title text-[#1C1917]">
                    Replay &amp; Alternative Decision Comparison: {activeScenario.title}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-1">
                    Compare your recorded runs of this scenario or examine how alternative decisions unfold from the same starting conditions. Notice how quality of judgment is evaluated separately from external outcomes.
                  </p>
                </div>

                {/* User's Recorded Runs for This Scenario */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    Your Recorded Runs for {activeScenario.title}
                  </h4>
                  {persisted.scenarioRuns.filter(r => r.scenarioId === activeScenario.id).length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E2D9C8] text-xs text-[#57534E]">
                      You have not completed a decision run for {activeScenario.title} yet. Complete a run to compare your choices here.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {persisted.scenarioRuns
                        .filter(r => r.scenarioId === activeScenario.id)
                        .map((run, idx) => (
                          <div key={run.runId} className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] text-xs space-y-1.5">
                            <div className="flex items-center justify-between font-mono text-[11px] text-[#78350F]">
                              <span>Run #{idx + 1} · {run.timestamp}</span>
                              <span>{run.actionType}</span>
                            </div>
                            <div className="font-bold text-[#1C1917] text-sm">{run.decisionTitle}</div>
                            <div className="text-[#44403C]">
                              Investigations Conducted: <strong>{run.investigatedIds.length}</strong> of {activeScenario.investigations.length} · Repair Applied: <strong>{run.repairApplied ? 'Yes' : 'No'}</strong>
                            </div>
                            <div className="text-[11px] font-mono text-[#78716C]">
                              Resources Left: {run.timeRemaining}h Time · {run.attentionRemaining} Attention · ${run.fundsRemaining} Funds
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Side-by-Side Branch Comparison Table (Only shown if user has completed at least 1 run of this scenario so hidden facts aren't spoiled early!) */}
                {completedScenarioIds.has(activeScenario.id) ? (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#14532D]">
                      All Four Possible Paths Compared (Unlocked After First Run)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeScenario.decisions.map(dec => (
                        <div key={dec.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E2D9C8] space-y-2 text-xs">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78350F]">
                            {dec.actionType}
                          </div>
                          <div className="text-sm font-bold font-serif-title text-[#1C1917]">{dec.title}</div>
                          <p className="text-[#44403C]">{dec.judgmentEvaluation.qualityOfJudgment}</p>
                          <div className="p-2.5 bg-white rounded border border-[#EBE5D9] text-[#57534E]">
                            <strong>Who Bears Cost:</strong> {dec.costBearerAnalysis.whoBearsCost}
                          </div>
                          <div className="p-2.5 bg-white rounded border border-[#EBE5D9] text-[#14532D]">
                            <strong>Long-Term Fruit:</strong> {dec.consequenceTimeline.longTermMonths}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#FEF3C7]/30 border border-[#FDE68A] text-xs text-[#78350F]">
                    Complete your first playthrough of <strong>{activeScenario.title}</strong> to unlock the full side-by-side comparison of all four decision branches (keeping unrevealed scenario facts hidden until you experience the scenario).
                  </div>
                )}
              </div>
            ) : (
              /* Active Scenario 6-Stage Flow */
              <div className="bg-white border border-[#D6CEBE] rounded-2xl p-6 md:p-8 shadow-2xs space-y-8">
                {/* Scenario Top Bar: Stage Stepper & Resource Stewardship Ledger */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EBE5D9] pb-5">
                  {/* 6-Stage Stepper */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {(
                      [
                        { id: 'encounter', label: '1. Encounter' },
                        { id: 'investigate', label: '2. Investigate' },
                        { id: 'interpret', label: '3. Interpret' },
                        { id: 'decide', label: '4. Decide' },
                        { id: 'consequences', label: '5. Consequences' },
                        { id: 'reflect', label: '6. Reflect' }
                      ] as { id: ScenarioStage; label: string }[]
                    ).map(st => {
                      const isCurrent = scenarioStage === st.id;
                      const isLocked =
                        (st.id === 'consequences' || st.id === 'reflect') && !selectedDecisionId;
                      return (
                        <button
                          key={st.id}
                          disabled={isLocked}
                          onClick={() => setScenarioStage(st.id)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-[#1C1917] text-[#FBF9F5]'
                              : isLocked
                              ? 'bg-[#F5F1E6] text-[#A8A29E] cursor-not-allowed'
                              : 'bg-[#F5F1E6] text-[#44403C] hover:bg-[#E2D9C8] cursor-pointer'
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Resource Stewardship Meter */}
                  <div className="flex flex-wrap items-center gap-4 bg-[#FBF9F5] px-4 py-2.5 rounded-xl border border-[#D6CEBE] text-xs font-mono tabular-nums">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#78350F]">
                      Stewardship Pool:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#78350F]" />
                      <span>Time: <strong>{currentResources.timeHours}h</strong>/{activeScenario.initialResources.timeHours}h</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#14532D]" />
                      <span>Attention: <strong>{currentResources.attentionUnits}</strong>/{activeScenario.initialResources.attentionUnits}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      <span>Funds: <strong>${currentResources.fundsDollars}</strong>/${activeScenario.initialResources.fundsDollars}</span>
                    </div>
                  </div>
                </div>

                {/* STAGE 1: ENCOUNTER */}
                {scenarioStage === 'encounter' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-[#78350F] uppercase tracking-wider">
                        Scenario 0{activeScenario.number} · {activeScenario.coreThemes.join(' · ')}
                      </div>
                      <h3 className="text-2xl font-bold font-serif-title text-[#1C1917]">
                        {activeScenario.title}: {activeScenario.subtitle}
                      </h3>
                      <div className="text-xs font-mono text-[#57534E]">
                        Context Window: {activeScenario.initialResources.opportunityNote}
                      </div>
                    </div>

                    {/* Narrative Paragraphs */}
                    <div className="bg-[#FBF9F5] border border-[#E2D9C8] rounded-xl p-6 space-y-3">
                      {activeScenario.encounterNarrative.map((para, i) => (
                        <p key={i} className="text-base font-editorial text-[#1C1917] leading-relaxed text-[18px]">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Competing Responsibilities & Stakeholders */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#F5F1E6] border border-[#D6CEBE] rounded-xl p-5 space-y-2.5 text-xs">
                        <h4 className="font-bold uppercase tracking-wider text-[#78350F]">
                          Competing Responsibilities
                        </h4>
                        <ul className="space-y-2 text-[#292524]">
                          {activeScenario.competingResponsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-bold text-[#78350F]">•</span>
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F5F1E6] border border-[#D6CEBE] rounded-xl p-5 space-y-2.5 text-xs">
                        <h4 className="font-bold uppercase tracking-wider text-[#14532D]">
                          Affected People &amp; Stakeholders
                        </h4>
                        <div className="space-y-2">
                          {activeScenario.stakeholders.map((st, idx) => (
                            <div key={idx} className="p-2.5 bg-[#FBF9F5] rounded-lg border border-[#E2D9C8]">
                              <div className="font-bold text-[#1C1917]">
                                {st.name} <span className="font-normal text-[#78716C]">({st.role})</span>
                              </div>
                              <div className="text-[#44403C] mt-0.5">{st.vulnerabilityOrStake}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contested Theological Interpretation Note */}
                    <div className="p-4 rounded-xl bg-[#FEF3C7]/30 border border-[#FDE68A] text-xs text-[#44403C] space-y-1">
                      <div className="font-bold text-[#78350F] uppercase tracking-wider text-[11px]">
                        Theological &amp; Hermeneutical Nuance
                      </div>
                      <p className="leading-relaxed">{activeScenario.contestedInterpretationNote}</p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setScenarioStage('investigate')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] cursor-pointer"
                      >
                        <span>Step 2: Investigate Evidence, Voices &amp; Counsel</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 2: INVESTIGATE */}
                {scenarioStage === 'investigate' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold font-serif-title text-[#1C1917]">
                          Stage 2: Investigate Sources, Voices, Counsel &amp; Prayer
                        </h3>
                        <p className="text-xs text-[#57534E] mt-0.5">
                          You have finite time, attention, and funds. Choose what to examine before making a judgment. Uninspected sources remain unknown until after you decide. Note that prayer aligns motives before God but does not automatically unlock empirical facts.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#78350F] shrink-0">
                        Completed: {investigatedIds.length} / {activeScenario.investigations.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeScenario.investigations.map(inv => {
                        const isDone = investigatedIds.includes(inv.id);
                        const canAfford =
                          currentResources.timeHours >= inv.timeCost &&
                          currentResources.attentionUnits >= inv.attentionCost &&
                          currentResources.fundsDollars >= inv.fundsCost;

                        return (
                          <div
                            key={inv.id}
                            className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-4 ${
                              isDone
                                ? 'bg-[#FBF9F5] border-[#78350F] shadow-xs'
                                : 'bg-white border-[#E2D9C8]'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold uppercase tracking-wider text-[#78350F]">
                                  {inv.category}
                                </span>
                                <span className="font-mono text-[#57534E] tabular-nums">
                                  Cost: {inv.timeCost}h Time
                                  {inv.attentionCost > 0 ? ` · ${inv.attentionCost} Attn` : ''}
                                  {inv.fundsCost > 0 ? ` · $${inv.fundsCost}` : ''}
                                </span>
                              </div>

                              <h4 className="text-base font-bold font-serif-title text-[#1C1917]">
                                {inv.title}
                              </h4>

                              <div className="text-[11px] text-[#78716C]">
                                <strong>Source Reliability:</strong> {inv.sourceReliability} ·{' '}
                                <strong>Category:</strong> {inv.distinctionType}
                              </div>
                            </div>

                            {isDone ? (
                              <div className="space-y-2.5 pt-2 border-t border-[#EBE5D9]">
                                <div className="p-3.5 rounded-lg bg-[#F5F1E6] text-xs text-[#1C1917] leading-relaxed font-editorial text-[15px]">
                                  {inv.revealedContent}
                                </div>
                                <div className="text-[11px] text-[#14532D] bg-[#F0FDF4] p-2.5 rounded border border-[#BBF7D0]">
                                  <strong>Discernment Note:</strong> {inv.epistemicNote}
                                </div>
                              </div>
                            ) : (
                              <div className="pt-2">
                                <button
                                  disabled={!canAfford}
                                  onClick={() => handleInvestigate(inv.id)}
                                  className={`w-full py-2 px-4 rounded-lg text-xs font-semibold transition-colors ${
                                    canAfford
                                      ? 'bg-[#78350F] text-[#FBF9F5] hover:bg-[#92400E] cursor-pointer'
                                      : 'bg-[#EBE5D9] text-[#A8A29E] cursor-not-allowed'
                                  }`}
                                >
                                  {canAfford ? inv.actionLabel : 'Insufficient Time/Attention/Funds'}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#EBE5D9]">
                      <button
                        onClick={() => setScenarioStage('encounter')}
                        className="px-4 py-2 rounded-lg border border-[#D6CEBE] text-xs font-semibold text-[#44403C] hover:bg-[#EBE5D9] cursor-pointer"
                      >
                        ← Back to Encounter
                      </button>
                      <button
                        onClick={() => setScenarioStage('interpret')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] cursor-pointer"
                      >
                        <span>Step 3: Distinguish Facts from Assumptions</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 3: INTERPRET */}
                {scenarioStage === 'interpret' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif-title text-[#1C1917]">
                        Stage 3: Interpret — Distinguish Facts, Assumptions &amp; Uncertainties
                      </h3>
                      <p className="text-xs text-[#57534E] mt-1">
                        Before choosing a course of action, test your discernment by classifying each statement below as a <strong>Verified Fact</strong>, an <strong>Unverified Assumption</strong>, or an <strong>Open Uncertainty</strong>.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {activeScenario.interpretClaims.map(claim => {
                        const userPick = interpretAnswers[claim.id];
                        const isCorrect = userPick === claim.correctCategory;

                        return (
                          <div
                            key={claim.id}
                            className="p-5 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] space-y-3"
                          >
                            <p className="text-sm font-semibold text-[#1C1917]">
                              &ldquo;{claim.statement}&rdquo;
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {(
                                ['Verified Fact', 'Unverified Assumption', 'Open Uncertainty'] as const
                              ).map(cat => (
                                <button
                                  key={cat}
                                  onClick={() =>
                                    setInterpretAnswers(prev => ({ ...prev, [claim.id]: cat }))
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                                    userPick === cat
                                      ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                                      : 'bg-white text-[#44403C] border-[#D6CEBE] hover:bg-[#EBE5D9]'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>

                            {userPick && (
                              <div
                                className={`p-3 rounded-lg text-xs border ${
                                  isCorrect
                                    ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#14532D]'
                                    : 'bg-[#FEF3C7]/50 border-[#FDE68A] text-[#78350F]'
                                }`}
                              >
                                <strong>
                                  {isCorrect
                                    ? `Accurate Discernment (${claim.correctCategory}): `
                                    : `Consider Carefully (Best classified as ${claim.correctCategory}): `}
                                </strong>
                                {claim.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#EBE5D9]">
                      <button
                        onClick={() => setScenarioStage('investigate')}
                        className="px-4 py-2 rounded-lg border border-[#D6CEBE] text-xs font-semibold text-[#44403C] hover:bg-[#EBE5D9] cursor-pointer"
                      >
                        ← Back to Investigate
                      </button>
                      <button
                        onClick={() => setScenarioStage('decide')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] cursor-pointer"
                      >
                        <span>Step 4: Weigh Options &amp; Decide</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 4: DECIDE */}
                {scenarioStage === 'decide' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif-title text-[#1C1917]">
                        Stage 4: Decide Under Competing Responsibilities
                      </h3>
                      <p className="text-xs text-[#57534E] mt-1">
                        Choose how you will respond. Consider what you have verified, what remains uncertain, who will bear the cost of your choice, and how truth and love can be held together.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeScenario.decisions.map(dec => (
                        <div
                          key={dec.id}
                          className="p-5 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] hover:border-[#78350F] transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold uppercase tracking-wider text-[#78350F]">
                                {dec.actionType}
                              </span>
                              {dec.fundsRequired !== undefined && dec.fundsRequired > 0 && (
                                <span className="font-mono text-[#14532D]">
                                  Allocates: ${dec.fundsRequired}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-bold font-serif-title text-[#1C1917]">
                              {dec.title}
                            </h4>
                            <p className="text-xs font-semibold text-[#57534E]">{dec.subtitle}</p>
                            <p className="text-xs text-[#44403C] leading-relaxed">{dec.description}</p>
                          </div>

                          <button
                            onClick={() => handleCommitDecision(dec)}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#1C1917] text-[#FBF9F5] hover:bg-[#78350F] text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Commit to This Decision →
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#EBE5D9]">
                      <button
                        onClick={() => setScenarioStage('interpret')}
                        className="px-4 py-2 rounded-lg border border-[#D6CEBE] text-xs font-semibold text-[#44403C] hover:bg-[#EBE5D9] cursor-pointer"
                      >
                        ← Back to Interpret
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 5: CONSEQUENCES & REPAIR */}
                {scenarioStage === 'consequences' && selectedDecisionObj && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBE5D9] pb-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                          Stage 5 · Unfolding Consequences &amp; Stewardship Impact
                        </div>
                        <h3 className="text-xl font-bold font-serif-title text-[#1C1917] mt-0.5">
                          Your Choice: {selectedDecisionObj.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setScenarioStage('decide')}
                        className="px-3 py-1.5 rounded-lg border border-[#D6CEBE] text-xs font-semibold text-[#44403C] hover:bg-[#EBE5D9] cursor-pointer"
                      >
                        Try an Alternative Decision
                      </button>
                    </div>

                    {/* Consequence Timeline (Immediate, Weeks, Months) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] space-y-1.5 text-xs">
                        <span className="font-bold uppercase tracking-wider text-[#78350F] block">
                          1. Immediate Effect
                        </span>
                        <p className="text-[#292524] leading-relaxed font-editorial text-[15px]">
                          {selectedDecisionObj.consequenceTimeline.immediate}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] space-y-1.5 text-xs">
                        <span className="font-bold uppercase tracking-wider text-[#1E3A8A] block">
                          2. Near-Term (Weeks)
                        </span>
                        <p className="text-[#292524] leading-relaxed font-editorial text-[15px]">
                          {selectedDecisionObj.consequenceTimeline.nearTermWeeks}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] space-y-1.5 text-xs">
                        <span className="font-bold uppercase tracking-wider text-[#14532D] block">
                          3. Long-Term Fruit (Months)
                        </span>
                        <p className="text-[#292524] leading-relaxed font-editorial text-[15px]">
                          {selectedDecisionObj.consequenceTimeline.longTermMonths}
                        </p>
                      </div>
                    </div>

                    {/* Separate Evaluation of Judgment Quality vs. Outcome */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-xl bg-[#F5F1E6] border border-[#D6CEBE] space-y-3 text-xs">
                        <h4 className="font-bold uppercase tracking-wider text-[#1C1917]">
                          Evaluating Judgment Separately from Outcome
                        </h4>
                        <p className="text-[#292524] leading-relaxed">
                          <strong>Quality of Judgment:</strong> {selectedDecisionObj.judgmentEvaluation.qualityOfJudgment}
                        </p>
                        <p className="text-[#44403C] leading-relaxed">
                          <strong>Judgment vs. Outcome Distinction:</strong> {selectedDecisionObj.judgmentEvaluation.outcomeDistinction}
                        </p>
                        <p className="text-[#57534E] leading-relaxed">
                          <strong>Other People’s Agency &amp; Circumstances:</strong> {selectedDecisionObj.judgmentEvaluation.roleOfOtherAgentsAndCircumstances}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#F5F1E6] border border-[#D6CEBE] space-y-3 text-xs">
                        <h4 className="font-bold uppercase tracking-wider text-[#78350F]">
                          Who Bore the Cost &amp; Who Received the Benefit
                        </h4>
                        <p className="text-[#292524] leading-relaxed">
                          <strong>Who Bore the Cost:</strong> {selectedDecisionObj.costBearerAnalysis.whoBearsCost}
                        </p>
                        <p className="text-[#14532D] leading-relaxed">
                          <strong>Who Received the Benefit:</strong> {selectedDecisionObj.costBearerAnalysis.whoReceivesBenefit}
                        </p>
                        <p className="text-[#57534E] leading-relaxed">
                          <strong>Delayed / Structural Effect:</strong> {selectedDecisionObj.costBearerAnalysis.hiddenOrDelayedEffects}
                        </p>
                      </div>
                    </div>

                    {/* Narrative Evidence of Trust, Dignity, Care & What Was Missed if Uninvestigated */}
                    <div className="p-5 rounded-xl bg-white border border-[#E2D9C8] space-y-3 text-xs">
                      <div className="font-bold uppercase tracking-wider text-[#14532D]">
                        Observed Human Impact (Narrative Evidence)
                      </div>
                      <p className="font-editorial italic text-base text-[#1C1917]">
                        {selectedDecisionObj.narrativeEvidenceOfCare}
                      </p>
                      {investigatedIds.length < 2 && (
                        <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#7F1D1D]">
                          <strong>Unrevealed Information Note:</strong> Because you investigated fewer than two sources before deciding, key facts were missed at the time of your choice: {selectedDecisionObj.uninvestigatedMissedFactsNote}
                        </div>
                      )}
                    </div>

                    {/* Reconsider, Follow-Up & Repair Opportunity */}
                    <div className="p-5 rounded-xl bg-[#FEF3C7]/35 border border-[#FDE68A] space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-bold uppercase tracking-wider text-[#78350F] block">
                            Reconsider, Follow Up &amp; Repair
                          </span>
                          <h4 className="text-sm font-bold text-[#1C1917] mt-0.5">
                            {selectedDecisionObj.repairOption.label}
                          </h4>
                        </div>
                        {!repairApplied ? (
                          <button
                            onClick={handleApplyRepair}
                            className="px-4 py-2 rounded-lg bg-[#78350F] text-[#FBF9F5] font-semibold hover:bg-[#92400E] cursor-pointer"
                          >
                            Enact This Repair / Follow-Up Step
                          </button>
                        ) : (
                          <span className="px-3 py-1 rounded bg-[#14532D] text-white font-semibold">
                            ✓ Repair / Follow-Up Enacted
                          </span>
                        )}
                      </div>
                      <p className="text-[#44403C]">{selectedDecisionObj.repairOption.description}</p>
                      {repairApplied && (
                        <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#14532D] space-y-1">
                          <div>
                            <strong>Fruit of Repair:</strong> {selectedDecisionObj.repairOption.repairOutcome}
                          </div>
                          <div>
                            <strong>Cost of Repair:</strong> {selectedDecisionObj.repairOption.whoBearsCost} ·{' '}
                            <strong>Beneficiaries:</strong> {selectedDecisionObj.repairOption.whoReceivesBenefit}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scriptural Illumination */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedDecisionObj.scripturalIllumination.map((sc, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] text-xs flex items-start justify-between gap-3">
                          <div>
                            <div className="font-bold font-serif-title text-[#78350F]">{sc.reference}</div>
                            <p className="text-[#44403C] mt-1">{sc.insight}</p>
                          </div>
                          <button
                            onClick={() => openScriptureModal(sc.reference.split(' ')[0], 'scripture')}
                            className="text-[11px] font-semibold text-[#78350F] hover:underline shrink-0 cursor-pointer"
                          >
                            Read Text →
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#EBE5D9]">
                      <button
                        onClick={() => setCompareMode(true)}
                        className="px-4 py-2 rounded-lg border border-[#D6CEBE] text-xs font-semibold text-[#44403C] hover:bg-[#EBE5D9] cursor-pointer"
                      >
                        Compare All Branches &amp; Runs
                      </button>
                      <button
                        onClick={() => setScenarioStage('reflect')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] cursor-pointer"
                      >
                        <span>Step 6: Guided Reflection &amp; Journal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 6: REFLECT */}
                {scenarioStage === 'reflect' && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                        Stage 6 · Personal Examination &amp; Reflection
                      </div>
                      <h3 className="text-xl font-bold font-serif-title text-[#1C1917] mt-0.5">
                        Reflecting on {activeScenario.title}
                      </h3>
                      <p className="text-xs text-[#57534E] mt-1">
                        Take a quiet moment to reflect on the questions below. Your responses are saved privately in your browser’s local journal and can be exported in Area 05 (The Fruit).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1C1917] block">
                          1. What did I actually know vs. what did I assume?
                        </label>
                        <p className="text-[11px] text-[#57534E]">{activeScenario.reflectionPrompts.knownVsAssumed}</p>
                        <textarea
                          rows={3}
                          value={draftKnewVsAssumed}
                          onChange={e => setDraftKnewVsAssumed(e.target.value)}
                          placeholder="Write your reflection on facts, assumptions, and what remained uncertain..."
                          className="w-full p-3 rounded-lg bg-[#FBF9F5] border border-[#D6CEBE] text-xs text-[#1C1917] focus:outline-none focus:border-[#78350F]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1C1917] block">
                          2. What did I want, and whose voice was I tempted to overlook?
                        </label>
                        <p className="text-[11px] text-[#57534E]">{activeScenario.reflectionPrompts.overlookedVoicePrompt}</p>
                        <textarea
                          rows={3}
                          value={draftWantedAndOverlooked}
                          onChange={e => setDraftWantedAndOverlooked(e.target.value)}
                          placeholder="Reflect on your motives and the stakeholders with the least power..."
                          className="w-full p-3 rounded-lg bg-[#FBF9F5] border border-[#D6CEBE] text-xs text-[#1C1917] focus:outline-none focus:border-[#78350F]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1C1917] block">
                          3. Where did truth, reverence, and love guide my judgment?
                        </label>
                        <p className="text-[11px] text-[#57534E]">{activeScenario.reflectionPrompts.motivePrompt}</p>
                        <textarea
                          rows={3}
                          value={draftTruthAndLove}
                          onChange={e => setDraftTruthAndLove(e.target.value)}
                          placeholder="How did Scripture and love for neighbor shape your choice?"
                          className="w-full p-3 rounded-lg bg-[#FBF9F5] border border-[#D6CEBE] text-xs text-[#1C1917] focus:outline-none focus:border-[#78350F]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1C1917] block">
                          4. What would repentance, repair, or faithful perseverance look like?
                        </label>
                        <p className="text-[11px] text-[#57534E]">{activeScenario.reflectionPrompts.repentanceAndRepairPrompt}</p>
                        <textarea
                          rows={3}
                          value={draftRepentanceRepair}
                          onChange={e => setDraftRepentanceRepair(e.target.value)}
                          placeholder="Note any concrete step of repair, listening, or boundary-setting..."
                          className="w-full p-3 rounded-lg bg-[#FBF9F5] border border-[#D6CEBE] text-xs text-[#1C1917] focus:outline-none focus:border-[#78350F]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#EBE5D9]">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleSaveReflection}
                          className="px-5 py-2.5 rounded-lg bg-[#78350F] text-[#FBF9F5] text-xs font-semibold hover:bg-[#92400E] cursor-pointer"
                        >
                          Save Reflection to Private Journal
                        </button>
                        {savedNotice && (
                          <span className="text-xs font-semibold text-[#14532D]">
                            ✓ Saved to your local journal
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveArea('economy')}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] cursor-pointer"
                        >
                          <span>Explore Area 04: The Economy</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            AREA 4: THE ECONOMY — COST, STEWARDSHIP, AND FRUIT
        ------------------------------------------------------------------- */}
        {activeArea === 'economy' && (
          <div className="space-y-8">
            {/* Header & Non-Utilitarian Theological Principle */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-6 md:p-8 shadow-2xs space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                  Area 04 · The Economy: Cost, Stewardship, and Fruit
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif-title text-[#1C1917]">
                  Stewarding Finite Attention, Time, Resources &amp; Trust
                </h2>
                <p className="text-sm text-[#44403C] leading-relaxed font-editorial text-[17px]">
                  In household stewardship (<em>oikonomia</em>, 1 Peter 4:10), every choice carries real costs—time spent verifying a claim, emotional bandwidth spent listening, or career advantage foregone to protect a neighbor. Wisdom asks not only <em>&ldquo;What is the cost?&rdquo;</em> but <em>&ldquo;Who is bearing it, and whom does our knowledge serve?&rdquo;</em>
                </p>
              </div>

              {/* Explicit Refusal of Numerical Holiness Scores & Utilitarian Reductionism */}
              <div className="bg-[#F5F1E6] border border-[#D6CEBE] rounded-xl p-5 space-y-2 text-xs text-[#292524]">
                <div className="font-bold text-[#78350F] uppercase tracking-wider text-[11px]">
                  Why There Is No Numerical “Wisdom Score” or Utilitarian Optimization Here
                </div>
                <p className="leading-relaxed">
                  This simulation deliberately refuses to compute a numerical holiness, love, salvation, or wisdom score. People are image-bearers of infinite worth (Mark 8:36), never optimization targets. Moreover, Christian faithfulness includes covenant duties and convictions—such as refusing to bear false witness, protecting the vulnerable, and speaking truth in love—that cannot be settled merely by calculating which choice maximizes comfortable or favorable outcomes.
                </p>
              </div>

              {/* Seven Core Economy Principles */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-serif-title text-[#1C1917]">
                  Seven Dynamics in the Economy of Wisdom
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ECONOMY_PRINCIPLES.map(mod => (
                    <div
                      key={mod.id}
                      className="p-5 rounded-xl bg-[#FBF9F5] border border-[#E2D9C8] space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-2">
                        <h4 className="text-sm font-bold font-serif-title text-[#1C1917]">{mod.title}</h4>
                        <button
                          onClick={() => openScriptureModal(mod.scriptureReference.split(';')[0].split(' ')[0], 'scripture')}
                          className="text-[11px] font-mono text-[#78350F] hover:underline cursor-pointer"
                        >
                          {mod.scriptureReference}
                        </button>
                      </div>
                      <p className="font-semibold text-[#78350F]">{mod.coreTension}</p>
                      <p className="text-[#44403C] leading-relaxed">{mod.explanation}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 bg-white rounded border border-[#EBE5D9]">
                          <span className="font-semibold text-[#1C1917] block">Who Bears the Cost:</span>
                          <span className="text-[#57534E]">{mod.whoBearsCostExample}</span>
                        </div>
                        <div className="p-2.5 bg-white rounded border border-[#EBE5D9]">
                          <span className="font-semibold text-[#14532D] block">Who Receives Benefit:</span>
                          <span className="text-[#57534E]">{mod.whoReceivesBenefitExample}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#57534E] italic pt-1">
                        Conviction Note: {mod.nonUtilitarianDutyNote}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveArea('fruit')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
                >
                  <span>Proceed to Area 05: The Fruit (Reflection, Journal &amp; Export)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            AREA 5: THE FRUIT — REFLECTION, REPENTANCE, AND GROWTH
        ------------------------------------------------------------------- */}
        {activeArea === 'fruit' && (
          <div className="space-y-8">
            {/* Nine Canonical Reflection Questions Overview */}
            <div className="bg-white border border-[#D6CEBE] rounded-2xl p-6 md:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE5D9] pb-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="text-xs uppercase tracking-widest text-[#14532D] font-semibold">
                    Area 05 · The Fruit: Reflection, Repentance, and Growth
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif-title text-[#1C1917]">
                    Examine What Was Learned &amp; Where Love Calls Us to Grow
                  </h2>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    Knowledge matures into wisdom when we examine our judgments honestly before God, distinguish our assumptions from reality, and remain open to repentance and repair.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleExportSummary}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#14532D] text-white text-xs font-semibold hover:opacity-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Session Summary (.md)</span>
                  </button>
                  <button
                    onClick={() => setConfirmResetOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs font-semibold hover:bg-[#FEE2E2] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset Progress</span>
                  </button>
                </div>
              </div>

              {/* Reset Confirmation Inline Banner */}
              {confirmResetOpen && (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#7F1D1D]">
                  <div>
                    <strong>Confirm Full Reset:</strong> This will clear all saved scenario runs and private reflection journal entries from your browser’s local storage.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetAll}
                      className="px-3.5 py-1.5 rounded bg-[#991B1B] text-white font-semibold cursor-pointer"
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-3.5 py-1.5 rounded bg-white border border-[#FECACA] text-[#7F1D1D] font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* The 9 Core Reflection Questions */}
              <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Nine Diagnostic Questions for Wise Discernment
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#292524]">
                  {[
                    '1. What did I actually know?',
                    '2. What did I assume?',
                    '3. What did I want?',
                    '4. Whose voice did I overlook?',
                    '5. How did my choices affect others?',
                    '6. Which scriptural principles illuminate this situation?',
                    '7. Where did truth and love guide my judgment?',
                    '8. What remains uncertain?',
                    '9. What would repentance, repair, or faithful perseverance look like?'
                  ].map((q, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-[#E2D9C8] font-medium">
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Synthesis & Enduring Question Journal */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold font-serif-title text-[#1C1917]">
                    Personal Reflection &amp; Prayerful Commitment
                  </label>
                  <span className="text-[11px] text-[#78716C]">
                    Stored privately in your browser’s local storage (never sent to a server)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={persisted.generalReflectionNote}
                  onChange={e =>
                    setPersisted(prev => ({ ...prev, generalReflectionNote: e.target.value }))
                  }
                  placeholder="Reflect on the enduring question: “Is what I know becoming love in how I live?” Where is God inviting you to listen more carefully, verify more humbly, or love more concretely?"
                  className="w-full p-4 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] text-xs text-[#1C1917] leading-relaxed focus:outline-none focus:border-[#78350F]"
                />
              </div>

              {/* Saved Scenario Reflection Journal Entries */}
              <div className="space-y-3">
                <h3 className="text-base font-bold font-serif-title text-[#1C1917]">
                  Saved Scenario Reflections ({persisted.journalEntries.length})
                </h3>
                {persisted.journalEntries.length === 0 ? (
                  <div className="p-6 rounded-xl bg-[#FBF9F5] border border-[#E2D9C8] text-xs text-[#57534E] text-center">
                    No scenario reflections saved yet. Complete any scenario in <strong>Area 03: The Crossroads</strong> and save your Stage 6 reflection to build your journal.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {persisted.journalEntries.map(entry => (
                      <div key={entry.id} className="p-5 rounded-xl bg-[#FBF9F5] border border-[#D6CEBE] space-y-2.5 text-xs">
                        <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-2">
                          <span className="font-bold font-serif-title text-sm text-[#1C1917]">
                            {entry.scenarioTitle}
                          </span>
                          <span className="font-mono text-[11px] text-[#78716C]">{entry.createdAt}</span>
                        </div>
                        {entry.whatIKnewVsAssumed && (
                          <p className="text-[#44403C]">
                            <strong>Known vs. Assumed:</strong> {entry.whatIKnewVsAssumed}
                          </p>
                        )}
                        {entry.whatIWantedAndOverlooked && (
                          <p className="text-[#44403C]">
                            <strong>Motives &amp; Overlooked Voices:</strong> {entry.whatIWantedAndOverlooked}
                          </p>
                        )}
                        {entry.howTruthAndLoveGuided && (
                          <p className="text-[#44403C]">
                            <strong>Truth &amp; Love in Judgment:</strong> {entry.howTruthAndLoveGuided}
                          </p>
                        )}
                        {entry.repentanceRepairPerseverance && (
                          <p className="text-[#14532D]">
                            <strong>Repentance, Repair &amp; Perseverance:</strong> {entry.repentanceRepairPerseverance}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Final Benediction & Enduring Question */}
              <div className="bg-[#F3EFE6] border border-[#D6CEBE] rounded-2xl p-6 text-center space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#78350F] font-semibold">
                  The Enduring Question
                </div>
                <p className="text-xl md:text-2xl font-serif-title font-bold text-[#1C1917]">
                  {ORGANIZING_CONVICTION.enduringQuestion}
                </p>
                <p className="text-xs text-[#57534E] max-w-xl mx-auto font-editorial italic text-[16px]">
                  &ldquo;This I pray, that your love may abound yet more and more in knowledge and all discernment, so that you may approve the things that are excellent... to the glory and praise of God.&rdquo; — Philippians 1:9–11 (WEB)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reference Library & Model Assumptions Modal */}
      <ScriptureAndConceptsModal
        isOpen={modalOpen}
        initialTab={modalTab}
        highlightedScriptureRef={highlightedScripture}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
