
import React, { useState, useEffect, useRef } from 'react';
import { Swords, Home, ShoppingBag, Heart, Skull, Zap, ChevronRight, CheckCircle2, Circle, Settings, Users, ShieldAlert, Sparkles, Flame } from 'lucide-react';
import { SLAYERS_DATA, ENEMY_TEMPLATES, SYNERGIES } from './constants';
import { OwnedSlayer, Enemy, PlayerState, Synergy, Difficulty } from './types';
import { ProgressBar } from './components/ProgressBar';

// --- Visual Effect Component ---
interface VisualEffect {
  id: number;
  text: string;
  color: string;
  isUltimate: boolean;
}

const SAVE_KEY = 'ds_rpg_save_v1';

// --- Helper Functions ---
const getSynergies = (selectedIds: string[]): Synergy[] => {
  return SYNERGIES.filter(s => s.condition(selectedIds));
};

const getDifficultyMultiplier = (diff: Difficulty) => {
  switch(diff) {
    case 'EASY': return 0.8;
    case 'NORMAL': return 1.0;
    case 'HARD': return 1.5;
    default: return 1.0;
  }
};

const getRewardMultiplier = (diff: Difficulty) => {
  switch(diff) {
    case 'EASY': return 0.8;
    case 'NORMAL': return 1.0;
    case 'HARD': return 1.5;
    default: return 1.0;
  }
};

// --- Components ---

