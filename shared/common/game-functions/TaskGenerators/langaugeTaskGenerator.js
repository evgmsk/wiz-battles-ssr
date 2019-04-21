/**
 * project WizBattle.
 */
import Vocabulary from '../../../assets/data/vocabulary.json';

const words = Object.keys(Vocabulary);

const Messages = {
    easy: {
        description: 'Перевидите слово с англиского на руский. Вы можете посмотреть варианты ответов и выбрать один из них, но в этом случае урон от вашего заклинания будет снижен на 10%',
        helpMessage: '',
    },
    normal: {
        description: 'Перевидите слово с англиского на руский. Вы можете посмотреть варианты ответов и выбрать одни из них, но в этом случае урон от вашего заклинания будет снижен на 10%',
        helpMessage: '',
    },
};

export const englishTranslateGenerator = (level = 'easy') => {
    const message = Messages[level];
    let wordsSet = new Set();
    const randomWords = (set) => {
        if (set.size >= 5)
            return set;
        const randomWordIndex = Math.floor(Math.random() * words.length);
        set.add(randomWordIndex);
        return randomWords(set);
    };
    wordsSet = [...randomWords(wordsSet)];
    const expression = words[wordsSet[0]];
    const possibleAnswers = Vocabulary[expression];
    const answersToSelect = wordsSet.map(x => Vocabulary[words[x]][0]).sort();
    return { expression, possibleAnswers, answersToSelect, message, sound: true };
};

export const russianWordsGenerator = () => {

};
