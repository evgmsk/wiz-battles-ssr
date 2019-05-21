import net from 'net';

// helper function to find unused port
const freePortPromise = (port) => new Promise((resolve, reject) => {
    const test_port = net.createServer()
        .once('error', err => {
            if (err.code !== 'EADDRINUSE')
                return reject(err);
            return resolve(freePortPromise(port + 1));
        })
        .once('listening', () => {
            test_port.once('close', () => resolve(port)).close();
        })
        .listen(port);
});

module.exports = freePortPromise;
