export default function BrowserMock({
  title,
  children,
  accent = "#f3f4f6",
  height = 160,
}: {
  title?: string;
  children?: React.ReactNode;
  accent?: string;
  height?: number;
}) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="dot bg-[#ff5f57]" />
        <span className="dot bg-[#febc2e]" />
        <span className="dot bg-[#28c840]" />
        {title && (
          <span className="ml-2 truncate text-[11px] text-mute">{title}</span>
        )}
      </div>
      <div
        className="relative w-full"
        style={{ background: accent, height }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
