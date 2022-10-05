import React from 'react';
import SlideButton from './SliderButton';
import Stops from './Stops';
import SliderProvider from './SliderProvider';
import ProgressBar from './ProgressBar';

import Marks from './Marks';

import type { Disabled, MarksType, Range, SliderBase } from '../types';
import { isArray, noop, round, debounce as _debounce, clamp } from '../../utils';

export interface SliderOptions<R> extends Partial<SliderBase> {
    contentContainerStyle?: React.CSSProperties;
    progressBarColor?: string;
    range?: R;
    showStops?: boolean;
    marks?: MarksType;
    debounce?: number;

    tipFormat?: (value: number) => string;
    ariaValuetextFormat?: (value: number) => string;
    children?: (props: Disabled & { isDown: boolean }) => React.ReactNode;
    onInput?: (value: R extends number ? number : [number, number]) => void;
    onChange?: (value: R extends number ? number : [number, number]) => void;
}

const format = (step: number, val: number) => {
    const stepWidth = round(100 / (step || 1));
    return round(val / stepWidth) * stepWidth + '';
};

export function Slider<R extends number>(options: SliderOptions<number>): JSX.Element;
export function Slider<R extends [number, number]>(options: SliderOptions<R>): JSX.Element;
export function Slider<R extends Range>(options: SliderOptions<R> = {}) {
    const step = clamp(options.step || 100, 1, 100);
    const {
        contentContainerStyle = {},
        showTip = false,
        vertical = false,
        progressBarColor = '#686de0',
        range = 0,
        height = vertical ? 300 : 6,
        width = vertical ? 6 : 300,
        showStops = false,
        marks = [],
        tipFormat = format.bind(null, step),
        ariaValuetextFormat = format.bind(null, step),
        onChange = noop,
        onInput = noop,
        tipFtColor = '#fff',
        tipBgColor = '#333',
        disabled = false,
        children,
        debounce,
    } = options;

    const sliderProviderProps = {
        onInput: debounce ? (_debounce(onInput, debounce) as any) : onInput,
        onChange: onChange as any,
        step,
        range,
        width,
        height,
        showTip,
        disabled,
        vertical,
        tipFormat,
        tipFtColor,
        tipBgColor,
        ariaValuetextFormat,
        contentContainerStyle,
    };

    return (
        <SliderProvider {...sliderProviderProps}>
            <ProgressBar progressBarColor={progressBarColor} />
            {showStops && <Stops height={height} width={width} step={step} vertical={vertical} />}
            {marks && <Marks marks={marks} height={height} width={width} vertical={vertical} />}
            <SlideButton name='firstButton'>{children}</SlideButton>
            {isArray(range) && <SlideButton name='secondButton'>{children}</SlideButton>}
        </SliderProvider>
    );
}
