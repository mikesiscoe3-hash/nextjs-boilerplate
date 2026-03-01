import CoolBackground from "@/app/components/CoolBackground";
import GlassCard from "@/app/components/GlassCard";

const figmaUrl = "https://pose-think-33651514.figma.site";

export default function PreviewPage() {
  return (
    <CoolBackground>
      <div className="container mx-auto px-4 py-12">
        <GlassCard className="max-w-3xl mx-auto">
          <iframe
            src={figmaUrl}
            className="w-full h-[100vh] border-0 rounded-2xl"
            allowFullScreen
          />
        </GlassCard>
      </div>
    </CoolBackground>
  );
}
