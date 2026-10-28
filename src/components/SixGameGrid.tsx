import React, { useState } from 'react';
import { Sparkles, Eye, ShieldCheck, ArrowRight, ExternalLink, Info, CheckCircle2, AlertTriangle, X, Play, Pause } from 'lucide-react';

interface GameItem {
  id: string;
  num: string;
  badgeCode: string;
  category: string;
  name: string;
  subTitle: string;
  posterImage: string;
  statusBadge: string;
  liveStats: string;
  rtpRate: string;
  volatility: string;
  maxMultiplier: string;
  keyFeature: string;
  caution: string;
  guidePath: string;
  floatClass: string;
}

const SIX_GAMES: GameItem[] = [
  {
    id: 'sea-story',
    num: '01',
    badgeCode: 'OCEAN',
    category: '바다 시리즈',
    name: '바다이야기 (대왕고래)',
    subTitle: '신비로운 바다의 프리미엄 어드벤처',
    posterImage: '/assets/games/poster-01-sea-story.jpg',
    statusBadge: '대왕고래 출현',
    liveStats: '2,840명 열람중',
    rtpRate: '98.4%',
    volatility: '높음 (고변동)',
    maxMultiplier: '최대 100배',
    keyFeature: '대왕고래 및 대왕상어 출현 3단 사이렌 경보 컷신',
    caution: '인위적 연타 조작 없는 정규 독립시행 확률 규격을 준수해야 합니다.',
    guidePath: '/games/sea-story/',
    floatClass: 'animate-float-1'
  },
  {
    id: 'golden-castle',
    num: '02',
    badgeCode: 'GOLDEN',
    category: '클래식 판타지',
    name: '황금성 (황금성 용가리)',
    subTitle: '황금빛 전설을 담은 클래식 판타지',
    posterImage: '/assets/games/poster-02-golden-castle.jpg',
    statusBadge: '황금용 출현',
    liveStats: '1,960명 열람중',
    rtpRate: '97.8%',
    volatility: '중상 (중변동)',
    maxMultiplier: '최대 200배',
    keyFeature: '성문 개방 3단계 및 황금 보물상자 선택 미니게임',
    caution: '황금빛 연출에 현혹되지 않고 사전에 설정한 예산 한도를 준수하십시오.',
    guidePath: '/games/golden-castle/',
    floatClass: 'animate-float-2'
  },
  {
    id: 'ocean-paradise',
    num: '03',
    badgeCode: 'PARADISE',
    category: '바다 시리즈',
    name: '오션파라다이스 (대왕상어)',
    subTitle: '끝없이 펼쳐지는 바다의 새로운 즐거움',
    posterImage: '/assets/games/poster-03-ocean-paradise.jpg',
    statusBadge: '대왕상어 출현',
    liveStats: '1,520명 열람중',
    rtpRate: '98.1%',
    volatility: '중간 (표준)',
    maxMultiplier: '최대 120배',
    keyFeature: '황금 돌고래 확장 와일드 & 해저 잠수정 프리스핀',
    caution: '바다이야기와 유사한 테마이나 페이라인과 심볼 체계가 전혀 다른 독립 타이틀입니다.',
    guidePath: '/games/ocean-paradise/',
    floatClass: 'animate-float-3'
  },
  {
    id: 'yamato',
    num: '04',
    badgeCode: 'YAMATO',
    category: 'SF 액션',
    name: '야마토 (야마토 연타)',
    subTitle: '강렬한 에너지로 완성한 다이내믹 액션',
    posterImage: '/assets/games/poster-04-yamato.jpg',
    statusBadge: '파동포 장전',
    liveStats: '2,110명 열람중',
    rtpRate: '97.9%',
    volatility: '매우 높음',
    maxMultiplier: '최대 150배',
    keyFeature: '전함 파동포 3단 발사 및 우주 함대 워프 게이지 시스템',
    caution: '파동포 발사 타이밍 공략법은 과학적으로 존재하지 않는 미신입니다.',
    guidePath: '/games/yamato/',
    floatClass: 'animate-float-4'
  },
  {
    id: 'sonogong',
    num: '05',
    badgeCode: 'LEGEND',
    category: '전설/판타지',
    name: '손오공 (황제 손오공)',
    subTitle: '전설적인 영웅의 화려한 모험',
    posterImage: '/assets/games/poster-05-sonogong.jpg',
    statusBadge: '여의봉 각성',
    liveStats: '1,380명 열람중',
    rtpRate: '98.0%',
    volatility: '중간 (표준)',
    maxMultiplier: '최대 150배',
    keyFeature: '황금 여의봉 3단 타격 그래픽 및 근두운 비행 연출',
    caution: '화려한 액션 연출에 과몰입하지 않도록 30분 단위 휴식을 권장합니다.',
    guidePath: '/games/sonogong/',
    floatClass: 'animate-float-5'
  },
  {
    id: 'davinci',
    num: '06',
    badgeCode: 'PHOENIX',
    category: '전설/판타지',
    name: '자연빵 (다빈치 불새)',
    subTitle: '불사조의 열기로 완성한 판타지 라인업',
    posterImage: '/assets/games/poster-06-davinci.jpg',
    statusBadge: '자연빵 300만',
    liveStats: '1,790명 열람중',
    rtpRate: '98.5%',
    volatility: '높음 (고변동)',
    maxMultiplier: '최대 200배',
    keyFeature: '불사조 날개짓 3단 각성 및 100% 리얼 자연빵 난수 시스템',
    caution: '조작 없는 정규 RNG 난수 알고리즘에 의해 승패가 독립 결정됩니다.',
    guidePath: '/games/davinci/',
    floatClass: 'animate-float-6'
  }
];

