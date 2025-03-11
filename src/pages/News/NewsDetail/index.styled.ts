import styled from "styled-components";

export const Container = styled.div`
  padding: 100px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
`;

export const NewsPageTitle = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--FarmSystem_Green01, #28723F);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 100% */

  padding: 10px 20px;
  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  margin-bottom: 70px;
`;

export const NewsDetailCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  padding: 50px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border-radius: 20px;
  background: var(--FarmSystem_White, #FCFCFC);
  box-shadow: 0px 0px 20px 5px var(--FarmSystem_LightGrey, #E5E5E5);
`;

export const GoBackContainer = styled.div`
  display: flex;
  align-items: left;
  align-self: stretch;
`;

export const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  cursor: pointer;

  color: var(--FarmSystem_Green01, #28723F);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const GoBackImg = styled.img`
  width: 30px;
  height: 40px;
`;