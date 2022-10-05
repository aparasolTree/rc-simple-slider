import React from 'react';
import useLatest from '../hooks/useLatest';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { abs, isArray, max, min } from '../utils';
import { Range } from './types';

export interface UseDragOptions {
    range: Range;
    vertical: boolean;
    onChange: (value: Range) => void;
    onInput: (value: Range) => void;
}

const getRange = (range: Range, index: 0 | 1) => {
    return isArray(range) ? range[index] : index === 0 ? range : 0;
};

export default function useSlide({ vertical, range, onInput }: UseDragOptions) {
    const [firstButton, setFirstButtonPosition] = React.useState(() => getRange(range, 0));
    const [secondButton, setSecondButtonPosition] = React.useState(() => getRange(range, 1));

    const onInputRef = useLatest(onInput);

    React.useEffect(() => {
        setFirstButtonPosition(getRange(range, 0));
        setSecondButtonPosition(getRange(range, 1));
    }, [range]);

    useUpdateEffect(() => {
        onInputRef.current(
            isArray(range)
                ? [min(firstButton, secondButton), max(firstButton, secondButton)]
                : firstButton
        );
    }, [firstButton, secondButton, range]);

    const setPosition = React.useCallback(
        (position: number, name: 'firstButton' | 'secondButton') => {
            const set = {
                firstButton: setFirstButtonPosition,
                secondButton: setSecondButtonPosition,
            };
            set[name](position);
        },
        []
    );

    const ProgressBarStyle = React.useMemo<React.CSSProperties>(() => {
        const d = vertical ? 'bottom' : 'left';
        const hieghtOrWidth = vertical ? 'height' : 'width';
        const isLeftMove = firstButton - secondButton > 0;

        return range
            ? {
                  [d]: isLeftMove ? secondButton + '%' : firstButton + '%',
                  [hieghtOrWidth]: abs(firstButton - secondButton) + '%',
              }
            : {
                  [d]: 0 + '%',
                  [hieghtOrWidth]: firstButton + '%',
              };
    }, [range, firstButton, secondButton, vertical]);

    return {
        setPosition,
        firstButton,
        secondButton,
        ProgressBarStyle,
    };
}
