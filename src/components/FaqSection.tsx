import React, { useState } from 'react';
import { faqsData } from '../data/faqs';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  limit?: number;
  onNavigate?: (path: string) => void;
  showAllLink?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  limit,
  onNavigate,
  showAllLink = true
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const items = limit ? faqsData.slice(0, limit) : faqsData;

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all overflow-hidden ${
              isOpen
                ? 'bg-white border-[#176B4B]/40 shadow-xs'
                : 'bg-stone-50 hover:bg-stone-100/70 border-stone-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#176B4B] rounded-2xl"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#176B4B]/10 text-[#176B4B] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B4B] block mb-1">
                    {item.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 block">
                    {item.question}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 mt-1 ${
                  isOpen ? 'rotate-180 text-[#176B4B]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-stone-100 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
                <div className="flex items-start gap-3 pt-4">
                  <span className="w-6 h-6 rounded-full bg-[#B7DB76]/30 text-[#103B2C] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    A
                  </span>
                  <div className="space-y-2">
                    <p className="font-medium text-stone-900">{item.answer}</p>
                    {item.details && (
                      <p className="text-stone-500 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {showAllLink && onNavigate && limit && limit < faqsData.length && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => onNavigate('/faq/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#176B4B] hover:text-[#103B2C] hover:underline px-4 py-2 rounded-xl bg-[#176B4B]/5 border border-[#176B4B]/20 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>자주 묻는 질문 전체 ({faqsData.length}개) 보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
