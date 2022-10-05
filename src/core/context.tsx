import React from 'react';
import { SliderBase, Range } from './types';

export interface SliderContextProps extends SliderBase {
    range: Range;
    firstButton: number;
    secondButton: number;
    ref: React.RefObject<HTMLElement>;
    ProgressBarStyle: React.CSSProperties;
    onChange: (value: Range) => void;
    tipFormat: (value: number) => string;
    ariaValuetextFormat: (value: number) => string;
    setPosition: (position: number, name: 'firstButton' | 'secondButton') => void;
}

export const SliderContext = React.createContext<SliderContextProps>(null!);
export const useSliderContext = () => React.useContext(SliderContext);
