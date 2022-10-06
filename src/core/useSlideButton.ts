import React from 'react';
import useLatest from '../hooks/useLatest';
import { clamp, getOffset, isArray, max, min, round } from '../utils';
import { useSliderContext } from './context';

export interface UseSlideButton {
    name: 'firstButton' | 'secondButton';
}

export default function useSlideButton({ name }: UseSlideButton) {
    const [isDown, setIsDown] = React.useState(false);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const canMove = React.useRef(false);
    const isFocus = React.useRef(false);

    const {
        step,
        setPosition,
        ref,
        showTip,
        firstButton,
        secondButton,
        range,
        onChange,
        width,
        height,
        vertical,
        tipFormat,
        tipBgColor,
        tipFtColor,
        disabled,
        ariaValuetextFormat,
    } = useSliderContext();

    const position = useLatest({ firstButton, secondButton });
    const onChangeRef = useLatest(onChange);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (disabled) return;
        event.preventDefault();
        canMove.current = true;
        setIsDown(true);
    };

    React.useEffect(() => {
        const stepWidth = 100 / step;

        const handleMove = (event: MouseEvent | TouchEvent) => {
            event.stopPropagation();
            event.preventDefault();
            if (canMove.current && ref.current) {
                const { offsetX, offsetY } = getOffset(event, ref.current, stepWidth);
                setPosition(vertical ? 100 - offsetY : offsetX, name);
            }
        };

        const handleUp = () => {
            canMove.current = false;
            setIsDown(false);
            const { firstButton, secondButton } = position.current;
            onChangeRef.current(
                isArray(range)
                    ? [min(firstButton, secondButton), max(firstButton, secondButton)]
                    : firstButton
            );
        };

        const handleClick = (event: Event) => {
            if (!buttonRef.current) return;
            if (event.composedPath().includes(buttonRef.current)) {
                isFocus.current = true;
                return;
            }
            isFocus.current = false;
        };

        window.addEventListener('click', handleClick, true);
        window.addEventListener('mousemove', handleMove, true);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchmove', handleMove, true);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [step, setPosition, vertical, range]);

    React.useEffect(() => {
        const stepWidth = 100 / step;
        const set = (number: number) => {
            const p = position.current;
            const currentStep = round(p[name] / stepWidth);
            const offset = clamp(currentStep + number, 0, 100) * stepWidth;
            setPosition(offset, name);
        };
        const handleKeyDown = (event: Event) => {
            if (!isFocus.current) return;
            const e = event as KeyboardEvent;
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowRight':
                    return set(1);
                case 'ArrowDown':
                case 'ArrowLeft':
                    return set(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [step, vertical, setPosition, name]);

    const rest = React.useMemo(() => {
        const p = { firstButton, secondButton };
        const style = vertical ? { bottom: p[name] + '%' } : { left: p[name] + '%' };
        const position = vertical ? p[name] : p[name];
        return { style, position };
    }, [name, vertical, firstButton, secondButton]);

    return {
        isDown,
        showTip,
        handleMouseDown,
        width,
        height,
        vertical,
        tipFormat,
        tipBgColor,
        tipFtColor,
        disabled,
        ariaValuetextFormat,
        buttonRef,
        ...rest,
    };
}
