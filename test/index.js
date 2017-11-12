'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');

// Tell chai that we'll be using the "should" style assertions.
chai.should();

import Audio from '../src/Audio.js';
import Camera from '../src/Camera.js';
import Framework from '../src/Framework.js';
import GameObject from '../src/GameObject.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import Scene from '../src/Scene.js';

describe('Audio', () => {
});

describe('Camera', () => {
    describe('FOV', () => {
        let camera;
        let defaultFOV;

        beforeEach(() => {
            camera = new Camera();
            defaultFOV = camera.GetFOV();
        });

        it('Set valid FOV', () => {
            camera.SetFOV(60);
            camera.GetFOV().should.equal(60);
        });

        it('Set invalid FOV - string', () => {
            camera.SetFOV('wrong');
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('Set invalid FOV - undefined', () => {
            camera.SetFOV(undefined);
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('Set invalid FOV - null', () => {
            camera.SetFOV(null);
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('Get current FOV', () => {
            camera.SetFOV(60);
            camera.GetFOV().should.equal(60);
        });
    });
});

describe('Framework', () => {
});

describe('GameObject', () => {
});

describe('Material', () => {
});

describe('ParticleSystem', () => {
});

describe('Scene', () => {
});
