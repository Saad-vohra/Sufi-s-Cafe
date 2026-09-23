// Brand data — single source of truth for every brand string on the site.

export const BRAND = {
  mark: "LUNA",
  name: "Luna Cafe",
  city: "Bengaluru, India",
  tagline: {
    en: "specialty coffee · matcha bar · all-day brunch",
    hi: "स्पेशलिटी कॉफ़ी · माचा बार · ऑल-डे ब्रंच",
  },
  phone: "+91 79843 42874",
  tel: "tel:+917984342874",
  hours: "08:00 – 21:00",
  instagram: "@luna_cafe",
  instagramUrl: null as string | null, // null → rendered as text, not a link
  currency: "₹",
  rating: null as number | null,
  reviews: null as number | null,
  locations: [
    {
      name: "Flagship",
      address: "12 Church Street, Ashok Nagar, Bengaluru 560001",
      tag: { en: "Flagship · seasonal terrace", hi: "फ्लैगशिप · मौसमी टेरेस" },
      maps: "https://maps.google.com/?q=Church+Street+Ashok+Nagar+Bengaluru" as string | null,
      img: "/images/venue.jpg",
    },
    {
      name: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru 560038",
      tag: { en: "In the heart of the city", hi: "शहर के बीचों-बीच" },
      maps: "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru" as string | null,
      img: "/images/venue-indiranagar.jpg",
    },
  ],
  isDemo: false,
} as const;


export const money = (n: number) => `${BRAND.currency}${n}`;
