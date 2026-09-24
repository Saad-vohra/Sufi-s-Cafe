import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { AtSign, Clock, MapPin, Phone, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CursorTrail } from "@/components/site/CursorTrail";
import { Footer } from "@/components/site/Footer";
import { IntroRibbon } from "@/components/site/IntroRibbon";
import { Navbar } from "@/components/site/Navbar";
import { categoryMin } from "@/data/menu";
import { BRAND, money } from "@/lib/brand";
import { STRINGS, useLang } from "@/lib/i18n";
import { homeIntroSeen, markHomeIntroSeen } from "@/lib/introState";
import { pendingScroll, setPendingScroll } from "@/lib/pendingScroll";
import { NOINTRO, STILL, scrollToId, useLenis } from "@/lib/scroll";

const HERO_VIDEO = "/videos/hero.mp4";
const HERO_OG = "https://luna-coffee.lovable.app/images/hero-green.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sufi's Cafe — specialty coffee, matcha bar & all-day brunch" },
      {
        name: "description",
        content:
          "Sufi's Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00.",
      },
      { property: "og:title", content: "Sufi's Cafe — specialty coffee, matcha bar & all-day brunch" },
      {
        property: "og:description",
        content: "Sufi's Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://luna-coffee.lovable.app/" },
      { property: "og:image", content: HERO_OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_OG },
    ],
    links: [
      { rel: "canonical", href: "https://luna-coffee.lovable.app/" },
      {
        rel: "preload",
        as: "video",
        href: HERO_VIDEO,
        type: "video/mp4",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...BRAND.locations.map((loc) => ({
              "@type": "CafeOrCoffeeShop",
              name: `${BRAND.name} · ${loc.name}`,
              url: "https://luna-coffee.lovable.app/",
              image: HERO_OG,
              telephone: BRAND.phone,
              servesCuisine: ["Coffee", "Matcha", "Brunch"],
              hasMenu: "https://luna-coffee.lovable.app/menu",
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                streetAddress: loc.address,
                addressLocality: "Kajipura, Kheda",
                addressRegion: "Gujarat",
                postalCode: "387120",
                addressCountry: "IN",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "08:00",
                  closes: "21:00",
                },
              ],
            })),
            {
              "@type": "FAQPage",
              mainEntity: STRINGS.en.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});


const GALLERY = [
  "/images/hero-red-cakes.jpg",
  "/images/eggs-sourdough.jpg",
  "/images/croissant.jpg",
  "/images/pancakes.jpg",
  "/images/matcha.jpg",
  "/images/shakshuka.jpg",
  "/images/cheesecake.jpg",
  "/images/iced-coffee.jpg",
  "/images/grain-bowl.jpg",
  "/images/pasta.jpg",
  "/images/interior.jpg",
  "/images/venue.jpg",
];

const galleryAlt = (src: string) =>
  `${src
    .split("/")
    .pop()!
    .replace(/\.[a-z]+$/, "")
    .replace(/-/g, " ")} at ${BRAND.name}`;

