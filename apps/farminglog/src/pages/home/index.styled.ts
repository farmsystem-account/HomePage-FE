import styled from "styled-components";

export const MainContainer = styled.div<{$isApp: boolean, $isMobile: boolean }>`
    display: flex;
    padding-top: 50px;
    padding-bottom: 100px;
    min-height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: flex;
    align-items: flex-start;
    gap: 72px;
    `;
