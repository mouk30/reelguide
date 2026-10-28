import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../config/site';
import { Search, Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenInspector
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#103B2C] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B7DB76]"
      >
        본문 바로가기
      </a>

      {/* Safety Notice Bar */}
      <div className="bg-[#103B2C] text-[#F7FAF7] text-xs py-1.5 px-4 border-b border-[#176B4B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-[#B7DB76] shrink-0" />
            <span>그린가디언은 비환전 순수 정보 제공 포털입니다. 불법 사설 도박 접속을 단호히 금합니다.</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#B7DB76]">
            <span>도박문제 상담: <strong>국번없이 1336</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#176B4B]/15 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="focus:outline-none focus:ring-2 focus:ring-[#176B4B] rounded-lg p-0.5"
            aria-label="그린가디언 홈으로 이동"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="메인 내비게이션">
            {siteConfig.navigation.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#103B2C] bg-[#176B4B]/10 font-bold'
                      : 'text-stone-700 hover:text-[#103B2C] hover:bg-stone-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#B7DB76] text-[#103B2C]">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Live SEO/GEO Inspector Trigger */}
            <button
              type="button"
              onClick={onOpenInspector}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-[#176B4B] bg-[#176B4B]/10 hover:bg-[#176B4B]/20 rounded-lg transition-colors border border-[#176B4B]/20"
              title="실시간 SEO/GEO 및 구조화 데이터 진단"
            >
              <span className="w-2 h-2 rounded-full bg-[#176B4B] animate-pulse" />
              <span>SEO/GEO 리포트</span>
            </button>

            {/* Quick Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 hover:text-[#103B2C] rounded-lg border border-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#176B4B]"
              aria-label="정보 및 용어 검색 열기"
            >
              <Search className="w-4 h-4 text-[#176B4B]" />
              <span className="hidden md:inline">가이드·용어 검색</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-stone-300 rounded text-stone-500">
                /
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 hover:text-[#103B2C] focus:outline-none focus:ring-2 focus:ring-[#176B4B]"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1" aria-label="모바일 내비게이션">
              {siteConfig.navigation.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                      isActive
                        ? 'text-[#103B2C] bg-[#176B4B]/10 font-bold'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#B7DB76] text-[#103B2C]">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
              
              <div className="pt-3 mt-3 border-t border-stone-100 flex flex-col gap-2">
                <span className="text-xs font-semibold text-stone-400 px-3 uppercase tracking-wider">
                  신뢰 및 정책
                </span>
                <div className="grid grid-cols-2 gap-1 text-xs text-stone-600 px-2">
                  <a
                    href="/about/"
                    onClick={(e) => handleNavClick('/about/', e)}
                    className="p-1.5 hover:text-[#103B2C] hover:underline"
                  >
                    그린가디언 소개
                  </a>
                  <a
                    href="/editorial-policy/"
                    onClick={(e) => handleNavClick('/editorial-policy/', e)}
                    className="p-1.5 hover:text-[#103B2C] hover:underline"
                  >
                    검증 및 편집원칙
                  </a>
                  <a
                    href="/contact/"
                    onClick={(e) => handleNavClick('/contact/', e)}
                    className="p-1.5 hover:text-[#103B2C] hover:underline"
                  >
                    정정 제보·문의
                  </a>
                  <a
                    href="/terms/"
                    onClick={(e) => handleNavClick('/terms/', e)}
                    className="p-1.5 hover:text-[#103B2C] hover:underline"
                  >
                    이용약관 및 면책
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
