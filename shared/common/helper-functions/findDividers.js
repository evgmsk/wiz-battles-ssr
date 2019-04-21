/**
 * project WizBattle.
 */

const findDividers = (num, res = [1], i = 2) => {
    if (num === 1)
        return res;
    if (num <= i) {
        if (res.length === 1)
            res.push(num);
        return res;
    }
    if (Number.isNaN(num) || num === Infinity)
        return [NaN, NaN];
    if (!(num % i)) {
        res.push(i);
        num = Math.round(num / i);
    }
    i += 1;
    return findDividers(num, res, i);
};

export default findDividers;
