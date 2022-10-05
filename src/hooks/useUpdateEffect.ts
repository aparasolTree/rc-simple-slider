import React from 'react';
import useFirstMountState from './useFirstMountState';

export default function useUpdateEffect(effect: React.EffectCallback, dep: React.DependencyList) {
    const isFirst = useFirstMountState();
    React.useEffect(() => {
        if (!isFirst) {
            return effect();
        }
    }, dep);
}
