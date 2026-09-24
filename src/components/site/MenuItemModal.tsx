import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Flame,
  Wheat,
  Droplet,
  Leaf,
  Heart,
  Egg,
  Gauge,
  Sparkles,
  Milk,
} from "lucide-react";
import { useEffect } from "react";
import type { FullMenuItem } from "@/data/menu";
import { getItemDetails } from "@/data/itemDetails";
import { useLang } from "@/lib/i18n";

interface MenuItemModalProps {
  item: FullMenuItem | null;
  onClose: () => void;
}

// Bicep / Muscle icon for Protein
function BicepIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-3.076 0-8.485-.79-11.393-4.444A4.986 4.986 0 0 1 1 15c0-1.897.747-3.62 1.964-4.898L4.5 8.5 7 11l1.5-1.5L6 7l1.5-1.5L9 7l2-2 3.5 3.5-2.091 4.517z" />
    </svg>
  );
}

export function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const { lang, t } = useLang();

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const details = getItemDetails(item, lang);
  const rawIngredients = details.ingredients[lang] || [];
  const ingredientsText =
    rawIngredients.length > 0
      ? rawIngredients.join(", ") + "."
      : item.desc[lang];

  // Specific description matching the screenshot for Soft eggs on sourdough
  const isSoftEggs = item.title.en === "Soft eggs on sourdough";
  const descriptionText = isSoftEggs
    ? lang === "en"
      ? "Two poached eggs, avocado, lemon oil on toasted sourdough bread. A simple, fresh and wholesome favourite."
      : "टोस्टेड सॉरडो ब्रेड पर दो पोच्ड अंडे, एवोकाडो और लेमन ऑयल। एक सादा, ताज़ा और संपूर्ण पसंदीदा नाश्ता।"
    : item.desc[lang];

  // Top category badge
  const topBadge =
    item.allergens.en.includes("egg") && !item.allergens.en.includes("dairy")
      ? lang === "en" ? "Vegetarian" : "शाकाहारी"
      : item.allergens.en.includes("gluten")
      ? lang === "en" ? "Freshly Baked" : "ताज़ा बेक किया हुआ"
      : lang === "en" ? "Vegetarian" : "शाकाहारी";

  // Dietary badges with corresponding icons
  const dietaryTags = details.dietary[lang] || [];

  const getTagIcon = (tag: string) => {
    const lower = tag.toLowerCase();
    if (lower.includes("egg") || lower.includes("अंडा")) return <Egg className="size-3" />;
    if (lower.includes("fat") || lower.includes("oil") || lower.includes("फैट")) return <Droplet className="size-3" />;
    if (lower.includes("omega") || lower.includes("heart") || lower.includes("ओमेगा")) return <Heart className="size-3" />;
    if (lower.includes("protein") || lower.includes("प्रोटीन")) return <BicepIcon className="size-3" />;
    if (lower.includes("dairy") || lower.includes("milk") || lower.includes("डेयरी")) return <Milk className="size-3" />;
    return <Leaf className="size-3" />;
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-item-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* 2-Column Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-[940px] overflow-hidden rounded-[28px] sm:rounded-[34px] bg-white text-ink shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)] flex flex-col md:flex-row max-h-[92vh]"
        >
          {/* Left Column: Full-Bleed Image */}
          <div className="relative w-full md:w-[48%] min-h-[240px] sm:min-h-[290px] md:min-h-[540px] bg-neutral-100 shrink-0">
            {item.img ? (
              <img
                src={item.img}
                alt={item.title[lang]}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1e3932]/10 text-muted">
                <Sparkles className="size-12 text-[#006241]/40" />
              </div>
            )}
          </div>

          {/* Right Column: Detailed Info Panel */}
          <div className="flex w-full md:w-[52%] flex-col justify-between p-6 sm:p-7 md:p-9 bg-white overflow-y-auto">
            <div>
              {/* Top Row: Category Pill & Close Button */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f4ea] px-3 py-1 text-[12px] font-medium text-[#006241]">
                  <Leaf className="size-3.5 text-[#006241]" />
                  <span>{topBadge}</span>
                </span>
                <button
                  onClick={onClose}
                  aria-label={t.close}
                  className="p-1 text-gray-500 hover:text-black transition-colors rounded-full"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Title */}
              <h2
                id="modal-item-title"
                className="mt-3.5 text-[26px] sm:text-[30px] font-bold text-[#0c392c] tracking-tight leading-snug"
              >
                {item.title[lang]}
              </h2>

              {/* Description */}
              <p className="mt-2 text-[14px] text-gray-600 leading-relaxed font-normal">
                {descriptionText}
              </p>

              {/* Dietary Tags Row */}
              {dietaryTags.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2">
                  {dietaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#edf6f2] px-2.5 py-1 text-[11.5px] font-medium text-[#005e3e]"
                    >
                      {getTagIcon(tag)}
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Nutrition Information Box */}
              <div className="mt-4 rounded-2xl bg-[#edf6f2] p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#005e3e] uppercase">
                  <Gauge className="size-3.5 text-[#005e3e]" />
                  <span>{t.nutritionInfo}</span>
                </div>

                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {/* Calories */}
                  <div className="rounded-xl bg-white p-2.5 text-center shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-[13.5px] sm:text-[14.5px] font-bold text-gray-900">
                      <Flame className="size-3 text-[#005e3e]" />
                      <span>{details.nutrition.calories}</span>
                    </div>
                    <span className="mt-0.5 block text-[10.5px] text-gray-500 font-medium">
                      {t.calories}
                    </span>
                  </div>

                  {/* Protein */}
                  <div className="rounded-xl bg-white p-2.5 text-center shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-[13.5px] sm:text-[14.5px] font-bold text-gray-900">
                      <BicepIcon className="size-3 text-[#005e3e]" />
                      <span>{details.nutrition.protein}</span>
                    </div>
                    <span className="mt-0.5 block text-[10.5px] text-gray-500 font-medium">
                      {t.protein}
                    </span>
                  </div>

                  {/* Carbohydrates */}
                  <div className="rounded-xl bg-white p-2.5 text-center shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-[13.5px] sm:text-[14.5px] font-bold text-gray-900">
                      <Wheat className="size-3 text-[#005e3e]" />
                      <span>{details.nutrition.carbs}</span>
                    </div>
                    <span className="mt-0.5 block text-[10.5px] text-gray-500 font-medium">
                      {t.carbs}
                    </span>
                  </div>

                  {/* Fat */}
                  <div className="rounded-xl bg-white p-2.5 text-center shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-[13.5px] sm:text-[14.5px] font-bold text-gray-900">
                      <Droplet className="size-3 text-[#005e3e]" />
                      <span>{details.nutrition.fat}</span>
                    </div>
                    <span className="mt-0.5 block text-[10.5px] text-gray-500 font-medium">
                      {t.fat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#0c392c]">
                  <Leaf className="size-3.5 text-[#005e3e]" />
                  <span>{t.ingredients}</span>
                </div>
                <p className="mt-1 text-[13px] text-gray-600 leading-relaxed font-normal">
                  {ingredientsText}
                </p>
              </div>
            </div>

            {/* Bottom Row: Right-Aligned Close Button */}
            <div className="mt-5 pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#005e3e] px-8 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#004d33] shadow-md hover:shadow-lg"
              >
                {t.close}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
