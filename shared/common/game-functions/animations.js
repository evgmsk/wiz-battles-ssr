import Konva from 'konva';
import randomVel from '../helper-functions/randomVel';

export const rotation = (layer, shape, angularSpeed = 90) =>
    new Konva.Animation((frame) => {
        const angleDiff = (frame.timeDiff * angularSpeed) / 1000;
        shape.rotate(angleDiff);
    }, layer);

export const rotateSwing = (layer, shape, angularSpeed = 90, period = 1500) =>
    new Konva.Animation((frame) => {
        const angle = ((frame.timeDiff * angularSpeed) / 1000);
        const angleDiff = angle * Math.sin((frame.time * 2 * Math.PI) / period);
        shape.rotate(angleDiff);
    }, layer);

export const swingX = (layer, shape, amplitude = 0.5, period = 1500) =>
    new Konva.Animation((frame) => {
        const X = () => shape.attrs.x || 0;
        shape.setX((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + X());
    }, layer);

export const swingY = (layer, shape, amplitude = 0.5, period = 1500) =>
    new Konva.Animation((frame) => {
        const Y = (() => shape.attrs.y || 0)();
        shape.setY((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + Y);
    }, layer);

export const fallingY = (layer, shape, vy = 100, maxY = 500) =>
    new Konva.Animation((frame) => {
        const Y = shape.attrs.y + ((frame.timeDiff * vy) / 1000);
        if (Y < maxY)
            shape.setY(Y);
        else
            shape.destroy();
    }, layer);

export const risingY = (layer, shape, vy = 100, minY = 10) =>
    new Konva.Animation((frame) => {
        const Y = shape.attrs.y - ((frame.timeDiff * vy) / 1000);
        if (Y > minY)
            shape.setY(Y);
        else
            shape.destroy();
    }, layer);

export const swingYRotateS = (layer, shape, amplitude = 0.5, angularSpeed = 90, period = 1500) =>
    new Konva.Animation((frame) => {
        const angle = ((frame.timeDiff * angularSpeed) / 1000);
        const angleDiff = angle * Math.sin((frame.time * 2 * Math.PI) / period);
        const Y = (() => shape.attrs.y || 0)();
        shape.rotate(angleDiff);
        shape.setY((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + Y);
    }, layer);

export const swingXRotateS = (layer, shape, amplitude = 0.5, angularSpeed = 90, period = 1500) =>
    new Konva.Animation((frame) => {
        const angle = ((frame.timeDiff * angularSpeed) / 1000);
        const angleDiff = angle * Math.sin((frame.time * 2 * Math.PI) / period);
        const X = (() => shape.attrs.x || 0)();
        shape.setX((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + X);
        shape.rotate(angleDiff);
    }, layer);

export const swingYRotateSR = (layer, shape, amplitude = 0.5, angularSpeed = 90, period = 1500) =>
    new Konva.Animation((frame) => {
        const angle = ((frame.timeDiff * angularSpeed) / 1000);
        const angleDiff = angle * Math.cos((frame.time * 2 * Math.PI) / period);
        const Y = (() => shape.attrs.y || 0)();
        shape.setY((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + Y);
        shape.rotate(angleDiff);
    }, layer);

export const swingXSwingY = (layer, shape, amplitude = 0.5, period = 1500) =>
    new Konva.Animation((frame) => {
        const Y = (() => shape.attrs.y || 0)();
        shape.setY((amplitude * Math.cos((frame.time * 2 * Math.PI) / period)) + Y);
        const X = (() => shape.attrs.x || 0)();
        shape.setX((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + X);
    }, layer);

export const stepsG = (layer, shape, amplitude = 0.5, period = 2000) =>
    new Konva.Animation((frame) => {
        const Y = (() => shape.attrs.y || 0)();
        shape.setY((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + Y);
        shape.skewX((amplitude / 40) * Math.sin((frame.time * 2 * -Math.PI) / period));
    }, layer);

export const scaleX = (layer, shape, period = 2000) =>
    new Konva.Animation((frame) => {
        shape.scaleX(Math.sin((frame.time * 2 * -Math.PI) / period) + 0.00007);
    }, layer);

export const stepF = (layer, shape, amplitude = 0.5, period = 2000) =>
    new Konva.Animation((frame) => {
        const Y = (() => shape.attrs.y || 0)();
        shape.setY((amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + Y);
        shape.skewX((amplitude / 4) * Math.sin((frame.time * 2 * -Math.PI) / period));
    }, layer);

export const iceStorm = (layer, shape, player = true, angSpeed = 120, period = 1000, vx = 600) => {
    return (
        new Konva.Animation((frame) => {
            const angleDiff = (frame.timeDiff * angSpeed) / period;
            shape.rotate(angleDiff);
            const X = player ? shape.getAttr('x') + ((frame.timeDiff * vx) / period)
                : shape.getAttr('x') - ((frame.timeDiff * vx) / period);
            const vy = 200 - (Math.random() * 60);
            const Y = shape.getAttr('y') + ((frame.timeDiff * vy) / period);
            shape.setX(X);
            shape.setY(Y);
        }, layer)
    );
};

export const flameStrike = (layer, shape, pl = 1, am = 3, period = 1000, vx = 100) => {
    return (
        new Konva.Animation((frame) => {
            const X = pl ? shape.getAttr('x') + ((frame.timeDiff * vx) / period)
                : shape.getAttr('x') - ((frame.timeDiff * vx) / period);
            shape.setX(X);
            const fnArr = [Math.cos, Math.sin];
            const fn = fnArr[Math.floor(Math.random() * 2)];
           // shape.skewX((am * fn((frame.time * 2 * Math.PI) / period)));
            shape.skewY((am * fn((frame.time * 2 * Math.PI) / period)));
        }, layer)
    );
};

export const lifeAttack = (layer, shape, vx = 100, am = 1, period = 1000, vy = -300) => {
    return (
        new Konva.Animation((frame) => {
            shape.setX(shape.getAttr('x') + ((frame.timeDiff * vx) / period));
            shape.setY(shape.getAttr('y') + ((frame.timeDiff * vy) / period));
            shape.skewY((am * Math.sin((frame.time * 2 * Math.PI) / period)));
        }, layer)
    );
};

export const waterAttack = (layer, shape, pl, onEnd, vx = 30, vy = 300, period = 1000) => {
    return (
        new Konva.Animation((frame) => {
            let a = 10;
            const Y = (Math.random() * 100) + 100;
            const X = pl ? shape.getAttr('x') + ((frame.timeDiff * vx) / period)
                : shape.getAttr('x') - ((frame.timeDiff * vx) / period);
            vy += ((frame.timeDiff * a) / period);
            shape.setX(X);
            shape.setY(shape.getAttr('y') + ((frame.timeDiff * vy) / period));
            if (shape.getAttr('y') > (window.innerHeight / 2) + Y) {
                shape.scaleX(shape.getAttr('scaleX') + ((frame.time * 1) / period));
                vx = 0;
                vy = 0;
                a = 0;
            }
            if (shape.getAttr('scaleX') > 5) {
                shape.destroy();
                onEnd();
            }
        }, layer)
    );
};

export const Salute = (layer, shape, onEnd, vx = randomVel(1), vy = -300, ay = 150, p = 1000) => {
    return (
        new Konva.Animation((frame) => {
            if (shape.getAttr('scaleX') > 5
                || shape.getAttr('y') < 100
                || shape.getAttr('y') > window.innerHeight - 100) {
                shape.destroy();
                onEnd();
            } else {
                shape.scaleX(shape.getAttr('scaleX') + ((frame.timeDiff * 1) / p));
                const X = shape.getAttr('x') + ((frame.timeDiff * vx) / p);
                vy += ((frame.timeDiff * ay) / p);
                const Y = shape.getAttr('y') + ((frame.timeDiff * vy) / p);
                shape.setX(X);
                shape.setY(Y);
            }
        }, layer)
    );
};