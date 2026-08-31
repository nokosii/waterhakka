'use client';

import { useEffect, useState } from 'react';
import { Check, Download, MapPinned, Route, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { zoneRecords } from '@/lib/exhibition-data';
import { themeRecords } from '@/lib/theme-data';

export function WaterPassport({ initialTheme = '' }: { initialTheme?: string }) {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => { setCompleted(JSON.parse(localStorage.getItem('waterhakka-completed-zones') || '[]') as string[]); }, []);
  const activeTheme = themeRecords.find((theme) => theme.slug === initialTheme);
  const shownZones = activeTheme ? zoneRecords.filter((zone) => activeTheme.zoneSlugs.includes(zone.slug)) : zoneRecords;

  function downloadPassport() {
    const content = ['水水客庄｜水水護照', '', `已取得 ${completed.length} / 6 枚數位印章`, '', ...zoneRecords.map((zone) => `${completed.includes(zone.id) ? '●' : '○'} ${zone.index} ${zone.title}｜${zone.clue}`), '', '完成線上互動後會自動點亮印章；O2O 現地任務不使用定位與個人資料。'].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = '水水客庄_水水護照.txt'; anchor.click(); URL.revokeObjectURL(url);
  }

  return <>
    <section className="border-b-[3px] border-[#143f4f] bg-[#143f4f] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Badge className="h-auto border-2 border-white/70 bg-[#bddd43] px-4 py-2 font-black text-[#143f4f]"><ShieldCheck /> WATER PASSPORT · 水水護照</Badge><h1 className="mt-5 text-6xl font-black leading-[.94] tracking-[-.05em] sm:text-8xl">把六條水路，<br /><span className="text-[#ffcb47]">帶在身上。</span></h1></div><div className="rounded-[28px] border-2 border-white/25 bg-white/8 p-6"><p className="text-4xl font-black">{completed.length} / 6</p><p className="mt-2 font-medium leading-8 text-white/65">完成各展區互動即可取得數位印章。資料只保存在目前裝置，不需登入。</p><Button onClick={downloadPassport} className="mt-5 rounded-full border-2 border-white bg-white px-5 font-black text-[#143f4f]"><Download />下載護照紀錄</Button></div></div></section>
    <section className="soft-grid px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1480px]"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{zoneRecords.map((zone) => { const done = completed.includes(zone.id); return <a key={zone.slug} href={`/zones/${zone.slug}`} className={`rounded-[28px] border-[3px] border-[#143f4f] p-6 shadow-[0_5px_0_#143f4f] transition hover:-translate-y-1 ${done ? 'bg-[#bddd43]' : 'bg-white'}`}><span style={{ backgroundColor: zone.color }} className="grid size-16 place-items-center rounded-full border-2 border-[#143f4f] text-xl font-black">{done ? <Check /> : zone.index}</span><p className="mt-5 text-xs font-black tracking-[.12em] text-[#688087]">{done ? 'STAMP COLLECTED · 已取得' : 'STAMP LOCKED · 待解鎖'}</p><h2 className="mt-2 text-2xl font-black">{zone.title}</h2><p className="mt-3 text-sm font-medium text-[#607780]">印章關鍵詞：{zone.clue}</p></a>; })}</div>
      <div className="mt-12"><p className="text-xs font-black tracking-[.18em] text-[#148781]">O2O ROUTES · 現地路線</p><h2 className="mt-3 text-4xl font-black sm:text-6xl">選一條主題路線出發</h2><div className="mt-7 grid gap-5 lg:grid-cols-2">{themeRecords.map((theme) => <article key={theme.slug} className={`rounded-[30px] border-[3px] border-[#143f4f] p-6 shadow-[0_6px_0_#143f4f] ${activeTheme?.slug === theme.slug ? 'bg-[#ffcb47]' : 'bg-white'}`}><Route className="size-8" /><h3 className="mt-5 text-3xl font-black">{theme.o2oTitle}</h3><p className="mt-3 font-medium leading-7 text-[#5e747d]">{theme.o2oNote}</p><div className="mt-5 flex flex-wrap gap-2">{shownZones.filter((zone) => theme.zoneSlugs.includes(zone.slug)).map((zone) => <a key={zone.slug} href={`/zones/${zone.slug}`} className="rounded-full border-2 border-[#143f4f] bg-[#fff9e9] px-3 py-2 text-xs font-black hover:bg-[#dff4f8]"><MapPinned className="mr-1 inline size-3.5" />{zone.index} 任務</a>)}</div></article>)}</div></div>
      {completed.length === 6 && <div className="mt-10 flex items-center gap-4 rounded-[28px] border-[3px] border-[#143f4f] bg-[#ffcb47] p-6 shadow-[0_6px_0_#143f4f]"><Sparkles className="size-10" /><div><p className="text-2xl font-black">六水匯流，護照完成！</p><p className="mt-1 text-sm font-medium">你已走完六個展區，可以回首頁製作「我與客庄共水」成果卡。</p></div></div>}
    </div></section>
  </>;
}
