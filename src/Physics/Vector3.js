'use strict';

let THREE = require('three');

import { isValidNumber, isValidType } from '../../src/Utils.js';

let threeVector3Symbol = Symbol();
class Vector3 {

    get threeObject() {
        return (this[threeVector3Symbol]);
    }

    constructor(x, y, z) {
        if (isValidNumber(x) && isValidNumber(y) && isValidNumber(z))
            this[threeVector3Symbol] = new THREE.Vector3(x, y, z);
        else
            this[threeVector3Symbol] = new THREE.Vector3();
    }

    get x() {
        return (this[threeVector3Symbol].x);
    }

    set x(value) {
        if (isValidNumber(value))
            this[threeVector3Symbol].x = value;
    }

    get y() {
        return (this[threeVector3Symbol].y);
    }

    set y(value) {
        if (isValidNumber(value))
            this[threeVector3Symbol].y = value;
    }

    get z() {
        return (this[threeVector3Symbol].z);
    }

    set z(value) {
        if (isValidNumber(value))
            this[threeVector3Symbol].z = value;
    }

    Multiply(value) {
        if (isValidNumber(value))
            return (new Vector3(this[threeVector3Symbol].x * value, this[threeVector3Symbol].y * value, this[threeVector3Symbol].z * value));
        else if (isValidType(value, 'Vector3'))
            return (new Vector3(this[threeVector3Symbol].x * value.x, this[threeVector3Symbol].y * value.y, this[threeVector3Symbol].z * value.z));
        return (new Vector3(this[threeVector3Symbol].x, this[threeVector3Symbol].y, this[threeVector3Symbol].z));
    }

    Sub(value) {
        if (isValidNumber(value))
            return (new Vector3(this[threeVector3Symbol].x - value, this[threeVector3Symbol].y - value, this[threeVector3Symbol].z - value));
        else if (isValidType(value, 'Vector3'))
            return (new Vector3(this[threeVector3Symbol].x - value.x, this[threeVector3Symbol].y - value.y, this[threeVector3Symbol].z - value.z));
        return (new Vector3(this[threeVector3Symbol].x, this[threeVector3Symbol].y, this[threeVector3Symbol].z));
    }

    Add(value) {
        if (isValidNumber(value))
            return (new Vector3(this[threeVector3Symbol].x + value, this[threeVector3Symbol].y + value, this[threeVector3Symbol].z + value));
        else if (isValidType(value, 'Vector3'))
            return (new Vector3(this[threeVector3Symbol].x + value.x, this[threeVector3Symbol].y + value.y, this[threeVector3Symbol].z + value.z));
        return (new Vector3(this[threeVector3Symbol].x, this[threeVector3Symbol].y, this[threeVector3Symbol].z));
    }

    IsZero() {
        if (this[threeVector3Symbol].x == 0 && this[threeVector3Symbol].y == 0 && this[threeVector3Symbol].z == 0)
            return (true);
        return (false);
    }

    CorrectCloseZero() {
        let diff = Math.exp(-5);
        if (Math.abs(0 - this.x) < diff)
            this.x = 0;
        if (Math.abs(0 - this.y) < diff)
            this.y = 0;
        if (Math.abs(0 - this.z) < diff)
            this.z = 0;
    }

    ToString() {
        return ('(' + this[threeVector3Symbol].x + ', ' + this[threeVector3Symbol].y + ', ' + this[threeVector3Symbol].z + ')');
    }
}

export default Vector3;
