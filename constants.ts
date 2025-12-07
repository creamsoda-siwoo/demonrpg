
import { BreathingStyle, Slayer, Enemy, Synergy } from './types';

// Updated Slayers with Lower Prices & Corrected Skill Names
export const SLAYERS_DATA: Slayer[] = [
  {
    id: 'tanjiro',
    name: '카마도 탄지로',
    title: '계급: 병',
    style: BreathingStyle.SUN,
    baseHp: 180,
    baseAtk: 45,
    price: 0,
    description: '후각이 뛰어나며, 전설의 호흡을 계승한 소년.',
    skill: {
      name: '히노카미 카구라: 원무',
      damageMultiplier: 4.5,
      cooldown: 6,
      description: '호흡을 불꽃으로 바꾸어 강력한 베기를 날린다.',
      isUltimate: true
    },
    awakenSkill: {
      name: '히노카미 카구라: 비륜양염',
      damageMultiplier: 7.0,
      cooldown: 12,
      description: '칼날이 아지랑이처럼 흔들리며 베어낸다.',
      isUltimate: true
    },
    color: 'bg-emerald-600'
  },
  {
    id: 'zenitsu',
    name: '아가츠마 젠이츠',
    title: '계급: 병',
    style: BreathingStyle.THUNDER,
    baseHp: 135,
    baseAtk: 70,
    price: 300,
    description: '극도의 공포 속에서 잠들면 진정한 힘을 발휘한다.',
    skill: {
      name: '벽력일섬: 육연',
      damageMultiplier: 3.5,
      cooldown: 4,
      description: '보이지 않는 속도로 적을 6번 벤다.'
    },
    awakenSkill: {
      name: '벽력일섬: 신속',
      damageMultiplier: 6.0,
      cooldown: 10,
      description: '한계 속도를 넘어선 일격.'
    },
    color: 'bg-yellow-500'
  },
  {
    id: 'inosuke',
    name: '하시비라 이노스케',
    title: '계급: 병',
    style: BreathingStyle.BEAST,
    baseHp: 225,
    baseAtk: 35,
    price: 400,
    description: '저돌적인 야생의 전사.',
    skill: {
      name: '제3의 이빨: 뜯어 발기기',
      damageMultiplier: 3.0,
      cooldown: 4,
      description: '쌍검으로 적의 목을 노린다.'
    },
    awakenSkill: {
      name: '제9의 이빨: 신・으스름 베기',
      damageMultiplier: 5.5,
      cooldown: 9,
      description: '관절을 빼서 리치를 늘려 공격한다.'
    },
    color: 'bg-blue-400'
  },
  {
    id: 'genya',
    name: '시나즈가와 겐야',
    title: '계급: 병',
    style: BreathingStyle.NONE,
    baseHp: 270,
    baseAtk: 55,
    price: 800,
    description: '호흡을 쓸 수 없어 총과 혈귀 먹기를 사용한다.',
    skill: {
      name: '남만총 사격',
      damageMultiplier: 2.8,
      cooldown: 3,
      description: '총으로 견제하고 물어뜯어 회복한다.'
    },
    awakenSkill: {
      name: '혈귀술: 무간업수',
      damageMultiplier: 5.0,
      cooldown: 10,
      description: '혈귀를 먹고 얻은 힘으로 나무 뿌리를 조종한다.'
    },
    color: 'bg-slate-600'
  },
  {
    id: 'nezuko',
    name: '카마도 네즈코',
    title: '혈귀',
    style: BreathingStyle.NONE,
    baseHp: 250,
    baseAtk: 55,
    price: 1500,
    description: '탄지로의 여동생. 혈귀술을 사용한다.',
    skill: {
      name: '혈귀술: 폭혈',
      damageMultiplier: 4.0,
      cooldown: 5,
      description: '자신의 피를 불태워 적을 공격한다.'
    },
    awakenSkill: {
      name: '각성: 오니화',
      damageMultiplier: 6.5,
      cooldown: 15,
      description: '성인 형상으로 변하여 무자비하게 공격한다.'
    },
    color: 'bg-rose-500'
  },
  {
    id: 'kanao',
    name: '츠유리 카나오',
    title: '계급: 병',
    style: BreathingStyle.FLOWER,
    baseHp: 195,
    baseAtk: 60,
    price: 1200,
    description: '뛰어난 동체시력을 가진 츠구코.',
    skill: {
      name: '제4형: 홍화의',
      damageMultiplier: 3.5,
      cooldown: 5,
      description: '부드러운 곡선을 그리며 베어낸다.'
    },
    awakenSkill: {
      name: '종의 형: 피안주안',
      damageMultiplier: 7.5,
      cooldown: 15,
      description: '실명할 위험을 감수하고 모든 움직임을 꿰뚫어본다.'
    },
    color: 'bg-pink-400'
  },
  {
    id: 'sabito',
    name: '사비토',
    title: '육성자 제자',
    style: BreathingStyle.WATER,
    baseHp: 210,
    baseAtk: 63,
    price: 1300,
    description: '탄지로를 지도해준 여우 가면의 소년.',
    skill: {
      name: '제8형: 용소',
      damageMultiplier: 3.0,
      cooldown: 4,
      description: '높은 곳에서 떨어지며 강력하게 벤다.'
    },
    awakenSkill: {
      name: '제10형: 생생유전',
      damageMultiplier: 5.5,
      cooldown: 8,
      description: '회전할수록 강해지는 물의 참격.'
    },
    color: 'bg-orange-300'
  },
  {
    id: 'shinobu',
    name: '코쵸우 시노부',
    title: '충주',
    style: BreathingStyle.INSECT,
    baseHp: 150,
    baseAtk: 45,
    price: 1800,
    description: '독을 사용하여 오니를 멸살한다.',
    skill: {
      name: '나비의 춤: 장난',
      damageMultiplier: 2.5,
      cooldown: 3,
      description: '빠르게 찌르며 치명적인 독을 주입한다.'
    },
    awakenSkill: {
      name: '지네의 춤: 백족 쟈바라',
      damageMultiplier: 6.0,
      cooldown: 9,
      description: '엄청난 속도로 사방에서 찌른다.'
    },
    color: 'bg-purple-600'
  },
  {
    id: 'giyu',
    name: '토미오카 기유',
    title: '수주',
    style: BreathingStyle.WATER,
    baseHp: 300,
    baseAtk: 85,
    price: 2200,
    description: '냉철하고 침착한 물의 지주.',
    skill: {
      name: '제11형: 잔잔한 물결',
      damageMultiplier: 3.5,
      cooldown: 5,
      description: '모든 공격을 무효화하고 반격한다.'
    },
    awakenSkill: {
      name: '제10형: 생생유전 (극)',
      damageMultiplier: 6.5,
      cooldown: 10,
      description: '극한까지 회전력을 높인 용의 일격.'
    },
    color: 'bg-blue-800'
  },
  {
    id: 'mitsuri',
    name: '칸로지 미츠리',
    title: '연주',
    style: BreathingStyle.LOVE,
    baseHp: 300,
    baseAtk: 90,
    price: 2500,
    description: '특이 체질 근육을 가진 사랑의 지주.',
    skill: {
      name: '제5형: 흔들리는 연정',
      damageMultiplier: 4.0,
      cooldown: 6,
      description: '채찍 같은 검으로 광범위하게 공격한다.'
    },
    awakenSkill: {
      name: '제6형: 고양이 발 사랑 바람',
      damageMultiplier: 6.8,
      cooldown: 11,
      description: '빠르게 몸을 회전하며 모든 공격을 쳐낸다.'
    },
    color: 'bg-pink-500'
  },
  {
    id: 'obanai',
    name: '이구로 오바나이',
    title: '사주',
    style: BreathingStyle.SERPENT,
    baseHp: 220,
    baseAtk: 95,
    price: 2600,
    description: '뱀처럼 휘어지는 검로를 구사하는 지주.',
    skill: {
      name: '제2형: 협두의 독니',
      damageMultiplier: 3.8,
      cooldown: 5,
      description: '뱀이 기어가듯 적의 뒤를 노린다.'
    },
    awakenSkill: {
      name: '제5형: 원원장사',
      damageMultiplier: 7.2,
      cooldown: 12,
      description: '광범위하게 뱀처럼 휘어지는 참격을 날린다.'
    },
    color: 'bg-violet-800'
  },
  {
    id: 'tengen',
    name: '우즈이 텐겐',
    title: '음주',
    style: BreathingStyle.SOUND,
    baseHp: 360,
    baseAtk: 98,
    price: 2800,
    description: '화려함을 추구하는 닌자 출신 지주.',
    skill: {
      name: '제5형: 명현주주',
      damageMultiplier: 3.8,
      cooldown: 6,
      description: '회전하는 칼날로 폭발적인 소리를 낸다.'
    },
    awakenSkill: {
      name: '악보 완성',
      damageMultiplier: 7.0,
      cooldown: 13,
      description: '적의 공격 리듬을 완벽하게 파악하여 반격한다.'
    },
    color: 'bg-fuchsia-600'
  },
  {
    id: 'rengoku',
    name: '렌고쿠 쿄주로',
    title: '염주',
    style: BreathingStyle.FLAME,
    baseHp: 330,
    baseAtk: 105,
    price: 3200,
    description: '마음을 불태우는 열정적인 지주.',
    skill: {
      name: '제5형: 염호',
      damageMultiplier: 4.5,
      cooldown: 7,
      description: '맹호가 물어뜯는 듯한 참격.'
    },
    awakenSkill: {
      name: '제9형: 연옥',
      damageMultiplier: 8.0,
      cooldown: 14,
      description: '전신을 불태우며 돌진하는 오의.'
    },
    color: 'bg-red-600'
  },
  {
    id: 'muichiro',
    name: '토키토 무이치로',
    title: '하주',
    style: BreathingStyle.MIST,
    baseHp: 240,
    baseAtk: 128,
    price: 3800,
    description: '천재적인 재능을 가진 최연소 지주.',
    skill: {
      name: '제4형: 이류베기',
      damageMultiplier: 4.0,
      cooldown: 6,
      description: '흐르듯이 베어내는 참격.'
    },
    awakenSkill: {
      name: '제7형: 몽롱',
      damageMultiplier: 7.5,
      cooldown: 11,
      description: '안개 속에 숨어 적을 교란시키며 벤다.'
    },
    color: 'bg-teal-400'
  },
  {
    id: 'sanemi',
    name: '시나즈가와 사네미',
    title: '풍주',
    style: BreathingStyle.WIND,
    baseHp: 350,
    baseAtk: 120,
    price: 4200,
    description: '가장 호전적이고 파괴적인 바람의 지주.',
    skill: {
      name: '제1형: 진선풍 깎기',
      damageMultiplier: 4.5,
      cooldown: 5,
      description: '지면을 부수며 돌진하는 참격.'
    },
    awakenSkill: {
      name: '제8형: 초열풍 베기',
      damageMultiplier: 8.0,
      cooldown: 12,
      description: '폭풍처럼 몰아치는 연격.'
    },
    color: 'bg-green-700'
  },
  {
    id: 'urokodaki',
    name: '우로코다키 사콘지',
    title: '전 수주',
    style: BreathingStyle.WATER,
    baseHp: 400,
    baseAtk: 100,
    price: 4500,
    description: '탄지로와 기유의 스승.',
    skill: {
      name: '제8형: 용소',
      damageMultiplier: 4.0,
      cooldown: 7,
      description: '위에서 아래로 강력하게 베어낸다.'
    },
    awakenSkill: {
      name: '육성자의 가르침',
      damageMultiplier: 6.5,
      cooldown: 15,
      description: '노련한 검술로 적의 빈틈을 파고든다.'
    },
    color: 'bg-blue-300'
  },
  {
    id: 'jigoro',
    name: '쿠와지마 지고로',
    title: '전 명주',
    style: BreathingStyle.THUNDER,
    baseHp: 380,
    baseAtk: 110,
    price: 4500,
    description: '젠이츠의 스승. 번개의 호흡 사용자.',
    skill: {
      name: '벽력일섬',
      damageMultiplier: 4.2,
      cooldown: 6,
      description: '전광석화와 같은 발도술.'
    },
    awakenSkill: {
      name: '낙뢰',
      damageMultiplier: 7.0,
      cooldown: 14,
      description: '하늘에서 벼락을 떨어뜨린다.'
    },
    color: 'bg-yellow-700'
  },
  {
    id: 'gyomei',
    name: '히메지마 교메이',
    title: '암주',
    style: BreathingStyle.STONE,
    baseHp: 525,
    baseAtk: 150,
    price: 6000,
    description: '귀살대 최강의 사나이.',
    skill: {
      name: '제2형: 천면 부수기',
      damageMultiplier: 5.0,
      cooldown: 8,
      description: '철퇴를 머리 위로 던져 내려찍는다.'
    },
    awakenSkill: {
      name: '제5형: 와륜 형부',
      damageMultiplier: 9.0,
      cooldown: 16,
      description: '거대한 철퇴와 도끼로 적을 완전히 분쇄한다.'
    },
    color: 'bg-stone-600'
  },
  {
    id: 'yoriichi',
    name: '츠기쿠니 요리이치',
    title: '시초의 호흡',
    style: BreathingStyle.SUN,
    baseHp: 750,
    baseAtk: 300,
    price: 25000,
    description: '모든 호흡의 시초이자 최강의 검사.',
    skill: {
      name: '해의 호흡: 13형',
      damageMultiplier: 12.0,
      cooldown: 12,
      description: '무잔조차 공포에 떨게 만든 전설의 검기.'
    },
    awakenSkill: {
      name: '혁도 발현',
      damageMultiplier: 15.0,
      cooldown: 20,
      description: '검을 붉게 물들여 재생을 봉쇄하고 벤다.'
    },
    color: 'bg-red-800'
  }
];

