import React from 'react';
import useStops from '../useStops';
import { Container, Item } from './common/style-componets';

export interface StopsProps {
    vertical: boolean;
    width: number;
    height: number;
    step: number;
}

export default function Stops({ width, height, step, vertical }: StopsProps) {
    const stops = useStops({ width, height, step, vertical });

    return (
        <Container>
            {stops.map((style, index) => {
                return (
                    <Item
                        key={index}
                        style={style}
                        vertical={vertical}
                        width={width}
                        height={height}
                    />
                );
            })}
        </Container>
    );
}
