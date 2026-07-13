import type { TimePeriod, TimePeriodConfig } from "@/types/meditation";

export const timePeriods: TimePeriodConfig[] = [
  {
    id: "dawn",
    label: "새벽",
    hours: [[4, 6]],
    greeting: "고요한 새벽, 호흡과 함께 하루를 준비해 보세요.",
    backgroundImage: "/backgrounds/dawn.jpg",
    fallbackImage:
      "https://images.pexels.com/photos/26263102/pexels-photo-26263102.jpeg?auto=compress&cs=tinysrgb&w=1920",
    overlayColor: "rgba(0, 0, 0, 0.35)",
    photographer: "Lorenzo Manera",
  },
  {
    id: "morning",
    label: "아침",
    hours: [[7, 10]],
    greeting: "고요한 호흡으로 하루를 시작해 보세요.",
    backgroundImage: "/backgrounds/morning.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80",
    overlayColor: "rgba(10, 40, 20, 0.30)",
    photographer: "Ingmar",
  },
  {
    id: "day",
    label: "낮",
    hours: [[11, 16]],
    greeting: "잠시 멈추고 마음에 여유를 만들어 보세요.",
    backgroundImage: "/backgrounds/day.jpg",
    fallbackImage:
      "https://images.pexels.com/photos/8019039/pexels-photo-8019039.jpeg?auto=compress&cs=tinysrgb&w=1920",
    overlayColor: "rgba(10, 20, 50, 0.25)",
    photographer: "Jess Loiterton",
  },
  {
    id: "evening",
    label: "저녁",
    hours: [[17, 20]],
    greeting: "오늘 쌓인 긴장을 천천히 내려놓아 보세요.",
    backgroundImage: "/backgrounds/evening.jpg",
    fallbackImage:
      "https://images.pexels.com/photos/19676932/pexels-photo-19676932.jpeg?auto=compress&cs=tinysrgb&w=1920",
    overlayColor: "rgba(40, 10, 50, 0.35)",
    photographer: "Johannes Plenio",
  },
  {
    id: "night",
    label: "밤",
    hours: [
      [21, 23],
      [0, 3],
    ],
    greeting: "하루를 마무리하며 몸과 마음을 쉬게 해주세요.",
    backgroundImage: "/backgrounds/night.jpg",
    fallbackImage:
      "https://images.pexels.com/photos/23995209/pexels-photo-23995209.jpeg?auto=compress&cs=tinysrgb&w=1920",
    overlayColor: "rgba(0, 5, 20, 0.45)",
    photographer: "Luke Miller",
  },
];

export function getTimePeriod(date = new Date()): TimePeriod {
  const hour = date.getHours();

  for (const period of timePeriods) {
    const matches = period.hours.some(([start, end]) => {
      if (start <= end) {
        return hour >= start && hour <= end;
      }
      return hour >= start || hour <= end;
    });

    if (matches) {
      return period.id;
    }
  }

  return "night";
}

export function getTimePeriodConfig(
  period: TimePeriod,
): TimePeriodConfig {
  return (
    timePeriods.find((item) => item.id === period) ??
    timePeriods[timePeriods.length - 1]
  );
}