// Reordered enemies according to story progression
// Weak -> Hand Demon -> Lower Moons -> Upper Moons -> Muzan
export const ENEMY_TEMPLATES: Partial<Enemy>[] = [
  // 초반부 (Early Game)
  { name: '약한 오니', maxHp: 30, atk: 4, rewardGold: 20, isBoss: false, imageColor: 'text-gray-400' },
  { name: '굶주린 오니', maxHp: 50, atk: 6, rewardGold: 30, isBoss: false, imageColor: 'text-gray-500' },
  { name: '사당 도깨비', maxHp: 80, atk: 10, rewardGold: 50, isBoss: false, imageColor: 'text-stone-500' },
  { name: '손 도깨비', maxHp: 200, atk: 20, rewardGold: 150, isBoss: true, imageColor: 'text-green-800' },
  { name: '늪 도깨비', maxHp: 250, atk: 25, rewardGold: 200, isBoss: false, imageColor: 'text-blue-900' },
  { name: '거미 도깨비 (아빠)', maxHp: 400, atk: 40, rewardGold: 300, isBoss: false, imageColor: 'text-gray-200' },
  
  // 하현 (Lower Moons) - Bottom Up
  { name: '하현 6: 쿄우가이', maxHp: 600, atk: 50, rewardGold: 500, isBoss: true, imageColor: 'text-orange-800' },
  { name: '하현 5: 루이', maxHp: 800, atk: 70, rewardGold: 700, isBoss: true, imageColor: 'text-red-500' },
  { name: '하현 1: 엔무', maxHp: 1200, atk: 100, rewardGold: 1200, isBoss: true, imageColor: 'text-indigo-500' },

  // 상현 (Upper Moons) - Bottom Up
  { name: '상현 6: 다키 & 규타로', maxHp: 2500, atk: 180, rewardGold: 3000, isBoss: true, imageColor: 'text-lime-500' },
  { name: '상현 5: 굣코', maxHp: 4000, atk: 250, rewardGold: 5000, isBoss: true, imageColor: 'text-purple-300' },
  { name: '상현 4: 한텐구', maxHp: 6500, atk: 350, rewardGold: 7000, isBoss: true, imageColor: 'text-yellow-700' },
  { name: '상현 3: 아카자', maxHp: 12000, atk: 600, rewardGold: 12000, isBoss: true, imageColor: 'text-pink-600' },
  { name: '상현 2: 도우마', maxHp: 16000, atk: 800, rewardGold: 20000, isBoss: true, imageColor: 'text-cyan-300' },
  { name: '상현 1: 코쿠시보', maxHp: 25000, atk: 1500, rewardGold: 40000, isBoss: true, imageColor: 'text-purple-900' },
  
  // 최종 보스
  { name: '키부츠지 무잔', maxHp: 50000, atk: 3000, rewardGold: 100000, isBoss: true, imageColor: 'text-red-700' },
];

