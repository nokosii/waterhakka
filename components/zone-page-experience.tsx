'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Captions, Check, Download, ExternalLink, Gamepad2, MapPinned, Play, RotateCcw, Smartphone, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoneGameDialog } from '@/components/zone-game-dialog';
import type { ZoneRecord } from '@/lib/exhibition-data';

const videoSamples = [
  { kind: '主題影音', id: '-_ve4lMt-h8', ratio: 'aspect-video', icon: Play },
  { kind: '直式 Shorts', id: '-yyo_VwrpwM', ratio: 'aspect-[9/16]', icon: Smartphone },
  { kind: '客語繪本', id: 'fk0pbtNvFuM', ratio: 'aspect-video', icon: BookOpen },
];

export function ZonePageExperience({ zone, zoneIndex }: { zone: ZoneRecord; zoneIndex: number }) {
  const [gameOpen, setGameOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fieldSteps, setFieldSteps] = useState<boolean[]>(zone.o2oSteps.map(() => false));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('waterhakka-completed-zones') || '[]') as string[];
    setCompleted(stored.includes(zone.id));
  }, [zone.id]);

  function completeGame() {
    const stored = JSON.parse(localStorage.getItem('waterhakka-completed-zones') || '[]') as string[];
    if (!stored.includes(zone.id)) localStorage.setItem('waterhakka-completed-zones', JSON.stringify([...stored, zone.id]));
    setCompleted(true);
  }

  function toggleStep(index: number) {
    setFieldSteps((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  function downloadFieldCard() {
    const content = [
      `水水客庄｜第 ${zone.index} 展區 O2O 現地任務卡`,
      zone.title,
      '',
      zone.o2oTitle,
      ...zone.o2oSteps.map((step, index) => `${index + 1}. □ ${step}`),
      '',
      '現地筆記：',
      '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿',
      '＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿',
      '',
      `線上展區：${window.location.href}`,
      `典藏來源：${zone.source}`,
    ].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `水水客庄_${zone.index}_${zone.o2oTitle}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const mediaCopy = [zone.question, zone.shortHook, zone.pictureBook];
  const allFieldStepsDone = fieldSteps.every(Boolean);

  return (
    <>
      <section className="bg-[#fff9e9] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="zone-media-title">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><Badge className="sticker-mini h-auto border-2 border-[#143f4f] px-4 py-2 font-black text-[#143f4f]" style={{ backgroundColor: zone.color }}><Play className="fill-current" /> MEDIA · 影音敘事</Badge><h2 id="zone-media-title" className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">三種節奏，<br /><span className="text-[#148781]">讀一條水路。</span></h2></div>
            <div className="rounded-2xl border-2 border-dashed border-[#143f4f]/30 bg-white p-5 text-sm font-medium leading-7 text-[#5d747d]"><strong className="block text-[#143f4f]">示範素材說明</strong>目前六區共用委託人指定的功能示範影片；正式上線時，應替換為各區核定的主題影音、Shorts 與客語繪本，並補齊字幕、逐字稿及授權資料。</div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.7fr_1.1fr] lg:items-start">
            {videoSamples.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.kind} className="rounded-[28px] border-[3px] border-[#143f4f] bg-white p-3 shadow-[0_6px_0_#143f4f]">
                  <div className={`mx-auto overflow-hidden rounded-[19px] border-2 border-[#143f4f] bg-black ${item.ratio} ${item.ratio.includes('9/16') ? 'max-h-[520px] max-w-[292px]' : ''}`}>
                    <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${item.id}`} title={`${zone.title}－${item.kind}示範`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  </div>
                  <div className="p-3 pb-4 pt-5"><span className="inline-flex items-center gap-2 rounded-full border-2 border-[#143f4f] px-3 py-1 text-[10px] font-black" style={{ backgroundColor: index === 0 ? '#ffcb47' : index === 1 ? '#ff8069' : '#bddd43' }}><Icon className="size-3.5" />{item.kind}功能示範</span><h3 className="mt-4 text-xl font-black leading-snug">{mediaCopy[index]}</h3><p className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#72868d]"><Captions className="size-4" />不自動播放；字幕與播放設定由 YouTube 提供</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#75d4ed] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-20 top-10 size-72 rounded-full border-[42px] border-[#bddd43]/60" />
        <div className="relative mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-2">
          <article className="rounded-[34px] border-[3px] border-[#143f4f] bg-[#fff9e9] p-6 shadow-[0_8px_0_#143f4f] sm:p-9">
            <span className="grid size-16 place-items-center rounded-full border-2 border-[#143f4f]" style={{ backgroundColor: zone.color }}><Gamepad2 /></span>
            <p className="mt-6 text-xs font-black tracking-[.18em] text-[#148781]">ONLINE GAME · 線上互動遊戲</p>
            <h2 className="mt-2 text-4xl font-black">{zone.interaction}</h2>
            <p className="mt-4 font-medium leading-8 text-[#58707a]">先在線上做選擇、看見後果，再把解鎖的「{zone.clue}」帶往現地觀察。</p>
            <Button onClick={() => setGameOpen(true)} className={`mt-8 h-13 w-full rounded-full border-2 border-[#143f4f] px-6 text-base font-black text-[#143f4f] ${completed ? 'bg-[#bddd43]' : 'bg-[#ffcb47]'} hover:bg-[#d7ea89]`}>{completed ? <Check /> : <Play className="fill-current" />}{completed ? `已解鎖：${zone.clue}` : '開始專屬互動'}</Button>
          </article>

          <article className="rounded-[34px] border-[3px] border-[#143f4f] bg-[#143f4f] p-6 text-white shadow-[0_8px_0_#ffcb47] sm:p-9">
            <span className="grid size-16 place-items-center rounded-full border-2 border-white bg-[#ff8069]"><MapPinned /></span>
            <p className="mt-6 text-xs font-black tracking-[.18em] text-[#9de3f3]">ONLINE TO ONSITE · O2O 體驗</p>
            <h2 className="mt-2 text-4xl font-black">{zone.o2oTitle}</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-white/65">線上領任務、現地做觀察、回到網站查來源。點選步驟可先規劃行程。</p>
            <div className="mt-6 space-y-3">
              {zone.o2oSteps.map((step, index) => <button key={step} onClick={() => toggleStep(index)} className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left font-bold transition ${fieldSteps[index] ? 'border-[#bddd43] bg-[#bddd43] text-[#143f4f]' : 'border-white/45 bg-white/8 hover:bg-white/15'}`}><span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-current">{fieldSteps[index] ? <Check className="size-4" /> : index + 1}</span><span className="pt-0.5">{step}</span></button>)}
            </div>
            {allFieldStepsDone && <p className="mt-4 flex items-center gap-2 rounded-2xl bg-[#bddd43] p-4 font-black text-[#143f4f]"><Sparkles />行前規劃完成，可以帶著任務卡出發！</p>}
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><Button onClick={downloadFieldCard} className="h-12 rounded-full border-2 border-white bg-white px-5 font-black text-[#143f4f] hover:bg-[#e7f7fa]"><Download />下載現地任務卡</Button><Button onClick={() => setFieldSteps(zone.o2oSteps.map(() => false))} className="h-12 rounded-full border-2 border-white/60 bg-transparent px-5 font-black text-white hover:bg-white/10"><RotateCcw />重新規劃</Button></div>
            <p className="mt-5 text-[11px] font-bold leading-5 text-white/45">本功能為 O2O 原型，不使用定位、鏡頭或個資；正式走讀場域、合作店家與兌換機制須經機關及地方夥伴核定。</p>
          </article>
        </div>
      </section>

      <section className="soft-grid px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-5 rounded-[30px] border-[3px] border-[#143f4f] bg-white p-6 shadow-[0_6px_0_#143f4f] md:flex-row md:items-center md:justify-between sm:p-8">
          <div><p className="text-xs font-black tracking-[.16em] text-[#148781]">SOURCE & NEXT · 來源與延伸</p><h2 className="mt-2 text-2xl font-black">從展區走進水水書房</h2><p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-[#637981]">查看本區典藏原件，或到水水書房以地區、年代與資料類型繼續搜尋。</p></div>
          <div className="flex flex-wrap gap-3"><a href={zone.source} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#fff9e9] px-5 text-sm font-black hover:bg-[#ffefb7]">典藏來源 <ExternalLink className="size-4" /></a><a href={`/library?zone=${zone.slug}`} className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#bddd43] px-5 text-sm font-black hover:bg-[#d8e989]"><BookOpen className="size-4" />查本區資料</a></div>
        </div>
      </section>

      <ZoneGameDialog zoneIndex={gameOpen ? zoneIndex : null} open={gameOpen} onOpenChange={setGameOpen} onComplete={completeGame} />
    </>
  );
}
