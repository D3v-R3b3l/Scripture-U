import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { EconomyOfWisdomView } from './components/economyOfWisdom/EconomyOfWisdomView';
import { DoubleHelixView } from './components/DoubleHelixView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { NarrativeTimelineView } from './components/NarrativeTimelineView';
import { ProphecyMatrixView } from './components/ProphecyMatrixView';
import { ScriptureReaderView } from './components/ScriptureReaderView';
import { TheologicalDiscoveryView } from './components/TheologicalDiscoveryView';
import { InspectorModal } from './components/InspectorModal';
import { BibleBook } from './data/bibleBooks';
import { ProphecyLink, PROPHECY_LINKS } from './data/prophecies';
import { GraphNode } from './data/knowledgeGraph';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('helix');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedProphecy, setSelectedProphecy] = useState<ProphecyLink | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<GraphNode | null>(null);
  const [inspectorItem, setInspectorItem] = useState<
    | { type: 'book'; data: BibleBook }
    | { type: 'prophecy'; data: ProphecyLink }
    | { type: 'node'; data: GraphNode }
    | null
  >(null);

  // Random Discovery Handler
  const handleRandomDiscover = () => {
    const randomIndex = Math.floor(Math.random() * PROPHECY_LINKS.length);
    const link = PROPHECY_LINKS[randomIndex];
    setInspectorItem({ type: 'prophecy', data: link });
  };

  const handleSelectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setInspectorItem({ type: 'book', data: book });
  };

  const handleSelectProphecy = (prophecy: ProphecyLink) => {
    setSelectedProphecy(prophecy);
    setInspectorItem({ type: 'prophecy', data: prophecy });
  };

  const handleSelectGraphNode = (node: GraphNode) => {
    setSelectedGraphNode(node);
    setInspectorItem({ type: 'node', data: node });
  };

  return (
    <div className="min-h-dvh w-full max-w-full bg-[#050609] text-zinc-100 flex flex-col font-mono overflow-x-hidden">
      {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
      <a
        href="#main-observatory-workspace"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-amber-400 focus:text-zinc-950 focus:font-bold"
      >
        Skip to main observatory content
      </a>

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRandomDiscover={handleRandomDiscover}
      />

      {/* Main Feature Viewports */}
      <main id="main-observatory-workspace" className="flex-1 flex flex-col relative w-full max-w-full overflow-x-hidden">
        {activeTab === 'helix' && (
          <DoubleHelixView
            onSelectBook={handleSelectBook}
            onSelectProphecy={handleSelectProphecy}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'graph' && (
          <KnowledgeGraphView
            onSelectNodeDetail={handleSelectGraphNode}
            onSelectBookDetail={handleSelectBook}
            onSelectProphecyDetail={handleSelectProphecy}
          />
        )}

        {activeTab === 'timeline' && (
          <NarrativeTimelineView />
        )}

        {activeTab === 'prophecy' && (
          <ProphecyMatrixView
            onSelectProphecyDetail={handleSelectProphecy}
          />
        )}

        {activeTab === 'reader' && (
          <ScriptureReaderView
            initialBook={selectedBook || undefined}
          />
        )}

        {activeTab === 'wisdom' && (
          <EconomyOfWisdomView />
        )}

        {activeTab === 'theology' && (
          <TheologicalDiscoveryView />
        )}
      </main>

      {/* Deep Context Inspector Modal */}
      <InspectorModal
        item={inspectorItem}
        onClose={() => setInspectorItem(null)}
      />
    </div>
  );
}

export default App;