export const SYNERGIES: Synergy[] = [
  {
    name: '뱀과 사랑',
    description: '오바나이와 미츠리가 함께하면 공격력 25% 증가',
    condition: (ids) => ids.includes('obanai') && ids.includes('mitsuri'),
    apply: (id, stats) => {
       if (id === 'obanai' || id === 'mitsuri') {
         return { ...stats, atk: Math.floor(stats.atk * 1.25) };
       }
       return stats;
    }
  },
  {
    name: '무한열차 팀',
    description: '탄지로, 젠이츠, 이노스케, 렌고쿠가 함께하면 체력/공격력 20% 증가',
    condition: (ids) => ids.includes('tanjiro') && ids.includes('zenitsu') && ids.includes('inosuke') && ids.includes('rengoku'),
    apply: (id, stats) => {
       if (['tanjiro', 'zenitsu', 'inosuke', 'rengoku'].includes(id)) {
         return { 
           atk: Math.floor(stats.atk * 1.2), 
           maxHp: Math.floor(stats.maxHp * 1.2) 
         };
       }
       return stats;
    }
  },
  {
    name: '불사천 형제',
    description: '사네미와 겐야가 함께하면 체력 30% 증가',
    condition: (ids) => ids.includes('sanemi') && ids.includes('genya'),
    apply: (id, stats) => {
      if (id === 'sanemi' || id === 'genya') {
        return { ...stats, maxHp: Math.floor(stats.maxHp * 1.3) };
      }
      return stats;
    }
  },
  {
    name: '젠이츠의 긴장',
    description: '네즈코가 있으면 젠이츠가 부끄러워 공격력이 50% 감소',
    condition: (ids) => ids.includes('nezuko') && ids.includes('zenitsu'),
    apply: (id, stats) => {
      if (id === 'zenitsu') {
        return { ...stats, atk: Math.floor(stats.atk * 0.5) };
      }
      return stats;
    }
  },
  {
    name: '카마도 남매',
    description: '탄지로와 네즈코가 함께하면 공격력 10% 증가',
    condition: (ids) => ids.includes('tanjiro') && ids.includes('nezuko'),
    apply: (id, stats) => {
      if (id === 'tanjiro' || id === 'nezuko') {
        return { ...stats, atk: Math.floor(stats.atk * 1.1) };
      }
      return stats;
    }
  }
];
