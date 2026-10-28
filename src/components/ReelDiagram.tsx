import React, { useState } from 'react';
import { Cpu, PlayCircle, Eye, CheckCircle2, Award, Info } from 'lucide-react';

export const ReelDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: '베팅 및 시작 입력',
      short: '버튼 입력',
      icon: PlayCircle,
      tag: '물리적/가상 입력',
      summary: '플레이어가 라인당 포인트 및 총 베팅을 결정한 후 시작 버튼(스핀)을 누릅니다.',
      detail: '입력 신호가 메인보드 프로세서로 전달되는 순간, 해당 회차(Spin)의 세션이 시작됩니다. 규격 아케이드 기기는 법정 1회 베팅 한도를 초과할 수 없도록 강제됩니다.',
      caution: '버튼을 강하게 누르거나 여러 번 연타해도 결과에는 아무런 영향이 없습니다.'
    },
    {
      num: 2,
      title: 'RNG 난수 즉시 확정',
      short: '난수 연산',
      icon: Cpu,
      tag: '핵심 알고리즘',
      summary: '스핀 버튼이 눌린 그 찰나의 순간(0.01초 이내), 난수생성기(RNG)가 각 릴의 정지 좌표를 확정합니다.',
      detail: '결과는 릴이 돌아가기도 전에 이미 연산되어 메모리에 기록됩니다. 매 스핀은 과거의 이력과 완전 단절된 독립시행(Independent Trial)으로 계산됩니다.',
      caution: '기계가 오랫동안 당첨을 주지 않았더라도, 이번 스핀에서 당첨될 확률은 수학적으로 변하지 않습니다.'
    },
    {
      num: 3,
      title: '시각적 릴 회전 연출',
      short: '시각 연출',
      icon: Eye,
      tag: '애니메이션 효과',
      summary: '이미 정해진 정지 좌표를 향해 릴 그래픽이 몇 초간 역동적으로 회전합니다.',
      detail: '소프트웨어는 플레이어의 긴장감과 몰입을 유도하기 위해 회전 속도를 서서히 늦추며(Deceleration), 1번 릴부터 차례로 정지시킵니다.',
      caution: '아슬아슬하게 한 칸 차이로 빗나가는 니어 미스(Near Miss) 역시 단순한 프로그래밍된 시각 연출입니다.'
    },
    {
      num: 4,
      title: '페이라인 심볼 판정',
      short: '라인 일치 판독',
      icon: CheckCircle2,
      tag: '매칭 알고리즘',
      summary: '정지된 심볼들이 사전 정의된 페이라인(수평, 대각선, 지그재그 등)과 일치하는지 비교합니다.',
      detail: '와일드 심볼의 대체 효과, 스캐터 심볼의 출현 개수, 확장 와일드의 발동 여부가 이 단계에서 최종 매트릭스로 대조됩니다.',
      caution: '게임별로 유효 라인 규칙(좌->우 연속 정렬 vs 임의 위치 243 Ways)이 다르므로 사전 배당표 숙지가 필수입니다.'
    },
    {
      num: 5,
      title: '배당 지급 또는 보너스',
      short: '결과 확정',
      icon: Award,
      tag: '최종 결과',
      summary: '매칭된 페이라인의 배당 배수에 따라 점수가 가산되거나 특수 보너스/프리스핀 모드로 진입합니다.',
      detail: '획득한 점수가 표시창(Win)에 반영됩니다. 스캐터 3개 이상 시 별도의 보너스 화면(예: 바다이야기 고래 이벤트, 황금성 성문 개방)으로 전환됩니다.',
      caution: '합법 아케이드 게임에서는 현금 환전이나 상품권 교환이 일체 허용되지 않으며 오직 게임 점수로만 환산됩니다.'
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-2">
        <div>
          <span className="text-xs font-bold text-[#176B4B] uppercase tracking-wider">
            공학적 작동 메커니즘
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#103B2C] mt-1">
            릴게임 진행 5단계 구조 다이어그램
          </h3>
        </div>
        <div className="text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 shrink-0">
          각 단계를 클릭하여 상세 분석을 확인하세요
        </div>
      </div>

      {/* Step Buttons Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 py-6">
        {steps.map((s) => {
          const isSelected = activeStep === s.num;
          const Icon = s.icon;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStep(s.num)}
              className={`p-3 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#103B2C] text-white border-[#103B2C] shadow-md ring-2 ring-[#B7DB76]'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-[#B7DB76] text-[#103B2C]' : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {s.num}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#B7DB76]' : 'text-stone-400'}`} />
              </div>
              <div className="text-xs sm:text-sm font-bold line-clamp-1">{s.short}</div>
              <div
                className={`text-[10px] mt-0.5 line-clamp-1 ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}
              >
                {s.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="bg-[#F7FAF7] rounded-2xl p-5 sm:p-6 border border-[#176B4B]/20 animate-in fade-in">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-[#176B4B] text-white">
            단계 {current.num}
          </span>
          <h4 className="text-lg font-bold text-[#103B2C]">{current.title}</h4>
        </div>

        <p className="text-stone-700 text-sm sm:text-base font-medium mb-4 leading-relaxed">
          {current.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-4 border-t border-stone-200">
          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <div className="font-bold text-[#176B4B] mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>공학적 세부 원리</span>
            </div>
            <p className="text-stone-600 leading-relaxed">{current.detail}</p>
          </div>

          <div className="bg-[#B7DB76]/15 p-4 rounded-xl border border-[#B7DB76]/50">
            <div className="font-bold text-[#103B2C] mb-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#176B4B]" />
              <span>주의사항 및 팩트 체크</span>
            </div>
            <p className="text-stone-700 leading-relaxed font-medium">{current.caution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
