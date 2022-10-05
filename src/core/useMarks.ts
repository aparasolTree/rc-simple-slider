import React from 'react';
import { isObject } from '../utils';
import { Marks } from './components/Slider';

export interface UseMarksOptions {
    vertical: boolean;
    marks: Marks;
}

export default function useMarks({ vertical, marks }: UseMarksOptions) {
    return React.useMemo(() => {
        const leftOrBottom = vertical ? 'bottom' : 'left';

        return Object.entries(marks).map(([key, value]) => {
            return isObject(value)
                ? {
                      style: { ...value.style, [leftOrBottom]: Number(key) + '%' },
                      label: value.label,
                  }
                : {
                      style: { [leftOrBottom]: Number(key) + '%' },
                      label: value,
                  };
        });
    }, [marks, vertical]);
}
