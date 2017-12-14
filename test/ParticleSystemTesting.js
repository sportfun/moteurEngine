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
import Vector3 from '../src//Physics/Vector3.js';

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

        it('checks .Position with good parameters', () => {
            particleSystem.Position = new Vector3(1, 2, 3);
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(1);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(2);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(3);

        });
    });

    describe('.PositionRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .PositionRandomness with undefined', () => {
            particleSystem.PositionRandomness = undefined;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness wrong parameter ', () => {
            particleSystem.PositionRandomness = 5;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness wrong parameter ', () => {
            particleSystem.PositionRandomness = -34;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness good parameter ', () => {
            particleSystem.PositionRandomness = 0.5;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.5);
        });
    });

    describe('.Velocity', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Velocity with undefined', () => {
            particleSystem.Velocity = undefined;
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Velocity with wrong parameters', () => {
            particleSystem.Velocity = 3;
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Velocity with our Vector3 class', () => {
            particleSystem.Velocity = new Vector3(4, 13, 3);
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(4);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(13);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(3);
        });

        it('checks .Velocity with THREE Vector3 class', () => {
            particleSystem.Velocity = new THREE.Vector3(2, 6, 9);
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(2);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(6);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(9);
        });
    });

    describe('.VelocityRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Velocity with undefined', () => {
            particleSystem.VelocityRandomness = undefined;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with wrong parameters over 1', () => {
            particleSystem.VelocityRandomness = 2;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with wrong parameters negatives', () => {
            particleSystem.VelocityRandomness = -3;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with good parameters', () => {
            particleSystem.VelocityRandomness = 0.7;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.7);
        });
    });

    describe('.Color', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });
    });


});

