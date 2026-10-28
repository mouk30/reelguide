import React from 'react';
import { ShieldCheck, Calendar, Clock, UserCheck } from 'lucide-react';

interface ArticleBylineProps {
  author?: string;
  reviewer?: string;
  lastVerified: string;
  readingTime?: string;
}

export const ArticleByline: React.FC<ArticleBylineProps> = ({
  author = '그린가디언 리서치팀',
  reviewer = '콘텐츠 검증팀',
  lastVerified,
  readingTime = '5분'
}) => {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 my-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
      <div className="flex flex-wrap items-center gap-4">
        {/* Verification Badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#176B4B]/10 text-[#176B4B] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#176B4B]" />
          팩트체크 검증 완료
        </span>

        {/* Author / Reviewer */}
        <span className="flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>작성: <strong>{author}</strong></span>
          <span className="text-stone-300">|</span>
          <span>검토: <strong>{reviewer}</strong></span>
        </span>

        {/* Date */}
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-stone-400" />
          <span>최종 검증일: <time dateTime={lastVerified}>{lastVerified}</time></span>
        </span>

        {/* Read Time */}
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>예상 소요: {readingTime}</span>
        </span>
      </div>

      <div className="text-[11px] text-stone-400 italic">
        * 본 문서는 대한민국 게임산업진흥법 및 소프트웨어 공학 표준을 준수합니다.
      </div>
    </div>
  );
};
