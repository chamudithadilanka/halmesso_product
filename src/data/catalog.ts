import type { Product } from "@/domain/entities";
import garlicImage from "@/assets/garlic_flavor.jpeg";
import masalaImage from "@/assets/masala_flavor.jpeg";

/**
 * Product claims below are limited to what is printed on the packs
 * (100% natural, no MSG, no artificial flavours, rich in calcium,
 * brain development, immunity, Sri Lankan sprats, 50 g).
 */
export const CATALOG: Product[] = [
  {
    id: "p-masala",
    slug: "masala-sprat-seasoning",
    name: "Haalmasso+ Masala Flavour",
    flavourName: "Masala",
    flavour: "masala",
    tagline: "A warm masala lift for every meal",
    description:
      "Natural nutritional seasoning powder made from Sri Lankan sprats, with a warming masala flavour. One spoon adds a savoury, nourishing boost to rice and curry, kottu, noodles and the family favourites you already cook.",
    price: 500,
    netWeight: "100 g",
    image: masalaImage,
    imageAlt:
      "Haalmasso+ Masala Flavour pouch with a bowl of seasoning powder, dried sprats and red chillies",
    badge: "Warm & spiced",
    highlights: [
      "Made from Sri Lankan sprats",
      "Rich in calcium",
      "Good for brain development",
      "Boosts immunity",
      "No MSG · no artificial flavours",
      "100% natural",
    ],
    pairings: ["Rice & curry", "Kottu", "Fried rice", "Dhal", "Egg dishes"],
  },
  {
    id: "p-garlic",
    slug: "garlic-sprat-seasoning",
    name: "Haalmasso+ Garlic Flavour",
    flavourName: "Garlic",
    flavour: "garlic",
    tagline: "Garlic goodness in every sprinkle",
    description:
      "Natural nutritional seasoning powder made from Sri Lankan sprats, with a savoury garlic flavour. Stir it through noodles, soups and rice for a simple, wholesome boost the whole family will enjoy.",
    price: 500,
    netWeight: "100 g",
    image: garlicImage,
    imageAlt:
      "Haalmasso+ Garlic Flavour pouch with a bowl of seasoning powder, dried sprats and garlic bulbs",
    badge: "Savoury & mellow",
    highlights: [
      "Made from Sri Lankan sprats",
      "Rich in calcium",
      "Good for brain development",
      "Boosts immunity",
      "No MSG · no artificial flavours",
      "100% natural",
    ],
    pairings: ["Noodles", "Soups", "Porridge", "Fried rice", "Stir-fries"],
  },
];
