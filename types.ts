
export enum BreathingStyle {
  WATER = '물의 호흡',
  THUNDER = '번개의 호흡',
  BEAST = '짐승의 호흡',
  FLAME = '화염의 호흡',
  MIST = '안개의 호흡',
  INSECT = '벌레의 호흡',
  STONE = '바위의 호흡',
  WIND = '바람의 호흡',
  SOUND = '소리의 호흡',
  LOVE = '사랑의 호흡',
  SERPENT = '뱀의 호흡',
  SUN = '해의 호흡',
  MOON = '달의 호흡',
  FLOWER = '꽃의 호흡',
  NONE = '호흡 없음 (특수)'
}

export interface Skill {
  name: string;
  damageMultiplier: number;
  cooldown: number; // in seconds
  description: string;
  isUltimate?: boolean; 
}

export interface Slayer {
  id: string;
  name: string;
  title: string;
  style: BreathingStyle;
  baseHp: number;
  baseAtk: number;
  price: number;
  description: string;
  skill: Skill; // Basic Skill
  awakenSkill: Skill; // Unlocked at Lv 5
  color: string;
}

export interface OwnedSlayer extends Slayer {
  level: number;
  currentHp: number;
  maxHp: number;
  atk: number;
  skillReadyAt: number;
  awakenSkillReadyAt: number; // Timestamp for 2nd skill
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  atk: number;
  rewardGold: number;
  isBoss: boolean;
  imageColor: string;
}

export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';

export interface PlayerState {
  gold: number;
  stage: number; // 1-based index
  difficulty: Difficulty;
  ownedSlayers: OwnedSlayer[];
  selectedSlayerIds: string[]; // Max 4
}

export interface Synergy {
  name: string;
  description: string;
  condition: (slayerIds: string[]) => boolean;
  apply: (slayerId: string, stats: { atk: number, maxHp: number }) => { atk: number, maxHp: number };
}
