import React from 'react';
import styled from 'styled-components';
import useSlideButton from '../useSlideButton';
import useTip from '../useTip';

import type { Disabled } from '../types';

export type Size = { width: number };
const Container = styled.div<Size & { vertical?: boolean } & Disabled>`
    width: ${(props) => props.width + 4}px;
    height: ${(props) => props.width + 4}px;
    background-color: transparent;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    position: absolute;
    user-select: none;
    transform: ${(props) => (props.vertical ? 'translate(-2px, 50%)' : 'translate(-50%, -2px)')};
`;

const Button = styled.div<Disabled>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #aaa;
    box-sizing: border-box;
    transition: transform 0.2s ease-in-out;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')}

    &:hover {
        transform: scale(1.2);
    }
`;

const Tip = styled.div<{ ftColor: string; bgColor: string }>`
    left: 50%;
    font-size: 14px;
    padding: 2px 5px;
    border-radius: 3px;
    position: absolute;
    transition: all 0.2s ease-in-out;
    transform: translate(-50%, -180%);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    color: ${({ ftColor }) => ftColor};
    background-color: ${({ bgColor }) => bgColor};
`;

export interface SlideButtonOptions {
    name: 'firstButton' | 'secondButton';
    children?: (props: Disabled & { isDown: boolean }) => React.ReactNode;
}

export default function SlideButton({ children, name }: SlideButtonOptions) {
    const {
        buttonRef,
        disabled,
        handleMouseDown,
        style,
        isDown,
        position,
        showTip,
        width,
        height,
        vertical,
        tipFormat,
        tipBgColor,
        tipFtColor,
        ariaValuetextFormat,
    } = useSlideButton({ name });
    const { style: tipStyle, hide, show } = useTip({ mustShow: isDown });

    const costumeButton = React.useMemo(
        () => children?.({ disabled, isDown }),
        [children, disabled, isDown]
    );

    return (
        <Container
            ref={buttonRef}
            style={style}
            disabled={disabled}
            width={vertical ? width : height}
            vertical={vertical}
            onMouseEnter={show}
            onMouseLeave={hide}
            onMouseDown={handleMouseDown}
            tabIndex={0}
            role='slider'
            aria-label='slider between 0 and 100'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={position}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            aria-disabled={disabled ? 'true' : 'false'}
            aria-valuetext={ariaValuetextFormat(position)}
        >
            {costumeButton || <Button disabled={disabled} />}
            {showTip && (
                <Tip style={tipStyle} ftColor={tipFtColor} bgColor={tipBgColor}>
                    {tipFormat(position)}
                </Tip>
            )}
        </Container>
    );
}
