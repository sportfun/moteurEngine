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
import Vector3 from '../src/Physics/Vector3.js';

describe('Vector3', () => {
    let vector;
    let defaultVector;

    beforeEach(() => {
        vector = new Vector3(0, 90, 0);
        defaultVector = new Vector3(0, 90, 0);
    });

    describe('.threeObject', () => {
        it('check correct type', () => {
            let tmp = new THREE.Vector3(0, 90, 0);
            vector.threeObject.x.should.be.equal(tmp.x);
            vector.threeObject.y.should.be.equal(tmp.y);
            vector.threeObject.z.should.be.equal(tmp.z);
        });
    });

    describe('.x', () => {
        it('set valid number', () => {
            vector.x = 42;
            vector.x.should.be.equal(42);
        });

        it('set undefined', () => {
            vector.x = undefined;
            vector.x.should.be.equal(defaultVector.x);
        });

        it('set null', () => {
            vector.x = null;
            vector.x.should.be.equal(defaultVector.x);
        });

        it('set wrong parameter type', () => {
            vector.x = 'hello';
            vector.x.should.be.equal(defaultVector.x);
        });
    });

    describe('.y', () => {
        it('set valid number', () => {
            vector.y = 42;
            vector.y.should.be.equal(42);
        });

        it('set undefined', () => {
            vector.y = undefined;
            vector.y.should.be.equal(defaultVector.y);
        });

        it('set null', () => {
            vector.y = null;
            vector.y.should.be.equal(defaultVector.y);
        });

        it('set wrong parameter type', () => {
            vector.y = 'hello';
            vector.y.should.be.equal(defaultVector.y);
        });
    });

    describe('.z', () => {
        it('set valid number', () => {
            vector.z = 42;
            vector.z.should.be.equal(42);
        });

        it('set undefined', () => {
            vector.z = undefined;
            vector.z.should.be.equal(defaultVector.z);
        });

        it('set null', () => {
            vector.z = null;
            vector.z.should.be.equal(defaultVector.z);
        });

        it('set wrong parameter type', () => {
            vector.z = 'hello';
            vector.z.should.be.equal(defaultVector.z);
        });
    });

    describe('.Multiply', () => {
        it ('check return value with number', () => {
            let result = vector.Multiply(3);
            result.x.should.be.equal(defaultVector.x * 3);
            result.y.should.be.equal(defaultVector.y * 3);
            result.z.should.be.equal(defaultVector.z * 3);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with Vector3', () => {
            let result = vector.Multiply(new Vector3(2, 3, 4));
            result.x.should.be.equal(defaultVector.x * 2);
            result.y.should.be.equal(defaultVector.y * 3);
            result.z.should.be.equal(defaultVector.z * 4);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with wrong parameter type', () => {
            let result = vector.Multiply('string');
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with null parameter', () => {
            let result = vector.Multiply(null);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with undefined parameter', () => {
            let result = vector.Multiply(undefined);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });
    });

    describe('.Sub', () => {
        it ('check return value with number', () => {
            let result = vector.Sub(3);
            result.x.should.be.equal(defaultVector.x - 3);
            result.y.should.be.equal(defaultVector.y - 3);
            result.z.should.be.equal(defaultVector.z - 3);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with Vector3', () => {
            let result = vector.Sub(new Vector3(2, 3, 4));
            result.x.should.be.equal(defaultVector.x - 2);
            result.y.should.be.equal(defaultVector.y - 3);
            result.z.should.be.equal(defaultVector.z - 4);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with wrong parameter type', () => {
            let result = vector.Sub('string');
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with null parameter', () => {
            let result = vector.Sub(null);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with undefined parameter', () => {
            let result = vector.Sub(undefined);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });
    });

    describe('.Add', () => {
        it ('check return value with number', () => {
            let result = vector.Add(3);
            result.x.should.be.equal(defaultVector.x + 3);
            result.y.should.be.equal(defaultVector.y + 3);
            result.z.should.be.equal(defaultVector.z + 3);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with Vector3', () => {
            let result = vector.Add(new Vector3(2, 3, 4));
            result.x.should.be.equal(defaultVector.x + 2);
            result.y.should.be.equal(defaultVector.y + 3);
            result.z.should.be.equal(defaultVector.z + 4);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with wrong parameter type', () => {
            let result = vector.Add('string');
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with null parameter', () => {
            let result = vector.Add(null);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });

        it ('check return value with undefined parameter', () => {
            let result = vector.Add(undefined);
            result.x.should.be.equal(defaultVector.x);
            result.y.should.be.equal(defaultVector.y);
            result.z.should.be.equal(defaultVector.z);
            vector.x.should.be.equal(defaultVector.x);
            vector.y.should.be.equal(defaultVector.y);
            vector.z.should.be.equal(defaultVector.z);
        });
    });

    describe('.IsZero', () => {
        it ('check return value when non equal to zero', () => {
            vector.IsZero().should.be.false;
        });

        it ('check return value when default Vector3', () => {
            vector = new Vector3();
            vector.IsZero().should.be.true;
        });

        it ('check return value when values set to 0', () => {
            vector.x = 0;
            vector.y = 0;
            vector.z = 0;
            vector.IsZero().should.be.true;
        });
    });

    describe('.CorrectCloseZero', () => {
        it ('check value when not close to zero', () => {
            vector.CorrectCloseZero();
            vector.IsZero().should.be.false;
        });

        it ('check value when close to zero', () => {
            vector.x = Math.exp(-6);
            vector.y = Math.exp(-6);
            vector.z = Math.exp(-6);
            vector.CorrectCloseZero();
            vector.IsZero().should.be.true;
        });
    });

    describe('.ToString', () => {
        it ('check value', () => {
            vector.ToString().should.be.equal('(' + vector.x + ', ' + vector.y + ', ' + vector.z + ')');
        });
    });
});

describe('Audio', () => {
});

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

describe('Framework', () => {
    require('./FrameworkTesting.js');
});

describe('GameObject', () => {
    require('./GameObjectTesting.js');
});

describe('Material', () => {
    require('./MaterialTesting.js');
});

describe('ParticleSystem', () => {
});

describe('Scene', () => {
});
