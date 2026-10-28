import React from 'react';
import { Compass, Home, Search, AlertCircle } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold text-[#176B4B] uppercase tracking-wider">
        404 Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-black text-[#103B2C] mt-2 mb-4">
        요청하신 페이지를 찾을 수 없습니다
      </h1>

      <p className="text-stone-600 text-base max-w-lg mx-auto leading-relaxed mb-8">
        입력하신 주소가 잘못되었거나 삭제·이전된 페이지입니다. 그린가디언의 검증된 가이드나 용어 사전을 통해 원하시는 정보를 찾아보세요.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4B] text-white text-sm font-bold hover:bg-[#103B2C] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>그린가디언 홈으로 가기</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50 transition-colors"
        >
          <Search className="w-4 h-4 text-[#176B4B]" />
          <span>가이드·용어 검색 열기</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/reel-games/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 text-[#103B2C] text-sm font-semibold hover:bg-stone-200 transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>릴게임 기초 가이드</span>
        </button>
      </div>
    </div>
  );
};
