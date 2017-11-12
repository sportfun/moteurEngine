/* eslint-disable */
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
    describe('.SetFOV(fov) / .GetFOV()', () => {
        let camera;
        let defaultFOV;

        beforeEach(() => {
            camera = new Camera();
            defaultFOV = camera.GetFOV();
        });

        it('checks default fov', () => {
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('checks fov when passing positive number', () => {
            camera.SetFOV(60);
            camera.GetFOV().should.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetFOV(-60);
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('checks fov when passing string', () => {
            camera.SetFOV('wrong');
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('checks fov when passing undefined', () => {
            camera.SetFOV(undefined);
            camera.GetFOV().should.equal(defaultFOV);
        });

        it('checks fov when passing null', () => {
            camera.SetFOV(null);
            camera.GetFOV().should.equal(defaultFOV);
        });
    });
    describe('.SetAspectRatio(aspectRatio) / .GetAspectRatio()', () => {
        let camera;
        let defaultAspectRatio;

        beforeEach(() => {
            camera = new Camera();
            defaultAspectRatio = camera.GetAspectRatio();
        });

        it('checks default aspect ratio', () => {
            camera.GetAspectRatio().should.equal(defaultAspectRatio);
        });

        it('checks fov when passing positive number', () => {
            camera.SetAspectRatio(60);
            camera.GetAspectRatio().should.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetAspectRatio(-60);
            camera.GetAspectRatio().should.equal(defaultAspectRatio);
        });

        it('checks fov when passing string', () => {
            camera.SetAspectRatio('wrong');
            camera.GetAspectRatio().should.equal(defaultAspectRatio);
        });

        it('checks fov when passing undefined', () => {
            camera.SetAspectRatio(undefined);
            camera.GetAspectRatio().should.equal(defaultAspectRatio);
        });

        it('checks fov when passing null', () => {
            camera.SetAspectRatio(null);
            camera.GetAspectRatio().should.equal(defaultAspectRatio);
        });
    });
    describe('.SetNearPlane(nearPlane) / .GetNearPlane()', () => {
        let camera;
        let defaultNearPlane;

        beforeEach(() => {
            camera = new Camera();
            defaultNearPlane = camera.GetNearPlane();
        });

        it('checks default aspect ratio', () => {
            camera.GetNearPlane().should.equal(defaultNearPlane);
        });

        it('checks fov when passing positive number', () => {
            camera.SetNearPlane(60);
            camera.GetNearPlane().should.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetNearPlane(-60);
            camera.GetNearPlane().should.equal(defaultNearPlane);
        });

        it('checks fov when passing string', () => {
            camera.SetNearPlane('wrong');
            camera.GetNearPlane().should.equal(defaultNearPlane);
        });

        it('checks fov when passing undefined', () => {
            camera.SetNearPlane(undefined);
            camera.GetNearPlane().should.equal(defaultNearPlane);
        });

        it('checks fov when passing null', () => {
            camera.SetNearPlane(null);
            camera.GetNearPlane().should.equal(defaultNearPlane);
        });
    });
    describe('.SetFarPlane(farPlane) / .GetFarPlane()', () => {
        let camera;
        let defaultFarPlane;

        beforeEach(() => {
            camera = new Camera();
            defaultFarPlane = camera.GetFarPlane();
        });

        it('checks default aspect ratio', () => {
            camera.GetFarPlane().should.equal(defaultFarPlane);
        });

        it('checks fov when passing positive number', () => {
            camera.SetFarPlane(60);
            camera.GetFarPlane().should.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetFarPlane(-60);
            camera.GetFarPlane().should.equal(defaultFarPlane);
        });

        it('checks fov when passing string', () => {
            camera.SetFarPlane('wrong');
            camera.GetFarPlane().should.equal(defaultFarPlane);
        });

        it('checks fov when passing undefined', () => {
            camera.SetFarPlane(undefined);
            camera.GetFarPlane().should.equal(defaultFarPlane);
        });

        it('checks fov when passing null', () => {
            camera.SetFarPlane(null);
            camera.GetFarPlane().should.equal(defaultFarPlane);
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