// 1. Estate View (Hub)
const EstateView = ({ 
  player, 
  onStartPatrol, 
  onHealAll, 
  onUpgrade, 
  onRecruit,
  onToggleSlayer,
  onChangeDifficulty,
  onResetData
}: { 
  player: PlayerState; 
  onStartPatrol: () => void;
  onHealAll: () => void;
  onUpgrade: (slayerId: string) => void;
  onRecruit: () => void;
  onToggleSlayer: (slayerId: string) => void;
  onChangeDifficulty: (diff: Difficulty) => void;
  onResetData: () => void;
}) => {
  const needsHeal = player.ownedSlayers.some(s => s.currentHp < s.maxHp);
  const selectedCount = player.selectedSlayerIds.length;
  const activeSynergies = getSynergies(player.selectedSlayerIds);

  // Calculate Next Enemy Info
  const enemyListLength = ENEMY_TEMPLATES.length;
  const loopCount = Math.floor((player.stage - 1) / enemyListLength);
  const enemyIndex = (player.stage - 1) % enemyListLength;
  const nextEnemyName = ENEMY_TEMPLATES[enemyIndex].name;
  
  let prefix = "";
  if (loopCount === 1) prefix = "중등 ";
  else if (loopCount === 2) prefix = "상등 ";
  else if (loopCount === 3) prefix = "특등 ";
  else if (loopCount > 3) prefix = `초월(${loopCount-3}) `;

  return (
    <div className="flex flex-col h-full bg-[url('https://images.unsplash.com/photo-1599587236720-302787e2213a?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-start border-b border-slate-700 bg-slate-900/50">
        <div>
          <h1 className="text-3xl font-cinzel text-indigo-100 drop-shadow-lg font-bold">우부야시키 저택</h1>
          <p className="text-slate-400 text-sm mt-1">
             현재 토벌 진행도: <span className="text-yellow-400 font-bold">STAGE {player.stage}</span>
             <span className="ml-2 text-xs text-slate-500">다음: {prefix}{nextEnemyName}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-slate-800 px-4 py-2 rounded-full border border-yellow-600/50 flex items-center gap-2 text-yellow-400 shadow-lg">
            <span className="text-xl font-bold">{player.gold.toLocaleString()}</span>
            <span className="text-xs uppercase tracking-wider">Gold</span>
          </div>
          <div className="flex gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            {(['EASY', 'NORMAL', 'HARD'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => onChangeDifficulty(d)}
                className={`px-3 py-1 text-xs font-bold rounded ${player.difficulty === d ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 grid lg:grid-cols-2 gap-6">
        
        {/* Left Column: Actions & Synergies */}
        <div className="space-y-4 flex flex-col">
          <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-xl text-slate-200 mb-4 font-bold border-b border-slate-700 pb-2">작전 지도</h2>
            <div className="grid gap-3">
              <button 
                onClick={onStartPatrol}
                disabled={selectedCount === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 group border
                  ${selectedCount > 0 
                    ? 'bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-red-500 text-white' 
                    : 'bg-slate-800 border-slate-600 text-slate-500 cursor-not-allowed'}`}
              >
                <Swords size={24} className={selectedCount > 0 ? "group-hover:rotate-12 transition-transform" : ""} /> 
                {selectedCount > 0 ? `혈귀 토벌 시작` : '출전할 대원을 선택하세요'}
              </button>
              
              <button 
                onClick={onHealAll}
                disabled={!needsHeal}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-3 border transition-all ${needsHeal ? 'bg-emerald-900/80 border-emerald-500 text-emerald-100 hover:bg-emerald-800' : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'}`}
              >
                <Heart size={20} /> 
                {needsHeal ? '전원 무료 치료 (휴식)' : '모두 건강함'}
              </button>

              <button 
                onClick={onRecruit}
                className="w-full py-3 bg-indigo-900/50 hover:bg-indigo-900/80 border border-indigo-500/50 rounded-lg text-indigo-200 font-bold flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingBag size={20} /> 
                대원 영입 / 상점
              </button>
            </div>
          </div>
          
          {/* Active Synergies Display */}
          <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 shadow-xl flex-1">
             <h2 className="text-lg text-slate-200 mb-3 font-bold flex items-center gap-2">
               <Users size={18} className="text-indigo-400"/> 활성화된 시너지
             </h2>
             {activeSynergies.length > 0 ? (
               <div className="space-y-2">
                 {activeSynergies.map(syn => (
                   <div key={syn.name} className="p-3 bg-indigo-900/30 border border-indigo-500/30 rounded-lg">
                     <div className="font-bold text-indigo-200 text-sm">{syn.name}</div>
                     <div className="text-xs text-indigo-300">{syn.description}</div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-slate-500 text-sm text-center py-4">활성화된 시너지가 없습니다.<br/>특정 대원들을 조합해보세요.</div>
             )}
          </div>

           <div className="text-center">
                <button onClick={onResetData} className="text-xs text-red-900 hover:text-red-500 underline">데이터 초기화</button>
           </div>
        </div>

        {/* Right Column: Roster */}
        <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 shadow-xl overflow-hidden flex flex-col h-[500px] lg:h-auto">
          <h2 className="text-xl text-slate-200 mb-4 font-bold border-b border-slate-700 pb-2 flex justify-between">
            <span>나의 귀살대</span>
            <span className={`text-sm font-bold ${selectedCount === 4 ? 'text-red-400' : 'text-slate-400'}`}>
              출전: {selectedCount}/4명
            </span>
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {player.ownedSlayers.map(slayer => {
              const upgradeCost = Math.floor(100 * Math.pow(1.2, slayer.level));
              const canUpgrade = player.gold >= upgradeCost;
              const isSelected = player.selectedSlayerIds.includes(slayer.id);
              const isAwakened = slayer.level >= 5;

              return (
                <div key={slayer.id} className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${isSelected ? 'bg-indigo-900/30 border-indigo-500/50' : 'bg-slate-900 border-slate-700'}`}>
                  
                  {/* Selection Checkbox Area */}
                  <button 
                    onClick={() => onToggleSlayer(slayer.id)}
                    className="mr-3 text-slate-400 hover:text-white transition-colors"
                  >
                     {isSelected ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle size={24} />}
                  </button>

                  <div className="flex items-center gap-3 flex-1">
                    <div className={`relative w-10 h-10 rounded-full ${slayer.color} flex items-center justify-center text-white font-bold shadow-md shrink-0`}>
                      {slayer.name.charAt(0)}
                      {isAwakened && <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isSelected ? 'text-indigo-200' : 'text-slate-200'}`}>{slayer.name}</div>
                      <div className="text-xs text-slate-500">Lv. {slayer.level} • {slayer.style}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2 hidden sm:block">
                      <div className="text-xs text-slate-400">HP {slayer.currentHp}/{slayer.maxHp}</div>
                      <div className="text-xs text-slate-400">ATK {slayer.atk}</div>
                    </div>
                    <button 
                      onClick={() => onUpgrade(slayer.id)}
                      disabled={!canUpgrade}
                      className={`px-3 py-1 text-xs rounded border transition-all flex flex-col items-center min-w-[60px] ${canUpgrade ? 'bg-amber-900/40 border-amber-600 text-amber-200 hover:bg-amber-800' : 'bg-slate-800 border-slate-700 text-slate-500 opacity-50'}`}
                    >
                      <span className="font-bold">강화</span>
                      <span className="scale-90">{upgradeCost}G</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// 2. Battle View
const BattleView = ({ 
  player, 
  enemy, 
  onSkillUse, 
  onAwakenSkillUse,
  onRetreat,
  battleLog
}: { 
  player: PlayerState; 
  enemy: Enemy; 
  onSkillUse: (slayerId: string) => void;
  onAwakenSkillUse: (slayerId: string) => void;
  onRetreat: () => void;
  battleLog: string[];
}) => {
  const logEndRef = useRef<HTMLDivElement>(null);
  const [effects, setEffects] = useState<VisualEffect[]>([]);
  
  // Only show slayers that are in the selected party
  const party = player.ownedSlayers.filter(s => player.selectedSlayerIds.includes(s.id));
  const synergies = getSynergies(player.selectedSlayerIds);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLog]);

  // Handle VFX triggering from log updates
  useEffect(() => {
    const lastLog = battleLog[battleLog.length - 1];
    if (lastLog && lastLog.includes('!')) {
        // Quick parsing for visual effects
        const parts = lastLog.split('의 ');
        if (parts.length > 1) {
            const name = parts[0];
            const slayer = party.find(s => s.name === name);
            if (slayer) {
                 const isUltimate = lastLog.includes(slayer.awakenSkill.name);
                 const skillName = isUltimate ? slayer.awakenSkill.name : slayer.skill.name;

                 const newEffect = {
                    id: Date.now(),
                    text: skillName,
                    color: slayer.color,
                    isUltimate
                };
                setEffects(prev => [...prev, newEffect]);
                setTimeout(() => {
                    setEffects(prev => prev.filter(e => e.id !== newEffect.id));
                }, 1500);
            }
        }
    }
  }, [battleLog]);

  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
      
      {/* Visual Effects Layer */}
      <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
         {effects.map(effect => (
             <div key={effect.id} className="absolute animate-bounce-up opacity-0 flex flex-col items-center">
                 <div className={`
                    font-cinzel font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-6 py-2 rounded-lg 
                    ${effect.isUltimate ? 'text-5xl border-2 border-yellow-400 bg-red-900/60' : 'text-3xl border border-white/20 bg-black/50'}
                    backdrop-blur-md
                 `}>
                    {effect.text}
                 </div>
             </div>
         ))}
      </div>

      <style>{`
        @keyframes bounce-up {
            0% { transform: translateY(20px) scale(0.8); opacity: 0; }
            20% { transform: translateY(0) scale(1.1); opacity: 1; }
            80% { transform: translateY(-20px) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(0.9); opacity: 0; }
        }
        .animate-bounce-up {
            animation: bounce-up 1.5s ease-out forwards;
        }
      `}</style>

      {/* Top Bar: Enemy Info */}
      <div className="p-4 bg-black/60 backdrop-blur-md border-b border-red-900/30 flex justify-center items-center z-10 relative flex-col">
        <div className="w-full max-w-2xl text-center">
          <h2 className={`text-2xl font-bold mb-2 flex items-center justify-center gap-2 ${enemy.isBoss ? 'text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-slate-300'}`}>
            <Skull size={24} /> {enemy.name} 
            <span className="text-sm px-2 py-0.5 rounded bg-slate-800 text-slate-400">Lv.{player.stage} ({player.difficulty})</span>
          </h2>
          <ProgressBar current={enemy.currentHp} max={enemy.maxHp} colorClass="bg-red-600" height="h-6" label={`${enemy.currentHp} / ${enemy.maxHp}`}/>
        </div>
      </div>

      {/* Main Battle Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
        {/* Enemy Sprite */}
        <div className={`transition-all duration-300 transform ${enemy.currentHp <= 0 ? 'scale-90 opacity-0 blur-xl' : 'scale-100 opacity-100'}`}>
          <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-black border-4 ${enemy.isBoss ? 'border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.4)]' : 'border-slate-600'} flex items-center justify-center`}>
            <Skull size={100} className={`${enemy.imageColor} animate-pulse`} />
          </div>
        </div>
        
        {/* Active Synergy Pills */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4 pointer-events-none">
          {synergies.map(s => (
             <div key={s.name} className="bg-indigo-900/60 border border-indigo-400/30 text-indigo-200 text-xs px-2 py-1 rounded backdrop-blur-sm">
               ⚡ {s.name}
             </div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Controls & Party */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 pb-8 z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Battle Log (Mini) */}
          <div className="h-20 overflow-y-auto mb-4 bg-black/40 rounded p-2 text-xs font-mono text-slate-400 border border-slate-800/50">
            {battleLog.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Party Cards - Only Selected Slayers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {party.map(slayer => {
              const isDead = slayer.currentHp <= 0;
              const now = Date.now();
              const cooldownRemaining = Math.max(0, Math.ceil((slayer.skillReadyAt - now) / 1000));
              const isReady = cooldownRemaining === 0;

              const awakenCooldownRemaining = Math.max(0, Math.ceil((slayer.awakenSkillReadyAt - now) / 1000));
              const isAwakenReady = awakenCooldownRemaining === 0;
              const isAwakened = slayer.level >= 5;

              return (
                <div 
                  key={slayer.id} 
                  className={`relative p-2 rounded-lg border transition-all ${isDead ? 'bg-red-900/20 border-red-900 grayscale opacity-70' : 'bg-slate-800 border-slate-700'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-slate-300 truncate">{slayer.name}</div>
                    <div className="text-[10px] text-slate-500">Lv.{slayer.level}</div>
                  </div>
                  
                  {/* HP Bar */}
                  <div className="mb-2">
                     <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-green-500 h-full transition-all" style={{ width: `${(slayer.currentHp / slayer.maxHp) * 100}%` }}></div>
                     </div>
                  </div>

                  <div className="flex gap-1">
                    {/* Basic Skill Button */}
                    <button
                        onClick={() => !isDead && isReady && onSkillUse(slayer.id)}
                        disabled={isDead || !isReady}
                        className={`flex-1 py-2 rounded text-[10px] font-bold transition-all relative overflow-hidden group ${
                        isDead ? 'bg-slate-800 text-slate-600' :
                        isReady 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)] border border-indigo-400' 
                            : 'bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed'
                        }`}
                    >
                        {isDead ? 'X' : isReady ? '기술' : `${cooldownRemaining}s`}
                         {/* Cooldown overlay */}
                        {!isReady && !isDead && (
                        <div 
                            className="absolute inset-0 bg-black/20 origin-left"
                            style={{ width: `${(cooldownRemaining / slayer.skill.cooldown) * 100}%` }}
                        ></div>
                        )}
                    </button>

                     {/* Awaken Skill Button */}
                     {isAwakened && (
                        <button
                            onClick={() => !isDead && isAwakenReady && onAwakenSkillUse(slayer.id)}
                            disabled={isDead || !isAwakenReady}
                            className={`flex-1 py-2 rounded text-[10px] font-bold transition-all relative overflow-hidden group ${
                            isDead ? 'bg-slate-800 text-slate-600' :
                            isAwakenReady 
                                ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] border border-red-400' 
                                : 'bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed'
                            }`}
                        >
                            {isDead ? 'X' : isAwakenReady ? '각성' : `${awakenCooldownRemaining}s`}
                            {/* Cooldown overlay */}
                            {!isAwakenReady && !isDead && (
                            <div 
                                className="absolute inset-0 bg-black/20 origin-left"
                                style={{ width: `${(awakenCooldownRemaining / slayer.awakenSkill.cooldown) * 100}%` }}
                            ></div>
                            )}
                        </button>
                     )}
                     {!isAwakened && (
                         <div className="flex-1 flex items-center justify-center bg-black/20 rounded border border-slate-800">
                             <span className="text-[9px] text-slate-600">Lv.5 필요</span>
                         </div>
                     )}
                  </div>
                </div>
              );
            })}
            
            {/* Empty slots placeholders if fewer than 4 */}
            {[...Array(4 - party.length)].map((_, i) => (
                <div key={`empty-${i}`} className="p-2 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center opacity-30">
                    <span className="text-xs text-slate-500">빈 슬롯</span>
                </div>
            ))}
          </div>

          <button 
            onClick={onRetreat} 
            className="mt-4 w-full py-2 text-slate-500 text-sm hover:text-red-400 transition-colors"
          >
            후퇴하기 (Estate로 복귀)
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Recruit View
const RecruitView = ({ 
  player, 
  onBuy, 
  onBack 
}: { 
  player: PlayerState; 
  onBuy: (slayerId: string) => void;
  onBack: () => void;
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-slate-300 hover:text-white">
          <ChevronRight className="rotate-180" /> 돌아가기
        </button>
        <h1 className="text-xl font-cinzel text-white">대원 모집</h1>
        <div className="text-yellow-400 font-mono">{player.gold.toLocaleString()} G</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {SLAYERS_DATA.map(slayer => {
          const isOwned = player.ownedSlayers.some(s => s.id === slayer.id);
          const canAfford = player.gold >= slayer.price;

          return (
            <div key={slayer.id} className={`p-4 rounded-xl border flex gap-4 ${isOwned ? 'bg-slate-800/50 border-slate-700 opacity-50' : 'bg-slate-800 border-slate-600'}`}>
              <div className={`w-16 h-16 rounded-full shrink-0 ${slayer.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                {slayer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-200">{slayer.name}</h3>
                  {isOwned ? (
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-400">보유중</span>
                  ) : (
                    <span className="text-yellow-400 font-mono font-bold">{slayer.price === 0 ? '무료' : `${slayer.price} G`}</span>
                  )}
                </div>
                <div className="text-xs text-indigo-400 mb-1">{slayer.title} • {slayer.style}</div>
                <p className="text-xs text-slate-400 mb-2">{slayer.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-black/20 p-2 rounded">
                    <div>
                        <span className="text-indigo-300 block">기본 기술</span>
                        <span className="text-slate-300">{slayer.skill.name}</span>
                    </div>
                    <div>
                        <span className="text-red-300 block">각성 기술 (Lv.5)</span>
                        <span className="text-slate-300">{slayer.awakenSkill.name}</span>
                    </div>
                </div>
                
                {!isOwned && (
                  <button 
                    onClick={() => onBuy(slayer.id)}
                    disabled={!canAfford}
                    className={`mt-3 w-full py-2 rounded text-sm font-bold transition-all ${canAfford ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                  >
                    영입하기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// --- Main App Logic ---

const App: React.FC = () => {
  // State
  const [view, setView] = useState<'ESTATE' | 'BATTLE' | 'RECRUIT'>('ESTATE');
  
  // Initialize Player State from LocalStorage
  const [player, setPlayer] = useState<PlayerState>(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Robustness: ensure critical arrays exist even if save is malformed/old
        return {
            gold: parsed.gold ?? 0,
            stage: parsed.stage ?? 1,
            difficulty: parsed.difficulty ?? 'NORMAL',
            ownedSlayers: parsed.ownedSlayers ?? [],
            selectedSlayerIds: parsed.selectedSlayerIds ?? []
        };
      }
    } catch (err) {
      console.error("Failed to load save:", err);
    }
    return {
      gold: 0,
      stage: 1,
      difficulty: 'NORMAL',
      ownedSlayers: [],
      selectedSlayerIds: []
    };
  });
  
  // Auto-Save Effect
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(player));
  }, [player]);

  // Initialize with Tanjiro if empty (New Game or reset)
  useEffect(() => {
    if (player.ownedSlayers.length === 0) {
      const tanjiro = SLAYERS_DATA.find(s => s.id === 'tanjiro')!;
      setPlayer(p => ({
        ...p,
        ownedSlayers: [{
          ...tanjiro,
          level: 1,
          currentHp: tanjiro.baseHp,
          maxHp: tanjiro.baseHp,
          atk: tanjiro.baseAtk,
          skillReadyAt: 0,
          awakenSkillReadyAt: 0
        }],
        selectedSlayerIds: ['tanjiro']
      }));
    }
  }, [player.ownedSlayers.length]);

  const resetGameData = () => {
      if(window.confirm("정말로 모든 데이터를 초기화하시겠습니까?")) {
          localStorage.removeItem(SAVE_KEY);
          setPlayer({
              gold: 0,
              stage: 1,
              difficulty: 'NORMAL',
              ownedSlayers: [],
              selectedSlayerIds: []
          });
          window.location.reload();
      }
  };

  // Battle State
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const battleIntervalRef = useRef<number | null>(null);

  // -- Actions --

  const addLog = (msg: string) => {
    setBattleLog(prev => [...prev.slice(-4), msg]);
  };

  const toggleSlayerSelection = (slayerId: string) => {
      setPlayer(prev => {
          const isSelected = prev.selectedSlayerIds.includes(slayerId);
          if (isSelected) {
              return { ...prev, selectedSlayerIds: prev.selectedSlayerIds.filter(id => id !== slayerId) };
          } else {
              if (prev.selectedSlayerIds.length >= 4) return prev; // Max 4
              return { ...prev, selectedSlayerIds: [...prev.selectedSlayerIds, slayerId] };
          }
      });
  };

  const changeDifficulty = (diff: Difficulty) => {
    setPlayer(prev => ({...prev, difficulty: diff}));
  };

  const startPatrol = () => {
    // Enemy scaling logic logic
    const enemyListLength = ENEMY_TEMPLATES.length;
    
    // Calculate Loop and Index
    const loopCount = Math.floor((player.stage - 1) / enemyListLength);
    const enemyIndex = (player.stage - 1) % enemyListLength;

    // Pick template deterministically
    const template = ENEMY_TEMPLATES[enemyIndex];
    
    // Scaling Factors
    // Base scaling for loops:
    // Loop 0: 1.0
    // Loop 1 (Middle): 1.5
    // Loop 2 (High): 2.5
    // Loop 3 (Special): 4.0
    // Loop 4+: 4.0 + (Loop-3)*1.0
    let loopMult = 1.0;
    if (loopCount === 1) loopMult = 1.5;
    else if (loopCount === 2) loopMult = 2.5;
    else if (loopCount === 3) loopMult = 4.0;
    else if (loopCount > 3) loopMult = 4.0 + (loopCount - 3) * 1.5;

    const diffScaling = getDifficultyMultiplier(player.difficulty);
    const finalMultiplier = loopMult * diffScaling;
    
    let prefix = "";
    if (loopCount === 1) prefix = "중등 ";
    else if (loopCount === 2) prefix = "상등 ";
    else if (loopCount === 3) prefix = "특등 ";
    else if (loopCount > 3) prefix = `초월(${loopCount-3}) `;

    // Create enemy instance
    const newEnemy: Enemy = {
      id: Math.random().toString(),
      name: `${prefix}${template.name}`,
      maxHp: Math.floor((template.maxHp || 100) * finalMultiplier),
      currentHp: Math.floor((template.maxHp || 100) * finalMultiplier),
      atk: Math.floor((template.atk || 10) * finalMultiplier),
      rewardGold: Math.floor((template.rewardGold || 50) * finalMultiplier * getRewardMultiplier(player.difficulty)),
      isBoss: template.isBoss || false,
      imageColor: template.imageColor || 'text-gray-500'
    };

    setEnemy(newEnemy);
    setBattleLog([`STAGE ${player.stage} - ${newEnemy.name}가 나타났다!`]);
    setView('BATTLE');
  };

  // Helper to calculate damage with synergies
  const calculateDamage = (slayer: OwnedSlayer, damageMultiplier: number) => {
    const synergies = getSynergies(player.selectedSlayerIds);
    let baseAtk = slayer.atk;
    
    // Apply Synergy Stat Modifications (Pre-calculation logic simulation)
    // In a real sophisticated system, stats would be computed derived values.
    // Here we will apply multipliers on the fly.
    
    // 1. Base Multipliers
    let multiplier = 1.0;
    synergies.forEach(s => {
       const mod = s.apply(slayer.id, { atk: 100, maxHp: 100 }); // Dummy call to check factor
       if (mod.atk !== 100) multiplier *= (mod.atk / 100);
    });

    const totalAtk = baseAtk * multiplier;
    const skillDmg = totalAtk * damageMultiplier;
    
    // Critical Hit
    const isCrit = Math.random() < 0.2;
    const finalDmg = Math.floor(isCrit ? skillDmg * 1.5 : skillDmg);

    return { finalDmg, isCrit };
  };

  const useSkill = (slayerId: string) => {
    if (!enemy || enemy.currentHp <= 0) return;
    
    setPlayer(prev => {
      const newSlayers = prev.ownedSlayers.map(s => {
        if (s.id === slayerId) {
          const { finalDmg, isCrit } = calculateDamage(s, s.skill.damageMultiplier);
          
          setEnemy(e => e ? { ...e, currentHp: Math.max(0, e.currentHp - finalDmg) } : null);
          addLog(`${s.name}의 ${s.skill.name}! ${finalDmg.toLocaleString()} 피해! ${isCrit ? '(치명타!)' : ''}`);
          
          return {
            ...s,
            skillReadyAt: Date.now() + (s.skill.cooldown * 1000)
          };
        }
        return s;
      });
      return { ...prev, ownedSlayers: newSlayers };
    });
  };

  const useAwakenSkill = (slayerId: string) => {
    if (!enemy || enemy.currentHp <= 0) return;

    setPlayer(prev => {
        const newSlayers = prev.ownedSlayers.map(s => {
          if (s.id === slayerId) {
            const { finalDmg, isCrit } = calculateDamage(s, s.awakenSkill.damageMultiplier);
            
            setEnemy(e => e ? { ...e, currentHp: Math.max(0, e.currentHp - finalDmg) } : null);
            addLog(`${s.name}의 ${s.awakenSkill.name}! ${finalDmg.toLocaleString()} 피해! ${isCrit ? '(치명타!)' : ''}`);
            
            return {
              ...s,
              awakenSkillReadyAt: Date.now() + (s.awakenSkill.cooldown * 1000)
            };
          }
          return s;
        });
        return { ...prev, ownedSlayers: newSlayers };
      });
  };

  const buySlayer = (slayerId: string) => {
    const template = SLAYERS_DATA.find(s => s.id === slayerId);
    if (!template) return;
    if (player.gold < template.price) return;
    if (player.ownedSlayers.some(s => s.id === slayerId)) return;

    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - template.price,
      ownedSlayers: [...prev.ownedSlayers, {
        ...template,
        level: 1,
        currentHp: template.baseHp,
        maxHp: template.baseHp,
        atk: template.baseAtk,
        skillReadyAt: 0,
        awakenSkillReadyAt: 0
      }]
    }));
  };

  const upgradeSlayer = (slayerId: string) => {
    setPlayer(prev => {
      const slayer = prev.ownedSlayers.find(s => s.id === slayerId);
      if (!slayer) return prev;
      
      const cost = Math.floor(100 * Math.pow(1.2, slayer.level));
      if (prev.gold < cost) return prev;
      
      const nextLevel = slayer.level + 1;
      
      // HP boost check from synergies? (Simplified: Just base scaling)
      const baseMaxHp = Math.floor(slayer.baseHp * (1 + nextLevel * 0.2));
      const baseAtk = Math.floor(slayer.baseAtk * (1 + nextLevel * 0.15));

      return {
        ...prev,
        gold: prev.gold - cost,
        ownedSlayers: prev.ownedSlayers.map(s => {
          if (s.id === slayerId) {
            return {
              ...s,
              level: nextLevel,
              maxHp: baseMaxHp,
              atk: baseAtk,
              currentHp: baseMaxHp // Full heal on level up
            };
          }
          return s;
        })
      };
    });
  };

  const healAll = () => {
    setPlayer(prev => ({
      ...prev,
      ownedSlayers: prev.ownedSlayers.map(s => ({ ...s, currentHp: s.maxHp }))
    }));
  };

  // -- Loops --

  // Battle Loop
  useEffect(() => {
    if (view !== 'BATTLE' || !enemy) {
      if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
      return;
    }

    battleIntervalRef.current = window.setInterval(() => {
      // 1. Check Win
      if (enemy.currentHp <= 0) {
        addLog(`토벌 완료! ${enemy.rewardGold.toLocaleString()}G 획득`);
        setTimeout(() => {
          setPlayer(p => ({ 
              ...p, 
              gold: p.gold + enemy.rewardGold,
              stage: p.stage + 1 // Advance stage
          }));
          setEnemy(null);
          setView('ESTATE');
        }, 1500);
        return;
      }

      // 2. Check Loss (All slayers dead)
      const partyIds = player.selectedSlayerIds;
      const partyMembers = player.ownedSlayers.filter(s => partyIds.includes(s.id));
      const aliveSlayers = partyMembers.filter(s => s.currentHp > 0);
      
      if (aliveSlayers.length === 0) {
        // Updated: Consolation Gold Logic
        const consolationGold = Math.floor(enemy.rewardGold * 0.1);
        addLog(`전멸... 은(는)폐부대가 ${consolationGold}G를 수습했습니다.`);
        setTimeout(() => {
          setPlayer(p => ({
            ...p,
            gold: p.gold + consolationGold
          }));
          setEnemy(null);
          setView('ESTATE');
        }, 2500);
        return;
      }

      // 3. Combat Round
      // Enemy Attacks a random alive slayer
      const target = aliveSlayers[Math.floor(Math.random() * aliveSlayers.length)];
      
      setPlayer(prev => {
        const newSlayers = prev.ownedSlayers.map(s => {
          return s;
        });

        const updatedSlayers = newSlayers.map(s => {
           if (target && s.id === target.id) {
             const dmg = Math.max(1, enemy.atk - Math.floor(s.level * 2)); 
             return { ...s, currentHp: Math.max(0, s.currentHp - dmg) };
           }
           return s;
        });
        
        return { ...prev, ownedSlayers: updatedSlayers };
      });
      
      // Auto Attack (40% of ATK)
      let totalPlayerDmg = 0;
      aliveSlayers.forEach(s => {
         const { finalDmg } = calculateDamage(s, 0.4);
         totalPlayerDmg += finalDmg;
      });

      setEnemy(prev => {
        if (!prev) return null;
        return { ...prev, currentHp: Math.max(0, prev.currentHp - totalPlayerDmg) };
      });

    }, 1200); // Combat tick

    const uiTicker = setInterval(() => {
       setPlayer(p => ({...p})); 
    }, 100);

    return () => {
      if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
      clearInterval(uiTicker);
    };
  }, [view, enemy, player.ownedSlayers, player.selectedSlayerIds]);


  // -- Render --

  if (view === 'ESTATE') {
    return (
      <EstateView 
        player={player}
        onStartPatrol={startPatrol}
        onHealAll={healAll}
        onRecruit={() => setView('RECRUIT')}
        onUpgrade={upgradeSlayer}
        onToggleSlayer={toggleSlayerSelection}
        onChangeDifficulty={changeDifficulty}
        onResetData={resetGameData}
      />
    );
  }

  if (view === 'RECRUIT') {
    return (
      <RecruitView 
        player={player}
        onBuy={buySlayer}
        onBack={() => setView('ESTATE')}
      />
    );
  }

  if (view === 'BATTLE' && enemy) {
    return (
      <BattleView 
        player={player}
        enemy={enemy}
        onSkillUse={useSkill}
        onAwakenSkillUse={useAwakenSkill}
        onRetreat={() => {
          setEnemy(null);
          setView('ESTATE');
        }}
        battleLog={battleLog}
      />
    );
  }

  return <div className="bg-black text-white h-screen flex items-center justify-center">Loading...</div>;
};

export default App;
