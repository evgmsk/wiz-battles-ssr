/**
 * project WizBattle
 */
import _ from 'lodash';
import findDividers from '../../helper-functions/findDividers';

const Levels = {
    easy: { range: 50, numbers: 2 },
    normal: { range: 10, numbers: 4 },
};
const Actions = { easy: ['+', '-'], normal: ['+', '-', '*', '/', '%'] };

const Messages = {
    easy: {
        description: 'Найдите значение выражения. Вы можете посмотреть варианты ответов и выбрать один из них, но в этом случае урон от вашего заклинания снизиться на 10%',
        helpMessage: '',
    },
    normal: {
        description: 'Найдите значение выражения, раскрыв скобки и выполнив операции (% - деление по модулю). Вы можете посмотреть варианты ответов и выбрать одни из них, но в этом случае урон от вашего заклинания снизиться на 10%',
        helpMessage: '',
    },
};

const expressionTaskGenerator = (level) => {
    const range = Levels[level].range;
    const numbers = Levels[level].numbers;
    const firstNumber = Math.floor(Math.random() * range) + 1;
    const actions = Actions[level];
    const message = Messages[level];
    const addAction = (expr, action, x) => {
        const brackets = level !== 'easy' ? Math.random() > 0.5 : 0;
        const adds = [action, x];
        if (brackets && expr.filter(e => /\d+/.test(e)).length < 3) {
            const lastMark = _.last(expr);
            if (lastMark === ')') {
                return ['('].concat(expr).concat(adds).concat(')');
            }
            const tail = ['('].concat(lastMark).concat(adds).concat(')');
            return expr.slice(0, expr.length - 1).concat(tail);
        }
        return expr.concat(adds);
    };
    const makeExpression = (expr, num = 1) => {
        if (num === numbers)
            return expr;
        const actionIndex = Math.floor(Math.random() * actions.length);
        const action = actions[actionIndex];
        let x;
        if (action === '/') {
            let toEval;
            if (_.last(expr) === ')') {
                toEval = expr.slice(expr[_.findLastIndex(expr, '(')] + 1, expr.length).join('');
            } else
                toEval = _.last(expr);
            toEval = eval(toEval);
            const xArray = findDividers(toEval);
            x = xArray[1] || xArray[0];
        } else
            x = Math.floor(Math.random() * range) + 1;
        num += 1;
        expr = addAction(expr, action, x);
        return makeExpression(expr, num);
    };
    const checkExpression = (expr) => {
        expr = makeExpression(expr).join(' ');
        const answer = eval(expr);
        if (Number.isNaN(answer) || answer % 1 || answer === Infinity) {
            return checkExpression([firstNumber]);
        }
        return [expr, answer];
    };
    const [expression, answer] = checkExpression([firstNumber]);
    let answersToSelect = new Set();
    answersToSelect.add(answer);
    // console.log(expression, answer);
    const randomAnswers = (answers) => {
        if (answers.size > 4)
            return answers;
        const randomNumber = Math.floor(Math.random() * (100 + Math.abs(answer)));
        const randomAction = Math.random() > 0.5;
        const randomAnswer = randomAction ? answer + randomNumber : answer - randomNumber;
        answers.add(randomAnswer);
        return randomAnswers(answers);
    };
    answersToSelect = randomAnswers(answersToSelect);
    answersToSelect = [...answersToSelect].sort();
    const possibleAnswers = [answer];
    return { expression, possibleAnswers, answersToSelect, message, sound: false };
};

export default expressionTaskGenerator;
