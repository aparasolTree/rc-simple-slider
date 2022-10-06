import React from 'react';

export interface UseStopsOptions {
    width: number;
    height: number;
    vertical: boolean;
    step: number;
}

export default function useStops({ width, height, vertical, step }: UseStopsOptions) {
    return React.useMemo(() => {
        const widthOrHeight = !vertical ? width : height;
        const stepWidth = (widthOrHeight / step / widthOrHeight) * 100;

        return Array.from({ length: (step || 1) - 1 }, (_, index) => {
            return vertical
                ? {
                      bottom: (index + 1) * stepWidth + '%',
                  }
                : { left: (index + 1) * stepWidth + '%' };
        });
    }, [step, width, vertical, height]);
}
