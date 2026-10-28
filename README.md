# 그린가디언 (Green Guardian) — 릴게임 정보 허브

> **신뢰할 수 있는 릴게임 정보의 수호자**  
> 릴게임의 올바른 개념, 작동 구조, 수학적 확률 원리, 대표작별 규격 차이, 그리고 초보자를 위한 안전한 이용 가이드를 제공하는 독립 비영리 정보 포털입니다.

---

## 1. 프로젝트 개요 및 핵심 불변 규격

* **공식 브랜드명:** 그린가디언 (Green Guardian)
* **메인 메타제목 (`<title>`):** `릴게임 사이트 | 그린가디언`
* **메인 메타설명 (`<meta name="description">`):** `릴게임 사이트 그린가디언에서 다양한 릴게임의 종류와 특징, 이용 방법 및 게임별 정보를 확인하세요. 릴게임을 찾는 이용자들을 위한 핵심 정보와 유용한 가이드를 한눈에 살펴보세요.`
* **기본 언어/로케일:** `ko-KR` (`<html lang="ko">`)
* **사이트 성격:** 순수 비환전·비상업 정보 포털 (사설 도박 알선 및 불법 환전 일체 배제)
* **디자인 테마:** 신뢰와 가독성을 지향하는 에메랄드 & 딥 포레스트 그린 팔레트 (`#103B2C`, `#176B4B`, `#B7DB76`, `#F7FAF7`)

---

## 2. 기술 스택 및 구조

* **Core Framework:** React 19 + TypeScript (Strict Type Checking)
* **Build Tool:** Vite 8
* **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
* **Icons:** Lucide React
* **SEO & Architecture:**
  - Dynamic Self-referencing Canonical URL Resolver
  - Full OpenGraph & Twitter Cards
  - Schema.org JSON-LD (`Organization`, `WebSite`, `WebPage`, `Article`, `BreadcrumbList`, `FAQPage`)
  - Standalone PWA Web App Manifest (`/manifest.webmanifest`)
  - Multi-size Favicons & Touch Icons (ICO, SVG, PNG 48x48, 180x180, 192x192, 512x512)
  - Search Engine Crawling Directive (`/robots.txt`)
  - XML Sitemap with 20 Verified Indexable Routes (`/sitemap.xml`)

---

## 3. 정보 아키텍처 (20개 정규 색인 라우트)

| 경로 (URL) | 문서 제목 | 핵심 내용 |
|---|---|---|
| `/` | 릴게임 사이트 \| 그린가디언 | 홈 (Hero, 직접 답변, 5단계 다이어그램, 대표작 비교, 체크리스트, FAQ) |
| `/reel-games/` | 릴게임이란 무엇인가? | 기본 정의, 역사, 슬롯머신과의 차이, 게임산업진흥법 |
| `/reel-games/how-it-works/` | 릴게임 작동 원리 | 릴, 심볼, RNG 난수 연산, 페이라인 판정 5단계 메커니즘 |
| `/reel-games/types/` | 릴게임의 주요 종류 | 클래식 3릴, 5릴 멀티라인, 한국형 이벤트 릴 비교 |
| `/games/sea-story/` | 바다이야기 상세 분석 | 해양 테마, 고래/상어 연출의 실체, 불법 개조 사태의 역사 |
| `/games/yamato/` | 야마토 상세 분석 | 우주 전함 테마, 워프 게이지 시스템, 클래식 SF 아케이드 규칙 |
| `/games/golden-castle/` | 황금성 상세 분석 | 성곽/열쇠 테마, 성문 개방 보너스 및 보물상자 미니게임 |
| `/games/ocean-paradise/` | 오션파라다이스 상세 분석 | 남태평양 산호초, 돌고래 확장 와일드 및 잠수함 연출 |
| `/guides/beginners/` | 초보자 입문 가이드 | 화면 보는 법, 시작 전 3대 체크포인트, 4단계 건전 수칙 |
| `/guides/terms/` | 릴게임 필수 용어 사전 | 릴, 와일드, 스캐터, 변동성, RTP 등 24대 핵심 용어 풀이 및 실시간 필터 |
| `/guides/symbols/` | 심볼 가이드 | 저배당, 중배당, 고배당, 특수 심볼의 계층 구조와 식별법 |
| `/guides/payouts/` | 배당표 해석과 확률 | 배당 계산 공식, 변동성(분산), 도박사의 오류 3대 미신 반박 |
| `/guides/bonus/` | 보너스 기능과 이벤트 연출 | 프리스핀, 픽앤윈, 도파민 사운드와 과몰입 방지 |
| `/guides/rules/` | 법규와 분쟁 예방 | 게임물관리위원회 심의 기준, 불법 사설 사이트 식별 5대 징후 |
| `/faq/` | 자주 묻는 질문 | 자주 묻는 8대 핵심 질문과 아코디언 상세 답변 |
| `/about/` | 그린가디언 소개 | 설립 취지, 3대 운영 원칙, 제3자 비제휴 선언 |
| `/editorial-policy/` | 편집 및 팩트체크 정책 | 정보 검증 절차, 갱신 주기, 오류 정정 프로세스 |
| `/contact/` | 정보 제보 및 문의 | 팩트 오류 정정 제보 창구 및 불법 도박 신고 기관 안내 |
| `/privacy/` | 개인정보처리방침 | 회원가입/불필요 개인정보 미수집 고지, 쿠키 정책 |
| `/terms/` | 이용약관 및 면책조항 | 비상업적 정보 이용 조건, 지적재산권, 법적 면책 안내 |

