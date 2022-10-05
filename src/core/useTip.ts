import React from 'react';

export interface UseTipOptions {
    mustShow: boolean;
}

export default function useTip({ mustShow }: UseTipOptions) {
    const [isShow, toggle] = React.useState<boolean>(false);

    const style = React.useMemo<React.CSSProperties>(() => {
        return isShow || mustShow
            ? { visibility: 'visible', opacity: 1 }
            : {
                  visibility: 'hidden',
                  opacity: 0,
              };
    }, [isShow, mustShow]);

    const actions = React.useMemo(() => {
        const show = () => toggle(true);
        const hide = () => toggle(false);
        return { show, hide };
    }, []);

    return { style, ...actions };
}
