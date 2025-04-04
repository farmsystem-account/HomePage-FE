import React from 'react';
import * as S from './MessagePopup.styled';

interface MessagePopupProps {
  mainMessage?: string;
  subMessage?: string;
  confirmLabel?: string;
  onClose: () => void;
  isMobile?: boolean;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  mainMessage = '파밍로그 작성이 완료되었어요.',
  subMessage = '씨앗 5개 획득!',
  confirmLabel = '확인',
  onClose,
  isMobile = false,
}) => {
  return (
    <S.PopupContainer $isMobile={isMobile}>
      <S.MainMessage $isMobile={isMobile}>{mainMessage}</S.MainMessage>
      <S.SubMessage $isMobile={isMobile}>
        <span className="highlight">{subMessage.split(' ')[0]}</span>
        <span> {subMessage.split(' ').slice(1).join(' ')}</span>
      </S.SubMessage>
      <S.Divider $isMobile={isMobile} />
      <S.ConfirmButton $isMobile={isMobile} onClick={onClose}>
        {confirmLabel}
      </S.ConfirmButton>
    </S.PopupContainer>
  );
};

export default MessagePopup;