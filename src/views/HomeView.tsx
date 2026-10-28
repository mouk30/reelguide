import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { SixGameGrid } from '../components/SixGameGrid';
import { ReelDiagram } from '../components/ReelDiagram';
import { GameComparisonTable } from '../components/GameComparisonTable';
import { BeginnerChecklist } from '../components/BeginnerChecklist';
import { FaqSection } from '../components/FaqSection';
import { termsData } from '../data/terms';
import {
  ShieldCheck,
  Compass,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileText,
  ImageIcon,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [showFullPoster, setShowFullPoster] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-[#103B2C]/10 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#176B4B]/10 border border-[#176B4B]/20 text-[#103B2C] text-xs font-bold mb-6">
              <ShieldCheck className="w-4 h-4 text-[#176B4B]" />
              <span>독립 검증 릴게임 공학·역사·규칙 정보 허브</span>
            </div>

            {/* Main H1 - Exact required phrasing */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#103B2C] tracking-tight leading-[1.2]">
              {siteConfig.heroHeading}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
              {siteConfig.heroSubtitle}
            </p>

            {/* Quick Action Navigation Grid */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/reel-games/')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#176B4B] hover:bg-[#103B2C] text-white text-sm font-bold shadow-sm transition-all transform active:scale-95 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#B7DB76]" />
                <span>릴게임이란? (기초 해설)</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/guides/beginners/')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#103B2C] border border-stone-300 text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#176B4B]" />
                <span>초보자 안전 수칙</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/guides/terms/')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-sm font-semibold transition-all cursor-pointer"
              >
                <span>용어 사전</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>

          {/* 6 Independent Floating Game Grids (PC & Mobile) */}
          <div className="mt-12 sm:mt-16">
            <SixGameGrid onNavigate={onNavigate} />

            {/* Optional Master Poster Drawer Toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowFullPoster(!showFullPoster)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-stone-200/70 hover:bg-stone-300/80 text-stone-700 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-[#176B4B]" />
                <span>
                  {showFullPoster
                    ? '프리미엄 6종 원본 포스터 접기 ▲'
                    : '프리미엄 6종 원본 마스터 아카이브 포스터 펼쳐보기 ▼'}
                </span>
              </button>

              {showFullPoster && (
                <div className="mt-4 max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-[#176B4B]/30 shadow-2xl bg-black p-3 sm:p-5 animate-in fade-in slide-in-from-top-2">
                  <img
                    src="/assets/aistudio/6_______f3462e89.jpg"
                    alt="6대 기종 프리미엄 원본 포스터 전면"
                    className="w-full h-auto object-contain rounded-2xl mx-auto max-h-[800px]"
                    loading="lazy"
                  />
                  <div className="p-3 text-[11px] text-stone-400 text-center">
                    * 6대 대표 타이틀: 01 바다이야기 (대왕고래), 02 황금성 (황금성 용가리), 03 오션파라다이스 (대왕상어), 04 야마토 (야마토 연타), 05 손오공 (황제 손오공), 06 자연빵 (다빈치 불새)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Answer Section: '릴게임이란?' */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#176B4B]/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7DB76]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          
          <div className="flex items-center gap-2 text-xs font-bold text-[#176B4B] uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>직접 답변 (Direct Definition)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#103B2C] mb-4">
            릴게임이란 무엇인가요?
          </h2>

          <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            <p className="font-semibold text-stone-900 bg-[#F7FAF7] p-4 rounded-2xl border-l-4 border-[#176B4B]">
              <strong>릴게임(Reel Game)</strong>은 회전하는 복수의 릴(Reel)과 화면에 배치된 심볼(Symbol)들의 조합으로 승패 및 배당이 결정되는 전통적인 아케이드 게임 장르입니다.
            </p>
            <p>
              초기의 물리적 레버를 당기던 기계식 릴에서 시작하여, 현재는 고성능 마이크로프로세서와 수학적 난수생성기(RNG) 알고리즘을 결합한 비디오 릴 형태로 진화하였습니다. 버튼을 누르는 순간 결과는 컴퓨터 난수로 즉시 확정되며, 화면의 회전 애니메이션은 시각적 재미를 위한 연출 과정입니다.
            </p>
            <p className="text-sm text-stone-600">
              대한민국 게임산업진흥법상 합법적인 릴게임은 점수 획득 목적의 건전 오락에 국한되며, 현금 환전이나 실물 경품 교환은 법률로 엄격히 금지되어 있습니다.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-full bg-[#176B4B]" />
              <span>검증 출처: 게임물관리위원회 규정 및 아케이드 소프트웨어 공학 표준</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/reel-games/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#176B4B] hover:text-[#103B2C] hover:underline cursor-pointer"
            >
              <span>릴게임 상세 개념 및 역사 읽어보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5-Stage Architecture Diagram Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReelDiagram />
      </section>

      {/* 4-Game Comparison Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GameComparisonTable onNavigate={onNavigate} />
      </section>

      {/* Beginner Checklist Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BeginnerChecklist onNavigate={onNavigate} />
      </section>

      {/* Terminology Dictionary Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-3">
            <div>
              <span className="text-xs font-bold text-[#176B4B] uppercase tracking-wider">
                이해를 돕는 사전
              </span>
              <h3 className="text-2xl font-bold text-[#103B2C] mt-1">
                핵심 릴게임 용어 8선 미리보기
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/guides/terms/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#176B4B] hover:bg-[#103B2C] px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#B7DB76]" />
              <span>용어 사전 전체 ({termsData.length}개) 열람</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {termsData.slice(0, 8).map((term) => (
              <div
                key={term.term}
                className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-[#176B4B]/40 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-[#103B2C]">{term.term}</h4>
                  <span className="text-[10px] font-semibold text-[#176B4B] bg-[#176B4B]/10 px-1.5 py-0.5 rounded">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-2">
                  {term.definition}
                </p>
                <div className="text-[11px] text-stone-400 italic line-clamp-1 border-t border-stone-100 pt-2">
                  예: {term.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-[#176B4B] uppercase tracking-wider">
            자주 묻는 질문
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#103B2C] mt-1">
            이용자들이 가장 궁금해하는 핵심 Q&A
          </h3>
          <p className="text-stone-600 text-sm mt-2">
            확률, 공학적 메커니즘, 법적 지위, 게임별 차이에 대한 명쾌하고 솔직한 답변을 정리했습니다.
          </p>
        </div>

        <div className="max-w-4xl">
          <FaqSection limit={6} onNavigate={onNavigate} />
        </div>
      </section>

      {/* Trust & Editorial Policy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#103B2C] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B7DB76] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>투명한 편집 원칙 및 저작권 준수</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                그린가디언의 모든 정보는 검증된 팩트만을 다룹니다.
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                우리는 근거 없는 당첨 보장, 허위 승률 조작 공략법, 불법 사설 사이트 홍보를 절대 게재하지 않습니다. 오직 수학적 통계와 기술 규격에 입각한 정보만을 제공하여 이용자의 현명한 판단을 돕습니다.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate('/editorial-policy/')}
                className="w-full text-center px-4 py-3 rounded-xl bg-[#B7DB76] text-[#103B2C] text-sm font-bold hover:bg-[#cbf084] transition-colors cursor-pointer"
              >
                검증 및 편집 정책 전문 읽기
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/about/')}
                className="w-full text-center px-4 py-3 rounded-xl bg-[#176B4B] text-white text-sm font-semibold hover:bg-[#1f855d] transition-colors border border-[#B7DB76]/30 cursor-pointer"
              >
                그린가디언 미션과 운영팀 소개
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
