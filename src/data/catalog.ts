import type { Product } from "@/domain/entities";

export const CATALOG: Product[] = [
  {
    id: "p-sprat-powder",
    slug: "halmesso-plus-sprat-seasoning-powder",
    name: "Halmesso+ Original Sprat Seasoning",
    tagline: "Nutrition in every spoon",
    description:
      "Our signature Healthy Sprat Seasoning Powder, hand-made from real sprats. A natural boost of protein, calcium and omega-3 for rice, soups, curries, kottu, noodles and porridge — made for every age group, with zero additives.",
    price: 12,
    category: "pantry",
    rating: 4.9,
    reviewCount: 2400,
    palette: ["#f4e9c8", "#3f7d3a"],
    glyph: "SPR",
    features: [
      "Made from real, locally caught sprats",
      "High in protein & calcium · omega-3 source",
      "100% natural, zero additives",
      "For every meal — rice, curries, kottu & more",
      "Suitable for all age groups",
    ],
  },
  {
    id: "p-sprat-chilli",
    slug: "halmesso-plus-chilli-lime-sprat-seasoning",
    name: "Halmesso+ Chilli & Lime Sprat Seasoning",
    tagline: "A zesty kick in every sprinkle",
    description:
      "All the nourishment of our original sprat seasoning, now with a bold chilli & lime twist. Sun-dried sprats blended with red chilli flakes and natural lime zest — a flavourful boost for noodles, egg hoppers, stir-fries and grilled corn.",
    price: 13,
    category: "pantry",
    rating: 4.8,
    reviewCount: 870,
    palette: ["#fde8c8", "#c0392b"],
    glyph: "CHL",
    features: [
      "Real sprats with chilli & natural lime zest",
      "High in protein & calcium · omega-3 source",
      "Bold yet balanced — not overpowering",
      "Perfect for noodles, stir-fries & egg hoppers",
      "Zero additives · 100% natural",
    ],
  },
];
