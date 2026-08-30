'use client';

import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Bot, Check, Droplet, Droplets, ExternalLink, Flag, MapPinned, Send, ShieldCheck, Sparkles, Sprout, Star, Volume2, VolumeX, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type AssistantMode = '互動導覽' | '華語' | 'English';
type ChatMessage = { role: 'assistant' | 'user'; text: string };

const zones = [
  { id: 'zone-1', index: '01', verb: '造水 · 分水', title: '算水為財的北部丘陵', subtitle: '一滴水，如何成為可繼承的資產？', description: '桃竹苗田高水低，客家先民以埤塘、穿龍洞與水甲會，把不穩定的雨水轉成可計量、可協商、可繼承的水分額。', interaction: '拈鬮分水模擬', clue: '水分額', image: '/exhibits/zone-1.jpg', alt: '清光緒年間分鬮書，記載埤塘水分額與水圳', credit: '清光緒16年陳惟炎兄弟分鬮書／陳壂全提供', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1458&MenuID=1&SubID=3', color: '#bddd43', ink: '#173f3c' },
  { id: 'zone-2', index: '02', verb: '分水 · 守水', title: '延水結柵的六堆平原', subtitle: '水少時，誰先用？如何才公平？', description: '六堆平原以水圳串連灌溉、庄界與防禦。讓水十二份與輪水番，留下跨庄、跨族群協商有限水源的共同秩序。', interaction: '輪水番談判', clue: '輪水番', image: '/exhibits/zone-2.jpg', alt: '伯公廟後方的泗浚圳，水流穿越六堆聚落', credit: '泗浚圳／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=2573&MenuID=11&SubID=29&pageNums=6', color: '#75d4ed', ink: '#153d50' },
  { id: 'zone-3', index: '03', verb: '用水 · 共水', title: '洗衫坑與生活水民俗', subtitle: '水邊，也是客庄的社群網路。', description: '北部洗衫坑是勞動、情報與用水公德的公共空間；南部大風草水則守護產後身體。一外一內，水都進入日常記憶。', interaction: '洗衫坑聽音辨位', clue: '洗當淨', image: '/exhibits/zone-3.jpg', alt: '黃滿嬌在內灣東窩溪洗衫', credit: '黃滿嬌於內灣東窩溪洗衫／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1200&MenuID=6&SubID=24&pageNums=2', color: '#ffcb47', ink: '#513b12' },
  { id: 'zone-4', index: '04', verb: '守水 · 敬水', title: '守水的神與成神的人', subtitle: '水口為何總有一位守護者？', description: '北部水頭、水尾伯公標記圳路起訖；南部則把開圳有功或犧牲的人奉為水利恩公。神與人一起守住水路與庄頭。', interaction: '客庄風水師', clue: '水口伯公', image: '/exhibits/zone-4.jpg', alt: '上四座屋圳一號隧道旁的水口伯公廟', credit: '一號隧道水口伯公／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1', color: '#ff8069', ink: '#55291f' },
  { id: 'zone-5', index: '05', verb: '傳水 · 想像', title: '客庄水神話與奇幻傳說', subtitle: '當旱災與濁流，長出神話的形狀。', description: '伯公鏡、金鴨母與神農大帝祭水，把泉湧、濁流與洪患轉化為可傳述的奇幻記憶，也保存先民敬畏自然的尺度。', interaction: '神話圖鑑蒐集', clue: '金鴨母', image: '/exhibits/zone-5.jpg', alt: '埤塘前的石板伯公正面', credit: '橫山蔗廍埤塘前石板伯公／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1181&MenuID=1&SubID=3', color: '#c9a6f3', ink: '#3f2d55' },
  { id: 'zone-6', index: '06', verb: '修水 · 共生', title: '當代水景的現代性斷裂', subtitle: '工程結束後，水的故事才正要改寫。', description: '大圳、堤防與都市化重新分配水的風險與記憶。從消失的埤塘到野蓮田，人們再次學習把洪水轉化為生態共生的可能。', interaction: '消失的千塘滑桿', clue: '與水共生', image: '/exhibits/zone-6.jpg', alt: '上四座屋圳末端保留的埤塘', credit: '上四座屋圳末端埤塘／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1', color: '#73d8b1', ink: '#17473b' },
];

const commitments = ['理解一條家鄉水路，讓地方記憶被看見。', '珍惜水與土地，實踐敬天惜物的生活。', '把客庄故事說給下一代，讓文化持續流動。'];

function assistantReply(question: string, mode: AssistantMode) {
  const query = question.toLowerCase();
  if (mode === 'English') {
    if (query.includes('bogong') || query.includes('god') || query.includes('guardian')) return 'Bogong shrines stand by canal heads, tails, and water gates. They mark where water enters or leaves a settlement and turn shared maintenance into a relationship of gratitude and guardianship.';
    if (query.includes('water right') || query.includes('contract') || query.includes('share')) return 'In northern Hakka settlements, water was measured as shares and recorded in family division contracts. A flowing resource became an asset that could be negotiated, inherited, and maintained together.';
    return 'This exhibition follows five cultural actions: reading water, making water usable, sharing it, guarding it, and living with it. Try asking about water rights, Bogong, laundry ponds, or the north–south contrast.';
  }
  if (query.includes('伯公') || query.includes('守水') || query.includes('神')) return '水頭、水尾與圳口伯公不只是廟宇，也像水路的地標：提醒庄民水從哪裡來、往哪裡去，以及誰要共同維護。南部也有把開圳英雄奉為「水利恩公」的信仰。';
  if (query.includes('水權') || query.includes('分鬮') || query.includes('契約') || query.includes('水分額')) return '北部客庄把水量折算成「水分額」，寫進分鬮書與田契。水因此能和土地一起轉讓、繼承，也必須由水甲會共同出工清圳。';
  if (query.includes('南北') || query.includes('六堆') || query.includes('丘陵')) return '北部桃竹苗田高水低，重點是蓄水、穿山與精算份額；南部六堆河網漫流，重點是延水、輪灌、庄界與防禦。方法不同，共同核心都是協商有限水源。';
  if (query.includes('洗衫') || query.includes('大風草') || query.includes('生活')) return '洗衫坑既是洗衣場所，也是交換消息與維持用水秩序的公共空間；六堆的大風草水則把水帶進產後照護與身體記憶。';
  if (query.includes('金鴨母') || query.includes('神話') || query.includes('傳說')) return '「金鴨母」以神獸戲水、攪動溪底泥沙的故事，解釋大甲溪常年濁流與氾濫改道，也保存人們對母親河既親近又敬畏的情感。';
  if (mode === '互動導覽') return '建議先收集六區的水紋線索，再到「分水實驗室」調整農田、家戶與生態的用水比例。完成後，你會得到自己的共水宣言。';
  return '水水客庄以「辨水、造水、分水、守水、共水」五個動詞理解客庄。你可以問我：水權怎麼分、伯公為何守水口、南北客庄有何不同，或金鴨母是誰。';
}

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [path, setPath] = useState<'north' | 'south' | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('互動導覽');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', text: '𠊎係水水客庄小幫手！想從哪條水路開始？也可以直接問水權、伯公或南北客庄的差異。' }]);
  const [water, setWater] = useState({ farming: 45, homes: 30, ecology: 25 });
  const [commitment, setCommitment] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const waterTotal = water.farming + water.homes + water.ecology;
  const progress = Math.round((visited.length / zones.length) * 100);
  const allocationStatus = useMemo(() => {
    if (waterTotal > 100) return `超出 ${waterTotal - 100}%：下游已經沒有水了。`;
    if (waterTotal < 100) return `還有 ${100 - waterTotal}% 尚未分配，可以留給旱季。`;
    if (water.ecology < 15) return '總量剛好，但河川生態承受過大壓力。再協商一次？';
    if (water.homes < 20) return '總量剛好，但家戶基本用水不足。公平不只看數字。';
    return '分水成功！農作、生活與生態都保有基本韌性。';
  }, [water, waterTotal]);

  useEffect(() => () => { if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current); audioRef.current?.pause(); }, []);

  async function toggleWaterSound() {
    const audio = audioRef.current; if (!audio) return;
    if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
    if (soundOn) {
      setSoundOn(false);
      fadeTimerRef.current = window.setInterval(() => { audio.volume = Math.max(0, audio.volume - 0.06); if (audio.volume <= 0.01) { audio.pause(); audio.volume = 0; if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current); fadeTimerRef.current = null; } }, 40);
      return;
    }
    audio.volume = 0;
    try { await audio.play(); setSoundOn(true); fadeTimerRef.current = window.setInterval(() => { audio.volume = Math.min(0.38, audio.volume + 0.035); if (audio.volume >= 0.38) { if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current); fadeTimerRef.current = null; } }, 45); } catch { setSoundOn(false); }
  }

  function beginJourney(selectedPath?: 'north' | 'south') { if (selectedPath) setPath(selectedPath); document.querySelector('#exhibition')?.scrollIntoView({ behavior: 'smooth' }); }
  function collectClue(zoneId: string) { setVisited((current) => current.includes(zoneId) ? current.filter((item) => item !== zoneId) : [...current, zoneId]); }
  function submitQuestion(event: FormEvent) { event.preventDefault(); const clean = question.trim(); if (!clean) return; setMessages((current) => [...current, { role: 'user', text: clean }, { role: 'assistant', text: assistantReply(clean, assistantMode) }]); setQuestion(''); }
  function askQuick(text: string) { setMessages((current) => [...current, { role: 'user', text }, { role: 'assistant', text: assistantReply(text, assistantMode) }]); }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <audio ref={audioRef} src="/audio/trix_records198-water-flowing-sound-327661.mp3" loop preload="none" aria-hidden="true" />
      <section className="relative isolate min-h-screen overflow-hidden">
        <img src="/water-key-visual.png" alt="水流穿越北部丘陵與南部平原，匯聚成客庄共同水脈" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,42,58,.94)_0%,rgba(7,42,58,.64)_44%,rgba(7,42,58,.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#082f3d]/88 to-transparent" />
        <div className="pointer-events-none absolute -left-12 top-1/4 size-40 rounded-full border-[22px] border-[#bddd43]/65 blur-[1px] motion-safe:animate-[bob_5s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute right-[8%] top-[18%] size-20 rounded-[42%_58%_52%_48%] bg-[#ffcb47]/85 motion-safe:animate-[bob_4s_ease-in-out_infinite_reverse]" />
        <header className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="sticker-shadow flex items-center gap-3 rounded-full border-2 border-[#113f50] bg-[#fff9e9] px-3 py-2 text-[#113f50]" aria-label="水水客庄首頁"><span className="grid size-10 place-items-center rounded-full bg-[#75d4ed] font-black">水</span><span className="pr-2"><span className="block text-base font-black tracking-[0.12em]">水水客庄</span><span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] opacity-60 sm:block">Waterways of Hakka Villages</span></span></a>
          <div className="flex items-center gap-2"><a href="#exhibition" className="hidden rounded-full border-2 border-white/70 bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25 md:block">六大任務</a><Button onClick={toggleWaterSound} className="sticker-shadow h-11 rounded-full border-2 border-[#113f50] bg-[#ffcb47] px-4 font-black text-[#173c4c] hover:bg-[#ffda78]" aria-pressed={soundOn}>{soundOn ? <Volume2 /> : <VolumeX />}{soundOn ? '水聲 ON' : '水聲 OFF'}</Button></div>
        </header>
        <div id="top" className="mx-auto flex min-h-[calc(100vh-86px)] w-full max-w-[1480px] items-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <div className="grid w-full gap-9 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div className="max-w-4xl text-white">
              <div className="mb-5 flex flex-wrap gap-2">{['#古文書', '#水圳', '#伯公', '#互動策展'].map((tag, index) => <span key={tag} className={`rounded-full border-2 border-[#123d4f] px-3 py-1.5 text-xs font-black text-[#173c4c] sticker-mini ${['bg-[#bddd43]','bg-[#75d4ed]','bg-[#ffcb47]','bg-[#ff8069]'][index]}`}>{tag}</span>)}</div>
              <p className="mb-4 flex items-center gap-3 text-sm font-black tracking-[0.16em] text-[#b9ecf6]"><Droplet className="size-5 fill-current" />一滴水的兩種地景</p>
              <h1 className="hero-title text-[clamp(3.4rem,8vw,8rem)] font-black leading-[.9] tracking-[-.055em]">跟著水，<br />發現客庄！</h1>
              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-white/88 sm:text-lg">左邊穿過桃竹苗丘陵，右邊展開在六堆平原。選一條水路，收集六枚線索，看一滴水怎麼把人連成庄。</p>
            </div>
            <aside className="sticker-shadow rounded-[30px] border-[3px] border-[#153e4d] bg-[#fff5d5] p-5 text-[#153e4d] sm:p-6 lg:-rotate-1">
              <div className="flex items-center justify-between"><div><p className="text-xs font-black tracking-[.16em] text-[#23858a]">START HERE</p><h2 className="mt-1 text-2xl font-black">選一條水路出發</h2></div><span className="grid size-12 place-items-center rounded-full bg-[#ff8069] text-white"><MapPinned /></span></div>
              <div className="mt-5 grid grid-cols-2 gap-3"><button onClick={() => beginJourney('north')} className={`path-card rounded-2xl border-2 border-[#153e4d] p-4 text-left ${path === 'north' ? 'bg-[#75d4ed]' : 'bg-white'} hover:bg-[#bdebf7]`}><span className="text-[10px] font-black tracking-[.15em] opacity-55">NORTH · 北</span><span className="mt-7 block text-xl font-black">丘陵蓄水</span><span className="mt-1 block text-xs font-medium opacity-65">算水為財，穿山引流</span></button><button onClick={() => beginJourney('south')} className={`path-card rounded-2xl border-2 border-[#153e4d] p-4 text-left ${path === 'south' ? 'bg-[#bddd43]' : 'bg-white'} hover:bg-[#d9ed91]`}><span className="text-[10px] font-black tracking-[.15em] opacity-55">SOUTH · 南</span><span className="mt-7 block text-xl font-black">平原分水</span><span className="mt-1 block text-xs font-medium opacity-65">延水結柵，輪番共用</span></button></div>
              <Button onClick={() => beginJourney()} className="mt-4 h-13 w-full rounded-full border-2 border-[#153e4d] bg-[#167f79] text-base font-black text-white hover:bg-[#126d69]">開始水路任務 <ArrowDown /></Button><p className="mt-3 text-center text-[11px] font-bold opacity-55">六大關卡 · 約 15 分鐘 · 可隨時靜音</p>
            </aside>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b-2 border-[#143f4f] bg-[#fff9e9]/95 backdrop-blur-xl" aria-label="展覽導覽"><div className="mx-auto flex max-w-[1480px] items-center gap-4 px-5 py-3 sm:px-8 lg:px-12"><a href="#top" className="flex items-center gap-2 font-black tracking-[.08em]"><span className="grid size-8 place-items-center rounded-full bg-[#75d4ed]"><Droplet className="size-4 fill-current" /></span>水水客庄</a><div className="hidden items-center gap-1 xl:flex">{zones.map((zone) => <a key={zone.id} href={`#${zone.id}`} className="rounded-full px-3 py-2 text-xs font-bold text-[#58707a] transition hover:bg-[#bddd43]/45 hover:text-[#143f4f]">{zone.index} {zone.title.split('的')[0]}</a>)}</div><div className="ml-auto min-w-32 sm:w-52"><Progress value={progress} className="gap-1.5 [&_[data-slot=progress-indicator]]:bg-[#1ba29a] [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:border [&_[data-slot=progress-track]]:border-[#153e4d]/20 [&_[data-slot=progress-track]]:bg-[#dce9dc]"><ProgressLabel className="text-[11px] font-black">任務進度 {visited.length}/6</ProgressLabel><ProgressValue className="text-[11px] font-black" /></Progress></div></div></nav>

      <section id="exhibition" className="soft-grid relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end"><div><Badge className="sticker-mini h-auto rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-4 py-2 font-black text-[#143f4f]"><Flag /> WATERWAY QUEST · 水路任務</Badge><h2 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">六大展區，<br /><span className="text-[#148781]">等你解鎖！</span></h2></div><p className="max-w-3xl text-lg font-medium leading-9 text-[#4e6974]">客庄是在看懂地形、造出水路、協商份額、共同守護與回應環境的行動中形成。每完成一區，就收下一枚水紋線索。</p></div>
          <div className="relative mt-12 rounded-[26px] border-2 border-[#143f4f] bg-white p-4 sticker-mini sm:p-6"><div className="absolute left-[8%] right-[8%] top-1/2 hidden border-t-2 border-dashed border-[#143f4f]/30 md:block" /><div className="relative grid grid-cols-3 gap-3 md:grid-cols-6">{zones.map((zone) => { const collected = visited.includes(zone.id); return <a href={`#${zone.id}`} key={zone.id} className="group flex flex-col items-center gap-2 text-center"><span style={{ backgroundColor: collected ? zone.color : '#fff9e9' }} className="grid size-12 place-items-center rounded-full border-2 border-[#143f4f] text-sm font-black transition group-hover:-translate-y-1 sm:size-14">{collected ? <Check className="size-5" /> : zone.index}</span><span className="text-[11px] font-black text-[#58707a]">{collected ? zone.clue : `任務 ${zone.index}`}</span></a>; })}</div></div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {zones.map((zone, index) => { const collected = visited.includes(zone.id); return (
              <article id={zone.id} key={zone.id} className={`mission-card scroll-mt-28 overflow-hidden rounded-[30px] border-[3px] border-[#143f4f] bg-white ${index % 3 === 1 ? 'xl:translate-y-6' : ''}`}>
                <div className="relative m-3 overflow-hidden rounded-[20px] border-2 border-[#143f4f]"><img src={zone.image} alt={zone.alt} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#092d3e]/90 to-transparent px-4 pb-4 pt-12 text-[10px] leading-4 text-white/75">{zone.credit}</div><span style={{ backgroundColor: zone.color, color: zone.ink }} className="absolute left-3 top-3 grid size-14 -rotate-6 place-items-center rounded-full border-2 border-[#143f4f] text-xl font-black sticker-mini">{zone.index}</span></div>
                <div className="flex min-h-[360px] flex-col p-5 pt-3 sm:p-6 sm:pt-3"><div className="flex flex-wrap gap-2"><Badge style={{ backgroundColor: zone.color, color: zone.ink }} className="h-auto border-2 border-[#143f4f] px-3 py-1 font-black">{zone.verb}</Badge><Badge variant="outline" className="h-auto border-2 border-[#143f4f]/25 px-3 py-1 font-bold text-[#38727a]">PLAY!</Badge></div><h3 className="mt-5 text-3xl font-black leading-tight tracking-[-.02em]">{zone.title}</h3><p className="mt-3 font-black text-[#e65e4b]">{zone.subtitle}</p><p className="mt-4 text-sm font-medium leading-7 text-[#58707a]">{zone.description}</p><div className="mt-auto pt-6"><div className="flex items-center justify-between border-t-2 border-dashed border-[#143f4f]/20 pt-5"><div><p className="text-[10px] font-black tracking-[.14em] text-[#7a9097]">互動挑戰</p><p className="mt-1 font-black">{zone.interaction}</p></div><Button onClick={() => collectClue(zone.id)} variant="outline" size="icon" className={`size-12 rounded-full border-2 border-[#143f4f] ${collected ? 'bg-[#bddd43]' : 'bg-[#75d4ed]'} hover:bg-[#ffcb47]`} aria-label={collected ? `取消線索 ${zone.clue}` : `收下線索 ${zone.clue}`}>{collected ? <Check /> : <Droplets />}</Button></div><div className="mt-4 flex items-center justify-between gap-3"><button onClick={() => collectClue(zone.id)} className="flex items-center gap-1 text-sm font-black text-[#137f79] hover:underline">{collected ? `已解鎖：${zone.clue}` : '解鎖水紋線索'} <ArrowRight className="size-4" /></button><a href={zone.source} target="_blank" rel="noreferrer" className="text-[#748a92] hover:text-[#143f4f]" aria-label="查看典藏來源"><ExternalLink className="size-4" /></a></div></div></div>
              </article>
            ); })}
          </div>
        </div>
      </section>

      <section id="play" className="relative overflow-hidden bg-[#73d4ed] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="absolute -left-24 top-20 size-64 rounded-full border-[40px] border-[#bddd43]/70" /><div className="absolute -right-20 bottom-10 size-72 rounded-full bg-[#ffcb47]/70" /><div className="relative mx-auto max-w-[1480px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-24"><Badge className="sticker-mini h-auto border-2 border-[#143f4f] bg-[#bddd43] px-4 py-2 font-black text-[#143f4f]"><Sparkles /> YOUNG LAB · 年輕互動</Badge><h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">100 份水，<br />你會怎麼分？</h2><p className="mt-6 max-w-xl text-base font-medium leading-8 text-[#214f5d]">先民把有限水源化成份額、輪番與契約。現在換你面對農田、家戶和生態的不同需求：公平不是平均，而是一起承擔後果。</p><div className="mt-7 flex flex-wrap gap-2">{['水分額','輪水番','洪水資源化'].map((tag) => <span key={tag} className="rounded-full border-2 border-[#143f4f] bg-white px-4 py-2 text-xs font-black sticker-mini">#{tag}</span>)}</div></div>
        <div className="sticker-shadow rounded-[34px] border-[3px] border-[#143f4f] bg-[#fff9e9] p-6 sm:p-9 lg:p-11"><div className="mb-8 flex items-center justify-between border-b-2 border-dashed border-[#143f4f]/25 pb-7"><div><p className="text-xs font-black tracking-[.18em] text-[#16817c]">分水實驗室</p><p className="mt-2 text-3xl font-black">已分配 {waterTotal} / 100 份</p></div><span className={`grid size-20 rotate-3 place-items-center rounded-full border-[3px] border-[#143f4f] text-xl font-black sticker-mini ${waterTotal === 100 ? 'bg-[#bddd43]' : 'bg-[#ffcb47]'}`}>{waterTotal}%</span></div>
          {([['farming','農田灌溉',Sprout,'收成與地方產業','#bddd43'],['homes','家戶生活',Droplets,'飲用、洗滌與照護','#75d4ed'],['ecology','河川生態',Waves,'滯洪、棲地與未來','#73d8b1']] as const).map(([key,label,Icon,note,color]) => <label key={key} className="mb-6 block rounded-2xl border-2 border-[#143f4f] bg-white p-4 sticker-mini"><span className="mb-4 flex items-center gap-3"><span style={{ backgroundColor: color }} className="grid size-11 place-items-center rounded-full border-2 border-[#143f4f]"><Icon className="size-5" /></span><span><span className="block font-black">{label}</span><span className="block text-xs font-medium text-[#72868d]">{note}</span></span><strong className="ml-auto text-2xl font-black">{water[key]}</strong></span><input type="range" min="0" max="70" value={water[key]} onChange={(event) => setWater((current) => ({ ...current, [key]: Number(event.target.value) }))} className="water-range w-full accent-[#148781]" aria-label={`${label}分配份額`} /></label>)}
          <div className={`rounded-2xl border-[3px] border-[#143f4f] p-5 font-black ${waterTotal === 100 && water.ecology >= 15 && water.homes >= 20 ? 'bg-[#bddd43]' : 'bg-[#ffcb47]'}`} aria-live="polite"><p className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0" />{allocationStatus}</p></div>
        </div>
      </div></div></section>

      <section className="soft-grid px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-2 lg:items-center"><div><Badge className="sticker-mini h-auto border-2 border-[#143f4f] bg-[#ff8069] px-4 py-2 font-black text-white"><Star className="fill-current" /> FINAL QUEST · 最後任務</Badge><h2 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">把一條水路，<br /><span className="text-[#148781]">帶回生活。</span></h2><p className="mt-6 max-w-2xl font-medium leading-8 text-[#58707a]">六區的故事最後匯成同一個選擇：理解水勢、節制取用、彼此協作，也把客庄的共生智慧交給下一代。</p><div className="mt-8 space-y-3">{commitments.map((item,index) => <button key={item} onClick={() => setCommitment(item)} className={`commit-card flex w-full items-start gap-4 rounded-2xl border-2 border-[#143f4f] p-4 text-left font-bold ${commitment === item ? 'bg-[#bddd43]' : 'bg-white hover:bg-[#fff0bd]'}`}><span className={`grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#143f4f] ${commitment === item ? 'bg-white' : ['bg-[#75d4ed]','bg-[#ffcb47]','bg-[#ff8069] text-white'][index]}`}>{commitment === item ? <Check className="size-4" /> : index + 1}</span><span className="pt-1.5 leading-6">我願意{item}</span></button>)}</div></div><div className="relative rotate-1 overflow-hidden rounded-[36px] border-[3px] border-[#143f4f] bg-[#143f4f] p-8 text-white sticker-shadow sm:p-12"><div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#75d4ed]" /><div className="absolute right-10 top-12 size-20 rounded-full bg-[#ffcb47]" /><p className="relative text-xs font-black tracking-[.2em] text-[#9de3f3]">MY WATER PLEDGE · 我的共水宣言</p><div className="relative mt-28 sm:mt-36"><p className="text-3xl font-black leading-relaxed sm:text-4xl">{commitment ? `我願意${commitment}` : '選一項承諾，讓你的水紋在這裡匯流。'}</p><div className="mt-9 flex items-center justify-between border-t border-white/25 pt-6"><span className="font-black tracking-[.16em]">水水客庄</span><span className="text-[10px] font-bold text-white/55 sm:text-xs">辨水 · 造水 · 分水 · 守水 · 共水</span></div></div></div></div></section>

      <footer className="bg-[#0b3646] px-5 py-12 text-white sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between"><div><p className="text-3xl font-black tracking-[.1em]">水水客庄</p><p className="mt-3 max-w-xl text-sm font-medium leading-7 text-white/60">從一滴水看見客庄，從客庄智慧認同自己；與自然共生，與地方共榮。</p></div><div className="flex flex-wrap gap-5 text-sm font-bold text-white/70"><a href="#exhibition" className="hover:text-[#bddd43]">六大任務</a><a href="#play" className="hover:text-[#bddd43]">分水實驗室</a><button onClick={() => setAssistantOpen(true)} className="hover:text-[#bddd43]">AI 小幫手</button></div></div><div className="mx-auto flex max-w-[1480px] flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between"><p>策展原型內容依《水水客庄線上展示計畫服務建議書 v0.3》製作</p><p>展示圖像來源：客家文化發展中心客家文化資產數位網</p></div></footer>

      <Button onClick={() => setAssistantOpen(true)} className="ai-fab sticker-shadow fixed bottom-5 right-5 z-40 h-16 rounded-full border-[3px] border-[#143f4f] bg-[#ff8069] px-5 font-black text-white hover:bg-[#ef674f] sm:bottom-7 sm:right-7"><span className="grid size-9 place-items-center rounded-full bg-white text-[#143f4f]"><Bot className="size-5" /></span><span>AI 水水小幫手</span><span className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-[#143f4f] bg-[#bddd43]" aria-hidden="true" /></Button>
      <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}><SheetContent className="w-[min(100vw,440px)] gap-0 border-l-[3px] border-[#143f4f] bg-[#fff9e9] sm:max-w-[440px]"><SheetHeader className="border-b-[3px] border-[#143f4f] bg-[#75d4ed] p-6 pr-14 text-[#143f4f]"><div className="mb-3 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full border-2 border-[#143f4f] bg-[#ffcb47] sticker-mini"><Bot /></span><span className="rounded-full border-2 border-[#143f4f] bg-[#bddd43] px-3 py-1 text-[10px] font-black"><span className="mr-1 inline-block size-2 rounded-full bg-[#13817c]" />展覽知識庫已連線</span></div><SheetTitle className="text-2xl font-black text-[#143f4f]">AI 水水客庄小幫手</SheetTitle><SheetDescription className="mt-1 font-medium text-[#326170]">用互動導覽、華語或英語，問一條水路的故事。</SheetDescription></SheetHeader><div className="border-b-2 border-[#143f4f]/15 p-4"><div className="grid grid-cols-3 gap-2" aria-label="回答模式">{(['互動導覽','華語','English'] as AssistantMode[]).map((mode) => <button key={mode} onClick={() => setAssistantMode(mode)} className={`rounded-full border-2 border-[#143f4f] px-3 py-2 text-xs font-black ${assistantMode === mode ? 'bg-[#bddd43]' : 'bg-white hover:bg-[#dff4f8]'}`}>{mode}</button>)}</div></div><div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">{messages.map((message,index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-2xl border-2 border-[#143f4f] px-4 py-3 text-sm font-medium leading-6 sticker-mini ${message.role === 'user' ? 'rounded-br-sm bg-[#143f4f] text-white' : 'rounded-bl-sm bg-white text-[#335765]'}`}>{message.text}</div></div>)}<div className="pt-1"><p className="mb-2 text-[11px] font-black tracking-[.12em] text-[#72868d]">你也可以問</p><div className="flex flex-wrap gap-2">{(assistantMode === 'English' ? ['How were water rights shared?','Why does Bogong guard water?'] : ['水權怎麼分？','伯公為何守水口？','南北客庄哪裡不同？']).map((prompt) => <button key={prompt} onClick={() => askQuick(prompt)} className="rounded-full border-2 border-[#143f4f]/30 bg-[#bddd43]/45 px-3 py-2 text-xs font-bold text-[#28636b] hover:bg-[#bddd43]">{prompt}</button>)}</div></div></div><form onSubmit={submitQuestion} className="border-t-2 border-[#143f4f]/15 bg-[#fff9e9] p-4"><div className="flex gap-2"><Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={assistantMode === 'English' ? 'Ask about Hakka waterways…' : '問問客庄水路的故事…'} className="h-12 rounded-full border-2 border-[#143f4f] bg-white px-4 font-medium" aria-label="輸入問題" /><Button type="submit" size="icon" className="size-12 rounded-full border-2 border-[#143f4f] bg-[#ff8069] hover:bg-[#ef674f]" aria-label="送出問題"><Send /></Button></div><p className="mt-2 flex items-center justify-center gap-1 text-[10px] font-bold text-[#72868d]"><ShieldCheck className="size-3" />回答限定於本展核定策展資料</p></form></SheetContent></Sheet>
    </main>
  );
}
