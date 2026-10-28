import React from 'react';
import { GameInfo } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ArticleByline } from '../components/ArticleByline';
import {
  Gamepad2,
  ShieldCheck,
  AlertTriangle,
  History,
  Layers,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

interface GameDetailViewProps {
  game: GameInfo;
  onNavigate: (path: string) => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({ game, onNavigate }) => {
  const breadcrumbs = [
    { label: '대표 릴게임 비교', href: '/reel-games/types/' },
    { label: game.name }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      {/* Header */}
      <header className="mt-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B4B]/10 text-[#176B4B] text-xs font-bold">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>아케이드 릴게임 분석</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{game.verificationStatus}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#103B2C] tracking-tight">
          {game.name} 상세 정보 및 공학적 구조 분석
        </h1>

        <p className="mt-3 text-stone-600 text-base leading-relaxed">
          {game.overview}
        </p>

        {/* E-E-A-T Byline */}
        <ArticleByline lastVerified="2026-10-27" readingTime="6분" />
      </header>

      {/* Mandatory Caution Alert */}
      <div className="mb-8 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <strong className="block text-sm sm:text-base font-extrabold text-amber-900 mb-1">
            이용자 주의 및 법적 경고 고지
          </strong>
          <p className="leading-relaxed">{game.caution}</p>
        </div>
      </div>

      {/* Key Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-xs sm:text-sm">
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <span className="text-stone-400 font-semibold block mb-1">배경 테마</span>
          <span className="font-bold text-[#103B2C]">{game.theme}</span>
        </div>
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <span className="text-stone-400 font-semibold block mb-1">릴 포맷 & 라인</span>
          <span className="font-bold text-[#103B2C]">{game.reelFormat}</span>
        </div>
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <span className="text-stone-400 font-semibold block mb-1">핵심 시각 연출</span>
          <span className="font-bold text-[#103B2C]">{game.keyFeature}</span>
        </div>
      </div>

      {/* Historical Context Section */}
      <section className="mb-10 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] flex items-center gap-2 mb-3">
          <History className="w-5 h-5 text-[#176B4B]" />
          <span>역사적 배경 및 국내 도입 과정</span>
        </h2>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {game.history}
        </p>
      </section>

      {/* Symbols & Payout Hierarchy */}
      <section className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#176B4B]" />
          <span>주요 심볼 체계 및 배당 가치</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-800 font-bold">
                <th className="p-3.5">심볼 명칭</th>
                <th className="p-3.5">유형</th>
                <th className="p-3.5">화면상의 역할 및 트리거</th>
                <th className="p-3.5 text-right">기본 배수 기준</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {game.symbols.map((s, idx) => (
                <tr key={idx} className="hover:bg-stone-50">
                  <td className="p-3.5 font-bold text-[#103B2C]">{s.name}</td>
                  <td className="p-3.5 text-stone-600">
                    <span className="px-2 py-0.5 rounded bg-stone-100 font-medium text-[11px]">
                      {s.type}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-700">{s.role}</td>
                  <td className="p-3.5 text-right font-semibold text-[#176B4B]">
                    {s.multiplier || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bonus Mechanics */}
      <section className="mb-10 bg-[#176B4B]/5 rounded-2xl p-6 border border-[#176B4B]/20">
        <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#176B4B]" />
          <span>보너스 이벤트 및 특수 연출 메커니즘</span>
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
          {game.bonusMechanics.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#176B4B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rules to Verify */}
      <section className="mb-10 bg-white rounded-2xl p-6 border border-stone-200">
        <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-[#176B4B]" />
          <span>확인해야 할 규칙 및 통계적 사실</span>
        </h2>
        <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
          {game.rules.map((r, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#176B4B] font-bold shrink-0">✓</span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Game FAQ */}
      {game.faq && game.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[#176B4B]" />
            <span>{game.name.split(' (')[0]} 관련 자주 묻는 질문</span>
          </h2>
          <div className="space-y-3">
            {game.faq.map((item, idx) => (
              <div key={idx} className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm sm:text-base mb-1.5 flex items-start gap-2">
                  <span className="text-[#176B4B] font-black">Q.</span>
                  <span>{item.q}</span>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-5">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to Games Comparison */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('/reel-games/types/')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#176B4B] hover:text-[#103B2C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 릴게임 유형 비교로 돌아가기</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/guides/beginners/')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B4B] text-white text-xs sm:text-sm font-semibold hover:bg-[#103B2C] transition-colors"
        >
          <span>초보자 안전 가이드 읽기</span>
        </button>
      </div>
    </div>
  );
};
