import { useRef, useState } from "react";
import { useAttendMutation } from "../../../services/mutation/useAttendMutation";
import { useNavigate } from "react-router";
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
interface Position {
  x: number;
  y: number;
}

export default function Harvest() {
  const { isMobile, isTablet } = useMediaQueries();
  const { mutate: attend } = useAttendMutation();
  const navigate = useNavigate();

  // 각 버튼별 클리어 상태 및 애니메이션 실행 상태 관리
  const [clearStates, setClearStates] = useState<boolean[]>([false, false, false]);
  const [animateSprouts, setAnimateSprouts] = useState<boolean[]>([false, false, false]);
  // 각 버튼의 중앙 좌표 저장 (새싹 시작 위치)
  const [sproutStartPositions, setSproutStartPositions] = useState<Position[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // 버튼 각각에 대한 ref (총 3개)
  const buttonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 버튼 클릭 시 상태 토글, 버튼 위치 업데이트, 그리고 애니메이션 종료 후 이동
  const toggleClear = (index: number, link?: string) => {
    // 출석하기 버튼 클릭 시 출석 API 호출 (1일 1회 출석 및 씨앗 적립)
    if (index === 0) {
      attend();
    }

    // 버튼의 중앙 좌표를 구해서 저장 (ref가 존재하면)
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

    setClearStates((prev) => {
      const newState = [...prev];
      const newVal = !newState[index];
      newState[index] = newVal;

      if (newVal) {
        setAnimateSprouts((prevSprouts) => {
          const newSprouts = [...prevSprouts];
          newSprouts[index] = true;
          return newSprouts;
        });
        // 전체 애니메이션 시간: 1초(폭발) + 0.8초(모으기) = 1.8초
        setTimeout(() => {
          setAnimateSprouts((prevSprouts) => {
            const newSprouts = [...prevSprouts];
            newSprouts[index] = false;
            return newSprouts;
          });
          // 애니메이션 종료 후 지정된 링크로 이동
          if (link) {
            navigate(link);
          }
        }, 1800);
      }
      return newState;
    });
  };

  const anyCleared = clearStates.some((state) => state);

  const stages: StageProps[] = [
    { text: "출석체크", image: terminal, link: "/home", buttonText: "출석하기" },
    { text: "응원하기", image: thumb, link: "/cheer", buttonText: "응원하기" },
    { text: "파밍로그", image: edit, link: "/farminglog/view", buttonText: "파밍로그" },
  ];

  // 새싹 애니메이션 렌더링: 시작 위치는 sproutStartPositions[index]를 사용
  const renderGlobalSproutAnimation = (index: number) => {
    // 시작 위치 (클릭한 버튼의 중앙). 만약 아직 계산되지 않았다면 화면 중앙으로 기본 설정.
    const startPos =
      sproutStartPositions[index]?.x && sproutStartPositions[index]?.y
        ? sproutStartPositions[index]
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return (
      <S.GlobalSproutAnimation key={index}>
        {Array.from({ length: 11 }).map((_, i) => {
          // 버튼 주변에서 무작위 위치로 시작 (버튼 중앙 기준)
          const randomOffsetX = Math.random() * 40 - 20; // -20 ~ +20px
          const randomOffsetY = Math.random() * 40 - 20; // -20 ~ +20px

          // 폭발 애니메이션용 이동값
          const angle = Math.random() * 2 * Math.PI;
          const spreadDistance = Math.random() * 100 + 100; // 100 ~ 200px
          const tx = Math.cos(angle) * spreadDistance;
          const ty = Math.sin(angle) * spreadDistance;

          // 목표: 페이지 우측 상단 (대략 right:20px, top:10px)
          // sprout 크기가 30px라고 가정하면 targetLeft = window.innerWidth - 50, targetTop = 10.
          let dx = 0;
          let dy = 0;
          if (typeof window !== "undefined") {
            const targetLeft = window.innerWidth - 50;
            const targetTop = 10;
            // base position: 버튼 중앙 + 무작위 오프셋
            const baseX = startPos.x + randomOffsetX;
            const baseY = startPos.y + randomOffsetY;
            // 폭발 후 위치: base position에 (tx, ty)
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
          const isActive = clearStates[idx];
          return (
            <S.Stage key={idx} $isMobile={isMobile} $isTablet={isTablet}>
              {/* ref를 부여할 요소 */}
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
