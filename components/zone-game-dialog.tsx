'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpenCheck,
  Check,
  CircleDot,
  Droplets,
  Fish,
  Headphones,
  MapPin,
  RotateCcw,
  Sparkles,
  Waves,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ZoneGameDialogProps = {
  zoneIndex: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (zoneIndex: number) => void;
};

const gameMeta = [
  { title: '拈鬮分家模擬器', eyebrow: '展區 01 · 古契任務', color: '#bddd43', instruction: '選一支鬮，看看你分到的家產與水權。' },
  { title: '永月圳 2/5 分水', eyebrow: '展區 02 · 分水任務', color: '#75d4ed', instruction: '調整水閘，從主流精準抽出五分之二。' },
  { title: '洗衫坑聲景判讀', eyebrow: '展區 03 · 生活任務', color: '#ffcb47', instruction: '從生活聲景與用水公德找出正確位置。' },
  { title: '客庄風水師', eyebrow: '展區 04 · 守水任務', color: '#ff8069', instruction: '依照水流起訖，找出伯公守護的兩個節點。' },
  { title: '金鴨母捉泥鰍', eyebrow: '展區 05 · 神話任務', color: '#c9a6f3', instruction: '追上金泥鰍，解開濁水傳說背後的自然線索。' },
  { title: '消失的千塘', eyebrow: '展區 06 · 當代任務', color: '#73d8b1', instruction: '拖動時光滑桿，觀察埤塘角色如何改變。' },
];

const lots = [
  { name: '田園與水分額', note: '土地與灌溉權一起記入契約，可轉讓也可繼承。' },
  { name: '伙房空間', note: '家屋依房份分配，抽籤降低爭議，但仍由契約約束。' },
  { name: '公嘗', note: '保留為共同祭祖的資產，不分入個人名下。' },
];

const timeline = [
  { max: 20, era: '1920年代', title: '埤塘密布', note: '分散的小型埤塘承接雨水、山泉與家族水權。' },
  { max: 45, era: '大圳興築', title: '水網整併', note: '大型公共水利系統開始串接原有埤塘。' },
  { max: 70, era: '直灌普及', title: '廢溜開墾', note: '部分埤塘解除限制，逐步填平為農地或建地。' },
  { max: 90, era: '都市擴張', title: '水景斷裂', note: '交通與都市建設改變傳統水路的功能與記憶。' },
  { max: 100, era: '今日', title: '重新共生', note: '保留埤塘、滯洪與生態農業，讓水再次成為韌性資源。' },
];

