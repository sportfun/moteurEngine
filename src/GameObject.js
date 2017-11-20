'use strict';

let THREE = require('three');

import { logError, isValidType } from '../src/Utils.js';

let threeObject3DSymbol = Symbol();
class GameObject {

    get threeObject() {
        return (this[threeObject3DSymbol]);
    }

    set threeObject(object) {
        this[threeObject3DSymbol] = object;
    }

    constructor() {
        this[threeObject3DSymbol] = null;
    }

    // param: number
    // Called every frame, update the state of the camera
    // Override 'UpdateOverride' to customize the update
    Update(elapsedDeltaTime) {
        if (typeof this.UpdateOverride === 'function')
            this.UpdateOverride(elapsedDeltaTime);
        if (isValidType(this.rigidbody, 'Rigidbody'))
            this.rigidbody.Update(elapsedDeltaTime);
    }

    // param: Rigidbody
    // Set a rigidbody to this GameObject
    SetRigidbody(rigidbody) {
        if (isValidType(rigidbody, 'Rigidbody')) {
            this.rigidbody = rigidbody;
            this.rigidbody.SetGameObject(this);
        }
        else {
            logError('GameObject::AddRigidbody: Can\'t add rigidbody of type ' + rigidbody.constructor.name);
        }
    }

    // return: THREE.Vector3
    GetPosition() {
        return (this[threeObject3DSymbol].position);
    }

    // param: THREE.Vector3
    SetPosition(position) {
        if (position && typeof position == 'object'){
            this[threeObject3DSymbol].position.x = position.x;
            this[threeObject3DSymbol].position.y = position.y;
            this[threeObject3DSymbol].position.z = position.z;
        }
    }

    // param: THREE.Vector3
    Move(movement) {
        if (movement && typeof movement === 'object'){
            this[threeObject3DSymbol].translateX(movement.x);
            this[threeObject3DSymbol].translateY(movement.y);
            this[threeObject3DSymbol].translateZ(movement.z);
        }
    }

    // return: THREE.Vector3
    GetRotation() {
        return (this[threeObject3DSymbol].rotation);
    }

    // param: THREE.Vector3
    SetRotation(rotation) {
        if (rotation && typeof rotation === "object"){
            this[threeObject3DSymbol].rotation.x = rotation.x;
            this[threeObject3DSymbol].rotation.y = rotation.y;
            this[threeObject3DSymbol].rotation.z = rotation.z;
            this[threeObject3DSymbol].matrixAutoUpdate = true;
        }
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
            logError('GameObject::AddPositionalAudio: \'audio\' is undefined or not of type THREE.PositionalAudio');
        }
    }
}

export default GameObject;
