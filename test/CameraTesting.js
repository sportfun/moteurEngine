'use strict';

let expect = require('chai').expect;

let THREE = require('three');

import GameObject from '../src/GameObject.js';
import Camera from '../src/Camera.js';

describe('Camera', () => {
    describe('.threeObject', () => {
        let camera;

        beforeEach(() => {
            camera = new Camera();
        });

        it('wrap valid three.js object', () => {
            camera.threeObject.type.should.include('Camera');
        });
    });
    describe('constructor()', () => {
        it('checks inheritance', () => {
            GameObject.isPrototypeOf(Camera).should.be.true;
        });
    });
    describe('.Clean()', () => {
        let camera;

        beforeEach(() => {
            camera = new Camera();
        });

        it('checks .threeObject is undefined', () => {
            camera.Clean();
            expect(camera.threeObject).to.be.undefined;
        });
    });
    describe('.Update()', () => {
        let camera;

        beforeEach(() => {
            camera = new Camera();
        });

        // it('no UpdateOverride', () => {
        //     expect(camera.Update, 0).to.not.throw();
        // });

        // it('UpdateOverride', () => {
        //     let passedIn = false;
        //     camera.UpdateOverride = () => { passedIn = true; };
        //     expect(camera.Update, 0).to.not.throw();
        //     expect(passedIn).to.be.true;
        // });
    });
    describe('.LookAt(target)', () => {
        let camera;
        
        beforeEach(() => {
            camera = new Camera();
        });

        it ('null parameter', () => {
            expect(camera.LookAt, null).to.not.throw();
        });

        it ('undefined parameter', () => {
            expect(camera.LookAt, undefined).to.not.throw();
        });

        it ('THREE.Object3D parameter', () => {
            let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.Material);
            expect(camera.LookAt, cube).to.not.throw();
        });

        it ('THREE.Vector3 parameter', () => {
            expect(camera.LookAt, new THREE.Vector3()).to.not.throw();
        });

        it ('GameObject parameter', () => {
            expect(camera.LookAt, new GameObject()).to.not.throw();
        });
    });
    describe('.SetFOV(fov) / .GetFOV()', () => {
        let camera;
        let defaultFOV;

        beforeEach(() => {
            camera = new Camera();
            defaultFOV = camera.GetFOV();
        });

        it('checks default fov', () => {
            camera.GetFOV().should.be.a('number').that.is.equal(defaultFOV);
        });

        it('checks fov when passing positive number', () => {
            camera.SetFOV(60);
            camera.GetFOV().should.be.a('number').that.is.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetFOV(-60);
            camera.GetFOV().should.be.a('number').that.is.equal(defaultFOV);
        });

        it('checks fov when passing a string', () => {
            camera.SetFOV('wrong');
            camera.GetFOV().should.be.a('number').that.is.equal(defaultFOV);
        });

        it('checks fov when passing undefined', () => {
            camera.SetFOV(undefined);
            camera.GetFOV().should.be.a('number').that.is.equal(defaultFOV);
        });

        it('checks fov when passing null', () => {
            camera.SetFOV(null);
            camera.GetFOV().should.be.a('number').that.is.equal(defaultFOV);
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
            camera.GetAspectRatio().should.be.a('number').that.is.equal(defaultAspectRatio);
        });

        it('checks fov when passing positive number', () => {
            camera.SetAspectRatio(60);
            camera.GetAspectRatio().should.be.a('number').that.is.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetAspectRatio(-60);
            camera.GetAspectRatio().should.be.a('number').that.is.equal(defaultAspectRatio);
        });

        it('checks fov when passing a string', () => {
            camera.SetAspectRatio('wrong');
            camera.GetAspectRatio().should.be.a('number').that.is.equal(defaultAspectRatio);
        });

        it('checks fov when passing undefined', () => {
            camera.SetAspectRatio(undefined);
            camera.GetAspectRatio().should.be.a('number').that.is.equal(defaultAspectRatio);
        });

        it('checks fov when passing null', () => {
            camera.SetAspectRatio(null);
            camera.GetAspectRatio().should.be.a('number').that.is.equal(defaultAspectRatio);
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
            camera.GetNearPlane().should.be.a('number').that.is.equal(defaultNearPlane);
        });

        it('checks fov when passing positive number', () => {
            camera.SetNearPlane(60);
            camera.GetNearPlane().should.be.a('number').that.is.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetNearPlane(-60);
            camera.GetNearPlane().should.be.a('number').that.is.equal(defaultNearPlane);
        });

        it('checks fov when passing a string', () => {
            camera.SetNearPlane('wrong');
            camera.GetNearPlane().should.be.a('number').that.is.equal(defaultNearPlane);
        });

        it('checks fov when passing undefined', () => {
            camera.SetNearPlane(undefined);
            camera.GetNearPlane().should.be.a('number').that.is.equal(defaultNearPlane);
        });

        it('checks fov when passing null', () => {
            camera.SetNearPlane(null);
            camera.GetNearPlane().should.be.a('number').that.is.equal(defaultNearPlane);
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
            camera.GetFarPlane().should.be.a('number').that.is.equal(defaultFarPlane);
        });

        it('checks fov when passing positive number', () => {
            camera.SetFarPlane(60);
            camera.GetFarPlane().should.be.a('number').that.is.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetFarPlane(-60);
            camera.GetFarPlane().should.be.a('number').that.is.equal(defaultFarPlane);
        });

        it('checks fov when passing a string', () => {
            camera.SetFarPlane('wrong');
            camera.GetFarPlane().should.be.a('number').that.is.equal(defaultFarPlane);
        });

        it('checks fov when passing undefined', () => {
            camera.SetFarPlane(undefined);
            camera.GetFarPlane().should.be.a('number').that.is.equal(defaultFarPlane);
        });

        it('checks fov when passing null', () => {
            camera.SetFarPlane(null);
            camera.GetFarPlane().should.be.a('number').that.is.equal(defaultFarPlane);
        });
    });
    describe('.SetZoom(zoom) / .GetZoom()', () => {
        let camera;
        let defaultZoom;

        beforeEach(() => {
            camera = new Camera();
            defaultZoom = camera.GetZoom();
        });

        it('checks default aspect ratio', () => {
            camera.GetZoom().should.be.a('number').that.is.equal(defaultZoom);
        });

        it('checks fov when passing positive number', () => {
            camera.SetZoom(60);
            camera.GetZoom().should.be.a('number').that.is.equal(60);
        });

        it('checks fov when passing negative numer', () => {
            camera.SetZoom(-60);
            camera.GetZoom().should.be.a('number').that.is.equal(defaultZoom);
        });

        it('checks fov when passing a string', () => {
            camera.SetZoom('wrong');
            camera.GetZoom().should.be.a('number').that.is.equal(defaultZoom);
        });

        it('checks fov when passing undefined', () => {
            camera.SetZoom(undefined);
            camera.GetZoom().should.be.a('number').that.is.equal(defaultZoom);
        });

        it('checks fov when passing null', () => {
            camera.SetZoom(null);
            camera.GetZoom().should.be.a('number').that.is.equal(defaultZoom);
        });
    });
    describe('.AddAudioListener(audioListener) / .GetAudioListener()', () => {
        let camera;

        beforeEach(() => {
            camera = new Camera();
        });

        it('checks default audio listeners', () => {
            camera.GetAudioListeners().should.be.an('array').that.is.empty;
        });

        it('checks audio listeners when passing undefined', () => {
            camera.AddAudioListener(undefined);
            camera.GetAudioListeners().should.be.an('array').that.is.empty;
        });

        it('checks audio listeners when passing null', () => {
            camera.AddAudioListener(null);
            camera.GetAudioListeners().should.be.an('array').that.is.empty;
        });

        it('checks audio listeners when passing a string', () => {
            camera.AddAudioListener('wrong');
            camera.GetAudioListeners().should.be.an('array').that.is.empty;
        });

        it('checks audio listeners when passing a boolean', () => {
            camera.AddAudioListener(true);
            camera.GetAudioListeners().should.be.an('array').that.is.empty;
        });

        // it('checks audio listeners when passing a THREE.AudioListener', () => {
        //     let listener = new THREE.AudioListener();
        //     camera.AddAudioListener(listener);
        //     let result = camera.GetAudioListeners();
        //     result.should.be.an('array').to.have.lengthOf(1);
        //     result.should.be.an('array').to.have.all.keys(listener);
        // });
    });
});
