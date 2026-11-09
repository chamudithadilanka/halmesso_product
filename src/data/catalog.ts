import type { Product } from "@/domain/entities";
import garlicImage from "@/assets/garlic_flavor.jpeg";
import masalaImage from "@/assets/masala_flavor.jpeg";

export const CATALOG: Product[] = [
  {
    id: "p-sprat-powder",
    slug: "halmesso-plus-sprat-seasoning-powder",
    name: "Halmesso+ Original Sprat Seasoning",
    tagline: "Nutrition in every spoon",
    description:
      "Our signature Healthy Sprat Seasoning Powder, hand-made from real sprats. A natural boost of protein, calcium and omega-3 for rice, soups, curries, kottu, noodles and porridge — made for every age group, with zero additives.",
    price: 600,
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
    price: 650,
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
  {
    id: "p-sprat-garlic",
    slug: "halmesso-plus-garlic-sprat-seasoning",
    name: "Halmesso+ Garlic Flavour Sprat Seasoning",
    tagline: "Garlic goodness in every sprinkle",
    description:
      "Our natural sprat seasoning with a savoury garlic flavour. Made from Sri Lankan sprats, it brings a nourishing boost to rice, noodles, curries and family favourites.",
    price: 650,
    category: "pantry",
    rating: 4.8,
    reviewCount: 620,
    palette: ["#f0dfc0", "#653c22"],
    glyph: "GAR",
    image: garlicImage,
    features: [
      "Made from Sri Lankan sprats",
      "Savoury garlic flavour",
      "Rich in calcium",
      "No MSG or artificial flavours",
      "100% natural · 50 g pack",
    ],
  },
  {
    id: "p-sprat-masala",
    slug: "halmesso-plus-masala-sprat-seasoning",
    name: "Halmesso+ Masala Flavour Sprat Seasoning",
    tagline: "A warm masala lift for every meal",
    description:
      "Our natural sprat seasoning with a warming masala flavour. Made from Sri Lankan sprats, it adds a savoury boost to rice, noodles, curries and family favourites.",
    price: 650,
    category: "pantry",
    rating: 4.8,
    reviewCount: 540,
    palette: ["#f0dfc0", "#9b4d16"],
    glyph: "MAS",
    image: masalaImage,
    features: [
      "Made from Sri Lankan sprats",
      "Warm masala flavour",
      "Rich in calcium",
      "No MSG or artificial flavours",
      "100% natural · 50 g pack",
    ],
  },
];
