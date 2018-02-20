'use strict';

process.env.NODE_ENV = 'test';
let expect = require('chai').expect;
import Network from '../src/Network.js';

describe('Network', () => {
    describe('.connect', () => {
        let network;
        let user;

        beforeEach(() => {
            network = new Network();
        });
        it('connect with good credentials', () => {
            user = {username: 'test', password:'test'};
            network.connect(user);
            expect(network.token).to.be.a('string').not.empty;
        });
        it('connect with bad credentials', () => {
            user = {username: 'this is not a good credential', password: 'neither I bruh'};
            network.connect(user);
            expect(network.token).to.be.equal('');
        });
    });
});
