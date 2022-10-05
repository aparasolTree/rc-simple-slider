import React from 'react';
import styled from 'styled-components';

import { Item as _Item, Container } from './common/style-componets';
import useMarks from '../useMarks';
import { useSliderContext } from '../context';
import { MarksType } from '../types';

const Item = styled(_Item).attrs<{ label: string }>((props) => ({
    label: props.label,
}))<{ label: string }>`
    font-size: 14px;
    &:after {
        content: attr(label);
        display: block;
        position: absolute;
        transform: ${({ vertical }) =>
            vertical ? 'translate(16px, -50%)' : 'translate(-50%, 16px)'};
    }
`;

export interface MarksProps {
    marks: MarksType;
    width: number;
    height: number;
    vertical: boolean;
}

export default function Marks({ marks, height, vertical, width }: MarksProps) {
    const normlizeMarks = useMarks({ marks, vertical });

    return (
        <Container>
            {normlizeMarks.map(({ label, style }, index) => {
                return (
                    <Item
                        key={index}
                        style={style}
                        label={label}
                        vertical={vertical}
                        width={width}
                        height={height}
                    />
                );
            })}
        </Container>
    );
}
