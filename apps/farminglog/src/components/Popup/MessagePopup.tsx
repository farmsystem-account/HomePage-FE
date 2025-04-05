import React from 'react';
import * as S from './MessagePopup.styled';

interface MessagePopupProps {
  mainMessage?: React.ReactNode; 
  subMessage?: React.ReactNode;  
  confirmLabel?: string;
  onClose: () => void;
  isMobile?: boolean;
}


const MessagePopup: React.FC<MessagePopupProps> = ({
  mainMessage = '...',
  subMessage = '...',
  confirmLabel = '확인',
  onClose,
  isMobile = false,
}) => {
  return (
    <S.PopupOverlay onClick={onClose}>
      <S.PopupContainer $isMobile={isMobile}>
        <S.MainMessage $isMobile={isMobile}>{mainMessage}</S.MainMessage>
        <S.SubMessage $isMobile={isMobile}>
          {subMessage}
        </S.SubMessage>
        <S.Divider $isMobile={isMobile} />
        <S.ConfirmButton $isMobile={isMobile} onClick={onClose}>
          {confirmLabel}
        </S.ConfirmButton>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};


export default MessagePopup;