"use client";

import type { ChallengeProgress } from "@/types/meditation";
import { Card } from "@/components/common/Card";

interface ChallengeProgressCardProps {
  progress: ChallengeProgress;
}

export function ChallengeProgressCard({
  progress,
}: ChallengeProgressCardProps) {
  return (
    <Card className="flex flex-1 flex-col">
      <div>
        <p className="text-sm font-semibold text-accent-moon">
          7일 마음 챙김 챌린지
        </p>
        <h3 className="mt-1 text-xl font-bold text-white">
          {progress.isComplete
            ? "챌린지를 완료했어요!"
            : `${progress.participatedDays}일 / ${progress.requiredDays}일 참여`}
        </h3>
        <p className="mt-2 text-sm text-muted">
          7일 중 5일 이상, 하루 3분 이상 명상하면 완료됩니다.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        {progress.dayStatuses.map((completed, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                completed
                  ? "border-accent-green bg-accent-green/25 text-accent-green"
                  : "border-white/25 bg-black/30 text-muted"
              }`}
            >
              {completed ? "🍃" : index + 1}
            </div>
            <span className="text-[10px] font-medium text-muted-soft">
              {index + 1}일
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
