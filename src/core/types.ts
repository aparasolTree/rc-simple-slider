import React from 'react';

export type Size = { width: number; height: number };
export type MarksType = {
    [key: number]: string | { style?: React.CSSProperties; label: string };
};
export type Disabled = { disabled: boolean };
export type Range = number | [number, number];
export type Vertical = { vertical: boolean };

export interface SliderBase extends Disabled, Vertical {
    step: number;
    width: number;
    height: number;
    showTip: boolean;
    tipBgColor: string;
    tipFtColor: string;
}
