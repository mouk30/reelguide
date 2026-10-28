import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FaqSection } from '../components/FaqSection';
import { HelpCircle, ShieldAlert, PhoneCall } from 'lucide-react';

interface FaqViewProps {
  onNavigate: (path: string) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const breadcrumbs = [
    { label: '자주 묻는 질문' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <header className="mt-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B4B]/10 text-[#176B4B] text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>그린가디언 Q&A 센터</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#103B2C] tracking-tight">
          릴게임 관련 자주 묻는 질문 (FAQ)
        </h1>

        <p className="mt-3 text-stone-600 text-base leading-relaxed">
          릴게임의 개념, RNG 난수 알고리즘, 독립시행 확률, 불법 사설 사이트 판별법 등 이용자들이 가장 빈번하게 문의하는 8대 핵심 질문에 대해 공학적·법률적 근거를 바탕으로 답해드립니다.
        </p>
      </header>

      {/* Helpline Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-[#103B2C] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-[#B7DB76] shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">도박문제 관련 도움이 필요하신가요?</span>
            <span className="text-stone-300">한국도박문제예방치유원에서 24시간 무료 비밀 상담을 제공합니다.</span>
          </div>
        </div>
        <div className="text-lg font-black text-[#B7DB76] shrink-0 px-3 py-1 bg-[#176B4B] rounded-lg">
          국번없이 1336
        </div>
      </div>

      {/* Main FAQ Accordion */}
      <div className="mt-6">
        <FaqSection showAllLink={false} />
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#176B4B] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>안내:</strong> 본 FAQ의 모든 내용은 현행 게임산업진흥법 및 공학적 난수 생성 이론에 부합하도록 엄격히 검수되었습니다.
        </p>
      </div>
    </div>
  );
};
