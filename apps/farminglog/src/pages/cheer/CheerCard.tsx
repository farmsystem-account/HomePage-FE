import * as S from './CheerCard.styled';
import useMediaQueries from '@/hooks/useMediaQueries';


export interface CheerData {
  id: number;
  r_profile: string;
  receiver: string;
  category: string;
  content: string;
  s_profile: string;
  sender: string;
  bgColor: string;
  fontColor: string;
}

interface CheerCardProps {
  cheer: CheerData;
}

const CheerCard: React.FC<CheerCardProps> = ({ cheer }) => {
  const { isMobile } = useMediaQueries();

  return (
    <S.CheerCard bgColor={cheer.bgColor} $isMobile={isMobile}>
      {/* 상단 (수신자 정보) */}
      <S.CheerHeader $isMobile={isMobile}>
        <S.CheerAvatar src={cheer.r_profile} alt="profile" $isMobile={isMobile} />
        <S.CheerReceiverText $isMobile={isMobile}>
          <a>{cheer.receiver}</a> 님에게&nbsp;
          <a>
            <S.CheerColorText categoryColor={cheer.fontColor} $isMobile={isMobile}>
              {cheer.category}
            </S.CheerColorText>
          </a>
        </S.CheerReceiverText>
      </S.CheerHeader>

      {/* 중단 (본문 내용) */}
      <S.CheerContent $isMobile={isMobile}>
        {cheer.content}
      </S.CheerContent>

      {/* 하단 (발신자 정보) */}
      <S.CheerFooter $isMobile={isMobile}>
        <S.CheerAvatar src={cheer.s_profile} alt="profile" $isMobile={isMobile} />
        <a>{cheer.sender}</a>&nbsp;님
      </S.CheerFooter>
    </S.CheerCard>
  );
};

export default CheerCard;
