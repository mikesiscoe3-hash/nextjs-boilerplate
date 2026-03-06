cat > app/page.tsx <<'TS'
export default function Page() {
  const helpLabel = process.env.NEXT_PUBLIC_UI_VALUE ?? 'Help'
  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <button>Launch ChatGPT</button>
        <button>Start New Project</button>
        <button>{helpLabel}</button>
      </div>
    </main>
  )
}
TS
