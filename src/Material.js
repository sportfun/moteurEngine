'use strict';

let THREE = require('three');

import { log } from '../src/Utils.js';

let threeMaterialSymbol = Symbol();
class Material {

    get threeObject() {
        return (this[threeMaterialSymbol]);
    }

    set threeObject(object) {
        this[threeMaterialSymbol] = object;
    }

    constructor() {
        this[threeMaterialSymbol] = new THREE.MeshBasicMaterial({ color: 0x0000ff});
    }

    // param: number
    // Set the opacity of the current material
    // opacity should be between 0.0 (transparent) and 1.0 (opaque)
    // If the transparent value of the Material is not set to true, this will have no effect
    // 1.0 by default
    SetOpacity(opacity) {
        if (!isNaN(opacity) && (opacity >= 0 && opacity <= 1)) {
            this[threeMaterialSymbol].opacity = opacity;
        }
        else
            log('Material: opacity value is not a Number');
    }

    // param: boolean
    // Defines wether this material is transparent
    // false by default
    SetTransparent(transparent) {
        this[threeMaterialSymbol].transparent = transparent;
    }

    // param: boolean
    // Defines wether the material is affected by lights
    // false by default
    SetAffectedByLights(affected) {
        if (affected === true || affected === false)
            this[threeMaterialSymbol].lights = affected;
    }
}

export default Material;
