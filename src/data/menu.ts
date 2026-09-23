import type { Lang } from "@/lib/i18n";

export interface FullMenuItem {
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  price: number;
  kcal: number | null;
  weight: number | null;
  allergens: Record<Lang, string[]>;
  img: string | null;
}
export interface FullMenuCategory {
  id: string;
  label: Record<Lang, string>;
  items: FullMenuItem[];
}

const IMG = {
  brunch: "/images/brunch.jpg",
  bowl: "/images/bowl.jpg",
  pastry: "/images/pastry.jpg",
  latte: "/images/latte.jpg",
  matcha: "/images/matcha.jpg",
  pour: "/images/pourover.jpg",
  eggs: "/images/eggs-sourdough.jpg",
  pancakes: "/images/pancakes.jpg",
  cheese: "/images/grilled-cheese.jpg",
  paneer: "/images/paneer-toast.jpg",
  shakshuka: "/images/shakshuka.jpg",
  pasta: "/images/pasta.jpg",
  croissant: "/images/croissant.jpg",
  grain: "/images/grain-bowl.jpg",
  beet: "/images/beet-salad.jpg",
  cheesecake: "/images/cheesecake.jpg",
  iced: "/images/iced-coffee.jpg",
  cupcake: "/images/hero-cupcake.jpg",
  porridge: "/images/porridge.jpg",
  melt: "/images/mushroom-melt.jpg",
  cucumber: "/images/cucumber-toast.jpg",
  chickpea: "/images/chickpea-salad.jpg",
  soup: "/images/soup.jpg",
  rigatoni: "/images/rigatoni.jpg",
  bun: "/images/cardamom-bun.jpg",
  chai: "/images/masala-chai.jpg",
  earl: "/images/earl-grey.jpg",
  mint: "/images/peppermint-tea.jpg",
  jasmine: "/images/jasmine-tea.jpg",
  lemonade: "/images/lemonade.jpg",
  passion: "/images/passionfruit.jpg",
  orange: "/images/orange-juice.jpg",
  ginger: "/images/ginger-sparkle.jpg",
  cocoa: "/images/cocoa.jpg",
  shot: "/images/espresso-shot.jpg",
  oat: "/images/oat-milk.jpg",
  avocado: "/images/avocado.jpg",
  eggs2: "/images/two-eggs.jpg",
  scramble: "/images/masala-scramble.jpg",
  pistachio: "/images/pistachio-roll.jpg",
  flatwhite: "/images/flat-white.jpg",
  batch: "/images/filter-batch.jpg",
  hotmatcha: "/images/hot-matcha.jpg",
  strawmatcha: "/images/strawberry-matcha.jpg",
  yuzu: "/images/yuzu-matcha-soda.jpg",
  kidpancakes: "/images/small-pancakes.jpg",
};


const item = (
  en: string,
  hi: string,
  den: string,
  dhi: string,
  price: number,
  extra: Partial<FullMenuItem> = {},
): FullMenuItem => ({
  title: { en, hi },
  desc: { en: den, hi: dhi },
  price,
  kcal: null,
  weight: null,
  allergens: { en: [], hi: [] },
  img: null,
  ...extra,
});

