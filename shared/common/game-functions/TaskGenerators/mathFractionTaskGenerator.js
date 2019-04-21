/**
 * project WizBattle
 */

import _ from 'lodash';
import findDividers from '../../helper-functions/findDividers';

const Levels = {
    easy: { range: 20, numbers: 1 },
    normal: { range: 20, numbers: 2 },
};
const Actions = { easy: ['+', '-'], normal: ['+', '-', '*', '/'] };

const Messages = {
    easy: {
        description: 'Упростите дробь. Вы можете посмотреть варианты ответов и выбрать один из них, но в этом случае урон от вашего заклинания снизиться на 10%',
        helpMessage: '',
    },
    normal: {
        description: 'Упростите дробь, выполнив операции. Вы можете посмотреть варианты ответов и выбрать одни из них, но в этом случае урон от вашего заклинания снизиться на 10%',
        helpMessage: '',
    },
};

const simplifyFraction = (n, d, i = 2) => {
    if (n === 1 || d === 1)
        return [n, d];
    if (!(n % d))
        return [n / d, 1];
    if (!(d % n))
        return [n / Math.abs(n), d / Math.abs(n)];
    if (!(n % i) && !(d % i))
        return simplifyFraction(n / i, d / i, i);
    i += 1;
    if (Math.abs(n) < i || Math.abs(d) < i)
        return [n, d];
    return simplifyFraction(n, d, i);
};

const fractionGenerator = (level = 'easy') => {
    const range = Levels[level].range;
    const numbers = Levels[level].numbers;
    const numerator = () => Math.floor(Math.random() * (range / 2)) + 2;
    const denominator = (fn) => _.last(findDividers(fn))
        * (Math.floor(Math.random() * (range / 2)) + 1);
    const actions = Actions[level];
    const firstNumber = numerator();
    const firstFraction = [firstNumber, '/', denominator(firstNumber)];
    const message = Messages[level];
    const resolveFraction = (fF, act, sF) => {
        let num;
        let den;
        if (act === '/') {
            const [Num, Den] = [`${fF[0]}*${sF[2]}`, `${fF[2]}*${sF[0]}`];
            [num, den] = [eval(Num), eval(Den)];
        }
        if (act === '*') {
            const [Num, Den] = [`${fF[0]}*${sF[0]}`, `${fF[2]}*${sF[2]}`];
            [num, den] = [eval(Num), eval(Den)];
        }
        if (act === '+') {
            const [Num, Den] = [`${fF[0]}*${sF[2]}+${fF[2]}*${sF[0]}`, `${fF[2]}*${sF[2]}`];
            [num, den] = [eval(Num), eval(Den)];
        }
        if (act === '-') {
            const [Num, Den] = [`${fF[0]}*${sF[2]}-${fF[2]}*${sF[0]}`, `${fF[2]}*${sF[2]}`];
            [num, den] = [eval(Num), eval(Den)];
        }
        [num, den] = simplifyFraction(num, den);
        return `${num}/${den}`;
    };
    const makeFractionTask = () => {
        if (numbers === 1) {
            const [n, d] = simplifyFraction(firstFraction[0], firstFraction[2]);
            return [firstFraction.join(''), `${n}/${d}`];
        }
        const action = actions[Math.floor(Math.random() * actions.length)];
        const secondFraction = [numerator(), '/', numerator()];
        const answer = resolveFraction(firstFraction, action, secondFraction);
        const expression = `${firstFraction.join('')} ${action} ${secondFraction.join('')}`;
        return [expression, answer];
    };
    const [expression, answer] = makeFractionTask();
    let answersToSelect = new Set();
    answersToSelect.add(answer);
    const collectRandomAnswers = (answers) => {
        if (answers.size > 4)
            return answers;
        const [num, den] = answer.split('/');
        const randomNumbers = [
            Math.floor(Math.random() * (range + Math.abs(num))),
            Math.floor((Math.random() * (range + Math.abs(den))) + 1),
            ];
        const randomAction = Math.random() > 0.5 ? '' : '-';
        const randomAnswer = `${randomAction}${randomNumbers[0]}/ ${randomNumbers[1]}`;
        answers.add(randomAnswer);
        // console.log(answers)
        return collectRandomAnswers(answers);
    };
    answersToSelect = collectRandomAnswers(answersToSelect);
    answersToSelect = [...answersToSelect].sort();
    const possibleAnswers = [answer];
    return { expression, possibleAnswers, answersToSelect, message, sound: false };
};
export default fractionGenerator;
