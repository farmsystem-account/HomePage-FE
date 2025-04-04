import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import terminal from "@/assets/home/terminal.png";
import thumb from "@/assets/home/thumbs-up.png";
import edit from "@/assets/home/edit.png";
import * as S from "./harvest.styled";
import useButtonStore from "../../../stores/harvestStore"; // zustand persist store
import { useAttendMutation } from "../../../services/mutation/useAttendMutation";
import { useTodaySeedQuery } from "../../../services/query/useTodaySeedQuery";
import Popup from "@/components/Popup/popup"; 
import Info from "@/assets/Icons/info.png"; // 정보 아이콘

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

  // 오늘의 씨앗 완료 여부 쿼리
  const { data: todaySeed } = useTodaySeedQuery();

  // zustand 스토어: 버튼 활성 상태 (활성 상태면 더 이상 클릭 안됨)
  const activeStates = useButtonStore((state) => state.activeStates);
  const setActive = useButtonStore((state) => state.setActive);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [showAnimationAfterModal, setShowAnimationAfterModal] = useState<number | null>(null);


  // 렌더링 시 todaySeed 쿼리 결과로 zustand active 상태 업데이트
  useEffect(() => {
    if (todaySeed) {
      if (todaySeed.isAttendance && !activeStates[0]) {
        setActive(0);
      }
      if (todaySeed.isCheer && !activeStates[1]) {
        setActive(1);
      }
      if (todaySeed.isFarminglog && !activeStates[2]) {
          setActive(2);
      }
    }
  }, [todaySeed]);


  // 각 버튼에 대한 ref
  const buttonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 애니메이션 실행 상태와 시작 위치 (각 버튼마다)
  const [animateSprouts, setAnimateSprouts] = useState<boolean[]>([false, false, false]);
  const [sproutStartPositions, setSproutStartPositions] = useState<Position[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // 공통: 버튼 중심 좌표 계산 후 sproutStartPositions 업데이트
  const setSproutStartPosition = (index: number) => {
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
  };

  // 공통: 애니메이션 실행 함수 (callback으로 후처리)
  const runAnimation = (index: number, callback: () => void) => {
    setAnimateSprouts((prev) => {
      const newSprouts = [...prev];
      newSprouts[index] = true;
      return newSprouts;
    });
    setTimeout(() => {
      setAnimateSprouts((prev) => {
        const newSprouts = [...prev];
        newSprouts[index] = false;
        return newSprouts;
      });
      callback();
    }, 1800);
  };

  // 버튼 클릭 처리
  const handleButtonClick = async (index: number, link?: string) => {
    // 이미 버튼이 활성화되어 있으면 클릭 무시
    if (activeStates[index]) return;

    // todaySeed가 로드되었을 경우 해당 버튼의 완료 여부 확인
    const isCompleted = todaySeed
      ? index === 0
        ? todaySeed.isAttendance
        : index === 1
        ? todaySeed.isCheer
        : todaySeed.isFarminglog
      : false;
    if (isCompleted) return;


    if (index === 0) {
      try {
        await attend(); // 출석 API 호출
      } catch (error) {
        console.error("출석 API 호출 에러:", error);
        return;
      }
    
      setActive(index); // zustand 업데이트
      setSproutStartPosition(index); // 애니메이션 좌표 미리 설정
      setShowAnimationAfterModal(index); // 모달 확인 후 실행할 인덱스 저장
      setModalOpen(true); // 모달 오픈

    }
    else {
      // [응원하기] 및 [파밍로그]: 첫 클릭 시 바로 페이지 이동
      navigate(link!);
    }
  };

  const stages: StageProps[] = [
    { text: "출석체크", image: terminal, link: "/home", buttonText: "출석하기" },
    { text: "응원하기", image: thumb, link: "/cheer/write", buttonText: "응원하기" },
    { text: "파밍로그", image: edit, link: "/farminglog/create", buttonText: "파밍로그" },
  ];

  // 글로벌 새싹 애니메이션 렌더링 함수
  const renderGlobalSproutAnimation = (index: number) => {
    const startPos =
      sproutStartPositions[index]?.x && sproutStartPositions[index]?.y
        ? sproutStartPositions[index]
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return (
      <S.GlobalSproutAnimation key={index}>
        {Array.from({ length: 11 }).map((_, i) => {
          const randomOffsetX = Math.random() * 40 - 20;
          const randomOffsetY = Math.random() * 40 - 20;
          const angle = Math.random() * 2 * Math.PI;
          const spreadDistance = Math.random() * 100 + 100;
          const tx = Math.cos(angle) * spreadDistance;
          const ty = Math.sin(angle) * spreadDistance;
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

  //모달 창 메세지 닫는 함수
  const handleModalClose = () => {
    setModalOpen(false);
    if (showAnimationAfterModal !== null) {
      runAnimation(showAnimationAfterModal, () => {
        navigate("/home");
        setShowAnimationAfterModal(null);
      });
    }
  };

  const anyCleared = activeStates.some((state) => state);
  useEffect(() => {
    return () => {
      // 컴포넌트가 unmount될 때 상태 초기화
      useButtonStore.getState().reset();
    };
  }, []);

  return (
    <>
    <S.HarvestContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.TextContainer>
          <S.MainText $isMobile={isMobile} $isTablet={isTablet}>
            씨앗 모으기
          </S.MainText>
          <S.BackArrow
          src={Info}
          alt="정보"
          onClick={() => {
            setInfoOpen(true);
          }}
          $isMobile={isMobile}
        />
        <S.InfoButton $isMobile={isMobile} $isTablet={isTablet}></S.InfoButton>
      </S.TextContainer>

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
              <S.ParallelogramBox
                ref={buttonRefs[idx]}
                $isMobile={isMobile}
                $isTablet={isTablet}
                $isActive={isActive}
                onClick={() => handleButtonClick(idx, stage.link)}
              >
                <div className="content">
                  <S.IconImg
                    src={stage.image}
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

      {/* 애니메이션 렌더링 */}
      {animateSprouts[0] && renderGlobalSproutAnimation(0)}
      {animateSprouts[1] && renderGlobalSproutAnimation(1)}
      {animateSprouts[2] && renderGlobalSproutAnimation(2)}
    </S.HarvestContainer>
    <Popup
      isOpen={isModalOpen}
      onClose={handleModalClose}
      variant="MESSAGE"
      mainMessage="오늘도 파밍로그 출석 완료!"
      subMessage="씨앗 2개"
      confirmLabel="확인"
    />
    <Popup
      isOpen={isInfoOpen}
      onClose={()=>setInfoOpen(false)}
      variant="MESSAGE"
      mainMessage="오늘도 파밍로그 출석 완료!"
      subMessage="씨앗 2개 획득!"
      confirmLabel="확인"
    />
    </>
  );
}
