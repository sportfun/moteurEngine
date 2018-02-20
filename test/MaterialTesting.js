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



describe('Material', () => {

    describe('.SetOpacity', () => {
        let material;
        
        beforeEach(() => {
            material = new Material();
        });

        it('checks .SetOpacity without parameters ', () => {
            material.SetOpacity();
            expect(material.threeObject.opacity).to.be.a('number').that.is.equal(1.0);
        });

        it('checks .SetOpacity with wrong parameters ', () => {
            material.SetOpacity(-100);
            expect(material.threeObject.opacity).to.be.a('number').that.is.equal(1.0);
        });

        it('checks .SetOpacity with good parameters ', () => {
            material.SetOpacity(0.5);
            expect(material.threeObject.opacity).to.be.a('number').that.is.equal(0.5);
        });
    });

    describe('.SetAffectedByLights', () => {
        let material;
        
        beforeEach(() => {
            material = new Material();
        });

        it('checks .SetAffectedByLights without parameters ', () => {
            material.SetAffectedByLights();
            expect(material.threeObject.lights).to.be.equal(true);
        });

        it('checks .SetAffectedByLights with good parameters ', () => {
            material.SetAffectedByLights(null);
            expect(material.threeObject.lights).to.be.equal(true);
        });
        
        it('checks .SetAffectedByLights with bad parameters ', () => {
            material.SetAffectedByLights("qwqeqew");
            expect(material.threeObject.lights).to.be.equal(true);
        });

        it('checks .SetAffectedByLights with good parameters (true)', () => {
            material.SetAffectedByLights(true);
            expect(material.threeObject.lights).to.be.equal(true);
        });

        it('checks .SetAffectedByLights with good parameters (false) ', () => {
            material.SetAffectedByLights(false);
            expect(material.threeObject.lights).to.be.equal(false);
        });
    });
});
