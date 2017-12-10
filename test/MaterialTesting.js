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

    describe('.SetTransparent', () => {
        let material;
        
        beforeEach(() => {
            material = new Material();
        });

        // it('checks .SetTransparent without parameters ', () => {
        //     material.SetTransparent();
        //     expect(material.transparent).to.be.equal(false);
        // });

        // it('checks .SetTransparent with bad parameters ', () => {
        //     material.SetTransparent("qw");
        //     expect(material.transparent).to.be.equal(false);
        // });

        // it('checks .SetTransparent with good parameters ', () => {
        //     material.SetTransparent("qw");
        //     expect(material.transparent).to.be.equal(true);
        // });
    });

    describe('.SetAffectedByLights', () => {
        let material;
        
        beforeEach(() => {
        });

        it('checks .SetAffectedByLights without parameters ', () => {
        });

        it('checks .SetAffectedByLights with bad parameters ', () => {
        });

        it('checks .SetAffectedByLights with good parameters ', () => {
        });
    });
});