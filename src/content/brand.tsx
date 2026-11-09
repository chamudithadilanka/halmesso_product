import type { ProcessStep } from "@/components/motion/process-scroller";
import {
  BanIcon,
  BoneIcon,
  BrainIcon,
  FishIcon,
  LeafIcon,
  ShieldIcon,
  SparkleIcon,
  SunIcon,
  WaveIcon,
} from "@/components/icons";

/** Benefits exactly as printed on the pack. */
export const BENEFITS = [
  { title: "Rich in calcium", body: "Whole sprats — bones and all — are a natural source of calcium.", icon: <BoneIcon className="size-7" /> },
  { title: "Brain development", body: "Small oily fish bring the goodness growing minds need.", icon: <BrainIcon className="size-7" /> },
  { title: "Boosts immunity", body: "Nutrition from real, whole fish — not from a lab.", icon: <ShieldIcon className="size-7" /> },
  { title: "No MSG, nothing artificial", body: "No MSG and no artificial flavours. 100% natural.", icon: <BanIcon className="size-7" /> },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Caught", body: "Small sprats, landed by local fishermen along the Sri Lankan coast.", icon: <WaveIcon className="size-7" /> },
  { step: "02", title: "Cleaned", body: "Washed and cleaned soon after the catch, so only the good stuff goes in.", icon: <FishIcon className="size-7" /> },
  { step: "03", title: "Sun-dried", body: "Dried the traditional way, which deepens the savoury flavour.", icon: <SunIcon className="size-7" /> },
  { step: "04", title: "Ground & seasoned", body: "Milled into a fine powder and blended with masala or garlic flavour.", icon: <SparkleIcon className="size-7" /> },
  { step: "05", title: "Packed for your kitchen", body: "Sealed in a resealable 50 g pouch, ready for any meal.", icon: <LeafIcon className="size-7" /> },
];

export const USES = ["Rice & curry", "Kottu", "Noodles", "Soups", "Porridge", "Fried rice", "Egg dishes", "Dhal"];

export const PACK_FACTS = [
  "100% natural",
  "No MSG",
  "No artificial flavours",
  "Rich in calcium",
  "Made from Sri Lankan sprats",
  "Good for brain development",
  "Boosts immunity",
  "50 g pack",
];

export const FAQS = [
  {
    q: "What is Haalmasso+?",
    a: "A natural nutritional seasoning powder made from Sri Lankan sprats. It comes in two flavours — Masala and Garlic — and adds a savoury, nourishing boost to everyday meals.",
  },
  {
    q: "How do I use it?",
    a: "Stir a teaspoon into rice, curries, soups, kottu, noodles or porridge while cooking or just before serving. It seasons and adds goodness in one step.",
  },
  {
    q: "Is it suitable for children?",
    a: "Haalmasso+ is made for the whole family. As with any food containing fish, avoid it if anyone in your family has a fish allergy, and check with your doctor for very young children.",
  },
  {
    q: "Does it contain MSG or artificial flavours?",
    a: "No. Haalmasso+ is 100% natural, with no MSG and no artificial flavours.",
  },
  {
    q: "How should I store it?",
    a: "Keep the pouch sealed in a cool, dry place away from sunlight. Reseal after every use and use within the best-before date printed on the pack.",
  },
];
