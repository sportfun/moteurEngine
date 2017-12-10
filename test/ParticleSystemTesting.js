/* eslint-disable */
'use strict';

process.env.NODE_ENV = 'test';

let should = require('chai').should();
let expect = require('chai').expect;

let THREE = require('three');

import Audio from '../src/Audio.js';
import Camera from '../src/Camera.js';
import Framework from '../src/Framework.js';
import GameObject from '../src/GameObject.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import Scene from '../src/Scene.js';

describe('ParticleSystem', () => {

    describe('.Position', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Position with undefined', () => {
            particleSystem.Position = undefined;
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Position with bad parameters', () => {
            particleSystem.Position = 1;
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(0);
        });
    });
});