interface SixGameGridProps {
  onNavigate: (path: string) => void;
}

export const SixGameGrid: React.FC<SixGameGridProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [modalGame, setModalGame] = useState<GameItem | null>(null);

  const categories = ['전체', '바다 시리즈', '클래식 판타지', 'SF 액션', '전설/판타지'];

  const filteredGames = SIX_GAMES.filter((g) => {
    if (selectedCategory === '전체') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="bg-[#0A1410] border border-[#176B4B]/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#176B4B]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#176B4B]/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold tracking-widest text-[#B7DB76] uppercase px-2.5 py-1 bg-[#176B4B]/40 rounded-full border border-[#B7DB76]/30">
                PREMIUM GAME COLLECTION
              </span>
              <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
                6 TITLES · INDEPENDENT MOTION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              당신을 위한 프리미엄 릴게임 라인업
            </h2>
            <p className="mt-2 text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              피시 및 모바일 환경에서 각각 독립적으로 부드럽게 움직이는 6대 대표 기종의 실제 그래픽과 공학적 사양을 한눈에 비교·탐색해보세요.
            </p>
          </div>

          {/* Controls: Category Filter & Motion Toggle */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMotionEnabled(!motionEnabled)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                motionEnabled
                  ? 'bg-[#176B4B]/40 text-[#B7DB76] border-[#B7DB76]/40 shadow-xs'
                  : 'bg-stone-800 text-stone-400 border-stone-700'
              }`}
              title={motionEnabled ? '모션 일시정지' : '모션 활성화'}
            >
              {motionEnabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{motionEnabled ? '개별 모션 ON' : '모션 정지'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="relative z-10 pt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#B7DB76] to-[#88C647] text-[#103B2C] shadow-md shadow-[#B7DB76]/20 font-extrabold'
                  : 'bg-[#10241B] text-stone-300 border border-[#176B4B]/30 hover:text-white hover:border-[#B7DB76]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Independent Cards Grid (PC: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredGames.map((game) => {
          return (
            <article
              key={game.id}
              className={`bg-[#0A1612] border border-[#176B4B]/40 hover:border-[#B7DB76] rounded-3xl p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-[#103B2C]/50 hover:-translate-y-2 relative overflow-hidden ${
                motionEnabled ? game.floatClass : ''
              }`}
              style={{
                willChange: 'transform'
              }}
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#176B4B]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#B7DB76]/15 transition-all" />

              <div>
                {/* Card Top Status Row */}
                <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#176B4B]/30">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black tracking-wider text-[#B7DB76] bg-[#B7DB76]/10 px-2 py-0.5 rounded border border-[#B7DB76]/30">
                      {game.num} {game.badgeCode}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B7DB76] animate-pulse" />
                      {game.liveStats}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#E6F4D0] bg-[#176B4B]/50 px-2.5 py-0.5 rounded-full border border-[#B7DB76]/40">
                    {game.statusBadge}
                  </span>
                </div>

                {/* Poster Artwork with Direct External Link to reelkings.kr */}
                <a
                  href="https://reelkings.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#050C0A] border border-[#176B4B]/40 cursor-pointer group-hover:border-[#B7DB76] transition-all shadow-inner block"
                  aria-label={`${game.name} 사이트 바로가기 (reelkings.kr)`}
                >
                  <img
                    src={game.posterImage}
                    alt={`${game.name} 대표 그래픽 아트워크`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </a>

                {/* Game Title & Specs */}
                <div className="pt-4 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      onClick={() => setModalGame(game)}
                      className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#B7DB76] transition-colors cursor-pointer"
                    >
                      {game.name}
                    </h3>
                    <span className="shrink-0 text-[11px] font-mono font-extrabold text-[#B7DB76] bg-[#B7DB76]/10 px-2 py-0.5 rounded border border-[#B7DB76]/30">
                      RTP {game.rtpRate}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#F2C94C] mt-1 leading-snug line-clamp-1">
                    {game.subTitle}
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2 mt-2">
                    {game.keyFeature}
                  </p>
                </div>

                {/* Specs Pill Grid */}
                <div className="py-2.5 px-3 bg-[#06100D] rounded-xl border border-[#176B4B]/30 mb-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-400 text-[11px]">
                    <span>변동성:</span>
                    <span className="font-bold text-stone-200">{game.volatility}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-400 text-[11px]">
                    <span>최대 배당 배수:</span>
                    <span className="font-mono font-bold text-[#B7DB76]">{game.maxMultiplier}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button (Enlarged High-Visibility Full-Width Link to reelkings.kr) */}
              <div className="pt-3.5 border-t border-[#176B4B]/30">
                <a
                  href="https://reelkings.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FFB82E] via-[#FFD269] to-[#FFA800] hover:from-[#FFA800] hover:via-[#FFDF85] hover:to-[#FF9E00] text-[#0A1612] font-black text-sm sm:text-base tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 border-2 border-amber-200 cursor-pointer group/btn"
                  aria-label={`${game.name} 사이트 바로가기 (reelkings.kr)`}
                >
                  <span className="drop-shadow-xs font-black text-[#0A1612] tracking-normal">
                    사이트 바로가기
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#0A1612] stroke-[2.8] group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Quick View Modal */}
      {modalGame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setModalGame(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${modalGame.name} 상세 정보`}
        >
          <div
            className="w-full max-w-xl bg-[#0B1713] border border-[#B7DB76]/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-white relative flex flex-col max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#176B4B]/40 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#B7DB76] bg-[#B7DB76]/10 px-2 py-0.5 rounded border border-[#B7DB76]/30 uppercase">
                  {modalGame.num} {modalGame.badgeCode} · {modalGame.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  {modalGame.name}
                </h3>
                <p className="text-xs text-[#F2C94C] font-semibold mt-0.5">
                  {modalGame.subTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalGame(null)}
                className="p-1.5 rounded-xl bg-[#176B4B]/40 text-stone-300 hover:text-white transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster & Specs in Modal */}
            <div className="py-4 space-y-4">
              <a
                href="https://reelkings.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square max-h-56 w-full rounded-2xl overflow-hidden bg-black mx-auto border border-[#176B4B]/50 block hover:border-[#B7DB76] transition-all cursor-pointer group"
                title={`${modalGame.name} 사이트 바로가기`}
              >
                <img
                  src={modalGame.posterImage}
                  alt={modalGame.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </a>

              <div className="bg-[#10241B] p-4 rounded-2xl border border-[#176B4B]/40 space-y-2 text-xs">
                <div className="font-bold text-[#B7DB76] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B7DB76]" />
                  <span>공학적 핵심 연출 및 특징</span>
                </div>
                <p className="text-stone-200 leading-relaxed">
                  {modalGame.keyFeature}
                </p>
              </div>

              <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <strong>주의 및 팩트 체크:</strong> {modalGame.caution}
                </p>
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="pt-4 border-t border-[#176B4B]/40 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://reelkings.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-[#FFB82E] to-[#FFA800] text-[#0A1612] font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md border border-amber-200 cursor-pointer"
              >
                <span>사이트 바로가기</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={() => {
                  onNavigate(modalGame.guidePath);
                  setModalGame(null);
                }}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-[#176B4B] hover:bg-[#103B2C] text-white font-bold text-xs sm:text-sm border border-[#B7DB76]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>상세 가이드 보기</span>
                <ArrowRight className="w-4 h-4 text-[#B7DB76]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
