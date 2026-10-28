import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Gamepad2, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { gamesData } from '../data/games';
import { guidesData } from '../data/guides';
import { termsData } from '../data/terms';
import { faqsData } from '../data/faqs';

interface QuickSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isOpen) {
        // Prevent default slash in inputs if not already typing
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          onClose(); // Parent will toggle
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Games
  const matchingGames = Object.values(gamesData).filter(
    (g) =>
      g.name.toLowerCase().includes(trimmed) ||
      g.theme.toLowerCase().includes(trimmed) ||
      g.overview.toLowerCase().includes(trimmed)
  );

  // Search Guides
  const matchingGuides = Object.values(guidesData).filter(
    (g) =>
      g.title.toLowerCase().includes(trimmed) ||
      g.summary.toLowerCase().includes(trimmed) ||
      g.sections.some((s) => s.title.toLowerCase().includes(trimmed))
  );

  // Search Terms
  const matchingTerms = termsData.filter(
    (t) =>
      t.term.toLowerCase().includes(trimmed) ||
      (t.english && t.english.toLowerCase().includes(trimmed)) ||
      t.definition.toLowerCase().includes(trimmed)
  );

  // Search FAQs
  const matchingFaqs = faqsData.filter(
    (f) =>
      f.question.toLowerCase().includes(trimmed) ||
      f.answer.toLowerCase().includes(trimmed)
  );

  const totalResults =
    matchingGames.length + matchingGuides.length + matchingTerms.length + matchingFaqs.length;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="정보 검색"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-stone-200 p-4 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-[#176B4B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 게임명, 용어, 확률 원리를 검색하세요 (예: 고래, RNG, 환급률, 페이라인)"
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              aria-label="입력 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[11px] font-semibold text-stone-400 px-2 py-0.5 border border-stone-200 rounded bg-white">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <HelpCircle className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium">검색 결과가 없습니다.</p>
              <p className="text-xs text-stone-400 mt-1">다른 검색어를 입력해 보세요 (예: 바다이야기, 스캐터, 도박사의 오류).</p>
            </div>
          ) : (
            <>
              {/* Guides */}
              {matchingGuides.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#176B4B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>핵심 가이드 & 아티클 ({matchingGuides.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingGuides.map((guide) => (
                      <button
                        key={guide.slug}
                        onClick={() => handleSelect(guide.slug === 'reel-games' ? '/reel-games/' : (guide.slug.startsWith('how') || guide.slug.startsWith('types')) ? `/reel-games/${guide.slug}/` : `/guides/${guide.slug}/`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#176B4B]/5 border border-transparent hover:border-[#176B4B]/20 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-800 group-hover:text-[#103B2C]">
                            {guide.title}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {guide.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#176B4B] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Games */}
              {matchingGames.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#176B4B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>대표 게임 상세 ({matchingGames.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingGames.map((game) => (
                      <button
                        key={game.slug}
                        onClick={() => handleSelect(`/games/${game.slug}/`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#176B4B]/5 border border-transparent hover:border-[#176B4B]/20 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-800 group-hover:text-[#103B2C]">
                            {game.name}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {game.theme} • {game.keyFeature}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#176B4B] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms */}
              {matchingTerms.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#176B4B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>용어 사전 ({matchingTerms.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingTerms.slice(0, 6).map((term) => (
                      <button
                        key={term.term}
                        onClick={() => handleSelect('/guides/terms/')}
                        className="text-left p-2.5 rounded-xl bg-stone-50 hover:bg-[#176B4B]/10 border border-stone-100 transition-colors"
                      >
                        <div className="text-xs font-bold text-[#103B2C] flex items-center justify-between">
                          <span>{term.term}</span>
                          <span className="text-[10px] text-stone-400 font-normal">{term.category}</span>
                        </div>
                        <div className="text-[11px] text-stone-600 line-clamp-2 mt-1">
                          {term.definition}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {matchingFaqs.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#176B4B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>자주 묻는 질문 ({matchingFaqs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingFaqs.slice(0, 3).map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect('/faq/')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 border border-stone-200 transition-colors"
                      >
                        <div className="text-xs font-bold text-stone-800">
                          Q. {faq.question}
                        </div>
                        <div className="text-[11px] text-stone-600 line-clamp-2 mt-1">
                          {faq.answer}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>그린가디언 실시간 인덱스 검색</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
