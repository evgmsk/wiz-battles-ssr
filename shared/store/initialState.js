export const initialStateStart = (userName = '', savedShapes = [], token = null, lang = 'en') => ({
    user: {
        userName,
        savedShapes,
        token,
        lang,
    }
});

export const initGame =  {
    battle: false,
    musicVolume: 0.1,
    soundsVolume: 1,
    currentLocation: {},
    pvp: false,
    difficulty: 'easy',
    subject: 'random',
    timeLimit: false,
};

export const initHero = {
    nickName: '',
    imageName: '',
    items: [],
    level: 1,
    experience: 0,
    health: 100,
    taskResolved: 0,
    taskFailed: 0,
    battlesLost: 0,
    battlesWin: 0,
    spells: [],
    subjectLevels: {math: 0, lang: 0}
}

export const initBattleState = {
    battle: {
        playerMove: true,
        scene: {},
        task: null,
        solution: null,
    },
    player: {
        nickname: '',
        health: 100,
        spell: null,
        level: 1,
        image: {},
        baseDamage: 30,
        experience: 0,
    },
    opponent: {
        nickName: '',
        health: 100,
        level: 1,
        spell: null,
        image: {},
        baseDamage: 30,
        experience: 0,
    }
}

export const initialStateGame = (args) => {
    let {game, hero, battle} = args || {};
    hero = hero || initHero;
    game = game || initGame;
    battle = battle || initBattleState;
    return {game, hero, ...battle};
};    
