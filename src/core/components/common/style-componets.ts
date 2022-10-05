import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Item = styled.div<{ vertical: boolean; width: number; height: number }>`
    position: absolute;
    width: ${({ vertical, width, height }) => (vertical ? width : height)}px;
    height: ${({ vertical, width, height }) => (vertical ? width : height)}px;
    background-color: #fff;
    border-radius: 50%;
    transform: ${({ vertical }) => (vertical ? 'translateY(50%)' : 'translateX(-50%)')};
`;
