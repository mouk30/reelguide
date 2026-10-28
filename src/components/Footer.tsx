import React from 'react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../config/site';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenInspector?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInspector }) => {
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#103B2C] text-[#F7FAF7] pt-14 pb-12 border-t-4 border-[#B7DB76]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Statement & Trust Badges */}
        <div className="pb-10 border-b border-[#176B4B]">
          <div className="max-w-3xl space-y-4">
            <BrandLogo size="lg" className="[&_span]:text-white [&_span.text-\[11px\]]:text-[#B7DB76]" />
            <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
              그린가디언은 릴게임의 올바른 개념, 작동 구조, 확률적 원리, 그리고 게임별 차이를 객관적인 팩트 중심으로 전달하는 독립 비영리 정보 허브입니다. 과장된 당첨 보장이나 불법 환전을 배격하며, 건전하고 안전한 게임 문화 조성을 최우선 가치로 삼습니다.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-300">
              <span className="flex items-center gap-1.5 bg-[#176B4B]/50 px-2.5 py-1.5 rounded border border-[#176B4B]">
                <ShieldCheck className="w-4 h-4 text-[#B7DB76]" />
                순수 정보 제공 사이트 (비환전·비상업)
              </span>
              <span className="flex items-center gap-1.5 bg-[#176B4B]/50 px-2.5 py-1.5 rounded border border-[#176B4B]">
                <AlertTriangle className="w-4 h-4 text-[#B7DB76]" />
                불법 사설 도박 조장 엄금
              </span>
            </div>
          </div>
        </div>

        {/* Sitemap Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-[#176B4B]">
          {/* Core Info */}
          <div>
            <h3 className="text-xs font-bold text-[#B7DB76] tracking-wider uppercase mb-3">
              릴게임 기초 정보
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              {siteConfig.footerLinks.core.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-xs font-bold text-[#B7DB76] tracking-wider uppercase mb-3">
              대표 게임 상세 분석
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              {siteConfig.footerLinks.games.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-xs font-bold text-[#B7DB76] tracking-wider uppercase mb-3">
              초보자 가이드 & 사전
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              {siteConfig.footerLinks.guides.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Policies */}
          <div>
            <h3 className="text-xs font-bold text-[#B7DB76] tracking-wider uppercase mb-3">
              검증 기준 및 정책
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              {siteConfig.footerLinks.policies.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p className="leading-relaxed">
            © 2026 {siteConfig.name}. All rights reserved. 본 웹사이트는 공학적·역사적 연구 및 정보 전달 목적의 비영리 사이트입니다.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-stone-400">
            {onOpenInspector && (
              <>
                <button
                  type="button"
                  onClick={onOpenInspector}
                  className="text-[#B7DB76] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>SEO/GEO 실시간 진단</span>
                </button>
                <span>•</span>
              </>
            )}
            <a
              href="/privacy/"
              onClick={(e) => handleNavClick('/privacy/', e)}
              className="hover:text-white"
            >
              개인정보처리방침
            </a>
            <span>•</span>
            <a
              href="/terms/"
              onClick={(e) => handleNavClick('/terms/', e)}
              className="hover:text-white"
            >
              이용약관 및 면책
            </a>
            <span>•</span>
            <a
              href="/editorial-policy/"
              onClick={(e) => handleNavClick('/editorial-policy/', e)}
              className="hover:text-white"
            >
              편집원칙
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
