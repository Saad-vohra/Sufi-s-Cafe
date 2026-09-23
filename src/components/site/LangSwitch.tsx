import { useLang, LANGS, type Lang } from "@/lib/i18n";

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex rounded-full border p-0.5 ${light ? "border-paper/40" : "border-[rgba(70,14,20,0.2)]"}`}
    >
      {LANGS.map((l: Lang) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
              active
                ? light
                  ? "bg-paper text-ink"
                  : "bg-ink text-paper"
                : light
                  ? "text-paper/70"
                  : "text-muted"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
