/**
 * project wiz-battles
 */

export const pause = async time => new Promise((resolve) => {
    setTimeout(resolve, time);
});

export const waiter = async (time, fn) => {
    await pause(time);
    fn();
};
