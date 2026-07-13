"use client";

import { FilterChip } from "@/components/common/FilterChip";
import { DURATION_OPTIONS } from "@/data/meditations";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { useMeditationStore } from "@/store/meditationStore";

export default function SettingsPage() {
  const preferences = useMeditationStore((state) => state.preferences);
  const updatePreferences = useMeditationStore(
    (state) => state.updatePreferences,
  );
  const resetHistory = useMeditationStore((state) => state.resetHistory);
  const setSelectedDuration = useMeditationStore(
    (state) => state.setSelectedDuration,
  );

  const handleReset = () => {
    if (
      window.confirm("모든 명상 기록을 삭제할까요? 이 작업은 되돌릴 수 없습니다.")
    ) {
      resetHistory();
    }
  };

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">설정</h1>
        <p className="mt-2 text-base text-muted">
          나에게 맞는 명상 환경을 설정하세요.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-bold text-white">기본 명상 시간</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((duration) => (
            <FilterChip
              key={duration}
              active={preferences.defaultDuration === duration}
              label={`${duration}분`}
              onClick={() => {
                updatePreferences({ defaultDuration: duration });
                setSelectedDuration(duration);
              }}
            />
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">배경 움직임</h2>
            <p className="mt-1 text-sm text-muted">
              홈과 명상 화면의 배경 이미지 줌 효과
            </p>
          </div>
          <FilterChip
            active={preferences.backgroundMotion}
            label={preferences.backgroundMotion ? "켜짐" : "꺼짐"}
            onClick={() =>
              updatePreferences({
                backgroundMotion: !preferences.backgroundMotion,
              })
            }
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-white">데이터 저장 안내</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          명상 기록은 현재 사용 중인 브라우저에만 저장됩니다. 브라우저 데이터를
          삭제하면 기록이 사라질 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-white">유튜브 콘텐츠 안내</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          명상 가이드와 음악은 운영자가 선정한 유튜브 콘텐츠입니다. 재생 중
          광고나 추천 영상이 표시될 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-white">크레딧</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          배경 이미지: Lorenzo Manera, Ingmar, Jess Loiterton, Johannes Plenio,
          Luke Miller (Pexels / Unsplash)
        </p>
      </Card>

      <Button variant="secondary" onClick={handleReset}>
        전체 기록 초기화
      </Button>
    </PageTransition>
  );
}
