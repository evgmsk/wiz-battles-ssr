/**
 * project WizBattle
 */
import { MonstersNames } from '../constants/constants';

export const levelsGap = level => Math.round(1.2 ** level) * 100;

export const calcCurrentExperience = (damage, experience, level) => {
    const gap = levelsGap(level);
    const totalExperience = damage + experience;
    const newExperience = totalExperience % gap;
    return { levelUp: (totalExperience >= gap), newExperience, damage };
};
export const calcBaseHealth = level => {
    return 90 + (parseInt(level, 10) * 10);
};

export const calcDamage = (level, items = []) => {
    const bonusDamage = items.filter(i => i.bonusDamage)
        .reduce((acc, i) => acc += i.bonusDamage, 0);
    return 30 + (level * 2) + bonusDamage;
};

export const calcRandomOpponentLevel = userLevel => {
    if (userLevel > 2)
        return Math.floor(Math.random() * 4) + (userLevel - 2);
    return Math.floor(Math.random() * 2) + userLevel;
};

export const calcPlayerHealth = (level, items = []) => {
    const healthBonus = items.filter(i => i.healthBonus)
        .reduce((acc, i) => acc += i.healthBonus, 0);
    return calcBaseHealth(level) + healthBonus;
};

export const definePlayer = hero => {
    const health = calcPlayerHealth(hero.level, hero.items);
    const spell = null;
    const name = hero.nickName ? hero.nickName : 'Антоша';
    const image = hero.image;
    const level = hero.level;
    const baseDamage = calcDamage(hero.level);
    const experience = hero.experience;
    return { health, spell, image, name, level, baseDamage, experience };
};

export const setOpponentPosition = (pos, center) => {
    const targetPos = [window.innerWidth - 200, (window.innerHeight / 2) + 100];
    const diff = [targetPos[0] - center[0], targetPos[1] - center[1]];
    return [pos[0] + diff[0], pos[1] + diff[1]];
};

export const setOpponentImage = (shapes, name = 'headY1') => {
    const monster = shapes.filter(s => s.name === name)[0].image;
    const { x, y } = monster.filter(m => m.props.animationType === 'swingY')[0].props;
    monster.forEach(m => {
        m.props.draggable = false;
        [m.props.x, m.props.y] = setOpponentPosition([m.props.x, m.props.y], [x, y]);
    });
    return monster;
};

export const defineAIOpponent = (hero, monsters) => {
    const monster = monsters[Math.floor(Math.random() * monsters.length)].name;
    const name = MonstersNames[monster];
    const health = calcPlayerHealth(hero.level, []);
    const spell = null;
    const image = monster;
    const level = calcRandomOpponentLevel(hero.level);
    const baseDamage = calcDamage(level);
    return { health, name, spell, image, level, baseDamage };
};

export const resolveLifeAttack = (solution, battle) => {
    const [attacker, defender] = battle.playerMove
        ? [battle.player, battle.opponent]
        : [battle.opponent, battle.player];
    const { experience, level, baseDamage } = attacker;
    const realDamage = battle.difficulty === 'easy' ? baseDamage : baseDamage * 1.5;
    const damage = Math.round(realDamage * solution * 0.5);
    const actualDamage = Math.min(damage, defender.health);
    const health = actualDamage > defender.health ? 0 : defender.health - actualDamage;
    if (battle.pvp || battle.playerMove) {
        const { levelUp, newExperience } = calcCurrentExperience(actualDamage, experience, level);
        return { levelUp, experience: newExperience, health, restoration: actualDamage };
    }
    return { health, restoration: actualDamage };
};

export const resolveAttack = (solution, battle) => {
    const spell = battle.playerMove ? battle.player.spell : battle.opponent.spell;
    if (spell === 'life')
        return resolveLifeAttack(solution, battle);
    const [attacker, defender] = battle.playerMove
        ? [battle.player, battle.opponent]
        : [battle.opponent, battle.player];
    const { experience, level, baseDamage } = attacker;
    const realDamage = battle.difficulty !== 'easy' && battle.playerMove
        ? baseDamage * 1.5 : baseDamage;
    const damage = Math.round(realDamage * solution);
    const actualDamage = Math.min(damage, defender.health);
    const health = damage > defender.health ? 0 : defender.health - damage;
    if (battle.pvp || battle.playerMove) {
        const { levelUp, newExperience } = calcCurrentExperience(actualDamage, experience, level);
        return { levelUp, experience: newExperience, damage, health };
    }
    return { damage, health };
};

