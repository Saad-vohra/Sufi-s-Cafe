// Brand data — single source of truth for every brand string on the site.

export const BRAND = {
  mark: "SUFI'S",
  name: "Sufi's Cafe",
  city: "Kheda, India",
  tagline: {
    en: "specialty coffee · matcha bar · all-day brunch",
    hi: "स्पेशलिटी कॉफ़ी · माचा बार · ऑल-डे ब्रंच",
  },
  phone: "+91 79843 42874",
  tel: "tel:+917984342874",
  hours: "08:00 – 21:00",
  instagram: "@sufis_cafe",
  instagramUrl: null as string | null, // null → rendered as text, not a link
  currency: "₹",
  rating: null as number | null,
  reviews: null as number | null,
  locations: [
    {
      name: "Kajipura",
      address: "nearby coca-cola, opp. sumar logistics, beside dawat restaurant, Kajipura, Gujarat 387120",
      tag: { en: "Main Cafe · Dine-in & Takeaway", hi: "मुख्य कैफ़े · डाइन-इन और टेकअवे" },
      maps: "https://maps.google.com/?q=nearby+coca-cola,+opp.+sumar+logistics,+beside+dawat+restaurant,+Kajipura,+Gujarat+387120" as string | null,
      img: "/images/venue.jpg",
    },
  ],
  isDemo: false,
} as const;


export const money = (n: number) => `${BRAND.currency}${n}`;
