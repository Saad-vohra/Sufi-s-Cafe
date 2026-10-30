"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { AtSign, Clock, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CursorTrail } from "@/components/site/CursorTrail";
import { Footer } from "@/components/site/Footer";
import { IntroRibbon } from "@/components/site/IntroRibbon";
import { Navbar } from "@/components/site/Navbar";
import { categoryMin } from "@/data/menu";
import { BRAND, money } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { homeIntroSeen, markHomeIntroSeen } from "@/lib/introState";
import { pendingScroll, setPendingScroll } from "@/lib/pendingScroll";
import { NOINTRO, STILL, scrollToId, useLenis } from "@/lib/scroll";

const HERO_VIDEO = "/videos/hero.mp4";

const GALLERY = [
  "/images/caramel-iced-latte.jpg",
  "/images/veg-burger.jpg",
  "/images/berry-bliss.jpg",
  "/images/tiramisu-dessert.jpg",
  "/images/latte.jpg",
  "/images/sufi-special-dessert.jpg",
  "/images/cheesecake.jpg",
  "/images/iced-coffee.jpg",
  "/images/kitkat-shake.jpg",
  "/images/loaded-fries.jpg",
  "/images/masala-chai.jpg",
  "/images/hot-matcha.jpg",
];

const galleryAlt = (src: string) =>
  `${src
    .split("/")
    .pop()!
    .replace(/\.[a-z]+$/, "")
    .replace(/-/g, " ")} at ${BRAND.name}`;

export default function HomePage() {
  const { t, lang, display } = useLang();
  const router = useRouter();
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
        <Events />
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
      <section id="start" className="relative h-screen min-h-[600px] w-full overflow-hidden max-sm:min-h-[520px]">
        <motion.figure
          ref={ref as never}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-full w-full overflow-hidden bg-black"
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
                onClick={() => router.push("/menu")}
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
      <section id="mood" ref={host} className="relative overflow-hidden py-[16vh] scroll-mt-24">
        <CursorTrail hostRef={host} />
        <div className="container-x relative z-10 text-center">
          <p className="eyebrow">{t.moveCursor}</p>
          <h2 className={`${display} mt-4 leading-[1.02]`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.moodA}
            <br />
            <span className="text-terra">{t.moodB}</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => router.push("/menu")} className="btn-ink">
              {t.openMenuBtn}
            </button>
            <button onClick={() => router.push("/about")} className="btn-line">
              {t.aboutUs}
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
      { id: "signature-coffee", label: { en: "Signature Coffee", hi: "सिग्नेचर कॉफ़ी" }, img: "/images/spanish-latte.jpg" },
      { id: "food", label: { en: "Food & Bites", hi: "फ़ूड और स्नैक्स" }, img: "/images/veg-burger.jpg" },
      { id: "desserts", label: { en: "Desserts", hi: "डेसर्ट" }, img: "/images/tiramisu-dessert.jpg" },
    ];
    return (
      <section id="favorites" className="container-x scroll-mt-28 py-[10vh]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className={display} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.favoriteTitle}
          </h2>
          <button onClick={() => router.push("/menu")} className="btn-line">
            {t.fullMenu}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {tiles.map((tile) => {
            const min = categoryMin(tile.id);
            return (
              <button key={tile.id} onClick={() => router.push("/menu")} className="group text-left">
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
      </section>
    );
  }

  function Events() {
    return (
      <section id="events" className="container-x scroll-mt-28 py-[10vh]">
        <div className="text-center">
          <span className="inline-block rounded-full border border-ink/20 bg-paper/80 px-4 py-1 text-[12px] uppercase tracking-[0.18em] text-ink/80 backdrop-blur font-medium">
            {t.eventsEyebrow}
          </span>
          <h2 className={`${display} mt-4 leading-[1.06]`} style={{ fontSize: "clamp(34px,4.5vw,68px)" }}>
            {t.eventsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] sm:text-[17px] text-muted leading-relaxed">
            {t.eventsSubtitle}
          </p>
        </div>

        {/* Top 2 Cards: Private Events & Catering */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Private Events */}
          <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-paper">
                <img
                  src="/images/events-private.jpg"
                  alt={`${t.eventsPrivateTitle} at ${BRAND.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <h3 className={`${display} mt-6 text-[26px] sm:text-[30px]`}>
                {t.eventsPrivateTitle}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-muted leading-relaxed">
                {t.eventsPrivateDesc}
              </p>
            </div>
          </div>

          {/* Card 2: Catering */}
          <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-paper">
                <img
                  src="/images/events-catering.jpg"
                  alt={`${t.eventsCateringTitle} by ${BRAND.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <h3 className={`${display} mt-6 text-[26px] sm:text-[30px]`}>
                {t.eventsCateringTitle}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-muted leading-relaxed">
                {t.eventsCateringDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Card: Custom Menus */}
        <div className="mt-6 rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-center">
            <div className="flex flex-col items-start">
              <h3 className={`${display} text-[28px] sm:text-[34px]`}>
                {t.eventsCustomTitle}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[16px] text-muted leading-relaxed">
                {t.eventsCustomDesc}
              </p>
              <div className="mt-6">
                <a
                  href="https://wa.me/917984342874?text=Hi%20Sufi's%20Cafe,%20I'd%20like%20to%20customize%20a%20menu%20for%20an%20event!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink !bg-[#006241] !text-paper hover:!bg-[#1e3932] shadow-sm inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4" />
                  {t.eventsGetInTouch}
                </a>
              </div>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-paper">
              <img
                src="/images/events-custom-menus.jpg"
                alt={`${t.eventsCustomTitle} at ${BRAND.name}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Speak with one of our experts */}
        <div className="mt-8 rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#006241] font-semibold">
              {t.eventsExpertEyebrow}
            </p>
            <h3 className={`${display} mt-1 text-[24px] sm:text-[32px]`}>
              {t.eventsExpertTitle}
            </h3>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 max-sm:w-full max-sm:justify-around">
            <a
              href="https://wa.me/917984342874?text=Hi%20Sufi's%20Cafe,%20I'd%20like%20to%20inquire%20about%20hosting%20an%20event!"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#1e3932] text-paper flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#006241] group-hover:scale-105">
                <MessageCircle className="size-6 sm:size-7" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80 group-hover:text-[#006241] transition-colors">
                {t.eventsWhatsapp}
              </span>
            </a>
            <a
              href="mailto:contact@sufiscafe.com?subject=Event%20Inquiry%20-%20Sufi's%20Cafe"
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#1e3932] text-paper flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#006241] group-hover:scale-105">
                <Mail className="size-6 sm:size-7" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80 group-hover:text-[#006241] transition-colors">
                {t.eventsEmail}
              </span>
            </a>
            <a
              href={BRAND.tel}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#1e3932] text-paper flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#006241] group-hover:scale-105">
                <Phone className="size-6 sm:size-7" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80 group-hover:text-[#006241] transition-colors">
                {t.eventsNumber}
              </span>
            </a>
          </div>
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

