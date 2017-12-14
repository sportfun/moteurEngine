'use strict';

let should = require('chai').should();

let THREE = require('three');

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
