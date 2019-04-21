/**
 * project WizBattle
 */
import Konva from 'konva';

export const fall = (node, l, duration = 1, Y = 100, scaleX = 5, scaleY = 0.3) => {
    const y = node.attrs.y ? node.attrs.y + Y : node.y + Y;
    return () => (
        node.to({
            scaleX,
            scaleY,
            y,
            easing: Konva.Easings.EaseInOut,
            duration,
            onFonish: () => node.attrs.y = y,
        })
    );
};

export const moveX = (node, l, duration = 1, x = -150) => {
    const X = node.attrs.x + x;
    return () => (
        node.to({
            x: X,
            easing: Konva.Easings.EaseInOut,
            duration,
        })
    );
};

export const skewXY = (shape, duration = 1) => {
    return (x = 1, y = 1) => (
        shape.to({
            skewX: x,
            skewY: y,
            easing: Konva.Easings.EaseInOut,
            duration,
        })
    );
};
