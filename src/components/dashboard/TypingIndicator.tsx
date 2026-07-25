export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl bg-(--surface-subtle) px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-(--neutral-400)"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
