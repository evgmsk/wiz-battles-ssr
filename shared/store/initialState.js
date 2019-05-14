/**
 * project smartWizBattle
 */
export const initialStateStart = (userName = '', savedShapes = [], token = null, lang = 'en') => ({
    app: {
        userName,
        savedShapes,
        token,
        lang,
    }
});

export const initialStateGame = (
    game = {
        name: '',
        token: '',
        battle: false,
        musicVolume: 0.1,
        soundsVolume: 1,
    },
    gameData = {
        currentLocation: {},
        nickName: '',
        image: '',
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
    }) => ({ gameData, game });

export const initialStateBattle = ({
    battle = {
        pvp: false,
        difficulty: 'easy',
        subject: 'random',
        timeLimit: false,
        playerMove: true,
        scene: {},
        task: null,
        solution: null,
    },
    player = {
        nickname: '',
        health: 100,
        spell: null,
        level: 1,
        image: {},
        baseDamage: 30,
        experience: 0,
    },
    opponent = {
        nickName: '',
        health: 100,
        level: 1,
        spell: null,
        image: {},
        baseDamage: 30,
        experience: 0,
    },
}) => ({battle, player, opponent});
