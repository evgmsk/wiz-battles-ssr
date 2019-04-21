export const MainRoutes = {
    home: {
        path: '/',
    },
    about: {
        path: '/about',
    },
    drawbox: {
        path: '/draw',
    },
    login: {
        path: '/login',
    },
    game: {
        path: '/game',
    },
};

export const ShapeTypes = [
    'Line-simple',
    'Line-polygon',
    'Line-blob',
    'Rect',
    'Ellipse',
    'Star',
    'Ring',
    'Arc',
    'RegularPolygon',
];

export const captions = [
    'Магическая атака - магия льда',
    'Магическая атака - магия жизни',
    'Магическая атака - магия огня',
    'Магическая атака - магия воды'
];


export const Shapes = {
    Line: 'Line',
    Rect: 'Rect',
    Ellipse: 'Ellipse',
    Star: 'Star',
    Ring: 'Ring',
    Arc: 'Arc',
    RegularPolygon: 'RegularPolygon',
};

export const MonstersNames = { headY1: 'ПервыйУлетный', iceMonster: 'ЛупоглазыйМороз' };

export const Timeouts = {
    heroAttack: 1200, onResolveTask: 2000, onFailTask: 1000, onDataLoaded: 100,
};

export const Langs = ['ru', 'en'];
