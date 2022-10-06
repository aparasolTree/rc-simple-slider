import React from 'react';
import { isObject } from '../utils';
import { MarksType } from './types';

export interface UseMarksOptions {
    vertical: boolean;
    marks: MarksType;
}

export default function useMarks({ vertical, marks }: UseMarksOptions) {
    return React.useMemo(() => {
        const leftOrBottom = vertical ? 'bottom' : 'left';

        return Object.entries(marks)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([key, value]) => {
                return {
                    style: { [leftOrBottom]: Number(key) + '%' },
                    label: isObject(value) ? value.label : value,
                    markStyle: isObject(value) ? value.style : undefined,
                };
            });
    }, [marks, vertical]);
}
