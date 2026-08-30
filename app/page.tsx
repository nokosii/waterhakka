'use client';

import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  Droplets,
  ExternalLink,
  Languages,
  MapPinned,
  MessageCircleMore,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Volume2,
  VolumeX,
  Waves,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type AssistantMode = '互動導覽' | '華語' | 'English';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
  source?: string;
};

const zones = [
  {
    id: 'zone-1',
    index: '01',
    verb: '造水 · 分水',
    title: '算水為財的北部丘陵',
    subtitle: '一滴水，如何成為可繼承的資產？',
    description:
      '桃竹苗田高水低，客家先民以埤塘、穿龍洞與水甲會，把不穩定的雨水轉成可計量、可協商、可繼承的水分額。',
    interaction: '拈鬮分水模擬',
    clue: '水分額',
    image: '/exhibits/zone-1.jpg',
    alt: '清光緒年間分鬮書，記載埤塘水分額與水圳',
    credit: '清光緒16年陳惟炎兄弟分鬮書／陳壂全提供',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1458&MenuID=1&SubID=3',
  },
  {
    id: 'zone-2',
    index: '02',
    verb: '分水 · 守水',
    title: '延水結柵的六堆平原',
    subtitle: '水少時，誰先用？如何才公平？',
    description:
      '六堆平原以水圳串連灌溉、庄界與防禦。讓水十二份與輪水番，留下跨庄、跨族群協商有限水源的共同秩序。',
    interaction: '輪水番談判',
    clue: '輪水番',
    image: '/exhibits/zone-2.jpg',
    alt: '伯公廟後方的泗浚圳，水流穿越六堆聚落',
    credit: '泗浚圳／客家文化發展中心典藏網',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=2573&MenuID=11&SubID=29&pageNums=6',
  },
  {
    id: 'zone-3',
    index: '03',
    verb: '用水 · 共水',
    title: '洗衫坑與生活水民俗',
    subtitle: '水邊，也是客庄的社群網路。',
    description:
      '北部洗衫坑是勞動、情報與用水公德的公共空間；南部大風草水則守護產後身體。一外一內，水都進入日常記憶。',
    interaction: '洗衫坑聽音辨位',
    clue: '洗當淨',
    image: '/exhibits/zone-3.jpg',
    alt: '黃滿嬌在內灣東窩溪洗衫',
    credit: '黃滿嬌於內灣東窩溪洗衫／客家文化發展中心典藏網',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1200&MenuID=6&SubID=24&pageNums=2',
  },
  {
    id: 'zone-4',
    index: '04',
    verb: '守水 · 敬水',
    title: '守水的神與成神的人',
    subtitle: '水口為何總有一位守護者？',
    description:
      '北部水頭、水尾伯公標記圳路起訖；南部則把開圳有功或犧牲的人奉為水利恩公。神與人一起守住水路與庄頭。',
    interaction: '客庄風水師',
    clue: '水口伯公',
    image: '/exhibits/zone-4.jpg',
    alt: '上四座屋圳一號隧道旁的水口伯公廟',
    credit: '一號隧道水口伯公／客家文化發展中心典藏網',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1',
  },
  {
    id: 'zone-5',
    index: '05',
    verb: '傳水 · 想像',
    title: '客庄水神話與奇幻傳說',
    subtitle: '當旱災與濁流，長出神話的形狀。',
    description:
      '伯公鏡、金鴨母與神農大帝祭水，把泉湧、濁流與洪患轉化為可傳述的奇幻記憶，也保存先民敬畏自然的尺度。',
    interaction: '神話圖鑑蒐集',
    clue: '金鴨母',
    image: '/exhibits/zone-5.jpg',
    alt: '埤塘前的石板伯公正面',
    credit: '橫山蔗廍埤塘前石板伯公／客家文化發展中心典藏網',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1181&MenuID=1&SubID=3',
  },
  {
    id: 'zone-6',
    index: '06',
    verb: '修水 · 共生',
    title: '當代水景的現代性斷裂',
    subtitle: '工程結束後，水的故事才正要改寫。',
    description:
      '大圳、堤防與都市化重新分配水的風險與記憶。從消失的埤塘到野蓮田，人們再次學習把洪水轉化為生態共生的可能。',
    interaction: '消失的千塘滑桿',
    clue: '與水共生',
    image: '/exhibits/zone-6.jpg',
    alt: '上四座屋圳末端保留的埤塘',
    credit: '上四座屋圳末端埤塘／客家文化發展中心典藏網',
    source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1',
  },
];

