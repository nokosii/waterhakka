import { ArrowLeft, BookOpen, Compass, Droplet, Home, Route, ShieldCheck } from 'lucide-react';

export function SiteHeader({ backHref = '/', backLabel = '展覽首頁' }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#143f4f] bg-[#fff9e9]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-5 py-3 sm:px-8 lg:px-12">
        <a href={backHref} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-[#dff4f8]"><ArrowLeft className="size-4" />{backLabel}</a>
        <a href="/" className="ml-auto flex items-center gap-2 font-black tracking-[.08em]"><span className="grid size-8 place-items-center rounded-full bg-[#75d4ed]"><Droplet className="size-4 fill-current" /></span>水水客庄</a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="主要選單"><a href="/themes/waterway-traces" className="rounded-full px-3 py-2 text-xs font-black hover:bg-[#dff4f8]">圳路築跡</a><a href="/themes/bogong-guards-water" className="rounded-full px-3 py-2 text-xs font-black hover:bg-[#ffe0d9]">伯公守水口</a><a href="/passport" className="rounded-full px-3 py-2 text-xs font-black hover:bg-[#e6f0bd]">水水護照</a><a href="/about" className="rounded-full px-3 py-2 text-xs font-black hover:bg-[#eee5f8]">關於展覽</a></nav>
        <a href="/library" className="inline-flex items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-4 py-2 text-sm font-black hover:bg-[#ffdc75]"><BookOpen className="size-4" />水水書房</a>
      </div>
      <MobileBottomNav />
    </header>
  );
}

export function MobileBottomNav() {
  const links = [
    { href: '/', label: '首頁', icon: Home },
    { href: '/#themes', label: '主題', icon: Route },
    { href: '/#exhibition', label: '探索', icon: Compass },
    { href: '/library', label: '書房', icon: BookOpen },
    { href: '/passport', label: '護照', icon: ShieldCheck },
  ];
  return <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border-2 border-[#143f4f] bg-[#fff9e9]/96 p-1.5 shadow-[0_4px_0_#143f4f] backdrop-blur md:hidden" aria-label="手機版主要導覽">{links.map(({ href, label, icon: Icon }) => <a key={href} href={href} className="flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-black hover:bg-[#dff4f8]"><Icon className="size-4" />{label}</a>)}</nav>;
}
