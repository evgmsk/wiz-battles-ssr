/**
 * project WizBattle.
 */
import Konva from 'konva';
// import { IceColors } from '../ConstsData/constants';

export const snowFlake = (x, y) => {
    const type = 'Star';
    const numPoints = Math.round(Math.random() * 10) + 5;
    const innerRadius = Math.round(Math.random() * 15) + 3;
    const outerRadius = 1;
    const offsetY = innerRadius * 7;
    const stroke = IceColors[Math.floor(Math.random() * IceColors.length)];
    const fill = IceColors[Math.floor(Math.random() * IceColors.length)];
    const props = { numPoints, innerRadius, outerRadius, stroke, fill, offsetY, x, y };
    return { type, props };
};

export const snowStorm = (player, onEnd, animationType = 'iceStorm') => {
    const x = player.move
        ? (Math.random() * 50) + 100
        : window.innerWidth - (Math.random() * 50) - 100;
    const y = (Math.random() * (window.innerHeight / 3)) + 100;
    const SF = snowFlake(x, y);
    SF.props = { ...SF.props, animationType, player: player.move, onEnd, opacity: 0 };
    return SF;
};

export const flame = (x, y) => {
    const name = 'flame';
    const type = 'Star';
    const numPoints = Math.round(Math.random() * 2) + 5;
    const innerRadius = Math.round(Math.random() * 5) + 5;
    const outerRadius = Math.round(Math.random() * 5) + 10;
    const stroke = '#fe6a20';
    const strokeWidth = 0;
    const fill = '#f33634';
    const props = { numPoints, stroke, fill, strokeWidth, innerRadius, outerRadius, name, x, y };
    return { type, props };
};

export const fire = (player, onEnd, animationType = 'flameStrike') => {
    const x = (window.innerWidth / 2) + ((Math.random() * 50) * (0.5 - Math.random()));
    const y = (Math.random() * 100) + (window.innerHeight / 2) + 50;
    const SF = flame(x, y);
    SF.props = { ...SF.props, animationType, player: player.move, onEnd, opacity: 0 };
    return SF;
};

export const leaf = (x, y) => {
    const name = 'leaf';
    const type = 'Star';
    const numPoints = Math.round(Math.random() * 10) + 5;
    const innerRadius = Math.round(Math.random() * 5) + 3;
    const outerRadius = innerRadius * 1.6;
    const offsetY = innerRadius * 10;
    const fill = '#51dc36';
    const props = { numPoints, innerRadius, outerRadius, fill, offsetY, name, x, y };
    return { type, props, opacity: 0 };
};

export const leafRising = (player, onEnd, animationType = 'lifeAttack') => {
    const { x, y } = player.target;
    const LR = leaf(x, y + 100);
    LR.props = { ...LR.props, animationType, player: player.move, onEnd, opacity: 0 };
    return LR;
};

export const rain = (x, y) => {
    const name = 'rain';
    const type = 'Ellipse';
    const radiusX = Math.round(Math.random() * 2) + 3;
    const radiusY = Math.round(Math.random() * 2) + 4;
    const radius = { x: radiusX, y: radiusY };
    const stroke = '#4ea8fe';
    const scaleX = 0.5;
    const strokeWidth = 0;
    const fill = '#67adf3';
    const props = { radius, stroke, fill, strokeWidth, scaleX, name, x, y };
    return { type, props };
};

export const waterFall = (player, onEnd, animationType = 'waterAttack') => {
    const { x } = player.target;
    const X = x + (Math.random() * 200 * (0.5 - Math.random()));
    const Y = (Math.random() * 100) + 70;
    const WF = rain(X, Y);
    WF.props = { ...WF.props, animationType, player: player.move, onEnd, opacity: 0 };
    return WF;
};

export const salute = (player, onEnd, animationType = 'Salute') => {
    const name = 'salute';
    const type = 'Star';
    const numPoints = 5;
    const innerRadius = 3;
    const outerRadius = Math.round(Math.random() * 3) + 5;
    const fill = Konva.Util.getRandomColor();
    const x = window.innerWidth / 2;
    const y = (window.innerHeight / 2) + 70;
    const opacity = 0;
    let props = { numPoints, innerRadius, outerRadius, fill, opacity, name, x, y };
    props = { ...props, animationType, onEnd };
    return { type, props };
};
