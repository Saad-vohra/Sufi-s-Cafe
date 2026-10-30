"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AtSign, Clock, Coffee, Heart, MapPin, Phone, Smile, Sparkles, Utensils, Wifi } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { STILL, useLenis } from "@/lib/scroll";

export default function AboutPage() {
  const { lang, display } = useLang();
  const router = useRouter();
  const still = STILL();

  useLenis(!still);

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-[#d4e9e2] selection:text-[#1e3932]">
      {/* Ambient background gradients */}
      <div
        className="bg-blob left-[-10vw] top-[5vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.18),transparent_65%)]"
        style={{ animation: "blobdrift 28s ease-in-out infinite" }}
      />
      <div
        className="bg-blob right-[-8vw] top-[40vh] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(30,57,50,0.15),transparent_65%)]"
        style={{ animation: "blobdrift 36s ease-in-out infinite reverse" }}
      />

      {/* Header bar */}
      <Navbar sticky showBack />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container-x pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Logo Emblem */}
            <motion.div
              initial={still ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mx-auto mb-8 size-28 overflow-hidden rounded-full border-4 border-[#006241]/25 bg-white p-2 shadow-xl sm:size-36"
            >
              <img
                src="/images/logo.png"
                alt="Sufi's Cafe & Bakery Emblem"
                className="size-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={still ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,98,65,0.2)] bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="size-3.5 text-[#006241]" />
              <span className="eyebrow !text-[#006241] !tracking-[0.2em]">
                {BRAND.name} · EST. 2026 · FRESH BREW
              </span>
            </motion.div>

            <motion.h1
              initial={still ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`${display} mt-6 leading-[1.05] text-[#1e3932]`}
              style={{ fontSize: "clamp(42px,6.5vw,86px)" }}
            >
              {lang === "en" ? (
                <>
                  Coffee. Comfort. <span className="text-[#006241]">Connection.</span>
                </>
              ) : (
                <>
                  कॉफ़ी। सुकून। <span className="text-[#006241]">सद्भाव।</span>
                </>
              )}
            </motion.h1>

            <motion.div
              initial={still ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl"
            >
              <p className="font-serif text-xl italic text-[#006241] sm:text-2xl">
                {lang === "en"
                  ? "“Let the heart find peace in every sip.”"
                  : "“हर घूंट में दिल को सुकून और रूह को शांति मिले।”"}
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-muted">
                {lang === "en"
                  ? "Where every sip brings peace to your soul."
                  : "जहाँ हर घूंट आपकी आत्मा को शांति और ताज़गी प्रदान करता है।"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero Visual Card */}
        <section className="container-x mb-20 lg:mb-28">
          <div className="relative overflow-hidden rounded-[36px] border border-white/60 bg-[#1e3932] shadow-2xl">
            <div className="relative aspect-[16/9] max-h-[580px] w-full min-h-[380px]">
              <img
                src="/images/about-cafe.jpg"
                alt="Sufi's Cafe Interior Ambiance"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14 text-white">
                <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">OUR SANCTUARY</span>
                <h2 className={`${display} mt-2 text-3xl sm:text-5xl lg:text-6xl text-white leading-tight`}>
                  {lang === "en"
                    ? "A place of peace, aroma, and warmth."
                    : "सुकून, सुगंध और आत्मीयता का सुंदर संगम।"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-paper/85">
                  {lang === "en"
                    ? "Tucked in Kajipura, Kheda, Sufi's Cafe was envisioned as more than a coffee shop. It is a soulful neighborhood retreat designed for pause, presence, and pure flavor."
                    : "काजीपुरा, खेड़ा (गुजरात) में बसा सूफ़ी कैफ़े सिर्फ़ एक कॉफ़ी शॉप नहीं है — यह दिल को तसल्ली देने वाला एक ऐसा आशियाना है जहाँ हर पल खास बन जाता है।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story & Philosophy Details */}
        <section className="container-x mb-24 lg:mb-32">
          <div className="grid grid-cols-12 items-center gap-10 lg:gap-16">
            {/* Story Text */}
            <div className="col-span-12 lg:col-span-7">
              <span className="eyebrow !text-[#006241]">ABOUT OUR ORIGIN</span>
              <h2 className={`${display} mt-3 text-3xl text-[#1e3932] sm:text-5xl leading-tight`}>
                {lang === "en" ? (
                  <>
                    The Sufi’s Philosophy <br />
                    <span className="text-[#006241]">&amp; The Art of Coffee</span>
                  </>
                ) : (
                  <>
                    सूफ़ी विचार दर्शन <br />
                    <span className="text-[#006241]">और कॉफ़ी का हुनर</span>
                  </>
                )}
              </h2>

              <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-[#2c3e35]">
                {lang === "en" ? (
                  <>
                    <p>
                      The name <strong>Sufi&apos;s Cafe</strong> is inspired by the timeless tradition of Sufism — rooted in tranquility, sincerity, warmth, and the sacred beauty of gathering together. We believe that coffee is more than caffeine; it is a ritual of mindful presence and genuine connection.
                    </p>
                    <p>
                      From sourcing 100% specialty Arabica beans to precision-roasting and traditional preparation methods — like authentic Turkish coffee simmered with green cardamom in a copper cezve, slow hand-poured Chemex brews, and silky Spanish lattes — every beverage is prepared with passion and reverence.
                    </p>
                    <p>
                      Whether you are sitting down for a heartfelt conversation, getting lost in a favorite book, or enjoying an all-day brunch with loved ones, our doors and hearts are always open.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>सूफ़ी कैफ़े</strong> का नाम सूफ़ी परंपरा के शाश्वत मूल्यों — शांति, आत्मीयता, सादगी और प्रेम — से प्रेरित है। हमारा मानना है कि कॉफ़ी सिर्फ़ एक ड्रिंक नहीं है, बल्कि यह सुकून पाने और अपनों से जुड़ने का एक खूबसूरत जरिया है।
                    </p>
                    <p>
                      100% अरेबिका बीन्स से लेकर पारंपरिक तांबे के बर्तन में पकी तुर्की कॉफ़ी, हाथ से ब्रू किए गए पोर ओवर, रिफ्रेशिंग कोल्ड ब्रू और मखमली स्पैनिश लाते तक — हमारे मेन्यू का हर कप आपकी आत्मा को ताज़गी देने के लिए बनाया जाता है।
                    </p>
                    <p>
                      चाहे आप अपने दोस्तों के साथ गपशप करना चाहें, शांत बैठकर किताब पढ़ना चाहें, या अपने लैपटॉप पर काम करना चाहें — सूफ़ी कैफ़े में आपका हमेशा खुले दिल से स्वागत है।
                    </p>
                  </>
                )}
              </div>

              {/* Gold Quote Highlight */}
              <div className="mt-8 rounded-3xl border border-[rgba(0,98,65,0.2)] bg-gradient-to-r from-emerald-50/90 to-amber-50/70 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-4xl leading-none text-[#006241]">“</span>
                  <div>
                    <p className="font-serif text-lg italic text-[#1e3932] sm:text-xl">
                      {lang === "en"
                        ? "Where every sip brings peace to your soul."
                        : "जहाँ हर घूंट आपकी आत्मा को शांति और ताज़गी प्रदान करता है।"}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-wider text-muted font-sans">
                      {lang === "en" ? "— The Sufi's Cafe Promise" : "— सूफ़ी कैफ़े का वादा"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Showcase Stack */}
            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-black">
                  <img
                    src="/images/turkish-coffee.jpg"
                    alt="Turkish Coffee at Sufi's"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-black mt-8">
                  <img
                    src="/images/latte.jpg"
                    alt="Artisanal Latte Art"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-black -mt-8">
                  <img
                    src="/images/spanish-latte.jpg"
                    alt="Spanish Latte"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-black">
                  <img
                    src="/images/tiramisu.jpg"
                    alt="Artisan Tiramisu Dessert"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Pillars: Good Food, Good Mood, Good Vibes */}
        <section className="bg-[#1e3932] py-20 text-paper sm:py-28">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">OUR CORE FOUNDATION</span>
              <h2 className={`${display} mt-3 text-4xl sm:text-6xl text-white`}>
                Good Food · Good Mood · Good Vibes
              </h2>
              <p className="mt-4 text-base sm:text-lg text-paper/80">
                {lang === "en"
                  ? "Three simple promises that define every cup we brew and every plate we serve."
                  : "तीन सरल वादे जो हमारे हर कप और हर डिश में महसूस होते हैं।"}
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Pillar 1 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Utensils className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Food" : "स्वादिष्ट भोजन"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "From fresh grilled artisan sandwiches, peri-peri cottage cheese wraps, and loaded cheese fries to decadent desserts like chocolate lava cake and Lotus Biscoff cheesecake, our kitchen uses honest, premium ingredients."
                    : "ताज़े ग्रिल्ड सैंडविच, पनीर टिक्का व पेरी-पेरी रैप, चीज़ी लोडेड फ्राइज़ और चॉकलेट लावा केक व बिस्कॉफ चीज़केक जैसी स्वादिष्ट डेज़र्ट — यहाँ हर चीज़ शुद्ध और ताज़ा है।"}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Smile className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Mood" : "सुखद माहौल"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "A thoughtfully designed cafe atmosphere bathed in warm ambient lighting, peaceful acoustic melodies, plush seating, and free high-speed Wi-Fi — the perfect space to unwind, read, write, or work."
                    : "सुकून भरी सौम्य रोशनी, मधुर बैकग्राउंड संगीत, आरामदायक कुर्सियाँ और हाई-स्पीड फ़्री वाई-फ़ाई — चाहे काम करना हो, पढ़ना हो या सुकून के पल बिताना, यह जगह आपकी अपनी है।"}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Heart className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Vibes" : "पॉजिटिव वाइब्स"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "Hospitality that comes from the heart. At Sufi's Cafe, kindness is our language. We greet every guest with a smile and strive to ensure you leave happier than when you walked in."
                    : "सच्चे दिल से की जाने वाली मेहमाननवाज़ी। सूफ़ी कैफ़े में अपनापन ही हमारी पहचान है — हम सिर्फ़ कॉफ़ी नहीं परोसते, हम खुशियाँ बाँटते हैं।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Supporting Local Banner */}
        <section className="container-x py-20 lg:py-28">
          <div className="relative overflow-hidden rounded-[36px] border border-[rgba(0,98,65,0.2)] bg-gradient-to-br from-white to-emerald-50/70 p-8 shadow-xl sm:p-14">
            <div className="grid grid-cols-12 items-center gap-8">
              <div className="col-span-12 lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#006241]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#006241]">
                  WE DELIVER HAPPINESS
                </div>
                <h2 className={`${display} text-3xl sm:text-5xl text-[#1e3932] leading-tight`}>
                  {lang === "en"
                    ? "Thank You For Supporting Local."
                    : "स्थानीय व्यापार को समर्थन देने के लिए धन्यवाद।"}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#2c3e35]">
                  {lang === "en"
                    ? "Every cup of coffee you enjoy at Sufi's Cafe supports our local team, indigenous roasters, and community spirit here in Gujarat. We take pride in building a homegrown specialty coffee destination."
                    : "सूफ़ी कैफ़े में आपका हर कप हमारे स्थानीय कारीगरों, बरिस्ता और गुजरात की इस सुंदर कम्युनिटी को मजबूती देता है। हमें गर्व है कि हम एक स्थानीय स्पेशलिटी कैफ़े हैं।"}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/menu")}
                    className="btn-ink"
                  >
                    {lang === "en" ? "Explore Our Full Menu" : "हमारा पूरा मेन्यू देखें"}
                  </button>
                  <a
                    href={BRAND.locations[0].maps ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line flex items-center gap-2"
                  >
                    <MapPin className="size-4" />
                    <span>{lang === "en" ? "Get Directions" : "रास्ता देखें"}</span>
                  </a>
                </div>
              </div>

              {/* Feature Badge Cards */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Coffee className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">100% Specialty Arabica</h4>
                    <p className="text-xs text-muted">Single origin &amp; house blend</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Wifi className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Free High-Speed Wi-Fi</h4>
                    <p className="text-xs text-muted">Work and study friendly environment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Daily {BRAND.hours}</h4>
                    <p className="text-xs text-muted">Dine-in &amp; Takeaway available</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <AtSign className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Instagram: {BRAND.instagram}</h4>
                    <p className="text-xs text-muted">Follow our daily stories &amp; brews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Summary */}
        <section className="container-x mb-24">
          <div className="rounded-[36px] bg-[#1e3932] p-8 sm:p-14 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">VISIT US IN PERSON</span>
                <h2 className={`${display} mt-2 text-3xl sm:text-5xl text-white`}>
                  {BRAND.name}
                </h2>
                <p className="mt-4 text-paper/85 text-base sm:text-lg">
                  {BRAND.locations[0].address}
                </p>
                <p className="mt-1 text-sm text-[#d4e9e2]">
                  {BRAND.city}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={BRAND.locations[0].maps ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink !border-paper !bg-paper !text-[#1e3932] hover:!bg-[#d4e9e2]"
                  >
                    <MapPin className="size-4" />
                    <span>{lang === "en" ? "Open Google Maps" : "गूगल मैप्स"}</span>
                  </a>
                  <a
                    href={BRAND.tel}
                    className="btn-line !border-paper/40 !text-paper hover:!bg-paper/10"
                  >
                    <Phone className="size-4" />
                    <span>{BRAND.phone}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-md">
                <h3 className={`${display} text-2xl text-white mb-4`}>
                  {lang === "en" ? "Opening Hours" : "खुलने का समय"}
                </h3>
                <div className="space-y-3 text-sm text-paper/85">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday – Sunday</span>
                    <span className="font-semibold text-white">{BRAND.hours}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Dine-In &amp; Takeaway</span>
                    <span className="font-semibold text-white">Available Daily</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Wi-Fi &amp; Work Desks</span>
                    <span className="font-semibold text-[#d4e9e2]">Free Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

