import React, { useState, useMemo } from 'react';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';
import { Search, BookOpen, Layers, Sparkles, ArrowRight, Bookmark, Copy, Check } from 'lucide-react';

import { getChapterExcerpt } from '../data/chapterExcerpts';

interface ScriptureReaderViewProps {
  initialBook?: BibleBook;
}

export const ScriptureReaderView: React.FC<ScriptureReaderViewProps> = ({ initialBook }) => {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(initialBook || BIBLE_BOOKS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [copiedVerse, setCopiedVerse] = useState<boolean>(false);

  // Sync selectedBook if initialBook changes
  React.useEffect(() => {
    if (initialBook && initialBook.id !== selectedBook.id) {
      setSelectedBook(initialBook);
      setSelectedChapter(1);
    }
  }, [initialBook]);

  const divisions = [
    'All',
    'Pentateuch',
    'Historical',
    'Poetry & Wisdom',
    'Major Prophets',
    'Minor Prophets',
    'Gospels',
    'Pauline Epistles',
    'General Epistles',
    'Prophecy'
  ];

  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter(b => {
      const matchDiv = selectedDivision === 'All' || b.division === selectedDivision;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' ||
        b.name.toLowerCase().includes(q) ||
        b.originalName.includes(q) ||
        b.transliteration.toLowerCase().includes(q) ||
        b.theme.toLowerCase().includes(q);

      return matchDiv && matchSearch;
    });
  }, [selectedDivision, searchQuery]);

  const copyVerseToClipboard = () => {
    navigator.clipboard.writeText(`${selectedBook.keyVerse}: "${selectedBook.keyVerseText}"`);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  const chapterData = useMemo(() => {
    return getChapterExcerpt(selectedBook.id, selectedChapter, selectedBook.name, selectedBook.theme);
  }, [selectedBook, selectedChapter]);

  return (
    <div className="w-full min-h-[calc(100vh-62px)] bg-observatory-grid text-zinc-200 px-3.5 sm:px-6 py-8 pb-24 lg:pb-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/15 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              The 66 Books of the Biblical Canon
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-100">
              Canon Catalog & Reader
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-editorial text-[16px]">
              Browse the Hebrew Tanakh and Greek New Testament books with original titles, covenantal anchors, and key verses.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search book or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-sm"
            />
          </div>
        </div>

        {/* Division Filter Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedDivision === div
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {div}
            </button>
          ))}
        </div>

        {/* Main 2-Column Split: Book Catalog & Book Reading Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Book Catalog Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
              Canonical Books ({filteredBooks.length})
            </div>

            <div className="grid grid-cols-1 gap-2">
              {filteredBooks.map((book) => {
                const isSelected = selectedBook.id === book.id;
                return (
                  <button
                    key={book.id}
                    onClick={() => {
                      setSelectedBook(book);
                      setSelectedChapter(1);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/60 shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-amber-400 font-semibold">
                          #{book.order}
                        </span>
                        <span className="text-sm font-bold font-serif-title text-slate-100">
                          {book.name}
                        </span>
                        <span className="text-xs text-slate-500 font-serif">
                          {book.originalName}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {book.division} · {book.chapters} Chapters
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        book.testament === 'OT' ? 'bg-amber-500/10 text-amber-300' : 'bg-sky-500/10 text-sky-300'
                      }`}>
                        {book.testament}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Book Deck & Exegesis Reader (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 shadow-xl p-6 space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{selectedBook.division}</span>
                    <span>·</span>
                    <span className="text-slate-400">{selectedBook.testament === 'OT' ? 'Old Testament (Tanakh)' : 'New Testament'}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-100">
                    {selectedBook.name}
                  </h2>
                  <div className="text-sm font-serif text-amber-300 mt-1">
                    {selectedBook.originalName} <span className="font-sans text-xs text-slate-400">({selectedBook.transliteration})</span>
                  </div>
                </div>

                <div className="bg-slate-900 px-3.5 py-2 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-mono">Chapters</div>
                  <div className="text-xl font-bold font-mono text-amber-300">{selectedBook.chapters}</div>
                </div>
              </div>

              {/* Theme & Covenant Connection */}
              <div className="space-y-3">
                <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Theological Motif & Purpose
                  </div>
                  <p className="text-slate-200 leading-relaxed font-editorial text-[16px]">
                    {selectedBook.theme}
                  </p>
                </div>

                <div className="bg-amber-950/20 p-3.5 rounded-lg border border-amber-900/30 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-medium">Covenantal Connection: </span>
                    <span className="text-amber-200 font-semibold">{selectedBook.covenantConnection}</span>
                  </div>
                </div>
              </div>

              {/* Key Scripture Passage Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="uppercase tracking-wider font-semibold">Canonical Key Verse</span>
                  <button
                    onClick={copyVerseToClipboard}
                    className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    {copiedVerse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVerse ? 'Copied' : 'Copy Verse'}</span>
                  </button>
                </div>

                <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-5 relative">
                  <div className="text-xs font-mono font-bold text-amber-400 mb-2">
                    {selectedBook.keyVerse}
                  </div>
                  <p className="text-base font-editorial italic text-slate-100 leading-relaxed">
                    "{selectedBook.keyVerseText}"
                  </p>
                </div>
              </div>

              {/* Chapter Navigator Chips */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                  <span>Chapter Directory</span>
                  <span className="text-amber-400 font-mono">Chapter {selectedChapter} of {selectedBook.chapters}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-900/50 rounded-lg border border-slate-800/80">
                  {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChapter(ch)}
                      className={`w-8 h-8 rounded text-xs font-mono transition-colors cursor-pointer ${
                        selectedChapter === ch
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Chapter Dynamic Content Card */}
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800/90 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                      Selected Excerpt
                    </div>
                    <h3 className="text-base font-bold font-serif-title text-slate-100 mt-0.5">
                      {chapterData.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {chapterData.keyPassage}
                  </span>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/70">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                    Expository Focus
                  </span>
                  <p className="font-editorial text-[15px] leading-relaxed text-amber-100/90">
                    {chapterData.theologicalFocus}
                  </p>
                </div>

                {/* Notable Verses Stream */}
                <div className="space-y-2">
                  <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                    Notable Verses
                  </span>
                  <div className="space-y-2">
                    {chapterData.notableVerses.map((v) => (
                      <div key={v.verse} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs">
                        <span className="font-mono text-amber-400 font-bold shrink-0 mt-0.5">
                          v.{v.verse}
                        </span>
                        <p className="font-editorial text-[15px] leading-relaxed text-slate-200">
                          {v.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

