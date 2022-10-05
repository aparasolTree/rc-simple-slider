const toString = Object.prototype.toString;
const getRawType = (val: unknown) => toString.call(val).slice(8, -1).toLowerCase();

export const isObject = (val: unknown): val is Record<any, any> => getRawType(val) === 'object';
export const isArray = Array.isArray;
export const isDef = (val: unknown): val is undefined => getRawType(val) === 'undefined';

export const round = Math.round;
export const abs = Math.abs;
export const max = Math.max;
export const min = Math.min;

export const clamp = (current: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, current));
};

export const debounce = (callback: (...args: any[]) => void, delay: number) => {
    let timer: undefined | number;
    return (...args: any[]) => {
        timer && window?.clearTimeout(timer);
        timer = window?.setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number;
    let clientY: number;
    if (event.type.startsWith('touch')) {
        clientY = (event as TouchEvent).touches[0].clientY;
        clientX = (event as TouchEvent).touches[0].clientX;
    } else {
        clientY = (event as MouseEvent).clientY;
        clientX = (event as MouseEvent).clientX;
    }
    return {
        clientX,
        clientY,
    };
};

export const getOffset = (
    event: MouseEvent | TouchEvent,
    relative: HTMLElement,
    stepWidth: number
) => {
    const { clientX, clientY } = getClientXY(event);
    const { top, left, width, height } = relative.getBoundingClientRect();
    let offsetX = clientX - left,
        offsetY = clientY - top;

    offsetX = clamp((offsetX / width) * 100, 0, 100);
    offsetY = clamp((offsetY / height) * 100, 0, 100);
    offsetX = round(offsetX / stepWidth) * stepWidth;
    offsetY = round(offsetY / stepWidth) * stepWidth;

    return { offsetX, offsetY };
};

export const noop = () => {};
