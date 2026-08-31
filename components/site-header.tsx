import { ArrowLeft, BookOpen, Droplet } from 'lucide-react';

export function SiteHeader({ backHref = '/', backLabel = '展覽首頁' }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#143f4f] bg-[#fff9e9]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-5 py-3 sm:px-8 lg:px-12">
        <a href={backHref} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-[#dff4f8]"><ArrowLeft className="size-4" />{backLabel}</a>
        <a href="/" className="ml-auto flex items-center gap-2 font-black tracking-[.08em]"><span className="grid size-8 place-items-center rounded-full bg-[#75d4ed]"><Droplet className="size-4 fill-current" /></span>水水客庄</a>
        <a href="/library" className="inline-flex items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-4 py-2 text-sm font-black hover:bg-[#ffdc75]"><BookOpen className="size-4" />水水書房</a>
      </div>
    </header>
  );
}
