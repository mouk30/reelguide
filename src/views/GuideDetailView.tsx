import React, { useState } from 'react';
import { GuideArticle } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ArticleByline } from '../components/ArticleByline';
import { TableOfContents } from '../components/TableOfContents';
import { termsData } from '../data/terms';
import { ArrowRight, BookOpen, ShieldAlert, CheckCircle2, AlertTriangle, Info, Search } from 'lucide-react';

interface GuideDetailViewProps {
  guide: GuideArticle;
  onNavigate: (path: string) => void;
}

export const GuideDetailView: React.FC<GuideDetailViewProps> = ({ guide, onNavigate }) => {
  const [termSearch, setTermSearch] = useState('');
  const [selectedTermCategory, setSelectedTermCategory] = useState<string>('전체');

  const isTermsPage = guide.slug === 'terms';

  const categories = ['전체', '기본 구조', '특수 기능', '기술/수학', '심리/주의', '법규/규격'];

  const filteredTerms = termsData.filter((t) => {
    const matchesCategory = selectedTermCategory === '전체' || t.category === selectedTermCategory;
    const matchesSearch =
      !termSearch ||
      t.term.toLowerCase().includes(termSearch.toLowerCase()) ||
      (t.english && t.english.toLowerCase().includes(termSearch.toLowerCase())) ||
      t.definition.toLowerCase().includes(termSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbs = [
    { label: guide.category === 'core' ? '릴게임 기초' : '이용 가이드', href: guide.category === 'core' ? '/reel-games/' : '/guides/beginners/' },
    { label: guide.title }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      {/* Article Header */}
      <header className="mt-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B4B]/10 text-[#176B4B] text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>그린가디언 공학 가이드</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#103B2C] tracking-tight leading-snug">
          {guide.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
          {guide.summary}
        </p>

        {/* E-E-A-T Byline */}
        <ArticleByline
          author={guide.author}
          reviewer={guide.reviewer}
          lastVerified={guide.lastVerified}
          readingTime={guide.readingTime}
        />
      </header>

      {/* Table of Contents */}
      {guide.tableOfContents && guide.tableOfContents.length > 0 && (
        <TableOfContents items={guide.tableOfContents} />
      )}

      {/* Main Content Sections */}
      <article className="prose prose-stone max-w-none space-y-10 text-stone-800 leading-relaxed">
        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#103B2C] border-b border-stone-200 pb-2 mb-4">
              {section.title}
            </h2>

            <div className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {section.content}
            </div>

            {/* Optional Callout Box */}
            {section.callout && (
              <div
                className={`my-5 p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : section.callout.type === 'tip'
                    ? 'bg-[#B7DB76]/15 border-[#B7DB76]/50 text-[#103B2C]'
                    : 'bg-[#176B4B]/5 border-[#176B4B]/20 text-[#103B2C]'
                }`}
              >
                {section.callout.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : section.callout.type === 'tip' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#176B4B] shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-[#176B4B] shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block font-bold mb-0.5">{section.callout.title}</strong>
                  <span className="leading-relaxed">{section.callout.message}</span>
                </div>
              </div>
            )}

            {/* Optional Data Table */}
            {section.table && (
              <div className="my-6 overflow-x-auto border border-stone-200 rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200 text-stone-800 font-bold">
                      {section.table.headers.map((h, idx) => (
                        <th key={idx} className="p-3 sm:p-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 sm:p-4 text-stone-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* Special Interactive Dictionary on 'terms' slug */}
      {isTermsPage && (
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 mb-6">
            <h3 className="text-lg font-bold text-[#103B2C] mb-3">
              실시간 용어 필터 및 검색
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={termSearch}
                  onChange={(e) => setTermSearch(e.target.value)}
                  placeholder="용어 또는 정의 검색 (예: 와일드, 변동성, 릴)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#176B4B]"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 items-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedTermCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedTermCategory === cat
                        ? 'bg-[#176B4B] text-white'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.term}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#176B4B]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-[#103B2C] text-base">
                      {term.term}
                      {term.english && (
                        <span className="text-xs text-stone-400 font-normal ml-2">
                          ({term.english})
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-[#176B4B] bg-[#176B4B]/10 px-2 py-0.5 rounded-full">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                    {term.definition}
                  </p>
                </div>
                <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <strong>적용 예:</strong> {term.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internal Navigation & Related Articles */}
      <div className="mt-12 pt-8 border-t border-stone-200">
        <h3 className="text-sm font-bold text-[#176B4B] uppercase tracking-wider mb-4">
          관련 추천 가이드
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/reel-games/how-it-works/')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#176B4B] hover:bg-[#176B4B]/5 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-bold text-stone-900 group-hover:text-[#103B2C]">
                릴게임 작동 원리와 RNG 분석
              </div>
              <div className="text-xs text-stone-500 mt-0.5">난수 생성 및 페이라인 메커니즘</div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#176B4B]" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/guides/payouts/')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#176B4B] hover:bg-[#176B4B]/5 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-bold text-stone-900 group-hover:text-[#103B2C]">
                배당표 해석과 확률의 진실
              </div>
              <div className="text-xs text-stone-500 mt-0.5">변동성과 도박사의 오류 극복하기</div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#176B4B]" />
          </button>
        </div>
      </div>

      {/* Legal & Safety Disclaimer */}
      <div className="mt-8 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#176B4B] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>면책 고지:</strong> 본 가이드는 이용자의 공학적 이해와 피해 예방을 위해 무상으로 제공되는 교육 자료입니다. 그린가디언은 어떠한 경우에도 사설 도박 행위를 보증하거나 중개하지 않습니다.
        </p>
      </div>
    </div>
  );
};
