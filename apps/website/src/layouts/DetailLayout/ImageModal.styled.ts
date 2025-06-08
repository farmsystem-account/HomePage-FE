import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 0px;
  object-fit: contain;
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 1000;
  max-width: 90vw;
  max-height: 90vh;
`;

export const ModalCloseArea = styled.div`
  position: fixed;
  inset: 0;
  cursor: zoom-out;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  background: #fff;
  border: none;
  color: #000;
  font-size: 28px;
  font-weight: bold;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

  &:hover {
    background: #eee;
  }
`;