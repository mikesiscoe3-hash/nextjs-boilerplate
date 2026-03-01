"use client";

import { cn } from "@/lib/utils";

export default function CoolBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-slate-950 text-slate-100", className)}>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-[90px]" />
      <div className="pointer-events-none absolute top-32 -left-40 h-[480px] w-[480px] rounded-full bg-fuchsia-500/20 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="relative">{children}</div>
    </div>
  );
}
