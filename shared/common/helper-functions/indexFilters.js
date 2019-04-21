/**
 * project WizBattle
 */
export const oddIndexes = array => array.filter((item, i) => i % 2);
export const evenIndexes = array => array.filter((item, i) => !(i % 2));
