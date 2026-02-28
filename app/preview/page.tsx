const figmaUrl = "https://pose-think-33651514.figma.site";

export default function PreviewPage() {
  return (
    <iframe
      src={figmaUrl}
      className="w-full h-[100vh] border-0"
      allowFullScreen
    />
  );
}
