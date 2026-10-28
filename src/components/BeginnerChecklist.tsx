import React, { useState } from 'react';
import { Check, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';

interface BeginnerChecklistProps {
  onNavigate: (path: string) => void;
}

export const BeginnerChecklist: React.FC<BeginnerChecklistProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const steps = [
    {
      id: 1,
      title: '1단계: 게임 시작 전 배당표(Paytable) 정독',
      desc: '어떤 심볼이 몇 개 일치해야 유효한지, 와일드가 대체하지 못하는 심볼은 무엇인지 게임 정보(i) 창을 통해 반드시 확인합니다.',
      tip: '라인당 베팅과 총 베팅의 곱셈 원리를 파악해야 실제 손익을 정확히 측정할 수 있습니다.',
      actionPath: '/guides/symbols/',
      actionLabel: '심볼 판독 가이드'
    },
    {
      id: 2,
      title: '2단계: 독립시행과 확률의 실체 인지하기',
      desc: '"앞판에서 잃었으니 곧 터질 것"이라는 감정적 착각(도박사의 오류)을 버리고, 매 스핀은 이전과 무관한 독립된 난수임을 받아들입니다.',
      tip: '컴퓨터 난수생성기(RNG)는 사용자의 투입 금액이나 시간을 기억하지 않습니다.',
      actionPath: '/guides/payouts/',
      actionLabel: '확률과 기댓값 분석'
    },
    {
      id: 3,
      title: '3단계: 잃어도 무방한 여가 예산과 시간제한 설정',
      desc: '반드시 시작 전에 감당할 수 있는 소액의 여가 예산만을 한정하고, 스마트폰 타이머를 30분으로 설정하여 자동 중단 규칙을 세웁니다.',
      tip: '설정한 한도에 도달하면 아쉬움이 남더라도 그 자리에서 즉시 화면을 닫는 자제력이 필수적입니다.',
      actionPath: '/guides/beginners/',
      actionLabel: '초보자 안전 수칙'
    },
    {
      id: 4,
      title: '4단계: 불법 환전 및 사설 도박 유혹 완벽 차단',
      desc: '온라인상에서 현금 충전과 환전을 약속하는 사이트는 100% 불법 사행성 범죄 조직이며, 당첨금 미지급(먹튀) 피해의 온상입니다.',
      tip: '정식 아케이드 릴게임은 점수 획득 목적의 오락일 뿐, 수익을 창출하는 재테크 수단이 절대 아닙니다.',
      actionPath: '/guides/rules/',
      actionLabel: '게임산업법 규정 안내'
    }
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-3">
        <div>
          <span className="text-xs font-bold text-[#176B4B] uppercase tracking-wider">
            처음 접하는 분을 위한 순서
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#103B2C] mt-1">
            릴게임 초보자 4단계 건전 이용 체크리스트
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-[#176B4B]/10 px-4 py-2 rounded-xl border border-[#176B4B]/20 shrink-0">
          <div className="text-xs font-semibold text-[#103B2C]">숙지 완료:</div>
          <div className="text-sm font-black text-[#176B4B]">
            {completedCount} / 4 완료
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {steps.map((step) => {
          const isDone = !!checkedItems[step.id];
          return (
            <div
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isDone
                  ? 'bg-[#176B4B]/5 border-[#176B4B]/40 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4
                    className={`text-base font-bold transition-colors ${
                      isDone ? 'text-[#103B2C] line-through opacity-80' : 'text-stone-900'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCheck(step.id);
                    }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                      isDone
                        ? 'bg-[#176B4B] border-[#176B4B] text-white'
                        : 'bg-white border-stone-300 text-transparent hover:border-[#176B4B]'
                    }`}
                    aria-label={`${step.title} 완료 표시`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-3">
                  {step.desc}
                </p>

                <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200 text-xs text-stone-500 flex items-start gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#176B4B] shrink-0 mt-0.5" />
                  <span>{step.tip}</span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-medium">
                  {isDone ? '숙지 완료됨' : '클릭하여 숙지 완료 체크'}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(step.actionPath);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#176B4B] hover:text-[#103B2C] hover:underline"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs sm:text-sm text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>이용자 안전 서약:</strong> 그린가디언은 어떠한 경우에도 도박을 장려하지 않습니다. 게임은 순수한 즐거움을 위한 비환전 엔터테인먼트로만 대해야 하며, 도박으로 인한 어려움이 발생할 경우 즉시 1336으로 도움을 요청하십시오.
        </p>
      </div>
    </div>
  );
};
