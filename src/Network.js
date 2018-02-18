'use strict';

let io = require('socket.io-client');

// class Network {
//     constructor() {
let socket = new io.connect('ws://149.202.41.22:8080', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999
});

socket.on('connect', () => { console.log('+ Client has connected to the server (149.202.41.22:8080).'); });
socket.on('hi', () => { console.log('hi'); });
socket.on('message', (data) => { console.log('  Client has received data from the server (149.202.41.22:8080): ', data); });
socket.on('disconnect', () => { console.log('- Client has disconnected to the server (149.202.41.22:8080).'); });
//     }
// }

// export default Network;
