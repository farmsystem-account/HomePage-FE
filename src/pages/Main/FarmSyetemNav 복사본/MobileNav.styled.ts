import styled from 'styled-components';

export const MobileNavbar = styled.div<{ isNavOpen: boolean }>`
  max-height: ${({ isNavOpen }) => (isNavOpen ? "300px" : "80px")};
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;

  display: inline-flex;

  height: auto;
  padding: 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 150px;

  border-radius: 20px 0px 20px 20px;
background: rgba(40, 114, 63, 0.7); 
`;

export const MobileNavItem = styled.a`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 3px;
  flex: 1 0 0;
  margin-bottom: 8px;
`;

export const MobileNavText = styled.p`
  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

export const ExpandButton = styled.button`
  color: var(--FarmSystem_White, #FCFCFC);
  font-size: 24px;
  cursor: pointer;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px; 

  display: flex;
  justify-content: center;
  align-items: center;
`;
