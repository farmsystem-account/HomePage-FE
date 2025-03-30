// src/components/FarmingLogEditorHeader.tsx
import PinIcon from '@/assets/Icons/x.png';
import * as S from './sign.styles';

interface Props {
  isApp: boolean;
  isMobile: boolean;
  texts: string[]; // 텍스트 줄 배열로 전달
}

export default function FarmingLogEditorHeader({ isApp, isMobile, texts }: Props) {
  return (
    <S.FarmingLogEditorContainerHeader $isApp={isApp} $isMobile={isMobile}>
      <S.HeaderPinContainer $isApp={isApp}>
        <S.HeaderPin $isApp={isApp} $isMobile={isMobile} >
          <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
        </S.HeaderPin>
        <S.HeaderPin $isApp={isApp}>
          <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
        </S.HeaderPin>
      </S.HeaderPinContainer>
      <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
        {texts.map((line, index) => (
          <p key={index}>
            {index === 0 ? (
              <>
                <S.HeaderContextBold>{line.slice(0, 4)}</S.HeaderContextBold>
                {line.slice(4)}
              </>
            ) : (
              line
            )}
          </p>
        ))}
      </S.HeaderContext>
    </S.FarmingLogEditorContainerHeader>
  );
}
