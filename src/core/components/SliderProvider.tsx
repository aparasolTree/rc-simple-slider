import React from 'react';
import styled from 'styled-components';

import useSlide from '../useSlide';
import { SliderContext } from '../context';

import type { Size, Range } from '../types';
import { abs, getOffset } from '../../utils';

export interface SliderProviderProps {
    step: number;
    range: Range;
    width: number;
    height: number;
    showTip: boolean;
    vertical: boolean;
    disabled: boolean;
    tipBgColor: string;
    tipFtColor: string;
    contentContainerStyle: React.CSSProperties;
    onInput: (value: Range) => void;
    onChange: (value: Range) => void;
    tipFormat: (value: number) => string;
    ariaValuetextFormat: (value: number) => string;
}

const Container = styled.div<Size & { vertical: boolean }>`
    width: ${(props) => (props.vertical ? props.width + 'px' : '100%')};
    height: ${(props) => props.height}px;
    border-radius: ${(props) =>
        props.vertical ? props.width / 2 + 'px' : props.height / 2 + 'px'};
    background-color: #ccc;
    position: relative;
`;

export default function SliderProvider({
    children,
    range,
    vertical,
    onChange,
    onInput,
    width,
    height,
    contentContainerStyle,
    step,
    disabled,
    ...rest
}: React.PropsWithChildren<SliderProviderProps>) {
    const ref = React.useRef<HTMLDivElement>(null);
    const { firstButton, secondButton, setPosition, ProgressBarStyle } = useSlide({
        range,
        vertical,
        onChange,
        onInput,
    });

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
        if (!ref.current) return;
        const stepWidth = 100 / step;
        const { offsetX, offsetY } = getOffset(event, ref.current!, stepWidth);
        const offset = vertical ? 100 - offsetY : offsetX;

        setPosition(
            offset,
            Array.isArray(range)
                ? abs(offset - firstButton) > abs(offset - secondButton)
                    ? 'secondButton'
                    : 'firstButton'
                : 'firstButton'
        );
    };

    return (
        <SliderContext.Provider
            value={{
                ...rest,
                ref,
                step,
                width,
                range,
                height,
                disabled,
                vertical,
                onChange,
                firstButton,
                setPosition,
                secondButton,
                ProgressBarStyle,
            }}
        >
            <Container
                style={contentContainerStyle}
                ref={ref}
                height={height}
                width={width}
                vertical={vertical}
                onMouseDown={(event) => disabled || handleMouseDown(event.nativeEvent)}
                onTouchStart={(event) => disabled || handleMouseDown(event.nativeEvent)}
            >
                {children}
            </Container>
        </SliderContext.Provider>
    );
}
