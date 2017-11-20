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


describe('GameObject', () => {
    describe('.constructor', () => {
    });

    describe('.Update()', () => {
    });

    describe('.SetPosition()', () => {
        let gameObject;
        let light;

        beforeEach(() => {
            gameObject = new GameObject();
            light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.0);
            gameObject.threeObject = light;
        });

        it('checks .SetPosition with undefined', () => {
            gameObject.SetPosition();
            expect(gameObject.threeObject.position).to.be.a('Object');
        });

        it('checks .SetPosition with null', () => {
            gameObject.SetPosition(null);
            expect(gameObject.threeObject.position).to.be.a('Object');
        });

        it('checks .SetPosition with good parameters', () => {
            gameObject.SetPosition(new THREE.Vector3(1, 2, 3));
            expect(gameObject.threeObject.position.x).to.be.a('number').that.is.equal(1);
            expect(gameObject.threeObject.position.y).to.be.a('number').that.is.equal(2);
            expect(gameObject.threeObject.position.z).to.be.a('number').that.is.equal(3);
        });

        it('checks .SetPosition with bad parameters', () => {
            gameObject.SetPosition(1, 2, 3);
            expect(gameObject.threeObject.position).to.be.a('Object');
        });
    });

    describe('.Move()', () => {
        let gameObject;
        let light;
        let origin;
        
        beforeEach(() => {
            gameObject = new GameObject();
            light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.0);
            gameObject.threeObject = light;
            origin = new THREE.Vector3(light.position);

        });

    });

    describe('.SetRotation()', () => {
        let gameObject;
        let light;

        beforeEach(() => {
            gameObject = new GameObject();
            light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.0);
            gameObject.threeObject = light;
        });

        it('checks .SetRotation when passing undefined', () => {
            gameObject.SetRotation();
            expect(gameObject.threeObject.rotation.x).to.be.a('number');
        });

        it('checks .SetRotation when passing negative number', () => {
            gameObject.SetRotation(new THREE.Vector3(-3, -5, -1));
            expect(gameObject.GetRotation().x).to.be.a('number').that.is.equal(-3);
            expect(gameObject.GetRotation().y).to.be.a('number').that.is.equal(-5);
            expect(gameObject.GetRotation().z).to.be.a('number').that.is.equal(-1);
        });

        it('checks .SetRotation when passing bas arguments', () => {
            gameObject.SetRotation(5, -5, -1);
            expect(gameObject.threeObject.rotation.x).to.be.a('number').that.is.equal(0);
            expect(gameObject.threeObject.rotation.y).to.be.a('number').that.is.equal(0);
            expect(gameObject.threeObject.rotation.z).to.be.a('number').that.is.equal(0);
        });
    });

    describe('.Rotate()', () => {
        let gameObject;

        beforeEach(() => {
            gameObject = new GameObject();
        });
    });

    describe('.Scale()', () => {
        let gameObject;

        beforeEach(() => {
            gameObject = new GameObject();
        });
    });

    describe('.SetScale()', () => {
        let gameObject;

        beforeEach(() => {
            gameObject = new GameObject();
        });

        it('check .SetScale with undefineds', () => {

        });
    });

   /* describe('.AddPositionalAudio()', () => {
        let gameObject;

        beforeEach(() => {
            gameObject = new GameObject();
        });
    });*/
});