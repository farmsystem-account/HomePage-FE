import styled from 'styled-components';

export const NewsItem = styled.div`
  display: flex;
  padding: 20px 30px;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;

  border-radius: 10px;
  background: #F1F1F1;
`;

export const Thumbnail = styled.img`
  width: 311px;
  height: 200px;
  flex-shrink: 0;
  aspect-ratio: 311/200;
`;

export const NewsContent = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const Title = styled.h2`
  width: 100%;
  height: auto;
  align-self: stretch;
  text-align: start;

  color: var(--FarmSystem_Black, #191919);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
  letter-spacing: -0.24px;
`;

export const Content = styled.p`
  width: 100%;
  height: 65px;
  flex-shrink: 0;
  align-self: stretch;
  text-align: start;

  color: var(--FarmSystem_Black, #191919);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: -0.24px;
`;

export const TagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const Tag = styled.div`
  display: flex;
  height: 30px;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 15px;
  background: var(--FarmSystem_Green06, #006811);

  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: -0.24px;
`;