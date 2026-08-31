'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Database, Download, ExternalLink, Filter, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { libraryRecords, zoneRecords } from '@/lib/exhibition-data';

export function WaterLibrary({ initialZone = '' }: { initialZone?: string }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('全部');
  const [region, setRegion] = useState('全部');
  const [zoneSlug, setZoneSlug] = useState(initialZone);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return libraryRecords.filter((record) => {
      const matchesQuery = !normalized || [record.id, record.title, record.note, record.type, record.region, record.era, ...record.keywords].join(' ').toLowerCase().includes(normalized);
      return matchesQuery && (type === '全部' || record.type === type) && (region === '全部' || record.region === region) && (!zoneSlug || record.zoneSlug === zoneSlug);
    });
  }, [query, region, type, zoneSlug]);

  function resetFilters() {
    setQuery('');
    setType('全部');
    setRegion('全部');
    setZoneSlug('');
  }

  function downloadResults() {
    const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const rows = [
      ['資料編號', '名稱', '類型', '地區', '年代', '關鍵字', '說明', '來源URL'],
      ...results.map((record) => [record.id, record.title, record.type, record.region, record.era, record.keywords.join('；'), record.note, record.source]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escape).join(',')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '水水書房_查詢結果.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const types = ['全部', ...new Set(libraryRecords.map((record) => record.type))];
  const regions = ['全部', ...new Set(libraryRecords.map((record) => record.region))];

  return (
    <>
      <section className="border-b-[3px] border-[#143f4f] bg-[#143f4f] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div><Badge className="h-auto border-2 border-white/70 bg-[#ffcb47] px-4 py-2 font-black text-[#143f4f]"><BookOpen /> WATER LIBRARY · 水水書房</Badge><h1 className="mt-5 text-6xl font-black leading-[.96] tracking-[-.05em] sm:text-8xl">讓地方資料，<br /><span className="text-[#75d4ed]">沿水匯流。</span></h1></div>
          <div className="rounded-[28px] border-2 border-white/30 bg-white/8 p-6"><p className="text-lg font-black">給在地文史工作者的水文化查詢入口</p><p className="mt-3 font-medium leading-8 text-white/65">以關鍵字、地區、年代、類型與展區搜尋策展引用資料，保留典藏原始連結，並可下載目前查詢結果。現階段為六區核心資料原型，後續可依核定清冊擴充。</p></div>
        </div>
      </section>

      <section className="soft-grid px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="rounded-[30px] border-[3px] border-[#143f4f] bg-white p-5 shadow-[0_6px_0_#143f4f] sm:p-7">
            <label className="block"><span className="mb-2 block text-sm font-black">搜尋名稱、編號、關鍵字或內容說明</span><span className="relative block"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#648089]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：水分額、洗衫坑、伯公、埤塘……" className="h-14 rounded-full border-2 border-[#143f4f] bg-[#fff9e9] pl-12 pr-5 text-base font-medium" /></span></label>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <FilterGroup label="資料類型" values={types} selected={type} onSelect={setType} />
              <FilterGroup label="地區" values={regions} selected={region} onSelect={setRegion} />
              <div><p className="mb-2 flex items-center gap-2 text-xs font-black tracking-[.12em] text-[#667d85]"><Filter className="size-4" />展區</p><select value={zoneSlug} onChange={(event) => setZoneSlug(event.target.value)} className="h-11 w-full rounded-full border-2 border-[#143f4f] bg-white px-4 text-sm font-black"><option value="">全部展區</option>{zoneRecords.map((zone) => <option key={zone.slug} value={zone.slug}>{zone.index} {zone.title}</option>)}</select></div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-[#143f4f]/20 pt-5"><p className="flex items-center gap-2 font-black"><Database className="size-5 text-[#148781]" />找到 {results.length} 筆資料</p><div className="flex flex-wrap gap-2"><Button onClick={resetFilters} variant="outline" className="h-10 rounded-full border-2 border-[#143f4f] bg-white px-4 font-black"><X />清除篩選</Button><Button onClick={downloadResults} disabled={results.length === 0} className="h-10 rounded-full border-2 border-[#143f4f] bg-[#bddd43] px-4 font-black text-[#143f4f] hover:bg-[#d5e77d]"><Download />下載查詢結果 CSV</Button></div></div>
          </div>

          {results.length > 0 ? (
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((record) => {
                const zone = zoneRecords.find((item) => item.slug === record.zoneSlug)!;
                return <article key={record.id} className="flex min-h-80 flex-col rounded-[26px] border-[3px] border-[#143f4f] bg-white p-5 shadow-[0_5px_0_#143f4f] sm:p-6"><div className="flex items-start justify-between gap-3"><span className="rounded-full border-2 border-[#143f4f] px-3 py-1 text-xs font-black" style={{ backgroundColor: zone.color }}>{record.id}</span><span className="text-xs font-black text-[#72868d]">{record.era}</span></div><h2 className="mt-5 text-2xl font-black leading-snug">{record.title}</h2><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-[#dff4f8] px-3 py-1 text-xs font-bold">{record.type}</span><span className="rounded-full bg-[#fff0bd] px-3 py-1 text-xs font-bold">{record.region}</span></div><p className="mt-4 text-sm font-medium leading-7 text-[#5f7780]">{record.note}</p><div className="mt-4 flex flex-wrap gap-1.5">{record.keywords.map((keyword) => <button key={keyword} onClick={() => setQuery(keyword)} className="text-xs font-bold text-[#148781] hover:underline">#{keyword}</button>)}</div><div className="mt-auto flex flex-wrap gap-3 border-t-2 border-dashed border-[#143f4f]/20 pt-5"><a href={record.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-black text-[#143f4f] hover:text-[#148781]">典藏來源 <ExternalLink className="size-4" /></a><a href={`/zones/${record.zoneSlug}`} className="ml-auto text-sm font-black text-[#148781] hover:underline">前往展區 →</a></div></article>;
              })}
            </div>
          ) : (
            <div className="mt-9 rounded-[28px] border-[3px] border-dashed border-[#143f4f]/35 bg-white p-12 text-center"><Search className="mx-auto size-12 text-[#9aabad]" /><h2 className="mt-5 text-2xl font-black">目前沒有符合的資料</h2><p className="mt-2 text-sm font-medium text-[#71868d]">試著減少關鍵字，或清除部分篩選條件。</p><Button onClick={resetFilters} className="mt-6 rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-5 font-black text-[#143f4f]">重設查詢</Button></div>
          )}

          <div className="mt-10 rounded-2xl border-2 border-[#143f4f]/25 bg-[#fff9e9] p-5 text-xs font-medium leading-6 text-[#667c84]">資料使用提醒：書房保留原始典藏連結，題名、年代、權利狀態及典藏編號仍應以來源網站最新紀錄為準。正式資料庫上線前，需由機關與在地文史工作者共同校訂。</div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ label, values, selected, onSelect }: { label: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return <div><p className="mb-2 flex items-center gap-2 text-xs font-black tracking-[.12em] text-[#667d85]"><Filter className="size-4" />{label}</p><div className="flex flex-wrap gap-2">{values.map((value) => <button key={value} onClick={() => onSelect(value)} className={`rounded-full border-2 border-[#143f4f] px-3 py-2 text-xs font-black ${selected === value ? 'bg-[#75d4ed]' : 'bg-white hover:bg-[#e7f7fa]'}`}>{value}</button>)}</div></div>;
}
