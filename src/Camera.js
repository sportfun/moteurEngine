'use strict';

let THREE = require('three');

import { log } from '../src/Utils.js';
import GameObject from '../src/GameObject.js';

let threeCameraSymbol = Symbol();
class Camera extends GameObject {

    get threeObject() {
        return (this[threeCameraSymbol]);
    }

    constructor() {
        super();
        this[threeCameraSymbol] = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        super.threeObject = this[threeCameraSymbol];
        log('Camera: Successfully created');
    }

    Clean() {
        delete (this[threeCameraSymbol]);
        log('Camera: Successfully deleted');
    }

    // param: number
    // Called every frame, update the state of the camera
    // Override 'UpdateOverride' to customize the update
    Update(elapsedDeltaTime) {
        if (typeof this.UpdateOverride === 'function')
            this.UpdateOverride(elapsedDeltaTime);
    }

    // param: Vector3
    // Make the camera look at the given position
    LookAt(target) {
        if (typeof target === 'undefined') {
            console.error('Camera::LookAt: \'target\' is undefined');
            return;
        }
        if (typeof target.threeObject !== 'undefined')
            this[threeCameraSymbol].lookAt(target.threeObject);
        else if (target instanceof THREE.Object3D)
            this[threeCameraSymbol].lookAt(target.position);
        else if (target instanceof THREE.Vector3)
            this[threeCameraSymbol].lookAt(target);
        else
            log('Camera: LookAt\'s target is not valid');
    }

    // param: number
    // Set the camera's field of view (FOV)
    SetFOV(fov) {
        if (typeof fov === 'undefined' || fov === null || isNaN(fov))
            log('Camera: FOV value is not a number');
        else
            this[threeCameraSymbol].fov = fov;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // Return the camera's field of view (FOV)
    GetFOV() {
        return (this[threeCameraSymbol].fov);
    }

    // param: number
    // Set the camera's aspect ration (16/9, 4/3, 21/9...)
    SetAspectRatio(aspectRatio) {
        if (isNaN(aspectRatio))
            log('Camera: Aspect ratio value is not a number');
        else
            this[threeCameraSymbol].aspect = aspectRatio;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's near plane (minimal distance for an object to appear)
    SetNearPlane(nearPlane) {
        if (isNaN(nearPlane))
            log('Camera: Near plane value is not a number');
        else
            this[threeCameraSymbol].near = nearPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's far plane (maximal distance for an object to appear)
    SetFarPlane(farPlane) {
        if (isNaN(farPlane))
            log('Camera: Far plane value is not a number');
        else
            this[threeCameraSymbol].far = farPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's zoom
    SetZoom(zoom) {
        if (isNaN(zoom))
            log('Camera: Zoom value is not a number');
        else
            this[threeCameraSymbol].zoom = zoom;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: THREE.AudioListener
    // Add an audio listener to the camera
    AddAudioListener(audioListener) {
        if (typeof audioListener === 'undefined') {
            console.error('Camera::AddAudioListener: \'audioListener\' is undefined');
            return;
        }
        if (audioListener instanceof THREE.AudioListener) {
            this[threeCameraSymbol].add(audioListener);
            this.audioListener = audioListener;
        }
        else {
            console.error('Camera::AddAudioListener: unknown type for \'audioListener\'');
        }
    }

    // Return the audio listener of the camera if there is one
    GetAudioListener() {
        return (this.audioListener);
    }
}

export default Camera;
