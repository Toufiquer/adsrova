/*
|-----------------------------------------
| setting up data.ts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 1 November, 2026
|-----------------------------------------
*/

export type HomeCard = { title: string; description: string };
export type HomeData = {
  forceUpdate: "true" | "false";
  paddingX: number;
  paddingY: number;
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  sectionsJson: string;
};

// The eleven entries correspond to the fixed sections following the hero.
export const defaultCards: HomeCard[] = [
  { title: "Built for what’s next", description: "Thoughtful strategy. Creative execution. Continuous improvement." },
  {
    title: "Better advertising starts here.",
    description:
      "From the first impression to the next opportunity, we help make every part of your advertising work together.",
  },
  {
    title: "Be there when intent turns into action.",
    description: "Reach people actively searching for what you offer with a considered Google Ads strategy.",
  },
  {
    title: "Make the scroll stop.",
    description: "Bring your business into the conversation with creative Facebook and Instagram advertising.",
  },
  {
    title: "A clearer path to growth.",
    description:
      "Good advertising is more than getting attention. It is about connecting the right message with the right people.",
  },
  {
    title: "Ideas made to move people.",
    description: "A look at the creative thinking behind campaigns designed to stand out.",
  },
  {
    title: "From first conversation to continuous improvement.",
    description: "A collaborative process that keeps your business goals at the center.",
  },
  {
    title: "Different ambitions. One focus: growth.",
    description: "Advertising shaped around the audience, challenges, and opportunities of your business.",
  },
  {
    title: "See the whole picture.",
    description: "Understand what matters with clear reporting and insights that inform your next move.",
  },
  { title: "A few things you might be wondering.", description: "The essentials about working with Adsrova." },
  {
    title: "Let’s make your next move count.",
    description: "Tell us where you want to go. Let’s explore how digital advertising can help you get there.",
  },
];
export const defaultHomeCard: HomeCard = { title: "New section", description: "Add a short description." };
export const defaultData: HomeData = {
  forceUpdate: "false",
  paddingX: 0,
  paddingY: 0,
  eyebrow: "Digital advertising, thoughtfully done",
  title: "Make your next move a bigger one.",
  intro: "Turn attention into opportunity with Google, Facebook and Instagram advertising built around your business.",
  imageUrl: "",
  imageAlt: "A creative workspace",
  sectionsJson: JSON.stringify(defaultCards),
};

export function resolveHomeData(data?: Partial<HomeData>): HomeData {
  const values = { ...defaultData, ...data };
  // Migrate known template defaults only; keep customer-authored content intact.
  if (["Welcome to NexaMart", "Adsrova · NxMart"].includes(values.eyebrow)) values.eyebrow = defaultData.eyebrow;
  if (["Electronics for the way you live", "Online shopping across Bangladesh"].includes(values.title))
    values.title = defaultData.title;
  if (
    ["We provide best electronics products.", "Browse available products and shop online with Adsrova."].includes(
      values.intro,
    )
  )
    values.intro = defaultData.intro;
  if (values.imageUrl === "/Logo.png" && values.imageAlt === "Adsrova logo") {
    values.imageUrl = "";
    values.imageAlt = defaultData.imageAlt;
  }
  return values;
}
export function parseCards(value?: string): HomeCard[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return defaultCards;
    const legacyTitles = [
      "Electronics, made approachable",
      "For everyday moments",
      "A closer look",
      "Find your focus",
      "Made for your routine",
      "Explore at your own pace",
      "Your next discovery",
      "The details matter",
      "Keep it simple",
      "Meet NexaMart",
      "Discover with NexaMart",
    ];
    const legacyDescriptions = [
      "Explore the world of electronics with NexaMart.",
      "Discover electronics that fit into the way you spend your day.",
      "Take your time exploring electronics and finding what matters to you.",
      "Think about the features that matter most to you when choosing electronics.",
      "From work to downtime, electronics can be part of your everyday routine.",
      "Get to know the possibilities and consider what fits your needs.",
      "There is always something new to learn about electronics.",
      "Consider the design, features, and functionality that work for you.",
      "Start with what you need and explore from there.",
      "We provide best electronics products.",
      "Explore electronics with your needs in mind.",
    ];
    return defaultCards.map((fallback, index) => {
      const item: unknown = parsed[index];
      if (!item || typeof item !== "object") return fallback;
      const card = item as Record<string, unknown>;
      return {
        title: typeof card.title === "string" && card.title !== legacyTitles[index] ? card.title : fallback.title,
        description:
          typeof card.description === "string" && card.description !== legacyDescriptions[index]
            ? card.description
            : fallback.description,
      };
    });
  } catch {
    return defaultCards;
  }
}
