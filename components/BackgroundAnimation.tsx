export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* ── Base gradient background ── */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 30%, #fef2f2 60%, #fff7ed 100%)"
        }}
      />

      {/* ── Subtle mesh grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220,38,38,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />
    </div>
  );
}
