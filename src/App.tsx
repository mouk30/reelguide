/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickSearch } from './components/QuickSearch';
import { HomeView } from './views/HomeView';
import { GuideDetailView } from './views/GuideDetailView';
import { GameDetailView } from './views/GameDetailView';
import { FaqView } from './views/FaqView';
import { PolicyView } from './views/PolicyView';
import { NotFoundView } from './views/NotFoundView';
import { SeoGeoInspector } from './components/SeoGeoInspector';
import { gamesData } from './data/games';
import { guidesData } from './data/guides';
import { policiesData } from './data/policies';
import { faqsData } from './data/faqs';
import { applySeoMetadata } from './lib/seo';
import { siteConfig } from './config/site';

function normalizePath(path: string): string {
  if (!path || path === '' || path === '/') return '/';
  const clean = path.replace(/\/+$/, '');
  return `${clean}/`;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Synchronize route and browser history
  const navigateTo = (path: string) => {
    const normalized = normalizePath(path);
    if (normalized !== currentPath) {
      if (typeof window !== 'undefined' && window.history) {
        window.history.pushState({}, '', normalized);
      }
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // SEO metadata application on route changes
  useEffect(() => {
    // 1. Home
    if (currentPath === '/') {
      applySeoMetadata({
        path: '/',
        title: siteConfig.mainTitle,
        description: siteConfig.mainDescription,
        type: 'website',
        image: '/og/green-guardian-home.png',
        faqItems: faqsData.slice(0, 6)
      });
      return;
    }

    // 2. Guides & Core
    const guideMap: Record<string, string> = {
      '/reel-games/': 'reel-games',
      '/reel-games/how-it-works/': 'how-it-works',
      '/reel-games/types/': 'types',
      '/guides/beginners/': 'beginners',
      '/guides/terms/': 'terms',
      '/guides/symbols/': 'symbols',
      '/guides/payouts/': 'payouts',
      '/guides/bonus/': 'bonus',
      '/guides/rules/': 'rules'
    };

    const guideSlug = guideMap[currentPath];
    if (guideSlug && guidesData[guideSlug]) {
      const g = guidesData[guideSlug];
      applySeoMetadata({
        path: currentPath,
        title: g.metaTitle,
        description: g.metaDescription,
        type: 'article',
        publishedTime: g.lastVerified,
        modifiedTime: g.lastVerified,
        breadcrumb: [
          { label: g.category === 'core' ? '릴게임 기초' : '이용 가이드', href: g.category === 'core' ? '/reel-games/' : '/guides/beginners/' },
          { label: g.title }
        ]
      });
      return;
    }

    // 3. Games
    const gameMatch = currentPath.match(/^\/games\/([^/]+)\/$/);
    if (gameMatch) {
      const slug = gameMatch[1];
      const game = gamesData[slug];
      if (game) {
        applySeoMetadata({
          path: currentPath,
          title: `${game.name.split(' (')[0]} 게임 특징 및 구조 분석`,
          description: `${game.name}의 배경 테마, 릴 포맷, 특수 이벤트 연출, 심볼 배당표와 이용 시 주의할 점을 분석한 그린가디언 가이드입니다.`,
          type: 'article',
          publishedTime: siteConfig.verifiedDate,
          modifiedTime: siteConfig.verifiedDate,
          breadcrumb: [
            { label: '대표 릴게임 비교', href: '/reel-games/types/' },
            { label: game.name }
          ],
          faqItems: game.faq ? game.faq.map(f => ({ question: f.q, answer: f.a })) : undefined
        });
        return;
      }
    }

    // 4. FAQ
    if (currentPath === '/faq/') {
      applySeoMetadata({
        path: '/faq/',
        title: '릴게임 자주 묻는 질문 (FAQ)',
        description: '릴게임의 개념, RNG 난수 연산, 확률 독립시행, 대표 게임 차이, 불법 사설 사이트 판별법 등 자주 묻는 8대 질문을 확인하세요.',
        type: 'website',
        breadcrumb: [{ label: '자주 묻는 질문' }],
        faqItems: faqsData
      });
      return;
    }

    // 5. Policies
    const policyMap: Record<string, string> = {
      '/about/': 'about',
      '/editorial-policy/': 'editorial-policy',
      '/contact/': 'contact',
      '/privacy/': 'privacy',
      '/terms/': 'terms'
    };

    const policySlug = policyMap[currentPath];
    if (policySlug && policiesData[policySlug]) {
      const p = policiesData[policySlug];
      applySeoMetadata({
        path: currentPath,
        title: p.metaTitle,
        description: p.metaDescription,
        type: 'website',
        breadcrumb: [
          { label: '운영 및 신뢰 정책', href: '/about/' },
          { label: p.title.split(':')[0] }
        ]
      });
      return;
    }

    // 6. Not Found (404)
    applySeoMetadata({
      path: currentPath,
      title: '페이지를 찾을 수 없습니다 (404 Not Found)',
      description: '요청하신 페이지가 존재하지 않거나 이전되었습니다. 그린가디언 홈이나 검색을 이용해 주세요.'
    });
  }, [currentPath]);

  // Route Renderer
  const renderContent = () => {
    // Home
    if (currentPath === '/') {
      return <HomeView onNavigate={navigateTo} />;
    }

    // Guides & Core
    const guideMap: Record<string, string> = {
      '/reel-games/': 'reel-games',
      '/reel-games/how-it-works/': 'how-it-works',
      '/reel-games/types/': 'types',
      '/guides/beginners/': 'beginners',
      '/guides/terms/': 'terms',
      '/guides/symbols/': 'symbols',
      '/guides/payouts/': 'payouts',
      '/guides/bonus/': 'bonus',
      '/guides/rules/': 'rules'
    };

    const guideSlug = guideMap[currentPath];
    if (guideSlug && guidesData[guideSlug]) {
      return <GuideDetailView guide={guidesData[guideSlug]} onNavigate={navigateTo} />;
    }

    // Games
    const gameMatch = currentPath.match(/^\/games\/([^/]+)\/$/);
    if (gameMatch) {
      const slug = gameMatch[1];
      const game = gamesData[slug];
      if (game) {
        return <GameDetailView game={game} onNavigate={navigateTo} />;
      }
    }

    // FAQ
    if (currentPath === '/faq/') {
      return <FaqView onNavigate={navigateTo} />;
    }

    // Policies
    const policyMap: Record<string, string> = {
      '/about/': 'about',
      '/editorial-policy/': 'editorial-policy',
      '/contact/': 'contact',
      '/privacy/': 'privacy',
      '/terms/': 'terms'
    };

    const policySlug = policyMap[currentPath];
    if (policySlug && policiesData[policySlug]) {
      return <PolicyView policy={policiesData[policySlug]} onNavigate={navigateTo} />;
    }

    // 404 Not Found
    return (
      <NotFoundView
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7] text-[#1B2620] font-sans selection:bg-[#B7DB76] selection:text-[#103B2C]">
      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {renderContent()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      {/* Interactive Quick Search Modal */}
      <QuickSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Real-time SEO & GEO Transparency Inspector */}
      <SeoGeoInspector
        currentPath={currentPath}
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
