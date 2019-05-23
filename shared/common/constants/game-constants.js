import {
    swingX,
    rotation,
    swingY,
    rotateSwing,
    swingYRotateS,
    swingYRotateSR,
    swingXRotateS,
    swingXSwingY,
    stepsG,
    scaleX,
    iceStorm,
    flameStrike,
    lifeAttack,
    waterAttack,
    Salute,
    stepF,
} from '../game-functions/animations';

import { fall, moveX, skewXY } from '../game-functions/tweens';
import { englishTranslateGenerator } from '../game-functions/TaskGenerators/langaugeTaskGenerator';
import expressionTaskGenerator from '../game-functions/TaskGenerators/mathExpressionTaskGenerator';
import fractionTaskGenerator from '../game-functions/TaskGenerators/mathFractionTaskGenerator';
import { leafRising, snowStorm, fire, waterFall, salute } from '../game-functions/effects';

export const TaskGenerators = {
    englishTranslateGenerator,
    expressionTaskGenerator,
    fractionTaskGenerator,
};

export const AnimationTypes = {
    '': '',
    swingX,
    swingY,
    rotation,
    rotateSwing,
    swingYRotateS,
    swingYRotateSR,
    swingXRotateS,
    swingXSwingY,
    stepsG,
    scaleX,
    stepF,
};

export const SpellAnimations = {
    iceStorm,
    waterAttack,
    flameStrike,
    lifeAttack,
    Salute,
};

export const Effects = {
    ice: { effect: snowStorm, animation: 'iceStorm' },
    fire: { effect: fire, animation: 'flameStrike' },
    water: { effect: waterFall, animation: 'waterAttack' },
    life: { effect: leafRising, animation: 'lifeAttack' },
};

export const TweenTypes = { '': '', fall, moveX, skewXY };

export const Salutation = { effect: salute, animation: Salute };

export const Spells = { ice: 'льда', fire: 'огня', water: 'воды', life: 'жизни' };
