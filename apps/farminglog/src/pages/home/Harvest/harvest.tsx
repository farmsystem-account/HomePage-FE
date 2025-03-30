// Harvest.tsx
import { useState } from "react";
import { useAttendMutation } from "../../../services/mutation/useAttendMutation";
import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import terminal from "@/assets/home/terminal.png";
import thumb from "@/assets/home/thumbs-up.png";
import edit from "@/assets/home/edit.png";
import * as S from "./harvest.styled";

interface StageProps {
  text: string;
  image: string;
  link: string;
  buttonText: string;
}

export default function Harvest() {
  const { isMobile, isTablet } = useMediaQueries();

  // 출석 API 훅
  const { mutate: attend } = useAttendMutation();

  // 각 버튼별 클리어 상태 및 애니메이션 실행 상태 관리
  const [clearStates, setClearStates] = useState<boolean[]>([false, false, false]);
  const [animateSprouts, setAnimateSprouts] = useState<boolean[]>([false, false, false]);

  // 버튼 클릭 시 상태 토글 + 출석 API 호출
  const toggleClear = (index: number) => {
    // index가 0번이면 출석 버튼 → 출석 API 호출
    if (index === 0) {
      attend(); // 출석하기 API 호출
    }

    setClearStates((prev) => {
      const newState = [...prev];
      const newVal = !newState[index];
      newState[index] = newVal;

      // 새로 true가 된 버튼에만 애니메이션 트리거
      if (newVal) {
        setAnimateSprouts((prevSprouts) => {
          const newSprouts = [...prevSprouts];
          newSprouts[index] = true;
          return newSprouts;
        });
        setTimeout(() => {
          setAnimateSprouts((prevSprouts) => {
            const newSprouts = [...prevSprouts];
            newSprouts[index] = false;
            return newSprouts;
          });
        }, 1000);
      }
      return newState;
    });
  };

  // 전체 중 하나라도 클리어되었는지 여부
  const anyCleared = clearStates.some((state) => state);

  // 버튼 목록
  const stages: StageProps[] = [
    { text: "출석체크", image: terminal, link: "/", buttonText: "출석하기" },
    { text: "응원하기", image: thumb, link: "/", buttonText: "응원하기" },
    { text: "로그 작성", image: edit, link: "/", buttonText: "로그 작성" },
  ];

  // 공통 글로벌 애니메이션 렌더링
  const renderGlobalSproutAnimation = (index: number) => (
    <S.GlobalSproutAnimation key={index}>
      {Array.from({ length: 11 }).map((_, i) => {
        // 중앙 영역 400px x 300px 내에서 무작위 시작 위치
        const randomStartX = Math.random() * 400 - 100;
        const randomStartY = Math.random() * 300 - 100;
        const angle = Math.random() * 2 * Math.PI;
        const spreadDistance = Math.random() * 100 + 100; // 100~200px
        const tx = Math.cos(angle) * spreadDistance;
        const ty = Math.sin(angle) * spreadDistance;
        return (
          <span
            key={i}
            className="sprout"
            style={{
              top: `calc(50% + ${randomStartY}px)`,
              left: `calc(50% + ${randomStartX}px)`,
              // 퍼져나갈 이동값을 CSS 변수로 지정
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
            } as React.CSSProperties}
          >
            🌱
          </span>
        );
      })}
    </S.GlobalSproutAnimation>
  );

  return (
    <S.HarvestContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.MainText $isMobile={isMobile} $isTablet={isTablet}>
        씨앗 모으기
      </S.MainText>
      <S.SubText $isMobile={isMobile} $isTablet={isTablet}>
        매일 버튼을 눌러 출석 체크를 하거나,
        <br />
        다양한 활동에 참여하여 씨앗을 모아보세요!
      </S.SubText>

      <S.ButtonContainer $isMobile={isMobile} $isTablet={isTablet} $anyCleared={anyCleared}>
        {stages.map((stage, idx) => {
          const isActive = clearStates[idx];
          return (
            <S.Stage key={idx} $isMobile={isMobile} $isTablet={isTablet}>
              <S.ParallelogramBox
                $isMobile={isMobile}
                $isTablet={isTablet}
                $isActive={isActive}
                onClick={() => toggleClear(idx)}
              >
                <div className="content">
                  <S.IconImg
                    src={stage.image}
                    alt={stage.text}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                    $isActive={isActive}
                  />
                </div>
              </S.ParallelogramBox>
              <S.ButtonLabel $isMobile={isMobile} $isTablet={isTablet}>
                {stage.buttonText}
              </S.ButtonLabel>
            </S.Stage>
          );
        })}
      </S.ButtonContainer>

      {/* 각 버튼에 따른 글로벌 애니메이션 렌더링 */}
      {animateSprouts[0] && renderGlobalSproutAnimation(0)}
      {animateSprouts[1] && renderGlobalSproutAnimation(1)}
      {animateSprouts[2] && renderGlobalSproutAnimation(2)}
    </S.HarvestContainer>
  );
}
