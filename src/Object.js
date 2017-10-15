'use strict';

let THREE = require('three');

let threeObject3DSymbol = Symbol();
class Object {

    get threeObject() {
        return (this[threeObject3DSymbol]);
    }

    set threeObject(object) {
        this[threeObject3DSymbol] = object;
    }

    constructor() {
        this[threeObject3DSymbol] = null;
    }

    // return: THREE.Vector3
    GetPosition() {
        return (this[threeObject3DSymbol].position);
    }

    // param: THREE.Vector3
    SetPosition(position) {
        this[threeObject3DSymbol].position.x = position.x;
        this[threeObject3DSymbol].position.y = position.y;
        this[threeObject3DSymbol].position.z = position.z;
    }

    // param: THREE.Vector3
    Move(movement) {
        this[threeObject3DSymbol].translateX(movement.x);
        this[threeObject3DSymbol].translateY(movement.y);
        this[threeObject3DSymbol].translateZ(movement.z);
    }

    // return: THREE.Vector3
    GetRotation() {
        return (this[threeObject3DSymbol].rotation);
    }

    // param: THREE.Vector3
    SetRotation(rotation) {
        this[threeObject3DSymbol].setRotationFromEuler(rotation);
    }

    // param: THREE.Vector3
    Rotate(rotation) {
        this[threeObject3DSymbol].rotateX(rotation.x);
        this[threeObject3DSymbol].rotateY(rotation.y);
        this[threeObject3DSymbol].rotateZ(rotation.z);
    }

    // return: THREE.Vector3
    GetScale() {
        return (this[threeObject3DSymbol].scale);
    }

    // param: THREE.Vector3
    SetScale(scale) {
        this[threeObject3DSymbol].scale.x = scale.x;
        this[threeObject3DSymbol].scale.y = scale.y;
        this[threeObject3DSymbol].scale.z = scale.z;
    }

    // param: THREE.Vector3
    Scale(scale) {
        this[threeObject3DSymbol].scale.x += scale.x;
        this[threeObject3DSymbol].scale.y += scale.y;
        this[threeObject3DSymbol].scale.z += scale.z;
    }

    // param: THREE.PositionalAudio
    // Add a positional audio the the object
    AddPositionalAudio(audio) {
        if (typeof audio !== 'undefined' && audio instanceof THREE.PositionalAudio) {
            this[threeObject3DSymbol].add(audio);
        }
        else {
            console.error('Object::AddPositionalAudio: \'audio\' is undefined or not of type THREE.PositionalAudio');
        }
    }
}

export default Object;