---

## 4. 빌드, 실행 및 검증 방법

### 개발 서버 실행
\`\`\`bash
npm run dev
\`\`\`
개발 서버가 포트 3000에서 실행됩니다.

### 프로덕션 빌드
\`\`\`bash
npm run build
\`\`\`
오류 없이 `dist/` 정적 번들이 생성됩니다.

### 타입스크립트 및 코드 린트
\`\`\`bash
npm run lint
\`\`\`
`tsc --noEmit`이 0 오류로 통과합니다.

### 자동화된 SEO 및 품질 검증 실행
\`\`\`bash
node scripts/validate-seo.js
\`\`\`
메타데이터, 파비콘, JSON-LD, robots.txt, sitemap.xml, 레거시 블랙리스트 검사 등 21개 항목을 전수 검사하고 `SEO-VALIDATION.md`를 갱신합니다.

---

## 5. 실제 도메인 배포 및 Google Search Console 등록 가이드

1. **운영 도메인 치환:**
   - 확정된 운영 HTTPS 도메인(예: `https://www.greenguardian.co.kr`)이 준비되면, 환경변수 `APP_URL`에 설정하거나 `src/config/site.ts`의 `productionOriginPlaceholder`를 실제 주소로 변경하여 빌드합니다.
   - `public/robots.txt` 및 `public/sitemap.xml` 내의 `{{PRODUCTION_ORIGIN}}` 문자열이 해당 도메인으로 일괄 반영됩니다.
2. **Google Search Console 사이트 소유권 확인:**
   - Search Console에 도메인 속성 또는 URL 접두사 속성을 추가합니다.
   - HTML 파일 업로드 방식 사용 시 `public/` 디렉터리에 확인용 HTML을 배치하면 즉시 서빙됩니다.
3. **사이트맵 제출:**
   - Search Console 메뉴의 [Sitemaps]로 이동하여 `sitemap.xml`을 제출합니다.
4. **리치 결과 검사:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)에 URL을 입력하여 `Organization`, `WebSite`, `WebPage`, `Article`, `FAQPage` 구조화 데이터가 정상 파싱되는지 확인합니다.

---

## 6. 책임감 있는 게임 문화 및 헬프라인 안내

그린가디언은 사행 행위 및 도박 중독의 위험성을 깊이 인식하고 있습니다.
* **한국도박문제예방치유원 헬프라인:** 국번없이 **1336** (24시간 365일 무료 전화 상담)
* **온라인 넷라인 채팅 상담:** [https://www.kcgp.or.kr](https://www.kcgp.or.kr)
* **사행산업통합감독위원회 불법사행행위 신고센터:** 국번없이 **1855-0112**
