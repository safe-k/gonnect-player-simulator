#!/usr/bin/env node
const ws = require('websocket');
const randomstring = require("randomstring");
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
    {name: 'count', alias: 'c', type: Number, defaultValue: 10},
]);

const connect = (url, message) => {
    const client = new ws.client();

    client.on('connectFailed', error => {
        console.error(`Connect Failed: ${error.toString()}`);
    });

    client.on('connect', connection => {
        console.info('Client Connected');

        connection.on('error', error => {
            console.error(`Connection Error: ${error.toString()}`);
        });

        connection.on('close', () => {
            console.info('Connection Closed');
        });

        connection.on('message', message => {
            if (message.type === 'utf8') {
                console.log(`${connection.remoteAddress}: ${message.utf8Data}`);
            }
        });

        connection.sendUTF(message);
    });

    client.connect(url);
};

const url = 'ws://localhost:5000/player/match';
const promises = Array.from({length: options.count}).map(() =>
    new Promise(() => {
        return connect(url, JSON.stringify({
            alias: randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            })
        }));
    }));

Promise.all(promises)
    .then(() => console.log("all good"))
    .catch(() => console.error("oh shit"));