const commitments = [
  '理解一條家鄉水路，讓地方記憶被看見。',
  '珍惜水與土地，實踐敬天惜物的生活。',
  '把客庄故事說給下一代，讓文化持續流動。',
];

function assistantReply(question: string, mode: AssistantMode) {
  const query = question.toLowerCase();
  if (mode === 'English') {
    if (query.includes('bogong') || query.includes('god') || query.includes('guardian')) {
      return 'Bogong shrines stand by canal heads, tails, and water gates. They mark where water enters or leaves a settlement and turn shared maintenance into a relationship of gratitude and guardianship.';
    }
    if (query.includes('water right') || query.includes('contract') || query.includes('share')) {
      return 'In northern Hakka settlements, water was measured as shares and recorded in family division contracts. A flowing resource became an asset that could be negotiated, inherited, and maintained together.';
    }
    return 'This exhibition follows five cultural actions: reading water, making water usable, sharing it, guarding it, and living with it. Try asking about water rights, Bogong, laundry ponds, or the north–south contrast.';
  }

  if (query.includes('伯公') || query.includes('守水') || query.includes('神')) {
    return '水頭、水尾與圳口伯公不只是廟宇，也像水路的地標：提醒庄民水從哪裡來、往哪裡去，以及誰要共同維護。南部也有把開圳英雄奉為「水利恩公」的信仰。';
  }
  if (query.includes('水權') || query.includes('分鬮') || query.includes('契約') || query.includes('水分額')) {
    return '北部客庄把水量折算成「水分額」，寫進分鬮書與田契。水因此能和土地一起轉讓、繼承，也必須由水甲會共同出工清圳。';
  }
  if (query.includes('南北') || query.includes('六堆') || query.includes('丘陵')) {
    return '北部桃竹苗田高水低，重點是蓄水、穿山與精算份額；南部六堆河網漫流，重點是延水、輪灌、庄界與防禦。方法不同，共同核心都是協商有限水源。';
  }
  if (query.includes('洗衫') || query.includes('大風草') || query.includes('生活')) {
    return '洗衫坑既是洗衣場所，也是交換消息與維持用水秩序的公共空間；六堆的大風草水則把水帶進產後照護與身體記憶。';
  }
  if (query.includes('金鴨母') || query.includes('神話') || query.includes('傳說')) {
    return '「金鴨母」以神獸戲水、攪動溪底泥沙的故事，解釋大甲溪常年濁流與氾濫改道，也保存人們對母親河既親近又敬畏的情感。';
  }
  if (mode === '互動導覽') {
    return '建議先收集六區的水紋線索，再到「分水實驗室」調整農田、家戶與生態的用水比例。完成後，你會得到自己的共水宣言。';
  }
  return '水水客庄以「辨水、造水、分水、守水、共水」五個動詞理解客庄。你可以問我：水權怎麼分、伯公為何守水口、南北客庄有何不同，或金鴨母是誰。';
}

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [path, setPath] = useState<'north' | 'south' | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('互動導覽');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: '你好，我是水水客庄小幫手。想從哪一條水路開始？也可以直接問我水權、伯公或南北客庄的差異。',
    },
  ]);
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
    return '分水成功：農作、生活與生態都保有基本韌性。';
  }, [water, waterTotal]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  async function toggleWaterSound() {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);

    if (soundOn) {
      setSoundOn(false);
      fadeTimerRef.current = window.setInterval(() => {
        audio.volume = Math.max(0, audio.volume - 0.06);
        if (audio.volume <= 0.01) {
          audio.pause();
          audio.volume = 0;
          if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
      }, 40);
      return;
    }

    audio.volume = 0;
    try {
      await audio.play();
      setSoundOn(true);
      fadeTimerRef.current = window.setInterval(() => {
        audio.volume = Math.min(0.38, audio.volume + 0.035);
        if (audio.volume >= 0.38) {
          if (fadeTimerRef.current !== null) window.clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
      }, 45);
    } catch {
      setSoundOn(false);
    }
  }

  function beginJourney(selectedPath?: 'north' | 'south') {
    if (selectedPath) setPath(selectedPath);
    document.querySelector('#exhibition')?.scrollIntoView({ behavior: 'smooth' });
  }

  function collectClue(zoneId: string) {
    setVisited((current) =>
      current.includes(zoneId) ? current.filter((item) => item !== zoneId) : [...current, zoneId],
    );
  }

  function submitQuestion(event: FormEvent) {
    event.preventDefault();
    const clean = question.trim();
    if (!clean) return;
    setMessages((current) => [
      ...current,
      { role: 'user', text: clean },
      { role: 'assistant', text: assistantReply(clean, assistantMode) },
    ]);
    setQuestion('');
  }

  function askQuick(text: string) {
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: assistantReply(text, assistantMode) },
    ]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <audio
        ref={audioRef}
        src="/audio/trix_records198-water-flowing-sound-327661.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />
      <section className="relative isolate min-h-screen overflow-hidden">
        <img
          src="/water-key-visual.png"
          alt="水流穿越北部丘陵與南部平原，匯聚成客庄共同水脈"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,31,49,.91)_0%,rgba(8,31,49,.54)_42%,rgba(20,45,54,.16)_72%,rgba(243,233,211,.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#071f2c]/85 to-transparent" />

        <header className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3 text-[#f7f0df]" aria-label="水水客庄首頁">
            <span className="grid size-10 place-items-center rounded-full border border-white/35 bg-[#0c3d55]/55 font-serif text-lg backdrop-blur-md">水</span>
            <span>
              <span className="block font-serif text-lg font-semibold tracking-[0.16em]">水水客庄</span>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-white/65 sm:block">Waterways of Hakka Villages</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a href="#exhibition" className="hidden rounded-full px-4 py-2 text-sm text-[#f7f0df] transition hover:bg-white/10 md:block">六大展區</a>
            <Button
              variant="outline"
              onClick={toggleWaterSound}
              className="h-10 rounded-full border-white/30 bg-[#0a3044]/35 px-4 text-[#f7f0df] backdrop-blur-md hover:bg-white/15 hover:text-white"
              aria-pressed={soundOn}
            >
              {soundOn ? <Volume2 /> : <VolumeX />}
              {soundOn ? '水聲已開啟' : '開啟水聲'}
            </Button>
          </div>
        </header>

        <div id="top" className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1480px] items-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl text-[#f7f0df]">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#b9e4e0] sm:text-sm">
                <span className="h-px w-10 bg-[#7ec8c3]" />
                一滴水的兩種地景
              </p>
              <h1 className="font-serif text-[clamp(3.4rem,9vw,8.6rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
                水如何
                <br />
                把人連成庄？
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                左邊，水穿過桃竹苗丘陵，成為埤塘、圳路與穿龍洞；右邊，水在六堆平原展開，串起灌溉、庄界與生活水網。
              </p>
            </div>

            <aside className="rounded-[28px] border border-white/25 bg-[#082d3d]/62 p-5 text-[#f7f0df] shadow-2xl backdrop-blur-xl sm:p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#9fd7d4]">選一條水路開始</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => beginJourney('north')}
                  className={`group rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/13 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${path === 'north' ? 'border-[#8ac9d3] bg-white/15' : 'border-white/15 bg-white/8'}`}
                >
                  <span className="text-[10px] tracking-[0.18em] text-white/55">NORTH</span>
                  <span className="mt-6 block font-serif text-xl">丘陵蓄水</span>
                  <span className="mt-1 block text-xs text-white/60">算水為財，穿山引流</span>
                </button>
                <button
                  onClick={() => beginJourney('south')}
                  className={`group rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/13 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${path === 'south' ? 'border-[#d9b375] bg-white/15' : 'border-white/15 bg-white/8'}`}
                >
                  <span className="text-[10px] tracking-[0.18em] text-white/55">SOUTH</span>
                  <span className="mt-6 block font-serif text-xl">平原分水</span>
                  <span className="mt-1 block text-xs text-white/60">延水結柵，輪番共用</span>
                </button>
              </div>
              <Button onClick={() => beginJourney()} className="mt-4 h-12 w-full rounded-full bg-[#efe5cf] text-[#13374b] hover:bg-white">
                跟著水，進入展覽
                <ArrowDown />
              </Button>
              <p className="mt-3 text-center text-[11px] text-white/48">六大展區 · 約 15 分鐘 · 可隨時靜音</p>
            </aside>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[7%] left-[7%] size-24 rounded-full border border-white/12 animate-[ripple_4s_ease-out_infinite] motion-reduce:hidden" />
      </section>

      <nav className="sticky top-0 z-40 border-b border-[#173b57]/12 bg-[#f3e9d3]/92 backdrop-blur-xl" aria-label="展覽導覽">
        <div className="mx-auto flex max-w-[1480px] items-center gap-5 px-5 py-3 sm:px-8 lg:px-12">
          <a href="#top" className="font-serif font-semibold tracking-[0.14em]">水水客庄</a>
          <div className="hidden items-center gap-1 lg:flex">
            {zones.map((zone) => (
              <a key={zone.id} href={`#${zone.id}`} className="rounded-full px-3 py-2 text-xs text-[#546872] transition hover:bg-[#173b57]/8 hover:text-[#173b57]">
                {zone.index} {zone.title.split('的')[0]}
              </a>
            ))}
          </div>
          <div className="ml-auto w-28 sm:w-44">
            <Progress value={progress}>
              <ProgressLabel className="text-[11px]">已收集 {visited.length}/6</ProgressLabel>
              <ProgressValue className="text-[11px]" />
            </Progress>
          </div>
        </div>
      </nav>

      <section id="exhibition" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle_at_12%_18%,#3b8c8a_0,transparent_22%),radial-gradient(circle_at_88%_62%,#b58b4a_0,transparent_18%)]" />
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-7 border-b border-[#173b57]/18 pb-12 lg:grid-cols-[1fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#3b8c8a]">SIX WATERWAYS · 六大展區</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl">從辨水到共水</h2>
            </div>
            <p className="max-w-3xl text-lg leading-9 text-[#536974]">
              客庄不是臨水而生，而是在看懂地形、造出水路、協商份額、共同守護與回應環境的行動中形成。每走完一區，收下一枚水紋線索。
            </p>
          </div>

          <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
            {zones.map((zone, index) => {
              const collected = visited.includes(zone.id);
              return (
                <article
                  id={zone.id}
                  key={zone.id}
                  className="scroll-mt-24 grid overflow-hidden rounded-[32px] border border-[#173b57]/14 bg-[#f8f1e2]/90 shadow-[0_24px_70px_rgba(23,59,87,.08)] lg:grid-cols-2"
                >
                  <div className={`relative min-h-[340px] overflow-hidden lg:min-h-[540px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img src={zone.image} alt={zone.alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081f2f]/78 via-transparent to-transparent" />
                    <span className="absolute left-6 top-6 font-serif text-7xl font-semibold text-white/75 sm:left-8 sm:top-8 sm:text-8xl">{zone.index}</span>
                    <div className="absolute inset-x-6 bottom-6 text-xs leading-5 text-white/68 sm:inset-x-8 sm:bottom-8">
                      {zone.credit}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-[#173b57] text-[#f8f1e2]">{zone.verb}</Badge>
                        <Badge variant="outline" className="border-[#3b8c8a]/35 text-[#3b8c8a]">年輕互動</Badge>
                      </div>
                      <h3 className="mt-7 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{zone.title}</h3>
                      <p className="mt-4 text-lg font-medium text-[#a84a3a]">{zone.subtitle}</p>
                      <p className="mt-7 text-base leading-8 text-[#536974]">{zone.description}</p>
                    </div>

                    <div className="mt-10 border-t border-[#173b57]/14 pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7b898e]">PLAYABLE STORY</p>
                          <p className="mt-1 font-serif text-xl font-semibold">{zone.interaction}</p>
                        </div>
                        <Button
                          onClick={() => collectClue(zone.id)}
                          variant={collected ? 'secondary' : 'default'}
                          className="h-11 rounded-full px-5"
                        >
                          {collected ? <Check /> : <Droplets />}
                          {collected ? `已收下「${zone.clue}」` : '收下水紋線索'}
                        </Button>
                      </div>
                      <a href={zone.source} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#667680] underline decoration-[#3b8c8a]/35 underline-offset-4 hover:text-[#173b57]">
                        查看客發中心典藏來源 <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="play" className="bg-[#0b3042] px-5 py-20 text-[#f5ecd9] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <Badge className="bg-[#7ec8c3] text-[#0b3042]">YOUNG LAB · 年輕互動</Badge>
              <h2 className="mt-6 font-serif text-5xl font-semibold leading-tight sm:text-6xl">如果水只有 100 份，你怎麼分？</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
                先民把有限水源化成份額、輪番與契約。現在換你面對農田、家戶和生態的不同需求：公平不是平均，而是一起承擔後果。
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/55">
                <span className="rounded-full border border-white/15 px-3 py-2">水分額</span>
                <span className="rounded-full border border-white/15 px-3 py-2">輪水番</span>
                <span className="rounded-full border border-white/15 px-3 py-2">洪水資源化</span>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/16 bg-white/7 p-6 shadow-2xl backdrop-blur sm:p-9 lg:p-12">
              <div className="mb-10 flex items-end justify-between border-b border-white/12 pb-7">
                <div>
                  <p className="text-xs tracking-[0.2em] text-[#8dcac7]">分水實驗室</p>
                  <p className="mt-2 font-serif text-3xl font-semibold">已分配 {waterTotal} / 100 份</p>
                </div>
                <span className={`grid size-16 place-items-center rounded-full border text-lg font-bold ${waterTotal === 100 ? 'border-[#7ec8c3] text-[#7ec8c3]' : 'border-[#d19b70] text-[#e2b28c]'}`}>
                  {waterTotal}%
                </span>
              </div>

              {(
                [
                  ['farming', '農田灌溉', Sprout, '收成與地方產業'],
                  ['homes', '家戶生活', Droplets, '飲用、洗滌與照護'],
                  ['ecology', '河川生態', Waves, '滯洪、棲地與未來'],
                ] as const
              ).map(([key, label, Icon, note]) => (
                <label key={key} className="mb-9 block">
                  <span className="mb-3 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-white/10"><Icon className="size-5 text-[#8dcac7]" /></span>
                    <span>
                      <span className="block font-medium">{label}</span>
                      <span className="block text-xs text-white/45">{note}</span>
                    </span>
                    <strong className="ml-auto font-serif text-2xl">{water[key]}</strong>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    value={water[key]}
                    onChange={(event) => setWater((current) => ({ ...current, [key]: Number(event.target.value) }))}
                    className="water-range w-full accent-[#7ec8c3]"
                    aria-label={`${label}分配份額`}
                  />
                </label>
              ))}

              <div className={`rounded-2xl border p-5 ${waterTotal === 100 && water.ecology >= 15 && water.homes >= 20 ? 'border-[#7ec8c3]/45 bg-[#7ec8c3]/10' : 'border-[#d19b70]/35 bg-[#d19b70]/9'}`} aria-live="polite">
                <p className="flex gap-3 font-medium">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0" />
                  {allocationStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#e9dfc8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#a84a3a]">共水成庄 · 共榮未來</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl">把一條水路，帶回自己的生活。</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#536974]">
              六區的故事最後匯成同一個選擇：理解水勢、節制取用、彼此協作，也把客庄的共生智慧交給下一代。
            </p>
            <div className="mt-8 space-y-3">
              {commitments.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setCommitment(item)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${commitment === item ? 'border-[#3b8c8a] bg-[#f8f1e2] shadow-lg' : 'border-[#173b57]/14 bg-white/24 hover:bg-white/45'}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm ${commitment === item ? 'bg-[#3b8c8a] text-white' : 'bg-[#173b57]/8'}`}>
                    {commitment === item ? <Check className="size-4" /> : index + 1}
                  </span>
                  <span className="leading-7">我願意{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] bg-[#123c50] p-8 text-[#f5ecd9] shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 size-72 rounded-full border border-[#7ec8c3]/25" />
            <div className="absolute -right-10 -top-10 size-52 rounded-full border border-[#7ec8c3]/20" />
            <p className="text-xs tracking-[0.22em] text-[#8dcac7]">我的共水宣言</p>
            <div className="mt-24 sm:mt-32">
              <p className="font-serif text-3xl font-semibold leading-relaxed sm:text-4xl">
                {commitment ? `我願意${commitment}` : '選一項承諾，讓你的水紋在這裡匯流。'}
              </p>
              <div className="mt-9 flex items-center justify-between border-t border-white/16 pt-6">
                <span className="font-serif tracking-[0.18em]">水水客庄</span>
                <span className="text-xs text-white/48">辨水 · 造水 · 分水 · 守水 · 共水</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#071f2c] px-5 py-12 text-[#f5ecd9] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-b border-white/12 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl font-semibold tracking-[0.12em]">水水客庄</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/52">從一滴水看見客庄，從客庄智慧認同自己；與自然共生，與地方共榮。</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/65">
            <a href="#exhibition" className="hover:text-white">六大展區</a>
            <a href="#play" className="hover:text-white">分水實驗室</a>
            <button onClick={() => setAssistantOpen(true)} className="hover:text-white">AI 小幫手</button>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1480px] flex-col gap-2 pt-6 text-xs text-white/38 sm:flex-row sm:justify-between">
          <p>策展原型內容依《水水客庄線上展示計畫服務建議書 v0.3》製作</p>
          <p>展示圖像來源：客家文化發展中心客家文化資產數位網</p>
        </div>
      </footer>

      <Button
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-5 right-5 z-40 h-14 rounded-full bg-[#a84a3a] px-5 text-white shadow-[0_16px_40px_rgba(47,25,20,.3)] hover:bg-[#8f3e32] sm:bottom-7 sm:right-7"
      >
        <Bot className="size-5" />
        <span>AI 水水小幫手</span>
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#7ec8c3] ring-4 ring-[#f3e9d3]" aria-hidden="true" />
      </Button>

      <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
        <SheetContent className="w-[min(100vw,440px)] gap-0 border-l-[#173b57]/15 bg-[#f8f1e2] sm:max-w-[440px]">
          <SheetHeader className="border-b border-[#173b57]/12 bg-[#123c50] p-6 pr-14 text-[#f5ecd9]">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#7ec8c3] text-[#123c50]"><Bot /></span>
              <span className="flex items-center gap-1.5 text-xs text-[#a9d7d3]"><span className="size-2 rounded-full bg-[#7ec8c3]" /> 展覽知識庫已連線</span>
            </div>
            <SheetTitle className="font-serif text-2xl font-semibold text-[#f5ecd9]">AI 水水客庄小幫手</SheetTitle>
            <SheetDescription className="mt-1 text-white/55">用互動導覽、華語或英語，問一條水路的故事。</SheetDescription>
          </SheetHeader>

          <div className="border-b border-[#173b57]/12 p-4">
            <div className="grid grid-cols-3 gap-2" aria-label="回答模式">
              {(['互動導覽', '華語', 'English'] as AssistantMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAssistantMode(mode)}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition ${assistantMode === mode ? 'border-[#3b8c8a] bg-[#3b8c8a] text-white' : 'border-[#173b57]/15 bg-transparent text-[#536974] hover:bg-[#173b57]/5'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-sm bg-[#173b57] text-white' : 'rounded-bl-sm border border-[#173b57]/12 bg-white/65 text-[#334f5f]'}`}>
                  {message.text}
                </div>
              </div>
            ))}

            <div className="pt-1">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[#7b898e]">你也可以問</p>
              <div className="flex flex-wrap gap-2">
                {(assistantMode === 'English'
                  ? ['How were water rights shared?', 'Why does Bogong guard water?']
                  : ['水權怎麼分？', '伯公為何守水口？', '南北客庄哪裡不同？']
                ).map((prompt) => (
                  <button key={prompt} onClick={() => askQuick(prompt)} className="rounded-full border border-[#3b8c8a]/30 bg-[#3b8c8a]/7 px-3 py-2 text-xs text-[#2f7776] hover:bg-[#3b8c8a]/13">
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submitQuestion} className="border-t border-[#173b57]/12 bg-[#f8f1e2] p-4">
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={assistantMode === 'English' ? 'Ask about Hakka waterways…' : '問問客庄水路的故事…'}
                className="h-11 rounded-full bg-white/70 px-4"
                aria-label="輸入問題"
              />
              <Button type="submit" size="icon" className="size-11 rounded-full" aria-label="送出問題"><Send /></Button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#7b898e]"><ShieldCheck className="size-3" /> 回答限定於本展核定策展資料</p>
          </form>
        </SheetContent>
      </Sheet>
    </main>
  );
}
