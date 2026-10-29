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
  subtitle?: Record<Lang, string>;
  items: FullMenuItem[];
}

const IMG = {
  // Classic Coffee
  espresso: "/images/espresso-shot.jpg",
  flatwhite: "/images/flat-white.jpg",
  latte: "/images/latte.jpg",
  cappuccino: "/images/cappuccino.jpg",
  americano: "/images/americano.jpg",
  mocha: "/images/mocha.jpg",
  caramel: "/images/caramel-latte.jpg",
  hazelnutlatte: "/images/hazelnut-latte.jpg",
  vanillalatte: "/images/vanilla-latte.jpg",
  spanishlatte: "/images/spanish-latte.jpg",
  batch: "/images/filter-batch.jpg",
  affogato: "/images/affogato.jpg",

  // Non Coffee
  cocoa: "/images/cocoa.jpg",
  whitecocoa: "/images/white-hot-chocolate.jpg",
  hotmatcha: "/images/hot-matcha.jpg",
  matcha: "/images/matcha.jpg",
  chai: "/images/masala-chai.jpg",
  kashmirichai: "/images/kashmiri-chai.jpg",
  goldenmilk: "/images/turmeric-latte.jpg",

  // Cold Brew & Iced
  coldbrew: "/images/cold-brew-glass.jpg",
  vanillacoldbrew: "/images/vanilla-cold-brew.jpg",
  icedlatte: "/images/iced-latte.jpg",
  carameliced: "/images/caramel-iced-latte.jpg",
  iced: "/images/iced-coffee.jpg",

  // Signature Coffee
  sufispecialcoffee: "/images/sufi-special-coffee.jpg",
  roselatte: "/images/rose-latte.jpg",
  pistachiolatte: "/images/pistachio-latte.jpg",
  turkish: "/images/turkish-coffee.jpg",
  coconutlatte: "/images/coconut-latte.jpg",
  cinnamonlatte: "/images/cinnamon-latte.jpg",
  tiramisu: "/images/tiramisu.jpg",

  // Add-ons
  oat: "/images/oat-milk.jpg",

  // Premium Brews
  pourover: "/images/pourover.jpg",
  chemex: "/images/chemex.jpg",
  aeropress: "/images/aeropress.jpg",
  frenchpress: "/images/french-press.jpg",
  siphon: "/images/siphon.jpg",

  // Mocktails
  lemonade: "/images/lemonade.jpg",
  blueocean: "/images/blue-ocean.jpg",
  passion: "/images/passionfruit.jpg",
  strawmatcha: "/images/strawberry-matcha.jpg",
  orange: "/images/orange-juice.jpg",
  greenapple: "/images/green-apple-mojito.jpg",
  watermelon: "/images/watermelon-cooler.jpg",
  ginger: "/images/ginger-sparkle.jpg",
  lychee: "/images/lychee-love.jpg",

  // Milkshakes
  oreoshake: "/images/oreo-shake.jpg",
  kitkatshake: "/images/kitkat-shake.jpg",
  ferreroshake: "/images/ferrero-shake.jpg",
  nutellashake: "/images/nutella-shake.jpg",
  blueberryshake: "/images/blueberry-shake.jpg",
  biscoffshake: "/images/biscoff-shake.jpg",

  // Food
  cucumber: "/images/cucumber-toast.jpg",
  cheese: "/images/grilled-cheese.jpg",
  paneer: "/images/paneer-toast.jpg",
  vegburger: "/images/veg-burger.jpg",
  loadedfries: "/images/loaded-fries.jpg",
  periperifries: "/images/peri-peri-fries.jpg",
  nachos: "/images/cheese-nachos.jpg",
  platter: "/images/brunch.jpg",

  // Desserts
  brownie: "/images/hero-red-cakes.jpg",
  cheesecake: "/images/cheesecake.jpg",
  lavacake: "/images/chocolate-lava-cake.jpg",
  falooda: "/images/kulfi-falooda.jpg",
  biscoffcheesecake: "/images/biscoff-cheesecake.jpg",
  cupcake: "/images/hero-cupcake.jpg",
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
    id: "coffee",
    label: { en: "Coffee", hi: "कॉफ़ी" },
    subtitle: { en: "Made with premium arabica beans", hi: "प्रीमियम अरेबिका बीन्स से निर्मित" },
    items: [
      item("Espresso", "एस्प्रेसो", "Rich, concentrated shot brewed from 100% specialty Arabica beans", "100% अरेबिका बीन्स से बना समृद्ध और गाढ़ा एस्प्रेसो शॉट", 290, { img: IMG.espresso }),
      item("Double Espresso", "डबल एस्प्रेसो", "Double extraction for a deep, bold body and golden crema", "गहरा और स्ट्रॉन्ग फ्लेवर, दोहरे एस्प्रेसो शॉट के साथ", 340, { img: IMG.espresso }),
      item("Americano", "अमेरिकानो", "Double shot of espresso topped with hot water for a clean, nuanced cup", "एस्प्रेसो और गर्म पानी का संतुलित और ताज़गी भरा कप", 330, { img: IMG.americano }),
      item("Cappuccino", "कैपुचीनो", "Equal parts espresso, velvety steamed milk and rich microfoam", "एस्प्रेसो, गाढ़े गर्म दूध और रेशमी झाग का उत्तम मिश्रण", 380, { img: IMG.cappuccino }),
      item("Latte", "लाते", "Smooth espresso poured over gently textured silky steamed milk", "सिल्की गर्म दूध और स्मूद एस्प्रेसो का क्लासिक संगम", 380, { img: IMG.latte }),
      item("Flat White", "फ्लैट व्हाइट", "Double ristretto blended with velvety microfoam for a punchy coffee flavor", "बारीक रेशमी माइक्रोफ़ोम और डबल रिस्ट्रेट्टो का गाढ़ा स्वाद", 400, { img: IMG.flatwhite }),
      item("Mocha", "मोका", "Rich espresso combined with Belgian dark chocolate and steamed milk", "डार्क चॉकलेट, एस्प्रेसो और गर्म दूध का स्वादिष्ट संगम", 430, { img: IMG.mocha }),
      item("Caramel Latte", "कारमेल लाते", "Velvety latte swirled with buttery caramel syrup", "मखमली लाते में बटर कारमेल सिरप का मीठा स्वाद", 450, { img: IMG.caramel }),
      item("Hazelnut Latte", "हेज़लनट लाते", "Fresh espresso and silky milk infused with toasted hazelnut notes", "टोस्टेड हेज़लनट के सुगन्धित स्वाद वाला क्रीमी लाते", 450, { img: IMG.hazelnutlatte }),
      item("Vanilla Latte", "वैनिला लाते", "Classic espresso and textured milk infused with pure vanilla bean syrup", "प्योर वैनिला बीन और स्मूद एस्प्रेसो का लोकप्रिय लाते", 450, { img: IMG.vanillalatte }),
      item("Spanish Latte (Condensed Milk)", "स्पैनिश लाते", "Rich espresso layered over sweet condensed milk and textured milk", "कंडेंस्ड मिल्क और एस्प्रेसो का अनोखा क्रीमी और मीठा स्वाद", 460, { img: IMG.spanishlatte }),
      item("Cafe Au Lait", "कैफ़े ओ ले", "French style brewed drip coffee balanced with equal parts steamed milk", "पारंपरिक फ़्रेंच शैली में ब्रू की गई कॉफ़ी और गर्म दूध", 420, { img: IMG.batch }),
      item("Affogato", "अफ़ोगाटो", "A scoop of artisanal vanilla ice cream drowned in hot, bold espresso", "वैनिला आइसक्रीम के स्कूप पर डाला गया गरमा-गरम एस्प्रेसो", 520, { img: IMG.affogato }),
    ],
  },
  {
    id: "non-coffee",
    label: { en: "Non Coffee", hi: "नॉन-कॉफ़ी" },
    items: [
      item("Hot Chocolate", "हॉट चॉकलेट", "Rich melted dark cocoa whisked into thick, velvety milk", "गाढ़े दूध में घुली हुई स्वादिष्ट और रिच डार्क चॉकलेट", 390, { img: IMG.cocoa }),
      item("White Hot Chocolate", "व्हाइट हॉट चॉकलेट", "Creamy cocoa butter white chocolate warmed with textured milk and vanilla", "व्हाइट चॉकलेट और वैनिला का बेहद क्रीमी व सुखद अनुभव", 420, { img: IMG.whitecocoa }),
      item("Matcha Latte", "माचा लाते", "Stone-ground ceremonial Uji matcha whisked with warm textured milk", "जापानी सेरेमोनियल उजी माचा और गर्म सिल्की दूध", 450, { img: IMG.hotmatcha }),
      item("Chai Latte", "चाय लाते", "Spiced black tea concentrate steamed with foamy milk and sweet spices", "मसाला चाय का काढ़ा और मखमली झागदार दूध", 330, { img: IMG.chai }),
      item("Masala Chai", "मसाला चाय", "Traditional slow-brewed Indian tea with cardamom, ginger, cloves and milk", "इलायची, अदरक और दालचीनी के साथ धीमी आंच पर पकी देसी चाय", 250, { img: IMG.chai }),
      item("Kashmiri Chai", "कश्मीरी चाय", "Authentic pink noon chai brewed with green tea leaves, cardamom and crushed nuts", "पारंपरिक गुलाबी कश्मीरी नून चाय, इलायची और पिस्ता-बादाम के साथ", 280, { img: IMG.kashmirichai }),
      item("Golden Milk (Haldi Doodh)", "हल्दी दूध", "Comforting turmeric, black pepper, honey and saffron steeped in warm milk", "कच्ची हल्दी, केसर, काली मिर्च और शहद से भरपूर पौष्टिक दूध", 320, { img: IMG.goldenmilk }),
      item("Iced Matcha Latte", "आइस्ड माचा लाते", "Ceremonial Japanese matcha layered over cold milk and fresh ice", "ताज़े ठंडे दूध और बर्फ पर लेयर किया गया जापानी माचा", 480, { img: IMG.matcha }),
    ],
  },
  {
    id: "cold-brews-iced-coffees",
    label: { en: "Cold Brews & Iced Coffees", hi: "कोल्ड ब्रू और आइस्ड कॉफ़ी" },
    items: [
      item("Classic Cold Brew", "क्लासिक कोल्ड ब्रू", "Slow steeped for 18 hours in cold filtered water for low acidity and sweet depth", "18 घंटे धीमी गति से कोल्ड स्टीप की गई बेहद स्मूद कॉफ़ी", 450, { img: IMG.coldbrew }),
      item("Vanilla Cold Brew", "वैनिला कोल्ड ब्रू", "18-hour cold brew infused with organic vanilla bean syrup", "नेचुरल वैनिला के सौम्य स्वाद से भरपूर रिफ्रेशिंग कोल्ड ब्रू", 490, { img: IMG.vanillacoldbrew }),
      item("Hazelnut Cold Brew", "हेज़लनट कोल्ड ब्रू", "Crisp cold brew sweetened with rich roasted hazelnut syrup", "भुने हुए हेज़लनट के नटी स्वाद के साथ कोल्ड ब्रू", 490, { img: IMG.coldbrew }),
      item("Cold Brew Mocha", "कोल्ड ब्रू मोका", "Cold brew blended with artisanal dark chocolate and chilled milk", "कोल्ड ब्रू, डार्क चॉकलेट और ठंडे दूध का लाजवाब मेल", 520, { img: IMG.mocha }),
      item("Iced Latte", "आइस्ड लाते", "Chilled milk and fresh double espresso poured over rocks", "बर्फ, ठंडा दूध और ताज़ा डबल एस्प्रेसो शॉट", 450, { img: IMG.icedlatte }),
      item("Caramel Iced Latte", "कारमेल आइस्ड लाते", "Double espresso and cold milk swirled with sweet buttery caramel", "रिच कारमेल और ताज़ा आइस्ड लाते", 490, { img: IMG.carameliced }),
      item("Iced Americano", "आइस्ड अमेरिकानो", "Double espresso over crisp cold water and ice for clean refreshing clarity", "बर्फ और ठंडे पानी में डबल एस्प्रेसो शॉट", 420, { img: IMG.americano }),
      item("Iced Spanish Latte", "आइस्ड स्पैनिश लाते", "Sweet condensed milk, chilled whole milk and dark espresso over crushed ice", "कंडेंस्ड मिल्क, ठंडा दूध और डार्क एस्प्रेसो", 490, { img: IMG.spanishlatte }),
    ],
  },
  {
    id: "signature-coffee",
    label: { en: "Signature Coffee", hi: "सिग्नेचर कॉफ़ी" },
    items: [
      item("Sufi's Special Coffee (House Blend)", "सूफ़िज़ स्पेशल कॉफ़ी", "Our master roaster's signature secret blend with velvet notes of spice and cocoa", "सूफ़ी कैफ़े का खास सीक्रेट हाउस ब्लेंड, कोको और मसालों के साथ", 550, { img: IMG.sufispecialcoffee }),
      item("Rose White Mocha", "रोज़ व्हाइट मोका", "Velvety white chocolate mocha kissed with Damascus rose water essence", "व्हाइट चॉकलेट मोका में दमिश्क गुलाब जल की भीनी सुगंध", 550, { img: IMG.roselatte }),
      item("Pistachio Latte", "पिस्ता लाते", "Creamy espresso latte infused with real roasted Sicilian pistachio paste", "भुने हुए असली पिस्ते के पेस्ट और मखमली दूध का संगम", 580, { img: IMG.pistachiolatte }),
      item("Turkish Coffee", "तुर्की कॉफ़ी", "Finely ground Arabica simmered in a copper cezve with fragrant cardamom", "तांबे के बर्तन में पकी पारंपरिक गाढ़ी तुर्की कॉफ़ी, इलायची के साथ", 520, { img: IMG.turkish }),
      item("Coconut Latte", "कोकोनट लाते", "Espresso paired with steamed coconut cream for a tropical silky warmth", "ताज़ा नारियल क्रीम और एस्प्रेसो का स्वादिष्ट ट्रॉपिकल अहसास", 550, { img: IMG.coconutlatte }),
      item("Maple Cinnamon Latte", "मेपल सिनेमन लाते", "Warm cinnamon spice and pure Canadian maple syrup layered with bold coffee", "दालचीनी और मेपल सिरप से सजी गर्मागर्म खुशबूदार कॉफ़ी", 550, { img: IMG.cinnamonlatte }),
      item("Tiramisu Latte", "तिरामिसु लाते", "Espresso, mascarpone-infused milk, ladyfinger crumb and a dusting of cocoa", "इटैलियन तिरामिसु डेज़र्ट फ्लेवर, मस्कार्पोने और कोको डस्ट के साथ", 580, { img: IMG.tiramisu }),
    ],
  },
  {
    id: "add-ons",
    label: { en: "Add-Ons", hi: "ऐड-ऑन्स" },
    items: [
      item("Extra Shot", "एक्स्ट्रा शॉट", "Add an extra shot of fresh specialty Arabica espresso", "ताज़ा अरेबिका एस्प्रेसो का एक और अतिरिक्त शॉट", 90, { img: IMG.espresso }),
      item("Flavour Syrup", "फ्लेवर सिरप", "Vanilla, Caramel, Hazelnut, Pistachio, Rose, or Irish cream syrup", "वैनिला, कारमेल, हेज़लनट, पिस्ता, रोज़ या आयरिश सिरप", 90),
      item("Oat Milk", "ओट मिल्क", "Creamy plant-based barista oat milk substitution", "स्वादिष्ट प्लांट-बेस्ड बरिस्ता ओट मिल्क", 120, { img: IMG.oat }),
      item("Almond Milk", "आलमंड मिल्क", "Lightly nutty, unsweetened barista almond milk substitution", "पौष्टिक और लो-कैलोरी बादाम दूध", 120, { img: IMG.oat }),
      item("Ice Cream", "आइसक्रीम स्कूप", "Rich artisanal gourmet vanilla ice cream scoop", "गॉरमे वैनिला आइसक्रीम का स्वादिष्ट स्कूप", 150),
      item("Whipped Cream", "ह्विप्ड क्रीम", "Freshly whipped sweet dairy cream dollop", "ताज़ी बनी गाढ़ी और मीठी ह्विप्ड क्रीम", 100),
    ],
  },
  {
    id: "premium-brews",
    label: { en: "Premium Brews", hi: "प्रीमियम ब्रू" },
    subtitle: { en: "Slow Brewed Perfection", hi: "धीमी गति से ब्रू की गई परफेक्शन" },
    items: [
      item("Pour Over", "पोर ओवर", "Hand-poured single origin coffee through a paper filter for clean floral brightness", "हाथ से तैयार फ़िल्टर कॉफ़ी, जिसमें बीन्स के सूक्ष्म नोट्स उभरते हैं", 650, { img: IMG.pourover }),
      item("Chemex", "केमेक्स", "Triple-bonded filter extraction highlighting tea-like delicacy and clean finish", "स्पेशल मोटे फ़िल्टर से ब्रू की गई बेहद साफ़ और खुशबूदार कॉफ़ी", 680, { img: IMG.chemex }),
      item("Aero Press", "एयरोप्रेस", "Gentle air-pressure extraction delivering full body with low acidity", "एयर-प्रेशर से निकली कम कड़वाहट और भरपूर बॉडी वाली कॉफ़ी", 620, { img: IMG.aeropress }),
      item("French Press", "फ़्रेंच प्रेस", "Full immersion brew for a heavy mouthfeel and rich natural coffee oils", "फुल इमर्शन ब्रू जो प्राकृतिक ऑयल्स और गाढ़ापन प्रदान करता है", 620, { img: IMG.frenchpress }),
      item("Siphon Brew", "साइफन ब्रू", "The theatrical vacuum immersion brew producing an ultra-clean, full-spectrum cup", "वैक्यूम तकनीक से तैयार अत्यंत शुद्ध और सुगन्धित मास्टरपीस कप", 750, { img: IMG.siphon }),
    ],
  },
  {
    id: "mocktails",
    label: { en: "Mocktails", hi: "मॉकटेल्स" },
    subtitle: { en: "Refreshing · Vibrant · Non-Alcoholic", hi: "ताज़गी भरा · वाइब्रेंट · नॉन-अल्कोहलिक" },
    items: [
      item("Virgin Mojito", "वर्जिन मोहीतो", "Muddled fresh garden mint, lime wedges, pure cane sugar and sparkling soda", "ताज़ा पुदीना, नींबू, सोडा और बर्फ की ताज़गी", 490, { img: IMG.lemonade }),
      item("Blue Ocean", "ब्लू ओशन", "Vibrant blue curacao citrus cordial with lemon, mint and chilled tonic", "नीले समंदर जैसा वाइब्रेंट सिट्रस कूलर और सोडा", 490, { img: IMG.blueocean }),
      item("Passion Paradise", "पैशन पैराडाइज़", "Tropical passion fruit nectar with a splash of citrus and crushed ice", "पैशन फ्रूट और ताज़े नीबू का ट्रॉपिकल मिश्रण", 500, { img: IMG.passion }),
      item("Berry Bliss", "बेरी ब्लिस", "Crushed strawberries, blackberries, cranberry juice and fizzy soda", "ताज़ी बेरीज़ और क्रैनबेरी का मीठा व खट्टा फिज्जी ड्रिंक", 500, { img: IMG.strawmatcha }),
      item("Pina Colada", "पिना कोलाडा", "Silky coconut cream, sweet pineapple puree and crushed ice blended smooth", "अनानास का गूदा और मखमली नारियल क्रीम का क्लासिक कूलर", 500, { img: IMG.orange }),
      item("Green Apple Mojito", "ग्रीन एप्पल मोहीतो", "Crisp tart green apple syrup muddled with mint leaves, lemon and soda", "क्रिस्पी ग्रीन एप्पल, पुदीना और लेमन सोडा", 500, { img: IMG.greenapple }),
      item("Watermelon Cooler", "वॉटरमेलन कूलर", "Freshly pressed sweet watermelon juice, basil seeds and Himalayan pink salt", "ताज़ा तरबूज का जूस, पुदीना और काला नमक", 490, { img: IMG.watermelon }),
      item("Citrus Sparkle", "सिट्रस स्पार्कल", "Sparkling blend of orange, pink grapefruit, lime and ginger fizz", "संतरे, मौसमी और अदरक का स्पार्कलिंग फ्यूज़न", 500, { img: IMG.ginger }),
      item("Minty Lemonade", "मिन्टी लेमनेड", "Fresh-squeezed lemon juice blended with chilled spearmint and crushed ice", "हाथ से निचोड़ा हुआ नींबू और पुदीने की ठंडी शिकंजी", 480, { img: IMG.lemonade }),
      item("Lychee Love", "लीची लव", "Fragrant sweet lychee juice, rose hint and sparkling mineral water", "मीठी लीची का रस, गुलाब की खुशबू और स्पार्कलिंग वाटर", 500, { img: IMG.lychee }),
      item("Sunset Delight", "सनसेट डिलाइट", "Layered orange juice, pomegranate syrup, mango puree and citrus tonic", "संतरा, अनार और आम का खूबसूरत दो-रंगी समर मॉकटेल", 500, { img: IMG.orange }),
      item("Guava Punch", "अमरूद पंच", "Ripe pink guava nectar with chili-salt rim and lemon splash", "पिंक अमरूद का रस, मिर्च-नमक रिम और नीबू का तड़का", 480, { img: IMG.orange }),
      item("Sufi's Special Mocktail", "सूफ़िज़ स्पेशल मॉकटेल", "Our house secret exotic blend of tropical fruits, elderflower and sparkling fizz", "सूफ़ी कैफ़े का खास एग्ज़ॉटिक फ्रूट और एल्डरफ्लावर मॉकटेल", 520, { img: IMG.passion }),
    ],
  },
  {
    id: "milkshakes",
    label: { en: "Milkshakes", hi: "मिल्कशेक" },
    items: [
      item("Oreo Shake", "ओरियो शेक", "Crunchy Oreo cookies blended thick with vanilla cream and chocolate drizzle", "क्रंची ओरियो बिस्कुट, वैनिला आइसक्रीम और चॉकलेट सिरप", 550, { img: IMG.oreoshake }),
      item("Kitkat Shake", "किटकेट शेक", "Crispy KitKat wafer bars blended into rich milk and vanilla ice cream", "क्रिस्पी किटकैट और गाढ़े दूध का लाजवाब शेक", 580, { img: IMG.kitkatshake }),
      item("Ferrero Rocher Shake", "फ़रेरो रोशर शेक", "Crushed Ferrero chocolates, hazelnut praline and premium chocolate ice cream", "प्रीमियम फ़रेरो चॉकलेट, हेज़लनट और चॉकलेट आइसक्रीम", 620, { img: IMG.ferreroshake }),
      item("Brownie Shake", "ब्राउनी शेक", "Fudgy warm chocolate brownie blended with cold milk and dark chocolate sauce", "चॉकलेट फज ब्राउनी और गाढ़े दूध का हेवनली शेक", 580, { img: IMG.brownie }),
      item("Nutella Shake", "नूटेला शेक", "Generous scoops of Italian Nutella hazelnut cocoa spread and whole milk", "असली नूटेला और मखमली आइसक्रीम का समृद्ध शेक", 600, { img: IMG.nutellashake }),
      item("Strawberry Shake", "स्ट्रॉबेरी शेक", "Fresh strawberry compote blended thick with creamy vanilla dairy", "ताज़ी स्ट्रॉबेरी और वैनिला आइसक्रीम का क्लासिक शेक", 520, { img: IMG.strawmatcha }),
      item("Mango Shake", "मैंगो शेक", "Sun-ripened Alphonso mango pulp blended with rich milk and cream", "ताज़े रसीले अल्फांसो आम के गूदे से बना क्रीमी शेक", 520, { img: IMG.orange }),
      item("Blueberry Shake", "ब्लूबेरी शेक", "Wild blueberries blended with chilled milk and yogurt ice cream", "जंगली ब्लूबेरी और गाढ़े दूध का खट्टा-मीठा शेक", 540, { img: IMG.blueberryshake }),
      item("Butterscotch Shake", "बटरस्कॉच शेक", "Caramelized brown sugar praline crunch with rich butterscotch cream", "क्रिस्पी बटरस्कॉच क्रंच और कैरेमल आइसक्रीम शेक", 520, { img: IMG.latte }),
      item("Cold Coffee Shake", "कोल्ड कॉफ़ी शेक", "Double shot espresso blended thick with vanilla bean ice cream and milk", "एस्प्रेसो शॉट और वैनिला आइसक्रीम का थिक कोल्ड कॉफ़ी शेक", 520, { img: IMG.iced }),
      item("Pistachio Shake", "पिस्ता शेक", "Roasted pistachio paste blended with whole milk and cardamom note", "शाही पिस्ता, इलायची और गाढ़े दूध का प्रीमियम शेक", 620, { img: IMG.pistachiolatte }),
      item("Lotus Biscoff Shake", "लोटस बिस्कॉफ शेक", "Belgian Lotus Biscoff speculoos spread and crunchy biscuit crumble", "बेल्जियन लोटस बिस्कॉफ स्प्रेड और क्रंची बिस्कुट का शेक", 620, { img: IMG.biscoffshake }),
    ],
  },
  {
    id: "food",
    label: { en: "Food", hi: "फ़ूड" },
    items: [
      item("Veg Sandwich", "वेज सैंडविच", "Fresh cucumbers, ripe tomatoes, bell peppers and herb butter on sourdough", "ताज़ी सब्ज़ियाँ, खीरा, टमाटर और हर्ब बटर का फ्रेश सैंडविच", 430, { img: IMG.cucumber }),
      item("Grilled Sandwich", "ग्रिल्ड सैंडविच", "Golden-grilled artisanal bread filled with seasonal vegetables and melted cheese", "क्रिस्पी ग्रिल्ड ब्रेड, सब्ज़ियाँ और पिघला हुआ चीज़", 470, { img: IMG.cheese }),
      item("Cheese Sandwich", "चीज़ सैंडविच", "Three-cheese blend melted between thick toasted buttered bread", "तीन तरह के स्वादिष्ट चीज़ से भरपूर क्लासिक टोस्ट", 470, { img: IMG.cheese }),
      item("Paneer Tikka Wrap", "पनीर टिक्का रैप", "Tandoori marinated charred cottage cheese, mint chutney and crisp onions", "तंदूरी मसालों में भुना पनीर, पुदीना चटनी और लच्छा प्याज़", 510, { img: IMG.paneer }),
      item("Peri Peri Wrap", "पेरी पेरी रैप", "Zesty spicy peri-peri spiced veggie strips and chipotle aioli rolled in flatbread", "तीखा पेरी पेरी वेजी रैप, चिपोटले सॉस के साथ", 510, { img: IMG.paneer }),
      item("Veg Burger", "वेज बर्गर", "Crispy seasoned vegetable and herb patty with fresh lettuce, tomato and house mayo", "क्रिस्पी वेज पैटी, ताज़ी लेट्यूस और स्पेशल मेयोनेज़ बर्गर", 470, { img: IMG.vegburger }),
      item("Peri Peri Burger", "पेरी पेरी बर्गर", "Spicy dusted crunchy patty topped with peri-peri cheese sauce and jalapeños", "तीखे पेरी पेरी मसाले, चीज़ सॉस और जलापेनो वाला बर्गर", 500, { img: IMG.vegburger }),
      item("Loaded Fries", "लोडेड फ्राइज़", "Golden crispy potato fries smothered in warm cheese sauce, sour cream and scallions", "क्रिस्पी फ्रेंच फ्राइज़ पर पिघला हुआ चीज़ सॉस और हर्ब्स", 450, { img: IMG.loadedfries }),
      item("Peri Peri Fries", "पेरी पेरी फ्राइज़", "Crispy french fries tossed vigorously in African birds-eye peri-peri seasoning", "गरमा-गरम क्रिस्पी फ्राइज़, चटपटे पेरी पेरी मसाले में टॉस की हुई", 450, { img: IMG.periperifries }),
      item("Cheese Nachos", "चीज़ नाचोज़", "Corn tortilla chips layered with hot melted cheese sauce, salsa and jalapeños", "क्रिस्पी कॉर्न नाचोज़, साल्सा सॉस और मेल्टेड चीज़", 490, { img: IMG.nachos }),
      item("Sufi's Special Platter", "सूफ़िज़ स्पेशल प्लेटर", "Chef's grand assortment of mini wraps, loaded fries, cheese nachos, dips and bites", "शेफ़ का खास प्लेटर: मिनी रैप, लोडेड फ्राइज़, नाचोज़ और स्पेशल डिप्स", 850, { img: IMG.platter }),
    ],
  },
  {
    id: "desserts",
    label: { en: "Desserts", hi: "डेसर्ट" },
    items: [
      item("Chocolate Brownie", "चॉकलेट ब्राउनी", "Dense, fudgy dark chocolate walnut brownie served warm", "अखरोट और डार्क चॉकलेट से बनी गर्म, फजी ब्राउनी", 450, { img: IMG.brownie }),
      item("Cheesecake", "चीज़केक", "Velvety baked cream cheese over a buttery graham cracker crust", "मखमली बेक्ड क्रीम चीज़ और क्रिस्पी बटर क्रस्ट", 480, { img: IMG.cheesecake }),
      item("Tiramisu", "तिरामिसु", "Espresso-dipped savoiardi biscuits layered with fluffy mascarpone cream and cocoa", "एस्प्रेसो में डूबे बिस्कुट और मस्कार्पोने क्रीम का इटैलियन क्लासिक", 520, { img: IMG.tiramisu }),
      item("Chocolate Lava Cake", "चॉकलेट लावा केक", "Warm molten chocolate cake with a rich liquid truffle center", "अंदर से पिघलती गर्म चॉकलेट वाला स्वादिष्ट लावा केक", 550, { img: IMG.lavacake }),
      item("Kulfi Falooda", "कुल्फी फ़लूदा", "Traditional malai kulfi slice topped with basil seeds, falooda sev and rose syrup", "मलाई कुल्फी, फलूदा सेव, सब्ज़ा और रूह अफ़ज़ा का शाही मेल", 480, { img: IMG.falooda }),
      item("Lotus Biscoff Cheesecake", "लोटस बिस्कॉफ चीज़केक", "Creamy cheesecake infused and topped with decadent Lotus Biscoff speculoos spread", "लोटस बिस्कॉफ के कैरेमल स्प्रेड से सजी बेहद स्वादिष्ट चीज़केक", 550, { img: IMG.biscoffcheesecake }),
      item("Sufi's Special Dessert", "सूफ़िज़ स्पेशल डेज़र्ट", "Our pastry chef's daily signature creation featuring handcrafted layers and garnish", "सूफ़ी कैफ़े की सिग्नेचर सीक्रेट डेज़र्ट, शेफ़ द्वारा विशेष रूप से तैयार", 620, { img: IMG.cupcake }),
    ],
  },
];

export const categoryMin = (id: string) => {
  const cat = MENU.find((c) => c.id === id);
  if (!cat || cat.items.length === 0) return null;
  return Math.min(...cat.items.map((i) => i.price));
};
