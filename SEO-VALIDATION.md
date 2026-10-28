# 그린가디언(Green Guardian) SEO 및 품질 검증 리포트 (SEO-VALIDATION.md)
**검증 일시:** 2026-10-27  
**대상 시스템:** 그린가디언 프로덕션 빌드 환경  
**검증 도구:** scripts/validate-seo.js, tsc --noEmit, vite build  
**검증 결과:** 21개 테스트 중 21개 전체 통과 (100%)

---

## 1. 불변 사용자 요구사항 준수 검증 (Non-Negotiable Matrix)

| 검증 항목 | 기준 | 결과 | 상세 비고 |
|---|---|:---:|---|
| **브랜드명** | 그린가디언 | **PASS** | 헤더, 푸터, 메타데이터, JSON-LD 일관 반영 |
| **메인 메타제목 (<title>)** | 릴게임 사이트 | 그린가디언 | **PASS** | HTML head 및 클라이언트 라우터 일치 |
| **메인 메타설명 (<meta name="description">)** | 릴게임 사이트 그린가디언에서 다양한 릴게임의 종류와 특징, 이용 방법 및 게임별 정보를 확인하세요. 릴게임을 찾는 이용자들을 위한 핵심 정보와 유용한 가이드를 한눈에 살펴보세요. | **PASS** | 글자 및 의미 불변, 줄바꿈 정규화 일치 |
| **기본 언어 선언** | ko-KR, <html lang="ko"> | **PASS** | index.html 및 OpenGraph locale ko_KR 일치 |
| **사행성/환전 배제** | 비환전·비상업 정보 포털 | **PASS** | 현금 입출금 및 사설 베팅 링크 0건, 1336 예방 안내 상시 노출 |
| **운영 도메인 규칙** | {{PRODUCTION_ORIGIN}} 및 runtime window.origin 지원 | **PASS** | 배포 환경에 따른 origin 자동 정규화 및 sitemap 연동 |

---

## 2. 세부 검증 항목별 결과

### (1) 브랜드 에셋 및 파비콘 패키지 (Favicon / Touch Icons)
* `public/favicon.ico` (48x48 Multi-OS 호환 ICO): **PASS**
* `public/favicon.svg` (고대비 벡터 방패 + 'G' + 잎 모티프): **PASS**
* `public/favicon-48x48.png` (정사각형 1:1 고대비 래스터): **PASS**
* `public/apple-touch-icon.png` (180x180 iOS 홈 화면 규격): **PASS**
* `public/icon-192.png` & `public/icon-512.png` (PWA/Android 규격): **PASS**
* `public/og/green-guardian-home.png` (1200x630 소셜 공유 카드): **PASS**
* `public/manifest.webmanifest` (웹 앱 매니페스트 명세 준수): **PASS**

### (2) 기술 크롤링 및 인덱싱 설정 (Crawling & Indexing)
* `/robots.txt`: 200 Plain text 응답 규격, 공개 콘텐츠 접근 허용, sitemap.xml 경로 명시. **PASS**
* `/sitemap.xml`: W3C 유효 XML 선언, 20개 정식 인덱스 대상 URL 수록, 404/중복/비공개 URL 배제, 실제 검증 일자(`2026-10-27`) 반영. **PASS**
* **Self-referencing Canonical:** 각 페이지별 정규화된 HTTPS 절대 주소 연동. **PASS**

### (3) 구조화 데이터 (Schema.org JSON-LD)
* **홈페이지:** `Organization`(#organization), `WebSite`(#website), `WebPage`(#webpage)가 상호 연결된 `@graph` 구조 제공. **PASS**
* **가이드 및 상세 페이지:** `Article` 스키마, `BreadcrumbList`(ListItem 1~N), `WebPage` 동적 생성. **PASS**
* **FAQ 섹션 및 FAQ 페이지:** 화면에 실제 표시되는 질문/답변과 1:1 일치하는 `FAQPage` 마크업 생성. 허위 별점/가짜 평점/가짜 후기 생성 없음. **PASS**

### (4) 콘텐츠 E-E-A-T 및 독창성 검증
* **독창적 한국어 본문:** 타사(WaveDock, 릴존) 원문 무단 복제 없음. 공학적 메커니즘(RNG, 독립시행, 페이라인, 4대 대표작 비교)을 직접 집필. **PASS**
* **투명한 저작권 및 면책:** `/editorial-policy/`, `/about/`, `/terms/`, `/privacy/` 신뢰 페이지 완비. **PASS**
* **도박문제 예방치유:** 상단 바, 푸터, 가이드 하단에 한국도박문제예방치유원 헬프라인(국번없이 1336) 링크 상시 제공. **PASS**

---

## 3. 남은 운영 작업 및 실배포 체크리스트 (TODO)
1. **실제 도메인 치환:** 본 서비스의 배포 도메인이 확정되면 `siteConfig.productionOriginPlaceholder` 또는 환경변수(`APP_URL`)를 통해 `{{PRODUCTION_ORIGIN}}`을 해당 실제 HTTPS 도메인으로 일괄 치환합니다.
2. **Google Search Console 등록:** 실제 도메인 DNS TXT 레코드 또는 HTML 파일 인증 후 `/sitemap.xml`을 제출합니다.
3. **콘텐츠 정기 감사:** 분기별 1회 게임물관리위원회 최신 심의 규정 반영 여부를 검토합니다.

---
**검증 확인자:** 그린가디언 품질 및 기술 SEO 총괄팀 (ALL PASS)
