import React from 'react';
import { gamesData } from '../data/games';
import { ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

interface GameComparisonTableProps {
  onNavigate: (path: string) => void;
}

export const GameComparisonTable: React.FC<GameComparisonTableProps> = ({ onNavigate }) => {
  const games = Object.values(gamesData);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
      <div className="p-6 sm:p-8 bg-[#103B2C] text-white">
        <span className="text-xs font-bold text-[#B7DB76] uppercase tracking-wider">
          객관적 팩트 비교 분석
        </span>
        <h3 className="text-xl sm:text-2xl font-bold mt-1">
          대표 릴게임 4종 핵심 사양 및 특징 비교
        </h3>
        <p className="text-stone-300 text-sm mt-2 max-w-2xl">
          과거 아케이드 게임장을 풍미했던 대표 타이틀별 테마, 릴 포맷, 특수 이벤트 연출 및 이용 시 주의해야 할 점을 한눈에 대조합니다.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-200 text-stone-700">
              <th className="py-4 px-4 sm:px-6 font-bold w-40">게임 명칭</th>
              <th className="py-4 px-4 font-bold">배경 테마</th>
              <th className="py-4 px-4 font-bold">릴 포맷 & 라인</th>
              <th className="py-4 px-4 font-bold">핵심 시각 연출</th>
              <th className="py-4 px-4 font-bold">확인할 규칙 및 주의점</th>
              <th className="py-4 px-4 sm:px-6 font-bold text-right">상세 가이드</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {games.map((game) => (
              <tr key={game.slug} className="hover:bg-stone-50/80 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-[#103B2C] align-top">
                  <div className="text-sm font-extrabold">{game.name.split(' (')[0]}</div>
                  <div className="text-[11px] text-stone-400 font-normal">
                    {game.name.match(/\(([^)]+)\)/)?.[1] || ''}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#176B4B] bg-[#176B4B]/10 px-1.5 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    규격 분석 완료
                  </span>
                </td>
                <td className="py-4 px-4 text-stone-600 align-top">
                  {game.theme}
                </td>
                <td className="py-4 px-4 text-stone-700 font-medium align-top">
                  {game.reelFormat}
                </td>
                <td className="py-4 px-4 text-stone-800 align-top">
                  <span className="font-semibold text-[#103B2C]">{game.keyFeature}</span>
                </td>
                <td className="py-4 px-4 text-stone-600 align-top max-w-xs">
                  <div className="flex items-start gap-1.5 text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px] leading-relaxed">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{game.caution.slice(0, 80)}...</span>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6 text-right align-top">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/games/${game.slug}/`)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#176B4B] text-white text-xs font-semibold hover:bg-[#103B2C] transition-colors"
                  >
                    <span>분석 읽기</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
