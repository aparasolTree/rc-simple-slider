import React from 'react';
import styled from 'styled-components';
import { useSliderContext } from '../context';

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
`;

export interface ProgressBarProps {
    progressBarColor: string;
}

export default function ProgressBar({ progressBarColor }: ProgressBarProps) {
    const { ProgressBarStyle } = useSliderContext();
    return (
        <Container style={{ ...ProgressBarStyle, backgroundColor: progressBarColor }}></Container>
    );
}
