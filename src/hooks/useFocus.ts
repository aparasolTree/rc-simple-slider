import React from 'react';
import { isDef } from '../utils';
import useActiveElement from './useActiveElement';

export default function useFocus(target: React.RefObject<HTMLElement> | Window | Document) {
    const activeElement = useActiveElement();

    return React.useMemo(() => {
        const origin = 'current' in target ? target.current : target;
        const focused = isDef(activeElement) && isDef(origin) && activeElement === origin;

        return [
            focused,
            (newVal: boolean) => {
                if (newVal && !focused) {
                    (origin as HTMLElement)?.focus();
                } else if (!newVal && focused) {
                    (origin as HTMLElement)?.blur();
                }
            },
        ];
    }, [activeElement, target]);
}
