import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import terminal from "@/assets/home/terminal.png";
import thumb from "@/assets/home/thumbs-up.png";
import edit from "@/assets/home/edit.png";
import * as S from "./harvest.styled";
import { useAttendMutation } from "../../../services/mutation/useAttendMutation";
import { useTodaySeedQuery } from "../../../services/query/useTodaySeedQuery";
import Popup from "@/components/Popup/popup";
import Info from "@/assets/Icons/info.png";
import Cookies from "js-cookie";

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
const { data: todaySeed, refetch } = useTodaySeedQuery();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isAlready, setIsAlready] = useState(false);
  const [showAnimationAfterModal, setShowAnimationAfterModal] = useState<number | null>(null);
  const [isLimitedPopup, setIsLimitedPopup] = useState(false);

  const buttonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [animateSprouts, setAnimateSprouts] = useState<boolean[]>([false, false, false]);
  const [sproutStartPositions, setSproutStartPositions] = useState<Position[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

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

  const handleButtonClick = async (index: number, link?: string) => {
    const isLimited = Cookies.get("limitWrite") === "true";
    if (isLimited) {
      setIsLimitedPopup(true);
      return;
    }
    const isCompleted = todaySeed
      ? index === 0
        ? todaySeed.isAttendance
        : index === 1
        ? todaySeed.isCheer
        : todaySeed.isFarminglog
      : false;

    if (isCompleted) {
      if (index === 0) {
        setIsAlready(true);
      }
      return;
    }

    if (index === 0) {
      try {
        await attend();
      } catch (error) {
        console.error("출석 API 호출 에러:", error);
        return;
      }
      setSproutStartPosition(index);
      setShowAnimationAfterModal(index);
      setModalOpen(true);
    } else {
      navigate(link!);
    }
  };

  const stages: StageProps[] = [
    { text: "출석체크", image: terminal, link: "/home", buttonText: "출석하기" },
    { text: "응원하기", image: thumb, link: "/cheer/write", buttonText: "응원하기" },
    { text: "파밍로그", image: edit, link: "/farminglog/create", buttonText: "파밍로그" },
  ];

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

  const handleModalClose = () => {
    setModalOpen(false);
    if (showAnimationAfterModal !== null) {
      runAnimation(showAnimationAfterModal, () => {
        refetch(); 
        navigate("/home");
        setShowAnimationAfterModal(null);
      });
    }
  };

  const anyCleared = !!(todaySeed?.isAttendance || todaySeed?.isCheer || todaySeed?.isFarminglog);

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
            onClick={() => setInfoOpen(true)}
            $isMobile={isMobile}
          />
          <S.InfoButton $isMobile={isMobile} $isTablet={isTablet} />
        </S.TextContainer>

        <S.SubText $isMobile={isMobile} $isTablet={isTablet}>
          매일 버튼을 눌러 출석 체크를 하거나,
          <br />
          다양한 활동에 참여하여 씨앗을 모아보세요!
        </S.SubText>

        <S.ButtonContainer
          $isMobile={isMobile}
          $isTablet={isTablet}
          $anyCleared={anyCleared}
        >
          {stages.map((stage, idx) => {
            const isActive =
              idx === 0 ? !!todaySeed?.isAttendance :
              idx === 1 ? !!todaySeed?.isCheer :
              !!todaySeed?.isFarminglog;

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

        {animateSprouts[0] && renderGlobalSproutAnimation(0)}
        {animateSprouts[1] && renderGlobalSproutAnimation(1)}
        {animateSprouts[2] && renderGlobalSproutAnimation(2)}
      </S.HarvestContainer>

      <Popup
        isOpen={isModalOpen}
        onClose={handleModalClose}
        variant="MESSAGE"
        mainMessage="오늘도 파밍로그 출석 완료!"
        subMessage="씨앗 1개 획득!"
        confirmLabel="확인"
      />
      <Popup
        isOpen={isInfoOpen}
        onClose={() => setInfoOpen(false)}
        variant="INFO"
      />
      <Popup
        isOpen={isAlready}
        onClose={() => setIsAlready(false)}
        variant="MESSAGE"
        mainMessage="출석을 완료 했어요!"
        subMessage="내일 다시 와주세요!"
        confirmLabel="확인"
      />
      <Popup
        isOpen={isLimitedPopup}
        onClose={() => setIsLimitedPopup(false)}
        variant="MESSAGE"
        mainMessage="제한 계정은 이용할 수 없습니다."
        subMessage="관리자에게 문의해주세요."
        confirmLabel="확인"
      />
    </>
  );
}
