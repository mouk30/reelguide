import { TermItem } from '../types';

export const termsData: TermItem[] = [
  {
    term: '릴 (Reel)',
    english: 'Reel',
    category: '기본 구조',
    definition: '심볼들이 세로로 배열되어 회전하는 원통형 기둥 또는 디지털 그래픽 축. 대개 3개(3릴) 또는 5개(5릴)로 구성됩니다.',
    example: '5릴 게임에서는 화면에 5개의 세로 열이 회전한 뒤 좌측부터 순서대로 멈춥니다.',
    seeAlso: ['행 (Row)', '심볼 (Symbol)']
  },
  {
    term: '행 (Row)',
    english: 'Row',
    category: '기본 구조',
    definition: '화면에 보이는 릴의 가로 층수. 일반적으로 3행(3x3, 5x3)이 가장 널리 쓰이며, 4행이나 가변 행을 지원하는 게임도 있습니다.',
    example: '5릴 3행 게임은 총 15칸(5 x 3)의 심볼 매트릭스를 형성합니다.'
  },
  {
    term: '심볼 (Symbol)',
    english: 'Symbol',
    category: '기본 구조',
    definition: '릴 표면에 그려진 모든 시각적 기호, 그림, 문자 또는 숫자. 조합에 따라 배당이 결정됩니다.',
    example: '바다이야기에서는 고래와 상어가 고배당 심볼에 해당합니다.'
  },
  {
    term: '페이라인 (Payline)',
    english: 'Payline',
    category: '기본 구조',
    definition: '심볼들이 정렬되었을 때 당첨으로 인정되는 미리 지정된 유효 선. 가로, 대각선, 지그재그 등 다양한 형태가 있습니다.',
    example: '20페이라인 게임에서는 20가지 지정된 궤적 중 하나라도 심볼이 일치하면 상금이 지급됩니다.'
  },
  {
    term: '배당표 (Paytable)',
    english: 'Paytable',
    category: '기본 구조',
    definition: '각 심볼의 종류와 개수(3개, 4개, 5개 등)에 따라 지급되는 배수율과 특별 보너스 규칙이 상세히 기재된 안내표.',
    example: '게임을 시작하기 전에 정보(i) 메뉴를 열어 배당표를 확인해야 합니다.'
  },
  {
    term: '와일드 심볼 (Wild)',
    english: 'Wild Symbol',
    category: '특수 기능',
    definition: '카드 게임의 조커와 같이 스캐터 등 일부 특수 심볼을 제외한 다른 일반 심볼을 대신해 당첨 라인을 완성해 주는 만능 심볼.',
    example: '1번과 3번에 체리가 있고 2번에 와일드가 나오면 3체리 당첨으로 인정됩니다.'
  },
  {
    term: '스캐터 심볼 (Scatter)',
    english: 'Scatter Symbol',
    category: '특수 기능',
    definition: '페이라인과 관계없이 화면 어디에든 특정 개수(대개 3개 이상)가 나타나면 즉시 보너스나 무료 회전을 발동시키는 심볼.',
    example: '화면 임의의 위치에 스캐터 3개가 등장하여 10회의 프리스핀 라운드가 시작되었습니다.'
  },
  {
    term: '프리스핀 (Free Spin)',
    english: 'Free Spins',
    category: '특수 기능',
    definition: '보유 크레딧을 차감하지 않고 무료로 릴을 돌릴 수 있는 기회. 보통 높은 승수나 특수 와일드가 동반됩니다.',
    example: '보너스 스캐터 3개를 맞춰 15회 프리스핀을 획득했습니다.'
  },
  {
    term: '멀티플라이어 (Multiplier)',
    english: 'Multiplier',
    category: '특수 기능',
    definition: '기본 당첨금에 특정 배수(2x, 3x, 5x, 10x 등)를 곱하여 지급액을 증폭시키는 기능.',
    example: '프리스핀 모드 동안 모든 당첨에 3배 멀티플라이어가 적용되었습니다.'
  },
  {
    term: '난수생성기 (RNG)',
    english: 'Random Number Generator',
    category: '기술/수학',
    definition: '인간의 예측이나 외부 조작이 불가능하도록 초당 수천 개의 수학적 난수를 생성하여 릴의 정지 위치를 결정하는 핵심 알고리즘.',
    example: '스핀 버튼을 누르는 찰나의 순간에 RNG에 의해 결과가 즉시 산출됩니다.'
  },
  {
    term: '독립시행 (Independent Trial)',
    english: 'Independent Trial',
    category: '기술/수학',
    definition: '이전 시행의 결과가 다음 시행의 확률에 전혀 영향을 주지 않는 확률론적 특성. 모든 스핀은 과거를 기억하지 않습니다.',
    example: '10번 연속으로 꽝이 나왔더라도 11번째 스핀에서 당첨될 확률은 처음과 동일합니다.'
  },
  {
    term: '환급률 (RTP)',
    english: 'Return to Player',
    category: '기술/수학',
    definition: '장기적으로 플레이어에게 반환되는 이론적인 금액 비율(보통 85% ~ 96%). 수백만 회의 시뮬레이션을 거친 통계적 평균입니다.',
    example: 'RTP 95% 게임이라도 단기 플레이 시에는 200%를 딸 수도 있고 0%가 될 수도 있습니다.'
  },
  {
    term: '변동성 (Volatility)',
    english: 'Volatility',
    category: '기술/수학',
    definition: '당첨 빈도와 상금 규모의 편차를 나타내는 지표. 고변동성은 드물지만 큰 당첨, 저변동성은 잦은 소액 당첨을 의미합니다.',
    example: '고변동성 게임을 할 때는 자금이 급격히 줄어들 수 있으므로 베팅액을 낮춰야 합니다.'
  },
  {
    term: '히트율 (Hit Frequency)',
    english: 'Hit Frequency',
    category: '기술/수학',
    definition: '전체 스핀 수 중에서 어떠한 형태로든 상금이 지급된 스핀의 백분율.',
    example: '히트율이 25%라면 평균적으로 4번 돌릴 때 1번꼴로 무언가 맞는다는 뜻입니다.'
  },
  {
    term: '도박사의 오류 (Gambler\'s Fallacy)',
    english: 'Gambler\'s Fallacy',
    category: '심리/주의',
    definition: '독립시행 사건에서 과거에 특정 결과가 많이 나왔으니 이제 다른 결과가 나올 차례라고 잘못 믿는 심리적 착각.',
    example: '"이 기계에 돈이 많이 들어갔으니 이제 터질 때가 됐다"고 믿는 것이 도박사의 오류입니다.'
  },
  {
    term: '니어 미스 (Near Miss)',
    english: 'Near Miss',
    category: '심리/주의',
    definition: '잭팟 심볼이 딱 한 칸 차이로 아쉽게 빗겨나가는 시각적 연출. 뇌에서 실제 승리에 준하는 도파민을 분비시킵니다.',
    example: '거의 맞출 뻔한 것처럼 보여도 내부 연산상으로는 평범한 실패일 뿐입니다.'
  },
  {
    term: '가짜 승리 (LDW: Losses Disguised as Wins)',
    english: 'Losses Disguised as Wins',
    category: '심리/주의',
    definition: '베팅 금액보다 적은 상금을 받았음에도 축하 팡파르와 화려한 빛으로 마치 이긴 것처럼 뇌를 속이는 연출.',
    example: '1,000원을 걸고 200원을 땄는데 기계가 화려한 축하 음악을 연주하는 현상.'
  },
  {
    term: '확장 와일드 (Expanding Wild)',
    english: 'Expanding Wild',
    category: '특수 기능',
    definition: '릴에 떨어지면 해당 릴의 모든 세로 행(위아래 칸)을 전부 와일드로 가득 채우는 특수 심볼.',
    example: '오션파라다이스의 돌고래 심볼이 3개 행 전체로 확장되었습니다.'
  },
  {
    term: '고정 와일드 (Sticky Wild)',
    english: 'Sticky Wild',
    category: '특수 기능',
    definition: '프리스핀이나 리스핀 동안 다음 회전에서도 화면에서 사라지지 않고 고정되어 자리를 지키는 와일드.',
    example: '고정 와일드가 여러 개 쌓일수록 후반 스핀에서 큰 배당 조합이 완성됩니다.'
  },
  {
    term: '리스핀 (Respin)',
    english: 'Respin',
    category: '특수 기능',
    definition: '특정 조건이 충족되었을 때 일부 릴은 고정된 채 나머지 릴만 다시 한 번 회전하는 1회성 무료 스핀.',
    example: '보너스 심볼 2개가 나온 상태에서 마지막 1개를 찾기 위해 리스핀이 발동되었습니다.'
  },
  {
    term: '슬로우 텐션 (Tension Spin)',
    english: 'Tension Spin / Heartbeat',
    category: '특수 기능',
    definition: '결정적인 스캐터 2개가 이미 나온 상태에서 3번째 스캐터가 나올 가능성이 있는 릴만 심장박동 사운드와 함께 천천히 도는 연출.',
    example: '마지막 릴이 슬로우 모션으로 회전하며 긴장감을 유도합니다.'
  },
  {
    term: '아케이드 규격 (Arcade Standard)',
    english: 'Arcade Standard',
    category: '법규/규격',
    definition: '대한민국 게임물관리위원회에서 정한 전체이용가 및 청소년이용불가 아케이드 게임기의 기술 심의 규정.',
    example: '합법 아케이드 기기는 시간당 투입 상한과 현금 환전 금지 기준을 준수해야 합니다.'
  },
  {
    term: '불법 연타 (Illegal Burst Mod)',
    english: 'Illegal Burst Mod',
    category: '법규/주의',
    definition: '사설 불법 업자들이 메인보드 롬(ROM)이나 메모리를 개조하여 특정 조건에서 강제로 대량 당첨이 쏟아지도록 조작한 범죄 수법.',
    example: '과거 바다이야기 사태의 주원인이었던 불법 개조 프로그램의 명칭.'
  },
  {
    term: '크레딧 (Credit)',
    english: 'Credit',
    category: '기본 구조',
    definition: '게임 내에서 베팅에 사용하기 위해 표시되는 포인트나 가상 코인의 총 잔액.',
    example: '화면 좌측 하단의 크레딧 창에서 현재 잔여 포인트를 확인할 수 있습니다.'
  }
];