function HomePage() {
  const { t, lang, display } = useLang();
  const navigate = useNavigate();
  const still = STILL();
  const [intro, setIntro] = useState(() => !NOINTRO() && !homeIntroSeen());

  useLenis(!still);

  useEffect(() => {
    if (!intro) return;
    markHomeIntroSeen();
  }, [intro]);

  useEffect(() => {
    if (pendingScroll) {
      const id = pendingScroll;
      setPendingScroll(null);
      window.setTimeout(() => scrollToId(id), 260);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-paper">
      <div
        className="bg-blob left-[-10vw] top-[10vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.2),transparent_65%)]"
        style={{ animation: "blobdrift 26s ease-in-out infinite" }}
      />
      <div
        className="bg-blob right-[-8vw] top-[45vh] h-[38vw] w-[38vw] bg-[radial-gradient(circle,rgba(30,57,50,0.18),transparent_65%)]"
        style={{ animation: "blobdrift 34s ease-in-out infinite reverse" }}
      />
      <div
        className="bg-blob bottom-[-10vh] left-[30vw] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(212,233,226,0.35),transparent_65%)]"
        style={{ animation: "blobdrift 30s ease-in-out infinite" }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Mood />
        <Favorites />
        <Gallery />
        <Contact />
        <Faq />
      </main>

      <Footer />
    </div>
  );

  function Hero() {
    const ref = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.14]);

    return (
      <section id="start" className="p-4 max-sm:p-3">
        <motion.figure
          ref={ref as never}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[calc(100svh-32px)] w-full overflow-hidden rounded-[40px] bg-black shadow-[0_50px_100px_-60px_rgba(0,0,0,.5)] max-lg:h-[calc(100svh-32px)] max-lg:min-h-[560px] max-sm:h-[calc(100svh-24px)] max-sm:min-h-[520px] max-sm:rounded-[28px]"
        >
          <motion.video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ y, scale }}
            className="h-full w-full object-cover object-center pointer-events-none"
          />
          {intro && <IntroRibbon color="#ffffff" onDone={() => setIntro(false)} />}
          {/* Neutral dark gradient overlay for text readability without any green tint */}
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.62)_0%,rgba(0,0,0,.3)_35%,rgba(0,0,0,.05)_65%,transparent_85%)] max-lg:hidden pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.15)_40%,transparent_70%)] max-lg:bg-[linear-gradient(0deg,rgba(0,0,0,.78)_0%,rgba(0,0,0,.45)_35%,rgba(0,0,0,.1)_65%,transparent_100%)] pointer-events-none" />

          <div className="absolute inset-0 flex flex-col justify-center px-16 text-paper max-lg:justify-end max-lg:px-8 max-lg:pb-[calc(40px+env(safe-area-inset-bottom))] max-sm:px-5 max-sm:pb-[calc(28px+env(safe-area-inset-bottom))]">
            <p className="eyebrow !text-paper">{BRAND.city}</p>
            <h1
              className={`${display} mt-3 leading-[0.95] max-sm:mt-2`}
              style={{ fontSize: "clamp(40px,7vw,120px)" }}
            >
              {lang === "en" ? (
                <>
                  Coffee.
                  <br />
                  <span className="text-latte">Matcha.</span>
                  <br />
                  Brunch.
                </>
              ) : (
                <>
                  कॉफ़ी।
                  <br />
                  <span className="text-latte">माचा।</span>
                  <br />
                  ब्रंच।
                </>
              )}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-6 max-sm:w-full max-sm:flex-nowrap">
              <button
                onClick={() => navigate({ to: "/menu" })}
                className="btn-ink !border-paper !bg-paper !text-ink max-sm:flex-1 max-sm:justify-center max-sm:px-4 max-sm:text-center"
              >
                {t.explore}
              </button>
              <a
                href={BRAND.tel}
                className="btn-line !border-paper/50 !text-paper hover:!bg-paper/10 max-sm:flex-1 max-sm:justify-center max-sm:px-4 max-sm:text-center"
              >
                {t.book}
              </a>
            </div>
          </div>


          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-16 pb-8 text-[11px] uppercase tracking-[0.2em] text-paper/70 max-lg:hidden">
            <span>{t.scroll}</span>
            <span>
              {BRAND.rating && BRAND.reviews
                ? `${BRAND.rating}★ · ${BRAND.reviews} reviews · `
                : ""}
              {BRAND.tagline[lang]} · {BRAND.hours}
            </span>
          </div>
        </motion.figure>
      </section>
    );
  }

  function Mood() {
    const host = useRef<HTMLElement | null>(null);
    return (
      <section ref={host} className="relative overflow-hidden py-[16vh]">
        <CursorTrail hostRef={host} />
        <div className="container-x relative z-10 text-center">
          <p className="eyebrow">{t.moveCursor}</p>
          <h2 className={`${display} mt-4 leading-[1.02]`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.moodA}
            <br />
            <span className="text-terra">{t.moodB}</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate({ to: "/menu" })} className="btn-ink">
              {t.openMenuBtn}
            </button>
            <button onClick={() => scrollToId("contact")} className="btn-line">
              {t.findUs}
            </button>
          </div>
        </div>
      </section>
    );
  }

  function Favorites() {
    const tiles = [
      { id: "coffee", label: { en: "Coffee", hi: "कॉफ़ी" }, img: "/images/latte.jpg" },
      { id: "matcha", label: { en: "Matcha bar", hi: "माचा बार" }, img: "/images/matcha.jpg" },
      { id: "breakfast", label: { en: "All-day brunch", hi: "ऑल-डे ब्रंच" }, img: "/images/brunch.jpg" },
      { id: "pastry", label: { en: "Pastry", hi: "पेस्ट्री" }, img: "/images/pastry.jpg" },
    ];
    return (
      <section id="favorites" className="container-x scroll-mt-28 py-[10vh]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className={display} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.favoriteTitle}
          </h2>
          <button onClick={() => navigate({ to: "/menu" })} className="btn-line">
            {t.fullMenu}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {tiles.map((tile) => {
            const min = categoryMin(tile.id);
            return (
              <button key={tile.id} onClick={() => navigate({ to: "/menu" })} className="group text-left">
                <div className="photo-card relative aspect-[4/5]">
                  <img
                    src={tile.img}
                    alt={`${tile.label.en} served at ${BRAND.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {min !== null && (
                    <span className="chip absolute left-4 top-4">
                      {t.from} {money(min)}
                    </span>
                  )}
                </div>
                <h3 className={`${display} mt-4`} style={{ fontSize: 26 }}>
                  {tile.label[lang]}
                </h3>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  function Gallery() {
    return (
      <section id="gallery" className="container-x scroll-mt-28 py-[10vh]">
        <h2 className={`${display} mb-10`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
          {t.galleryTitle}
        </h2>
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2">
          {GALLERY.map((src, i) => (
            <div
              key={src + i}
              className={`photo-card aspect-[4/5] ${i % 4 === 1 || i % 4 === 2 ? "mt-10 max-lg:mt-0" : ""}`}
            >
              <img
                src={src}
                alt={galleryAlt(src)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          {BRAND.instagramUrl ? (
            <a href={BRAND.instagramUrl} className="btn-line">
              <AtSign className="size-4" />
              {BRAND.instagram}
            </a>
          ) : (
            <span className="btn-line cursor-default" aria-disabled="true">
              <AtSign className="size-4" />
              {BRAND.instagram}
            </span>
          )}
        </div>
        <div className="mt-8 grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {GALLERY.slice(0, 6).map((src, i) => (
            <div key={"sq" + i} className="photo-card aspect-square">
              <img src={src} alt={galleryAlt(src)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  function Contact() {
    return (
      <section id="contact" className="container-x scroll-mt-28 py-[10vh]">
        <h2 className={`${display} mb-10`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
          {t.contactTitle}
        </h2>
        <div className={`grid gap-6 ${BRAND.locations.length > 1 ? "grid-cols-[1fr_1fr_0.9fr] max-lg:grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
          {BRAND.locations.map((loc) => (
            <div
              key={loc.name}
              className="flex flex-col justify-between rounded-[24px] border bg-white/60 p-8 backdrop-blur"
            >
              <div>
                <div className="-mx-8 -mt-8 mb-6 aspect-[3/2] overflow-hidden rounded-t-[24px]">
                  <img src={loc.img} alt={`${BRAND.name} ${loc.name} room at ${loc.address}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <span className="chip">{loc.tag[lang]}</span>
                <h3 className="mt-4 text-[19px] font-semibold">
                  {BRAND.name} · {loc.name}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-[15px] text-muted">
                  <MapPin className="size-4 text-terra" /> {loc.address}
                </p>
                <p className="mt-1 flex items-center gap-2 text-[15px] text-muted">
                  <Clock className="size-4 text-terra" /> {BRAND.hours}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {loc.maps ? (
                  <a href={loc.maps} className="btn-line">
                    {t.openMaps}
                  </a>
                ) : (
                  <span className="btn-line" aria-disabled="true">
                    {t.openMaps}
                  </span>
                )}
                <a href={BRAND.tel} className="btn-ink">
                  <Phone className="size-4" /> {t.call}
                </a>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-[24px] bg-[#1e3932] p-8 text-paper shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="Sufi's Cafe Logo"
                  className="size-11 rounded-full object-contain drop-shadow ring-1.5 ring-paper/40"
                />
                <div className="h-7 w-px bg-paper/30" />
                <div className="flex flex-col text-left">
                  <span className="font-serif tracking-[0.18em] font-bold text-paper text-[15px] leading-tight">
                    {BRAND.mark}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#d4e9e2] font-semibold">
                    COFFEE & CRAFT
                  </span>
                </div>
              </div>
              <h3 className={display} style={{ fontSize: 38 }}>
                {t.yourTable}
              </h3>
              <p className="mt-4 text-[15px] text-paper/85">{t.yourTableBlurb}</p>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <a href={BRAND.tel} className="btn-ink !border-paper !bg-paper !text-ink hover:!bg-[#d4e9e2]">
                <Phone className="size-4" /> {BRAND.phone}
              </a>
              <span className="btn-line !border-paper/50 !text-paper" aria-disabled="true">
                <AtSign className="size-4" /> {BRAND.instagram}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
      <section className="container-x py-[10vh]">
        <h2 className={`${display} mb-10`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
          {t.faqTitle}
        </h2>
        <div className="divide-y divide-[rgba(0,98,65,0.12)] border-y border-[rgba(0,98,65,0.12)]">
          {t.faq.map((f, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[17px] font-semibold transition-transform duration-300 group-hover:translate-x-1">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex size-[34px] shrink-0 items-center justify-center rounded-full border border-[rgba(0,98,65,0.22)] bg-white/70"
                >
                  <Plus className="size-4 text-ink" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden"
              >
                <p className="pb-6 pr-16 text-[15px] text-muted">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
