import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";
export const LANGS: Lang[] = ["en", "hi"];
const KEY = "luna-lang";

const en = {
  home: "Home",
  favorites: "Favorites",
  menu: "Menu",
  gallery: "Gallery",
  contact: "Contact",
  start: "Start",
  viewMenu: "View menu",
  explore: "Explore the menu",
  book: "Book a table",
  bookShort: "Book",
  scroll: "Scroll to discover",
  openMenuBtn: "Open the menu",
  findUs: "Find us",
  moveCursor: "Move your cursor",
  moodA: "What will you have",
  moodB: "today?",
  favoriteTitle: "Favorites",
  fullMenu: "Full menu ↓",
  galleryTitle: "The display",
  contactTitle: "Come see us.",
  openMaps: "Open in Google Maps",
  call: "Call",
  yourTable: "Your table.",
  yourTableBlurb:
    "Big table, small table, laptop corner or the terrace — tell us when and we will keep it warm.",
  faqTitle: "FAQ",
  addresses: "Addresses",
  hoursContact: "Hours & contact",
  add: "Add",
  itemsOne: "item",
  itemsMany: "items",
  clear: "clear",
  order: "Order",
  language: "Language",
  menuTitle: "The menu.",
  from: "from",
  draftNote: "Draft list only — nothing is ordered or paid here.",
  photosNote: "All photography © Luna Cafe",
  faq: [
    { q: "What are your hours?", a: "Both rooms are open daily, 08:00 – 21:00." },
    {
      q: "Do you take reservations?",
      a: "Yes — call us and we will hold a table.",
    },
    { q: "Is there a terrace?", a: "The Flagship room has a seasonal terrace; Indiranagar is indoor only." },
    { q: "Can I work from here?", a: "Mornings are quiet and every seat is near a socket. Long calls are better on the terrace." },
    { q: "Is it kid friendly?", a: "Yes — high chairs at both rooms and a small kids section on the menu." },
  ],
};

const hi: typeof en = {
  home: "होम",
  favorites: "पसंदीदा",
  menu: "मेन्यू",
  gallery: "गैलरी",
  contact: "संपर्क",
  start: "शुरू",
  viewMenu: "मेन्यू देखें",
  explore: "मेन्यू देखिए",
  book: "टेबल बुक करें",
  bookShort: "बुक करें",
  scroll: "स्क्रॉल कीजिए",
  openMenuBtn: "मेन्यू खोलें",
  findUs: "हमें ढूंढें",
  moveCursor: "कर्सर घुमाइए",
  moodA: "आज आप क्या",
  moodB: "लेंगे?",
  favoriteTitle: "पसंदीदा",
  fullMenu: "पूरा मेन्यू ↓",
  galleryTitle: "झलकियाँ",
  contactTitle: "हमसे मिलिए।",
  openMaps: "गूगल मैप्स में खोलें",
  call: "कॉल करें",
  yourTable: "आपकी टेबल।",
  yourTableBlurb:
    "बड़ी टेबल, छोटी टेबल, लैपटॉप कोना या टेरेस — समय बताइए, हम तैयार रखेंगे।",
  faqTitle: "सवाल-जवाब",
  addresses: "पते",
  hoursContact: "समय और संपर्क",
  add: "जोड़ें",
  itemsOne: "आइटम",
  itemsMany: "आइटम",
  clear: "हटाएँ",
  order: "ऑर्डर",
  language: "भाषा",
  menuTitle: "मेन्यू।",
  from: "से",
  draftNote: "यह केवल एक सूची है — यहाँ कोई ऑर्डर या भुगतान नहीं होता।",
  photosNote: "सभी तस्वीरें © लूना कैफ़े",
  faq: [
    { q: "आपका समय क्या है?", a: "दोनों जगह रोज़ाना 08:00 – 21:00 तक खुली रहती हैं।" },
    { q: "क्या बुकिंग होती है?", a: "जी हाँ — कॉल कीजिए, हम टेबल रोक लेंगे।" },
    { q: "क्या टेरेस है?", a: "फ्लैगशिप में मौसमी टेरेस है; इंदिरानगर केवल इनडोर है।" },
    { q: "क्या यहाँ काम कर सकते हैं?", a: "सुबह शांत रहती है और हर सीट के पास सॉकेट है। लंबी कॉल के लिए टेरेस बेहतर है।" },
    { q: "क्या बच्चों के लिए ठीक है?", a: "जी हाँ — दोनों जगह हाई चेयर और मेन्यू में बच्चों का छोटा सेक्शन है।" },
  ],
};

export const STRINGS: Record<Lang, typeof en> = { en, hi };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof en; display: string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem(KEY);
    const next = (LANGS as string[]).includes(p ?? "")
      ? (p as Lang)
      : (LANGS as string[]).includes(stored ?? "")
        ? (stored as Lang)
        : "en";
    setLang(next);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: STRINGS[lang],
      // Gaegu carries no Devanagari — Hindi headings fall back to the body face.
      display: lang === "en" ? "font-serif" : "font-sans font-bold",
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
