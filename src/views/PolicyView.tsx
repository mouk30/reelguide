import React from 'react';
import { PolicyPage } from '../data/policies';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Calendar, Lock, FileCheck, Mail } from 'lucide-react';

interface PolicyViewProps {
  policy: PolicyPage;
  onNavigate: (path: string) => void;
}

export const PolicyView: React.FC<PolicyViewProps> = ({ policy, onNavigate }) => {
  const breadcrumbs = [
    { label: '운영 및 신뢰 정책', href: '/about/' },
    { label: policy.title.split(':')[0] }
  ];

  const getIcon = () => {
    switch (policy.slug) {
      case 'about':
        return ShieldCheck;
      case 'editorial-policy':
        return FileCheck;
      case 'privacy':
        return Lock;
      case 'contact':
        return Mail;
      default:
        return ShieldCheck;
    }
  };

  const Icon = getIcon();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <header className="mt-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B4B]/10 text-[#176B4B] text-xs font-bold mb-3">
          <Icon className="w-3.5 h-3.5" />
          <span>공식 운영 정책 및 지침</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#103B2C] tracking-tight">
          {policy.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>최종 개정 및 검증 일자: <time dateTime={policy.lastUpdated}>{policy.lastUpdated}</time></span>
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        {policy.sections.map((section, idx) => (
          <section key={idx} className="border-b border-stone-100 last:border-b-0 pb-6 last:pb-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#103B2C] mb-3">
              {section.heading}
            </h2>
            <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
              {section.body.map((p, pIdx) => (
                <p key={pIdx} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
