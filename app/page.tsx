import Link from "next/link";
import CoolBackground from "@/app/components/CoolBackground";
import GlassCard from "@/app/components/GlassCard";

export default function HomePage() {
  const helpLabel = process.env.NEXT_PUBLIC_UI_VALUE ?? "Help";

  return (
    <CoolBackground>
      <main className="container mx-auto px-4 py-16">
        <GlassCard className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Creative Mastery Tracker
              </h1>
              <p className="text-white/70">
                Start building the dashboard and test your UI flow.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/preview"
                className="cool-btn inline-flex items-center justify-center border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15"
              >
                <span>Preview</span>
              </Link>

              <button className="cool-btn inline-flex items-center justify-center border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15">
                Launch ChatGPT
              </button>

              <button className="cool-btn inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90">
                Start New Project
              </button>

              <button className="cool-btn inline-flex items-center justify-center border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15">
                {helpLabel}
              </button>
            </div>
          </div>
        </GlassCard>
      </main>
    </CoolBackground>
  );
}
