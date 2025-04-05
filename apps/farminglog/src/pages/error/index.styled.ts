import styled, { keyframes } from "styled-components";

export const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  background: linear-gradient(90deg, #5CD282, #29D4A7);
  /* position: absolute;
  top: 10px; */
`;

export const ApplyTitle = styled.p<{ $isApp: boolean, $isMobile: boolean }>`
  position: absolute; /* 상단 고정 */
  top: 80px;
  text-align: center;
  color: var(--FarmSystem_Green01);
  font-size: ${(props) => (props.$isMobile ? "25px" : "25px")};
  font-weight: 700;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const FarmLogo = styled.img`
  width: 60px;  
  margin-bottom: 30px;
  animation: ${rotate} 2s linear infinite;
`;

export const HelloText = styled.p<{ $isMobile: boolean }>`
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #FFF763;
  font-size: ${(props) => (props.$isMobile ? "23px" : "23px")};
  font-weight: 600;
  margin-top: 5px;
`;

export const QuestionText = styled.p<{ $isMobile: boolean }>`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: ${(props) => (props.$isMobile ? "23px" : "23px")};
  font-weight: 600;
  margin-top: 10px;
  /* background-color: orange; */
`;

export const ButtonContainer = styled.div<{ $isMobile: boolean }>`
  /* width: 100%;
  max-width: 355px; */
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  padding-inline: 30px;
`;


export const Button = styled.div<{ $isMobile: boolean; bgColor?: string; textColor?: string }>`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "14px")};
  font-weight: 600;
  background-color: ${({ bgColor }) => bgColor || "var(--FarmSystem_Green01)"}; 
  color: ${({ textColor }) => textColor || "#FFFFFF"};
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ bgColor }) => bgColor ? `${bgColor}CC` : "var(--FarmSystem_Green02)"}; 
    transform: scale(1.05);
  }
`;

export const BottomText = styled.p<{ $isMobile: boolean }>`
  text-align: center;
  color: white;
  font-size: ${(props) => (props.$isMobile ? "14px" : "18px")};
  font-weight: 400;
`;

export const Arrow = styled.img`
  width: 20px;  
  height: 20px;
`;

export const BottomTextContainer = styled.div<{ $isMobile: boolean }>`
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  margin-top: 50px;
  /* background-color: orange; */

  &:hover {
    transform: scale(1.05);
  }
  
`;