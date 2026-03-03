import Link from "next/link";
import CoolBackground from "@/app/components/CoolBackground";
import GlassCard from "@/app/components/GlassCard";

const figmaUrl = "https://pose-think-33651514.figma.site";

export default function PreviewPage() {
  return (
    <CoolBackground>
      <main className="container mx-auto px-4 py-16">
        <GlassCard className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">Preview</h1>
              <p className="text-white/70">
                Open the Figma preview to review the latest design.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/"
                className="cool-btn inline-flex items-center justify-center border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15"
              >
                <span>Back to home</span>
              </Link>

              <Link
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cool-btn inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90"
              >
                <span>Open Figma</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40">
            <iframe
              src={figmaUrl}
              className="h-[70vh] w-full"
              title="Figma preview"
              allowFullScreen
            />
          </div>

          <p className="mt-3 text-xs text-white/55">
            If the embed is blocked, use the “Open Figma” button.
          </p>
        </GlassCard>
      </main>
    </CoolBackground>
  );
}
