export const EMPTY_JOB_CATEGORY = "Non renseigné";
export const OTHER_JOB_CATEGORY = "Autre";

// Same options and order as the job selector (packages/frontend/src/routes/compte.tsx)
export const JOB_CATEGORIES = [
  "Agent en charge du CST",
  "Conservateur régional des monuments historiques",
  "Architecte des bâtiments de France",
  "Ingénieur des services culturels",
  "Conservateur des antiquités et objets d'art",
  "Technicien",
  OTHER_JOB_CATEGORY,
] as const;

type JobCategory = (typeof JOB_CATEGORIES)[number];

// Order matters: the first matching rule wins
const rules: { category: JobCategory; pattern: RegExp }[] = [
  { category: "Agent en charge du CST", pattern: /\bcst\b/ },
  { category: "Conservateur des antiquités et objets d'art", pattern: /antiquit|objets d'art|\bcaoa\b/ },
  { category: "Conservateur régional des monuments historiques", pattern: /conservat(eur|rice)|\bcrmh\b/ },
  { category: "Ingénieur des services culturels", pattern: /\biscp\b|ingenieu/ },
  { category: "Technicien", pattern: /tscbf|\btbf\b|technicien/ },
  { category: "Architecte des bâtiments de France", pattern: /\babf\b|\barchitecte\b/ },
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’`]/g, "'").toLowerCase().trim();

export const getJobCategory = (job: string | null | undefined) => {
  const normalized = normalize(job ?? "");
  if (!normalized || normalized === "non renseigne") return EMPTY_JOB_CATEGORY;
  return rules.find((rule) => rule.pattern.test(normalized))?.category ?? OTHER_JOB_CATEGORY;
};
