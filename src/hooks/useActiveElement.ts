import React from 'react';

export default function useActiveElement() {
    const [activeElement, setActiveElement] = React.useState(window?.document?.activeElement);

    React.useEffect(() => {
        if (!window || !document) return;

        const handle = () => setActiveElement(document.activeElement);
        window.addEventListener('blur', handle, true);
        window.addEventListener('focus', handle, true);
        return () => {
            window.removeEventListener('focus', handle, true);
            window.removeEventListener('blur', handle, true);
        };
    }, []);

    return activeElement;
}
