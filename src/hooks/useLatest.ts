import React from 'react';

export default function useLatest<T>(state: T): React.MutableRefObject<T> {
    const ref = React.useRef<T>(state);

    React.useEffect(() => {
        ref.current = state;
    });

    return ref;
}
