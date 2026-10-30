"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { setPendingScroll } from "@/lib/pendingScroll";
import { getScroll, onLenisScroll, scrollToId } from "@/lib/scroll";
import { LangSwitch } from "./LangSwitch";

const SECTIONS = ["gallery", "contact", "favorites"] as const;

export function Navbar() {
  const { t, display } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(
    () => onLenisScroll(() => setScrolled(getScroll() > window.innerHeight * 0.72)),
    [],
  );

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open;

  const go = (target: "menu" | "about" | "home" | "start" | (typeof SECTIONS)[number]) => {
    const run = () => {
      if (target === "menu") {
        router.push("/menu");
        return;
      }
      if (target === "about") {
        router.push("/about");
        return;
      }
      if (target === "home" || target === "start") {
        if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
        else router.push("/");
        return;
      }
      if (pathname === "/") scrollToId(target);
      else {
        setPendingScroll(target);
        router.push("/");
      }
    };
    if (open) {
      setOpen(false);
      window.setTimeout(run, 340);
    } else run();
  };

  const links: { id: "home" | "menu" | "about" | "gallery" | "contact"; label: string }[] = [
    { id: "home", label: t.home },
    { id: "menu", label: t.menu },
    { id: "about", label: t.aboutUs },
    { id: "gallery", label: t.gallery },
    { id: "contact", label: t.contactUs },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      {/* overlay lives inside the header so the burger stays clickable above it */}
      <div
        className={`fixed inset-0 z-[10] bg-[#1e3932] transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-2 pt-24 pb-14">
          {links.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => go(l.id)}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.4, delay: open ? 0.06 * i : 0 }}
              className={`group flex items-center text-left text-paper ${display}`}
              style={{ fontSize: "clamp(34px,6.5vh,58px)", lineHeight: 1.12 }}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                {l.label}
              </span>
            </motion.button>
          ))}
          <div className="mt-10 flex items-center gap-4">
            <span className="eyebrow !text-paper/85">{t.language}</span>
            <LangSwitch light />
          </div>
          <div className="hairline mt-8 flex flex-wrap gap-x-8 gap-y-2 pt-6 text-[13px] text-paper/85">
            <span>{BRAND.hours}</span>
            <span>{BRAND.locations[0].address}</span>
            <span>{BRAND.instagram}</span>
          </div>
        </div>
      </div>

      <div
        className={`relative z-[20] transition-all duration-300 ${scrolled && !open
          ? "bg-paper/90 shadow-[0_1px_0_rgba(0,98,65,.12)] backdrop-blur-md"
          : "bg-transparent"
          }`}
      >
        <div className="container-x flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
          <button onClick={() => go("start")} className="group flex items-center gap-2.5 sm:gap-3.5 py-0.5">
            <img
              src="/images/logo.png"
              alt="Sufi's Cafe Logo"
              className={`size-12 sm:size-14 md:size-16 rounded-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0 ${light ? "ring-2 ring-paper/40" : "ring-1 ring-[rgba(0,98,65,0.2)]"
                }`}
            />
            <div className={`h-8 sm:h-9 w-px ${light || open ? "bg-paper/40" : "bg-ink/25"}`} />
            <div className="flex flex-col text-left">
              <span
                className={`font-serif tracking-[0.16em] font-bold leading-none ${light || open ? "text-paper" : "text-ink"
                  }`}
                style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
              >
                SUFI&apos;S CAFE
              </span>
              <span
                className={`text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] mt-1 leading-none ${light || open ? "text-paper/90" : "text-ink/75"
                  }`}
              >
                COFFEE &amp; BAKERY
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BRAND.tel}
              className={`btn-line hidden md:inline-flex ${light ? "!border-paper/50 !text-paper hover:!bg-paper/10" : ""}`}
            >
              <Phone className="size-4" />
              {BRAND.phone}
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className={`btn-ink !size-[46px] !rounded-full !p-0 ${light || open ? "!border-paper !bg-paper !text-ink" : ""}`}
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.5px] w-4 bg-current"
                  animate={open ? { y: 0, rotate: 45 } : { y: -5.2, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.5px] w-4 bg-current"
                  animate={open ? { y: 0, rotate: -45 } : { y: 5.2, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