export function ZoneGameDialog({ zoneIndex, open, onOpenChange, onComplete }: ZoneGameDialogProps) {
  const [lot, setLot] = useState<number | null>(null);
  const [share, setShare] = useState(20);
  const [lifeAnswer, setLifeAnswer] = useState('');
  const [soundClue, setSoundClue] = useState('');
  const [guardians, setGuardians] = useState<string[]>([]);
  const [fishPosition, setFishPosition] = useState(4);
  const [fishScore, setFishScore] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!open) return;
    setLot(null);
    setShare(20);
    setLifeAnswer('');
    setSoundClue('');
    setGuardians([]);
    setFishPosition(4);
    setFishScore(0);
    setTime(0);
  }, [open, zoneIndex]);

  const completed = useMemo(() => {
    if (zoneIndex === 0) return lot !== null;
    if (zoneIndex === 1) return share === 40;
    if (zoneIndex === 2) return lifeAnswer === '下游';
    if (zoneIndex === 3) return guardians.includes('水頭') && guardians.includes('水尾') && guardians.length === 2;
    if (zoneIndex === 4) return fishScore >= 5;
    if (zoneIndex === 5) return time >= 100;
    return false;
  }, [fishScore, guardians, lifeAnswer, lot, share, time, zoneIndex]);

  useEffect(() => {
    if (completed && zoneIndex !== null) onComplete(zoneIndex);
  }, [completed, onComplete, zoneIndex]);

  if (zoneIndex === null) return null;
  const meta = gameMeta[zoneIndex];

  function toggleGuardian(place: string) {
    setGuardians((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  function catchFish() {
    if (fishScore >= 5) return;
    setFishScore((score) => score + 1);
    setFishPosition((position) => (position + 4) % 9);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[30px] border-[3px] border-[#143f4f] bg-[#fff9e9] p-0 shadow-[0_10px_0_#143f4f] sm:max-w-2xl">
        <DialogHeader style={{ backgroundColor: meta.color }} className="border-b-[3px] border-[#143f4f] p-6 pr-14 text-left sm:p-8">
          <Badge className="h-auto w-fit border-2 border-[#143f4f] bg-white px-3 py-1 font-black text-[#143f4f]">{meta.eyebrow}</Badge>
          <DialogTitle className="mt-3 text-3xl font-black leading-tight text-[#143f4f] sm:text-4xl">{meta.title}</DialogTitle>
          <DialogDescription className="font-bold text-[#315b65]">{meta.instruction}</DialogDescription>
        </DialogHeader>

        <div className="p-5 sm:p-8">
          {zoneIndex === 0 && (
            <div>
              <div className="grid grid-cols-3 gap-3">
                {lots.map((item, index) => (
                  <button key={item.name} onClick={() => setLot(index)} className={`min-h-40 rounded-2xl border-2 border-[#143f4f] p-4 text-center font-black transition hover:-translate-y-1 ${lot === index ? 'bg-[#bddd43] shadow-[0_4px_0_#143f4f]' : 'bg-white'}`}>
                    <span className="mx-auto grid size-10 place-items-center rounded-full border-2 border-[#143f4f] bg-[#ffcb47]">{lot === index ? <Check /> : '?'}</span>
                    <span className="mt-5 block">第 {index + 1} 支鬮</span>
                  </button>
                ))}
              </div>
              {lot !== null && <ResultBox title={`你抽到：${lots[lot].name}`} text={lots[lot].note} />}
              <p className="mt-5 text-xs font-medium leading-6 text-[#6c8188]">分鬮不是只有運氣：抽籤之後仍需由長輩、公親與契約共同見證，讓家產、水權與公嘗各有依據。</p>
            </div>
          )}

          {zoneIndex === 1 && (
            <div>
              <div className="rounded-3xl border-2 border-[#143f4f] bg-white p-6 shadow-[0_4px_0_#143f4f]">
                <div className="flex items-center justify-between"><span className="font-black">隘寮溪主流</span><strong className="text-4xl font-black text-[#16817c]">{share}%</strong></div>
                <input type="range" min="0" max="100" step="5" value={share} onChange={(event) => setShare(Number(event.target.value))} className="water-range mt-6 w-full accent-[#148781]" aria-label="永月圳分水比例" />
                <div className="mt-3 flex justify-between text-xs font-bold text-[#73858b]"><span>不引水</span><span>目標 2/5</span><span>全數引走</span></div>
              </div>
              {share === 40 ? <ResultBox title="分水成功：正好 2/5！" text="讓水不是把剩水送人，而是以份額與契約建立長期共用的水權關係。" /> : <HintBox text={share < 40 ? `還差 ${40 - share}% 才能抵達新東勢庄。` : `多取了 ${share - 40}%，下游權利也需要被照顧。`} />}
            </div>
          )}

          {zoneIndex === 2 && (
            <div>
              <p className="font-black">聲景字幕線索</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  ['流水', '上游泉水清澈，居民共同維護。'],
                  ['搥衣', '洗衣勞動形成相遇與交換消息的節奏。'],
                  ['交談', '洗衫坑也被稱為庄頭的「意見交換所」。'],
                ].map(([name, clue]) => <button key={name} onClick={() => setSoundClue(clue)} className="rounded-2xl border-2 border-[#143f4f] bg-white p-4 text-left font-black hover:bg-[#ffefb7]"><Headphones className="mb-4" />{name}</button>)}
              </div>
              {soundClue && <HintBox text={soundClue} />}
              <p className="mt-7 font-black">沾滿泥土的農具應在哪裡清洗，才符合「洗當淨」？</p>
              <div className="mt-3 grid grid-cols-3 gap-3">{['上游','洗衫坑','下游'].map((answer) => <button key={answer} onClick={() => setLifeAnswer(answer)} className={`rounded-2xl border-2 border-[#143f4f] p-4 font-black ${lifeAnswer === answer ? answer === '下游' ? 'bg-[#bddd43]' : 'bg-[#ffad9d]' : 'bg-white'}`}>{answer}</button>)}</div>
              {lifeAnswer && (lifeAnswer === '下游' ? <ResultBox title="判讀成功：到下游清洗" text="居民主動避開上游與洗衣空間，讓共同使用的水保持清澈。" /> : <HintBox text="再想一次：泥沙會沿著水流影響下方使用者。" />)}
            </div>
          )}

          {zoneIndex === 3 && (
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['水頭', '取水口，護佑水源'],
                  ['庄心', '聚落中央生活空間'],
                  ['水尾', '出水口，守住水路'],
                ].map(([place, note]) => <button key={place} onClick={() => toggleGuardian(place)} className={`rounded-2xl border-2 border-[#143f4f] p-5 text-left transition ${guardians.includes(place) ? 'bg-[#ff8069] text-white shadow-[0_4px_0_#143f4f]' : 'bg-white hover:bg-[#ffe0d9]'}`}><MapPin className="mb-5" /><span className="block text-xl font-black">{place}</span><span className="mt-1 block text-xs font-bold opacity-70">{note}</span></button>)}
              </div>
              {completed ? <ResultBox title="水路守護完成！" text="水頭與水尾伯公標記水從哪裡進、往哪裡去，也提醒庄民共同維護圳路。" /> : <HintBox text="請選兩個位置：一位守住水源入口，一位鎮守水流出口。" />}
            </div>
          )}

          {zoneIndex === 4 && (
            <div>
              <div className="mb-4 flex items-center justify-between"><p className="font-black">找到金泥鰍</p><span className="rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-4 py-2 text-sm font-black">{fishScore} / 5</span></div>
              <div className="grid grid-cols-3 gap-3 rounded-3xl border-2 border-[#143f4f] bg-[#75d4ed]/45 p-4">
                {Array.from({ length: 9 }, (_, index) => <button key={index} onClick={index === fishPosition ? catchFish : undefined} className={`grid aspect-square place-items-center rounded-2xl border-2 border-[#143f4f] transition ${index === fishPosition ? 'bg-[#ffcb47] hover:scale-105' : 'bg-white/65'}`} aria-label={index === fishPosition ? '金泥鰍，點擊捕捉' : '溪水'}>{index === fishPosition ? <Fish className="size-8 text-[#9c6414]" /> : <Waves className="size-5 text-[#65a9ba]" />}</button>)}
              </div>
              {completed ? <ResultBox title="神話圖鑑已解鎖！" text="傳說以金鴨母戲水解釋濁流；現代研究則從颱風、地質沖刷與河川改道理解大甲溪。兩種說法需要清楚分層。" /> : <HintBox text="金泥鰍每次被找到都會換位置；用滑鼠、觸控或 Tab 鍵繼續追。" />}
            </div>
          )}

          {zoneIndex === 5 && (
            <div>
              <div className="overflow-hidden rounded-3xl border-2 border-[#143f4f] bg-[#143f4f] text-white">
                <div className="relative min-h-52 p-6 sm:p-8">
                  <img src="/exhibits/zone-6.jpg" alt="埤塘地景變遷示意" className="absolute inset-0 h-full w-full object-cover opacity-45" style={{ filter: `grayscale(${time}%) contrast(${100 + time / 3}%)` }} />
                  <div className="relative max-w-sm"><p className="text-sm font-black text-[#b9ecf6]">{timeline.find((item) => time <= item.max)?.era}</p><h3 className="mt-2 text-3xl font-black">{timeline.find((item) => time <= item.max)?.title}</h3><p className="mt-3 font-medium leading-7 text-white/80">{timeline.find((item) => time <= item.max)?.note}</p></div>
                </div>
              </div>
              <label className="mt-6 block"><span className="mb-3 flex justify-between text-xs font-black"><span>1920年代</span><span>拖到今日</span></span><input type="range" min="0" max="100" step="5" value={time} onChange={(event) => setTime(Number(event.target.value))} className="water-range w-full accent-[#148781]" aria-label="埤塘地景時光滑桿" /></label>
              <p className="mt-3 text-[11px] font-medium text-[#73858b]">本互動為策展概念示意，非精確歷史航照疊圖。</p>
              {completed && <ResultBox title="走到今日：重新學習與水共生" text="埤塘不只是一段失去的歷史，也能成為滯洪、棲地與地方記憶的當代資源。" />}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-[#143f4f]/20 pt-5">
            <div className="flex items-center gap-2 text-sm font-black" aria-live="polite">{completed ? <><span className="grid size-8 place-items-center rounded-full bg-[#bddd43]"><Check className="size-4" /></span>水紋線索已收集</> : <><CircleDot className="size-5 text-[#16817c]" />完成任務即可收集線索</>}</div>
            <Button onClick={() => { setLot(null); setShare(20); setLifeAnswer(''); setSoundClue(''); setGuardians([]); setFishPosition(4); setFishScore(0); setTime(0); }} variant="outline" className="rounded-full border-2 border-[#143f4f] bg-white font-black"><RotateCcw />重新挑戰</Button>
          </div>

          <div className="mt-5 rounded-2xl border-2 border-[#143f4f]/20 bg-white/60 p-4 text-xs font-medium leading-6 text-[#607880]"><BookOpenCheck className="mr-2 inline size-4" />互動依《服務建議書修訂版 v0.6》轉譯；AR、VR、鏡頭、麥克風與實體核銷屬條件式加值，須經機關核定後啟用。</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultBox({ title, text }: { title: string; text: string }) {
  return <div className="mt-5 rounded-2xl border-2 border-[#143f4f] bg-[#bddd43] p-5 shadow-[0_3px_0_#143f4f]"><p className="flex items-center gap-2 font-black"><Sparkles className="size-5" />{title}</p><p className="mt-2 text-sm font-medium leading-6 text-[#34555e]">{text}</p></div>;
}

function HintBox({ text }: { text: string }) {
  return <div className="mt-5 flex gap-3 rounded-2xl border-2 border-[#143f4f]/25 bg-white p-4 text-sm font-bold leading-6 text-[#55717a]"><Droplets className="mt-0.5 size-5 shrink-0 text-[#16817c]" />{text}</div>;
}
