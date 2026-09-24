import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AtSign, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { setPendingScroll } from "@/lib/pendingScroll";
import { STILL, scrollToId } from "@/lib/scroll";

export function Footer() {
  const { lang, t, display } = useLang();
  const navigate = useNavigate();
  const still = STILL();

  const jump = (id: string) => {
    if (window.location.pathname === "/") scrollToId(id);
    else {
      setPendingScroll(id);
      navigate({ to: "/" });
    }
  };

  return (
    <footer className="relative z-10 mt-24 rounded-t-[36px] bg-[#1e3932] px-[6%] pt-20 text-paper overflow-hidden">
      <div className="flex items-center justify-between gap-6">
        <motion.div
          initial={still ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`${display} leading-[0.85]`}
          style={{ fontSize: "clamp(80px,15vw,260px)" }}
        >
          {BRAND.mark}
        </motion.div>
        <img
          src="/images/logo.png"
          alt="Sufi's Cafe Emblem"
          className="size-24 sm:size-36 md:size-48 opacity-25 object-contain shrink-0"
        />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow !text-paper/85">{BRAND.locations.length > 1 ? t.addresses : (lang === "en" ? "Address" : "पता")}</p>
          <ul className="mt-3 space-y-1 text-[15px] text-paper/85">
            {BRAND.locations.map((l) => (
              <li key={l.name}>
                {BRAND.locations.length > 1 ? `${l.name} — ` : ""}{l.address}
              </li>
            ))}
            <li className="text-paper/85">{BRAND.city}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-paper/85">{t.hoursContact}</p>
          <ul className="mt-3 space-y-1 text-[15px] text-paper/85">
            <li>{BRAND.hours}</li>
            <li>
              <a href={BRAND.tel} className="inline-flex items-center gap-2 hover:underline">
                <Phone className="size-4" /> {BRAND.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-paper/85">
              <AtSign className="size-4" /> {BRAND.instagram.replace("@", "")}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/20 py-6 text-[12px] text-paper/85">
        <span>
          © {new Date().getFullYear()} {BRAND.name}
        </span>
        <div className="flex gap-5">
          <button onClick={() => jump("favorites")} className="hover:text-paper">
            {t.favorites}
          </button>
          <button onClick={() => navigate({ to: "/menu" })} className="hover:text-paper">
            {t.menu}
          </button>
          <button onClick={() => jump("contact")} className="hover:text-paper">
            {t.contact}
          </button>
        </div>
        <span>{t.photosNote}</span>

      </div>
    </footer>
  );
}
