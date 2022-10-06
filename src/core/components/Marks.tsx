import React from 'react';
import styled from 'styled-components';

import { Item, Container } from './common/style-componets';
import useMarks from '../useMarks';
import type { MarksType, Vertical } from '../types';

export interface MarksProps extends Vertical {
    marks: MarksType;
    width: number;
    height: number;
}

const createMarkStyle = (vertical: boolean): React.CSSProperties => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: vertical ? 'translate(50%, -50%)' : 'translate(-50%, 50%)',
    };
};

export default function Marks({ marks, height, vertical, width }: MarksProps) {
    const normlizeMarks = useMarks({ marks, vertical });

    return (
        <Container>
            {normlizeMarks.map(({ label, style, markStyle }, index) => {
                return (
                    <Item
                        key={index}
                        style={style}
                        vertical={vertical}
                        width={width}
                        height={height}
                    >
                        <div style={{ ...markStyle, ...createMarkStyle(vertical) }}>{label}</div>
                    </Item>
                );
            })}
        </Container>
    );
}