export const MENU: FullMenuCategory[] = [
  {
    id: "breakfast",
    label: { en: "Breakfast", hi: "नाश्ता" },
    items: [
      item("Soft eggs on sourdough", "सॉरडो पर सॉफ्ट एग", "Two poached eggs, avocado, lemon oil", "दो पोच्ड अंडे, एवोकाडो, नींबू का तेल", 320, {
        kcal: 480, weight: 260, img: IMG.eggs, allergens: { en: ["gluten", "egg"], hi: ["ग्लूटन", "अंडा"] },
      }),
      item("Masala scramble", "मसाला स्क्रैम्बल", "Slow eggs, tomato, green chilli, buttered toast", "धीमे पके अंडे, टमाटर, हरी मिर्च, बटर टोस्ट", 290, {
        kcal: 520, weight: 250, allergens: { en: ["gluten", "egg", "dairy"], hi: ["ग्लूटन", "अंडा", "डेयरी"] }, img: IMG.scramble,
      }),
      item("Yogurt & granola bowl", "योगर्ट और ग्रेनोला बाउल", "House granola, berries, honey", "घर का ग्रेनोला, बेरीज़, शहद", 260, {
        kcal: 380, weight: 300, img: IMG.bowl, allergens: { en: ["dairy", "nuts"], hi: ["डेयरी", "मेवे"] },
      }),
      item("Banana oat pancakes", "बनाना ओट पैनकेक", "Three stacks, maple, toasted seeds", "तीन पैनकेक, मेपल, भुने बीज", 310, { kcal: 610, img: IMG.pancakes }),
      item("Warm porridge", "गरम दलिया", "Oats, cardamom, poached pear", "ओट्स, इलायची, पोच्ड नाशपाती", 220, { kcal: 340, weight: 280, img: IMG.porridge }),
    ],
  },
  {
    id: "toast",
    label: { en: "Sandwich & Toast", hi: "सैंडविच और टोस्ट" },
    items: [
      item("Grilled cheese", "ग्रिल्ड चीज़", "Three cheeses, sourdough, tomato jam", "तीन चीज़, सॉरडो, टमाटर जैम", 280, {
        kcal: 640, allergens: { en: ["gluten", "dairy"], hi: ["ग्लूटन", "डेयरी"] }, img: IMG.cheese,
      }),
      item("Paneer tikka toast", "पनीर टिक्का टोस्ट", "Charred paneer, mint yogurt, red onion", "भुना पनीर, पुदीना दही, लाल प्याज़", 300, { kcal: 520, weight: 240, img: IMG.paneer }),
      item("Mushroom melt", "मशरूम मेल्ट", "Thyme mushrooms, gruyère, garlic butter", "थाइम मशरूम, ग्रुयेर, लहसुन मक्खन", 320, { kcal: 590, img: IMG.melt }),
      item("Cucumber & herb", "खीरा और हर्ब", "Cream cheese, dill, rye", "क्रीम चीज़, डिल, राई ब्रेड", 240, { kcal: 300, img: IMG.cucumber }),
    ],
  },
  {
    id: "bowls",
    label: { en: "Bowls & Salads", hi: "बाउल और सलाद" },
    items: [
      item("Green grain bowl", "ग्रीन ग्रेन बाउल", "Barley, greens, pickled lemon, tahini", "जौ, हरी सब्ज़ियाँ, नींबू अचार, ताहिनी", 340, { kcal: 460, weight: 340, img: IMG.grain }),
      item("Roast beet & feta", "रोस्ट बीट और फेटा", "Beetroot, feta, walnut, orange", "चुकंदर, फेटा, अखरोट, संतरा", 320, { kcal: 400, img: IMG.beet, allergens: { en: ["dairy", "nuts"], hi: ["डेयरी", "मेवे"] } }),
      item("Chickpea & herb salad", "चना और हर्ब सलाद", "Chickpeas, cucumber, mint, yogurt dressing", "चना, खीरा, पुदीना, दही ड्रेसिंग", 290, { kcal: 380, img: IMG.chickpea }),
      item("Soup of the day", "आज का सूप", "Ask the counter — changes daily", "काउंटर से पूछें — रोज़ बदलता है", 210, { weight: 300, img: IMG.soup }),
    ],
  },
  {
    id: "mains",
    label: { en: "Mains", hi: "मुख्य व्यंजन" },
    items: [
      item("Truffle mushroom pasta", "ट्रफल मशरूम पास्ता", "Tagliatelle, cream, parmesan", "टैलियाटेल, क्रीम, परमेज़ान", 480, { kcal: 780, img: IMG.pasta, allergens: { en: ["gluten", "dairy"], hi: ["ग्लूटन", "डेयरी"] } }),
      item("Tomato basil rigatoni", "टमाटर बेसिल रिगाटोनी", "Slow tomato, basil, chilli oil", "धीमा टमाटर, तुलसी, मिर्च तेल", 420, { kcal: 690, img: IMG.rigatoni }),
      item("Shakshuka", "शकशुका", "Baked eggs, peppers, bread on the side", "बेक्ड अंडे, शिमला मिर्च, ब्रेड", 380, { kcal: 540, weight: 380, img: IMG.shakshuka }),
    ],
  },
  {
    id: "pastry",
    label: { en: "Pastry", hi: "पेस्ट्री" },
    items: [
      item("Butter croissant", "बटर क्रोसां", "Laminated for two days", "दो दिन की लेमिनेशन", 150, { kcal: 320, img: IMG.croissant, allergens: { en: ["gluten", "dairy"], hi: ["ग्लूटन", "डेयरी"] } }),
      item("Pistachio roll", "पिस्ता रोल", "Pistachio cream, sea salt", "पिस्ता क्रीम, समुद्री नमक", 220, { kcal: 430, img: IMG.pistachio }),
      item("Basque cheesecake", "बास्क चीज़केक", "Burnt top, soft centre", "जली सतह, नरम अंदर", 260, { kcal: 480, img: IMG.cheesecake }),
      item("Strawberry cupcake", "स्ट्रॉबेरी कपकेक", "Vanilla sponge, buttercream swirl, fresh strawberry", "वनीला स्पॉन्ज, बटरक्रीम स्वर्ल, ताज़ी स्ट्रॉबेरी", 190, {
        kcal: 410, weight: 110, img: IMG.cupcake, allergens: { en: ["gluten", "dairy", "egg"], hi: ["ग्लूटन", "डेयरी", "अंडा"] },
      }),
      item("Cardamom bun", "इलायची बन", "Slow proof, sugar crust", "धीमा प्रूफ, शक्कर की परत", 180, { kcal: 350, img: IMG.bun }),
    ],
  },
  {
    id: "coffee",
    label: { en: "Coffee", hi: "कॉफ़ी" },
    items: [
      item("Espresso", "एस्प्रेसो", "Seasonal house blend", "मौसमी हाउस ब्लेंड", 120, { weight: 30, img: IMG.shot }),
      item("Cappuccino", "कैपुचीनो", "Double shot, silk milk", "डबल शॉट, रेशमी दूध", 180, { kcal: 120, weight: 180, img: IMG.latte }),
      item("Flat white", "फ्लैट व्हाइट", "Ristretto base, dense foam", "रिस्ट्रेटो बेस, घना फोम", 190, { weight: 160, img: IMG.flatwhite }),
      item("Filter — V60", "फिल्टर — V60", "Single origin, brewed to order", "सिंगल ओरिजिन, ऑर्डर पर बना", 200, { weight: 250, img: IMG.pour }),
      item("Cold brew", "कोल्ड ब्रू", "18 hours, served over ice", "18 घंटे, बर्फ के साथ", 210, { weight: 300, img: IMG.iced }),
      item("Filter batch", "फिल्टर बैच", "Today's brew, refill at half price", "आज का ब्रू, रीफिल आधे दाम पर", 150, { img: IMG.batch }),
    ],
  },
  {
    id: "matcha",
    label: { en: "Matcha Bar", hi: "माचा बार" },
    items: [
      item("Iced matcha latte", "आइस्ड माचा लाते", "Ceremonial grade, oat or dairy", "सेरेमोनियल ग्रेड, ओट या डेयरी", 250, { kcal: 180, weight: 320, img: IMG.matcha }),
      item("Hot matcha", "हॉट माचा", "Whisked thin, no sugar", "पतला व्हिस्क, बिना चीनी", 230, { img: IMG.hotmatcha }),
      item("Strawberry matcha", "स्ट्रॉबेरी माचा", "Fruit compote, cold milk, matcha top", "फ्रूट कॉम्पोट, ठंडा दूध, ऊपर माचा", 280, { kcal: 240, img: IMG.strawmatcha }),
      item("Yuzu matcha soda", "युज़ु माचा सोडा", "Sparkling, citrus, no milk", "स्पार्कलिंग, सिट्रस, बिना दूध", 260, { img: IMG.yuzu }),
    ],
  },
  {
    id: "tea",
    label: { en: "Tea", hi: "चाय" },
    items: [
      item("Masala chai", "मसाला चाय", "House spice mix, boiled slow", "घर का मसाला, धीमी उबाल", 140, { img: IMG.chai }),
      item("Earl grey", "अर्ल ग्रे", "Bergamot, loose leaf", "बर्गमोट, खुली पत्ती", 150, { img: IMG.earl }),
      item("Peppermint", "पुदीना", "Fresh leaves, no caffeine", "ताज़ी पत्तियाँ, बिना कैफीन", 130, { img: IMG.mint }),
      item("Jasmine green", "जैस्मिन ग्रीन", "Three infusions", "तीन इन्फ्यूजन", 160, { img: IMG.jasmine }),
    ],
  },
  {
    id: "cold",
    label: { en: "Lemonades & Juice", hi: "नींबू पानी और जूस" },
    items: [
      item("Classic lemonade", "क्लासिक लेमोनेड", "Lemon, mint, soda", "नींबू, पुदीना, सोडा", 190, { weight: 400, img: IMG.lemonade }),
      item("Passionfruit cooler", "पैशनफ्रूट कूलर", "Passionfruit, lime, tonic", "पैशनफ्रूट, नींबू, टॉनिक", 220, { img: IMG.passion }),
      item("Orange, cold pressed", "संतरा, कोल्ड प्रेस्ड", "Pressed to order", "ऑर्डर पर निकाला", 200, { img: IMG.orange }),
      item("Ginger sparkle", "अदरक स्पार्कल", "Ginger, honey, sparkling water", "अदरक, शहद, स्पार्कलिंग पानी", 180, { img: IMG.ginger }),
    ],
  },
  {
    id: "extras",
    label: { en: "Add-ons", hi: "एक्स्ट्रा" },
    items: [
      item("Extra shot", "एक्स्ट्रा शॉट", "One more espresso", "एक और एस्प्रेसो", 40, { img: IMG.shot }),
      item("Oat milk", "ओट मिल्क", "Barista edition", "बारिस्ता एडिशन", 30, { img: IMG.oat }),
      item("Side avocado", "साइड एवोकाडो", "Half, salted", "आधा, नमकीन", 90, { img: IMG.avocado }),
      item("Two eggs", "दो अंडे", "Any way", "किसी भी तरह", 80, { img: IMG.eggs2 }),
    ],
  },
  {
    id: "kids",
    label: { en: "Kids", hi: "बच्चों के लिए" },
    items: [
      item("Small pancakes", "छोटे पैनकेक", "Two, with honey", "दो, शहद के साथ", 160, { img: IMG.kidpancakes }),
      item("Warm milk & cocoa", "गरम दूध और कोको", "Low sugar", "कम चीनी", 120, { img: IMG.cocoa }),
    ],
  },
];

export const categoryMin = (id: string) => {
  const cat = MENU.find((c) => c.id === id);
  if (!cat || cat.items.length === 0) return null;
  return Math.min(...cat.items.map((i) => i.price));
};
