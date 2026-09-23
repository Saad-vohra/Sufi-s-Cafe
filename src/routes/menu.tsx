import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IntroRibbon } from "@/components/site/IntroRibbon";
import { LangSwitch } from "@/components/site/LangSwitch";
import { MENU, type FullMenuItem } from "@/data/menu";
import { BRAND, money } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { STILL, getScroll, onLenisScroll, scrollToY, useLenis } from "@/lib/scroll";


export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Luna Cafe | coffee, matcha, brunch & pastry" },
      {
        name: "description",
        content:
          "The full Luna Cafe menu: filter and espresso coffee, a ceremonial matcha bar, all-day brunch, bowls, pastry and cold drinks.",
      },
      { property: "og:title", content: "The Luna Cafe menu" },
      {
        property: "og:description",
        content: "Coffee, matcha, brunch, bowls and pastry — the full list, in two languages.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://luna-coffee.lovable.app/menu" },
    ],
    links: [{ rel: "canonical", href: "https://luna-coffee.lovable.app/menu" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: `${BRAND.name} menu`,
          url: "https://luna-coffee.lovable.app/menu",
          hasMenuSection: MENU.map((section) => ({
            "@type": "MenuSection",
            name: section.label.en,
            hasMenuItem: section.items.map((item) => ({
              "@type": "MenuItem",
              name: item.title.en,
              offers: {
                "@type": "Offer",
                price: String(item.price),
                priceCurrency: "INR",
              },
            })),
          })),
        }),
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, lang, display } = useLang();
  const navigate = useNavigate();
  const still = STILL();
  const [active, setActive] = useState(MENU[0].id);
  const [cart, setCart] = useState<{ id: string; price: number }[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [navH, setNavH] = useState(72);
  const [intro, setIntro] = useState(!still);


  useLenis(!still);

  useEffect(() => {
    const measure = () => setNavH(navRef.current?.offsetHeight ?? 72);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const chromeHeight = () =>
    (navRef.current?.offsetHeight ?? 0) + (railRef.current?.offsetHeight ?? 0);

  useEffect(
    () =>
      onLenisScroll(() => {
        const limit = chromeHeight() + 20;
        let current = MENU[0].id;
        for (const cat of MENU) {
          const h = document.getElementById(`h-${cat.id}`);
          if (h && h.getBoundingClientRect().top <= limit) current = cat.id;
        }
        setActive(current);
      }),
    [],
  );

  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    const rail = railRef.current?.querySelector<HTMLElement>(".no-scrollbar");
    if (!chip || !rail) return;
    // scroll only the horizontal rail — scrollIntoView would also scroll the page
    const target = chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2;
    const max = rail.scrollWidth - rail.clientWidth;
    rail.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
  }, [active]);

  const jump = (id: string) => {
    const h = document.getElementById(`h-${id}`);
    if (!h) return;
    scrollToY(h.getBoundingClientRect().top + getScroll() - chromeHeight() - 12);
  };

  const total = cart.reduce((s, c) => s + c.price, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      {intro && <IntroRibbon onDone={() => setIntro(false)} color="#006241" />}

      <header
        ref={navRef as never}
        className="sticky top-0 z-[50] border-b bg-paper/85 backdrop-blur"
      >
        <div className="container-x flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
          <button
            onClick={() => navigate({ to: "/" })}
            aria-label="Back to home"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <ArrowLeft className="size-4 shrink-0 text-ink transition-transform duration-200 group-hover:-translate-x-1" />
            <img src="/images/logo.webp" alt="Logo" className="size-8 object-contain drop-shadow" />
            <span className="truncate font-serif tracking-[0.14em] text-ink text-[20px] sm:text-[24px]">
              {BRAND.mark}
            </span>
          </button>
          <span className="hidden text-[13px] text-muted lg:block">{BRAND.hours}</span>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LangSwitch />
            <a href={BRAND.tel} className="btn-ink !px-3 !py-2 text-[13px] sm:!px-5 sm:!py-2.5">
              <Phone className="size-4" />
              <span className="hidden xs:inline sm:inline">{t.bookShort}</span>
            </a>
          </div>
        </div>
      </header>

      <motion.div
        className="container-x pb-6 pt-8 sm:pb-8 sm:pt-12"
        initial={still ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{BRAND.tagline[lang]}</p>
        <h1
          className={`${display} mt-2 leading-[0.95]`}
          style={{ fontSize: "clamp(40px,10vw,104px)" }}
        >
          {t.menuTitle}
        </h1>
      </motion.div>

      <div
        id="menu-rail"
        ref={railRef}
        className="sticky z-[40] border-y bg-paper/90 backdrop-blur"
        style={{ top: navH }}
      >
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3 [-webkit-overflow-scrolling:touch]">
          {MENU.map((cat) => (
            <button
              key={cat.id}
              data-chip={cat.id}
              onClick={() => jump(cat.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                active === cat.id
                  ? "border-ink bg-ink text-paper"
                  : "border-[rgba(0,98,65,0.22)] text-ink hover:bg-[rgba(0,98,65,0.05)]"
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <main className="container-x pb-44 sm:pb-40">
        {MENU.map((cat) => (
          <section key={cat.id} id={cat.id} className="pt-12 sm:pt-16">
            <motion.h2
              id={`h-${cat.id}`}
              className={display}
              style={{ fontSize: "clamp(26px,6.5vw,50px)" }}
              initial={still ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {cat.label[lang]}
            </motion.h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {cat.items.map((it, i) => (
                <motion.div
                  key={it.title.en}
                  className="flex"
                  initial={still ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: still ? 0 : Math.min(i, 3) * 0.07,
                  }}
                >
                  <MenuCard
                    item={it}
                    onAdd={() => setCart((c) => [...c, { id: it.title.en, price: it.price }])}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>


      {cart.length > 0 && !still && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-5 sm:px-4"
        >
          <div className="flex w-full max-w-[560px] flex-wrap items-center justify-center gap-3 rounded-[28px] bg-[#1e3932] px-4 py-3 text-paper shadow-[0_24px_50px_-24px_rgba(0,98,65,.6)] sm:gap-4 sm:rounded-full sm:px-6">
            <span className="text-[13px] sm:text-[14px]">
              {cart.length} {cart.length === 1 ? t.itemsOne : t.itemsMany} · {money(total)}
            </span>
            <button onClick={() => setCart([])} className="text-[13px] text-paper/70 hover:text-paper underline">
              {t.clear}
            </button>
            <a href={BRAND.tel} className="btn-ink !border-paper !bg-paper !text-ink !px-4 !py-2 hover:!bg-[#d4e9e2]">
              {t.order}
            </a>
            <span className="w-full text-center text-[11px] text-paper/60">{t.draftNote}</span>
          </div>

        </motion.div>
      )}
    </div>
  );
}

function MenuCard({ item, onAdd }: { item: FullMenuItem; onAdd: () => void }) {
  const { t, lang } = useLang();
  const chips: string[] = [];
  if (item.allergens[lang].length) chips.push(item.allergens[lang].join(", "));
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_24px_50px_-40px_rgba(0,98,65,.35)] transition-transform duration-300 hover:-translate-y-1 sm:rounded-[26px]">
      {item.img && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={item.img}
            alt={`${item.title[lang]} — ${BRAND.name} menu item`}
            loading="lazy"
            decoding="async"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[17px] font-semibold sm:text-[18px]">{item.title[lang]}</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full bg-[#d4e9e2] px-2.5 py-1 text-[12px] font-medium text-[#006241]">
              {c}
            </span>
          ))}
          {item.kcal !== null && (
            <span className="rounded-full bg-[rgba(0,98,65,0.06)] px-2.5 py-1 text-[12px] text-muted">
              {item.kcal} kcal
            </span>
          )}
          {item.weight !== null && (
            <span className="rounded-full bg-[rgba(0,98,65,0.06)] px-2.5 py-1 text-[12px] text-muted">
              {item.weight} g
            </span>
          )}
        </div>
        <p className="mt-3 text-[13.5px] text-muted">{item.desc[lang]}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-[17px] font-semibold text-ink">{money(item.price)}</span>
          <button onClick={onAdd} className="btn-ink !px-4 !py-2">
            {t.add}
          </button>
        </div>
      </div>
    </article>
  );
}
