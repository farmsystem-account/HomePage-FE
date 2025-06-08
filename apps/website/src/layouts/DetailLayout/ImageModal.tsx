import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as S from './ImageModal.styled';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
     if (e.key === 'Tab') {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose} ref={modalRef}>
      <S.ModalCloseArea />
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close modal">
          &times;
        </S.CloseButton>
        <S.ModalImage src={imageUrl} alt="Modal image" />
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  );
}
