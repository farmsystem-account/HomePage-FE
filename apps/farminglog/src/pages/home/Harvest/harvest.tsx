import { useRef, useState } from "react";
import { useAttendMutation } from "../../../services/mutation/useAttendMutation";
import { useNavigate } from "react-router";
import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import terminal from "@/assets/home/terminal.png";
import thumb from "@/assets/home/thumbs-up.png";
import edit from "@/assets/home/edit.png";
import * as S from "./harvest.styled";
import useButtonStore from "../../../stores/harvestStore"; // zustand persist store (경로는 실제 경로에 맞게 수정)

interface StageProps {
  text: string;
  image: string;
  link: string;
  buttonText: string;
}
interface Position {
  x: number;
  y: number;
}

export default function Harvest() {
  const { isMobile, isTablet } = useMediaQueries();
  const { mutate: attend } = useAttendMutation();
  const navigate = useNavigate();

  // persist로 저장된 버튼 활성 상태와 업데이트 함수 사용
  const activeStates = useButtonStore((state) => state.activeStates);
  const setActive = useButtonStore((state) => state.setActive);

  // 애니메이션 실행 상태 및 새싹 시작 위치 (로컬 상태)
  const [animateSprouts, setAnimateSprouts] = useState<boolean[]>([false, false, false]);
  const [sproutStartPositions, setSproutStartPositions] = useState<Position[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // 각 버튼에 대한 ref (총 3개)
  const buttonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 버튼 클릭 시 동작: 출석 API 호출, 버튼 중앙 좌표 계산, persist 상태 업데이트, 애니메이션 실행 후 링크 이동
  const toggleClear = (index: number, link?: string) => {
    // 이미 활성화된 버튼이면 클릭 무시
    if (activeStates[index]) return;

    // 출석하기 버튼 클릭 시 출석 API 호출
    if (index === 0) {
      attend();
    }

    // 버튼의 중앙 좌표 계산 후 새싹 시작 위치 업데이트
    const btnRef = buttonRefs[index].current;
    if (btnRef) {
      const rect = btnRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setSproutStartPositions((prev) => {
        const newPos = [...prev];
        newPos[index] = { x: centerX, y: centerY };
        return newPos;
      });
    }

    // persist 스토어를 통해 버튼 활성화 (한 번 true가 되면 이후 변경되지 않음)
    setActive(index);

    // 새싹 애니메이션 실행
    setAnimateSprouts((prev) => {
      const newSprouts = [...prev];
      newSprouts[index] = true;
      return newSprouts;
    });
    // 1.8초 후 애니메이션 종료 및 링크 이동
    setTimeout(() => {
      setAnimateSprouts((prev) => {
        const newSprouts = [...prev];
        newSprouts[index] = false;
        return newSprouts;
      });
      if (link) {
        navigate(link);
      }
    }, 1800);
  };

  const anyCleared = activeStates.some((state) => state);

  const stages: StageProps[] = [
    { text: "출석체크", image: terminal, link: "/home", buttonText: "출석하기" },
    { text: "응원하기", image: thumb, link: "/cheer", buttonText: "응원하기" },
    { text: "파밍로그", image: edit, link: "/farminglog/view", buttonText: "파밍로그" },
  ];

  // 각 버튼에 따른 글로벌 새싹 애니메이션 렌더링
  const renderGlobalSproutAnimation = (index: number) => {
    // 버튼 중앙 좌표가 계산되지 않았다면 화면 중앙을 기본값으로 사용
    const startPos =
      sproutStartPositions[index]?.x && sproutStartPositions[index]?.y
        ? sproutStartPositions[index]
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return (
      <S.GlobalSproutAnimation key={index}>
        {Array.from({ length: 11 }).map((_, i) => {
          // 버튼 주변 무작위 오프셋
          const randomOffsetX = Math.random() * 40 - 20; // -20 ~ +20px
          const randomOffsetY = Math.random() * 40 - 20; // -20 ~ +20px

          // 폭발 애니메이션 이동값 계산
          const angle = Math.random() * 2 * Math.PI;
          const spreadDistance = Math.random() * 100 + 100; // 100 ~ 200px
          const tx = Math.cos(angle) * spreadDistance;
          const ty = Math.sin(angle) * spreadDistance;

          // 목표: 페이지 우측 상단 (대략 right:20px, top:10px)
          let dx = 0;
          let dy = 0;
          if (typeof window !== "undefined") {
            const targetLeft = window.innerWidth - 50;
            const targetTop = 10;
            const baseX = startPos.x + randomOffsetX;
            const baseY = startPos.y + randomOffsetY;
            dx = targetLeft - (baseX + tx);
            dy = targetTop - (baseY + ty);
          }

          return (
            <span
              key={i}
              className="sprout"
              style={{
                top: `${startPos.y + randomOffsetY}px`,
                left: `${startPos.x + randomOffsetX}px`,
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
              } as React.CSSProperties}
            >
              🌱
            </span>
          );
        })}
      </S.GlobalSproutAnimation>
    );
  };

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
          const isActive = activeStates[idx];
          return (
            <S.Stage key={idx} $isMobile={isMobile} $isTablet={isTablet}>
              {/* 버튼 ref 부여 */}
              <S.ParallelogramBox
                ref={buttonRefs[idx]}
                $isMobile={isMobile}
                $isTablet={isTablet}
                $isActive={isActive}
                onClick={() => toggleClear(idx, stage.link)}
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

      {/* 각 버튼에 따른 글로벌 새싹 애니메이션 렌더링 */}
      {animateSprouts[0] && renderGlobalSproutAnimation(0)}
      {animateSprouts[1] && renderGlobalSproutAnimation(1)}
      {animateSprouts[2] && renderGlobalSproutAnimation(2)}
    </S.HarvestContainer>
  );
}
