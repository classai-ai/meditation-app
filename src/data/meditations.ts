import type { Category, MeditationContent, TimePeriod } from "@/types/meditation";

export const CATEGORY_LABELS: Record<Category, string> = {
  breathing: "호흡 명상",
  stress: "스트레스 완화",
  sleep: "수면과 이완",
  mindfulness: "마음챙김",
  "short-break": "짧은 휴식",
  music: "명상 음악",
};

export const DURATION_OPTIONS = [3, 5, 10, 15] as const;

export const meditations: MeditationContent[] = [
  {
    id: "breathing-5min",
    title: "5분 호흡 명상",
    description:
      "스트레스로 지친 상태에서 호흡을 관찰하며 마음을 가볍게 정리합니다.",
    category: "breathing",
    duration: 5,
    youtubeId: "dZewQEbQQM0",
    recommendedTimes: ["dawn", "morning", "day"],
  },
  {
    id: "short-3min",
    title: "잠깐의 숨, 깊은 고요",
    description: "바쁜 하루 중 잠시 멈추며 호흡에 집중하는 3분 명상입니다.",
    category: "short-break",
    duration: 3,
    youtubeId: "G9d-fFAHygI",
    recommendedTimes: ["day"],
  },
  {
    id: "breathing-10min",
    title: "10분 호흡 알아차림",
    description: "호흡을 알아차리며 몸과 마음을 편안하게 이완합니다.",
    category: "breathing",
    duration: 10,
    youtubeId: "GnJFjKuqKUU",
    recommendedTimes: ["morning", "evening"],
  },
  {
    id: "stress-10min",
    title: "복잡한 생각을 내려놓는 10분",
    description:
      "불안하고 생각이 많을 때 복잡한 마음을 천천히 내려놓습니다.",
    category: "stress",
    duration: 10,
    youtubeId: "XgVjs-WeBWY",
    recommendedTimes: ["day", "evening"],
  },
  {
    id: "mindfulness-10min",
    title: "마음을 바라보는 10분",
    description: "마음챙김 기반 앉기 명상으로 내면을 차분히 바라봅니다.",
    category: "mindfulness",
    duration: 10,
    youtubeId: "eQe87An03Io",
    recommendedTimes: ["morning", "evening"],
  },
  {
    id: "sleep-relax",
    title: "편안한 잠을 위한 이완 명상",
    description: "생각과 걱정을 내려놓고 깊은 이완으로 잠들 준비를 합니다.",
    category: "sleep",
    duration: 10,
    youtubeId: "DkFc9LLO14A",
    recommendedTimes: ["night"],
  },
  {
    id: "sleep-music",
    title: "편안한 수면과 명상을 위한 음악",
    description: "가이드 없이 편안한 배경음악으로 명상과 휴식을 돕습니다.",
    category: "music",
    duration: 15,
    youtubeId: "1ZYbU82GVz4",
    recommendedTimes: ["night"],
  },
];

export function getMeditationById(id: string): MeditationContent | undefined {
  return meditations.find((item) => item.id === id);
}

export function getMeditationsByDuration(duration: number): MeditationContent[] {
  return meditations.filter((item) => item.duration === duration);
}

export function getBestMeditationForDuration(
  duration: number,
  period?: TimePeriod,
): MeditationContent {
  const exactMatches = getMeditationsByDuration(duration);

  if (exactMatches.length > 0) {
    if (period) {
      const periodMatches = exactMatches.filter((item) =>
        item.recommendedTimes.includes(period),
      );
      if (periodMatches.length > 0) {
        return periodMatches[0];
      }
    }
    return exactMatches[0];
  }

  return [...meditations].sort(
    (a, b) =>
      Math.abs(a.duration - duration) - Math.abs(b.duration - duration),
  )[0];
}

export function getRecommendedMeditations(
  period: TimePeriod,
  limit = 3,
  duration?: number,
): MeditationContent[] {
  const pool =
    duration !== undefined
      ? (() => {
          const byDuration = getMeditationsByDuration(duration);
          return byDuration.length > 0 ? byDuration : meditations;
        })()
      : meditations;

  const matched = pool.filter((item) => item.recommendedTimes.includes(period));
  const rest = pool.filter((item) => !item.recommendedTimes.includes(period));
  return [...matched, ...rest].slice(0, limit);
}
