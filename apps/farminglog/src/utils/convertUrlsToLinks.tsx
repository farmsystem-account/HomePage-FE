/**
 * 문자열 내 링크(예: http://, https://, www. 등)를 찾아서
 * React 요소(<a> 태그)로 감싼 뒤 반환하는 유틸 함수 예시
 */

import styled from 'styled-components';

export function convertUrlsToLinks(text: string) {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const words = text.split(' ');

  const elements = words.map((word, index) => {
    if (urlRegex.test(word)) {
      // const href = word.startsWith('http') ? word : `http://${word}`;
      return (
        <StyledLink
          key={`link-${index}`}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
        >
          {word}
        </StyledLink>
      );
    }

    return <span key={`text-${index}`}>{word}</span>;
  });
  
  const withSpaces: React.ReactNode[] = [];
  elements.forEach((el, i) => {
    if (i > 0) {
      withSpaces.push(' ');
    }
    withSpaces.push(el);
  });
  
  return <>{withSpaces}</>;
}

const StyledLink = styled.a`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;