export const pause = time => new Promise((resolve) => {
    setTimeout(resolve, time);
});

export const waiter = async (time, fn) => {
    await pause(time);
    fn();
};
