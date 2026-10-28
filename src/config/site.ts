export const siteConfig = {
  name: "그린가디언",
  englishName: "Green Guardian",
  mainTitle: "릴게임 사이트 | 그린가디언",
  mainDescription: "릴게임 사이트 그린가디언에서 다양한 릴게임의 종류와 특징, 이용 방법 및 게임별 정보를 확인하세요. 릴게임을 찾는 이용자들을 위한 핵심 정보와 유용한 가이드를 한눈에 살펴보세요.",
  tagline: "신뢰할 수 있는 릴게임 정보의 수호자",
  heroHeading: "릴게임 사이트 그린가디언, 필요한 정보를 한눈에",
  heroSubtitle: "다양한 릴게임의 원리와 구조, 대표작별 규칙 차이, 초보자를 위한 안전한 가이드까지 왜곡 없는 객관적 팩트로 안내합니다.",
  productionOriginPlaceholder: "{{PRODUCTION_ORIGIN}}",
  verifiedDate: "2026-10-27",
  editorialTeam: "그린가디언 콘텐츠 검증팀",
  helpline: {
    name: "한국도박문제예방치유원",
    phone: "1336",
    url: "https://www.kcgp.or.kr",
    note: "24시간 무료 전화 상담 및 온라인 넷라인 지원"
  },
  navigation: [
    {
      title: "릴게임 소개",
      href: "/reel-games/",
      badge: "기초",
      description: "릴게임의 정의, 역사 및 아케이드 게임과의 차이"
    },
    {
      title: "작동 원리",
      href: "/reel-games/how-it-works/",
      description: "릴, 심볼, RNG, 페이라인의 결합 구조"
    },
    {
      title: "대표 게임",
      href: "/reel-games/types/",
      description: "바다이야기, 야마토, 황금성, 오션파라다이스 비교"
    },
    {
      title: "초보자 가이드",
      href: "/guides/beginners/",
      badge: "추천",
      description: "입문자를 위한 4단계 수칙과 화면 해석 가이드"
    },
    {
      title: "용어 사전",
      href: "/guides/terms/",
      description: "릴, 와일드, 스캐터, 변동성 등 핵심 용어 30선"
    },
    {
      title: "자주 묻는 질문",
      href: "/faq/",
      description: "확률, 안전성, 합법성 등에 대한 명쾌한 답변"
    }
  ],
  footerLinks: {
    core: [
      { label: "홈페이지", href: "/" },
      { label: "릴게임이란?", href: "/reel-games/" },
      { label: "작동 원리 및 구조", href: "/reel-games/how-it-works/" },
      { label: "게임 유형 분류", href: "/reel-games/types/" }
    ],
    games: [
      { label: "바다이야기 정보", href: "/games/sea-story/" },
      { label: "야마토 정보", href: "/games/yamato/" },
      { label: "황금성 정보", href: "/games/golden-castle/" },
      { label: "오션파라다이스 정보", href: "/games/ocean-paradise/" }
    ],
    guides: [
      { label: "초보자 입문 가이드", href: "/guides/beginners/" },
      { label: "릴게임 용어 사전", href: "/guides/terms/" },
      { label: "심볼 가이드", href: "/guides/symbols/" },
      { label: "배당표 및 확률 이해", href: "/guides/payouts/" },
      { label: "보너스 기능과 이벤트", href: "/guides/bonus/" },
      { label: "규칙과 분쟁 예방", href: "/guides/rules/" }
    ],
    policies: [
      { label: "그린가디언 소개", href: "/about/" },
      { label: "편집 및 검증 정책", href: "/editorial-policy/" },
      { label: "정보 제보 및 문의", href: "/contact/" },
      { label: "개인정보처리방침", href: "/privacy/" },
      { label: "이용약관 및 면책", href: "/terms/" }
    ]
  }
};

export function getCanonicalOrigin(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // When served in live web preview or custom domain, use current origin unless placeholder is specifically requested
    return window.location.origin;
  }
  return siteConfig.productionOriginPlaceholder;
}

export function buildAbsoluteUrl(path: string): string {
  const base = getCanonicalOrigin().replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
