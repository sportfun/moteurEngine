'use strict';

let THREE = require('three');

import { log, logError, isValidType } from '../src/Utils.js';
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
        this.audioListeners = [];
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
        if (typeof target === 'undefined' || target === null) {
            logError('Camera::LookAt: \'target\' is undefined');
            return;
        }
        if (typeof target.threeObject !== 'undefined')
            this[threeCameraSymbol].lookAt(target.threeObject);
        else if (isValidType(target, 'THREE.Object3D'))
            this[threeCameraSymbol].lookAt(target.position);
        else if (isValidType(target, 'THREE.Vector3'))
            this[threeCameraSymbol].lookAt(target);
        else
            log('Camera: LookAt\'s target is not valid');
    }

    // param: number
    // Set the camera's field of view (FOV)
    SetFOV(fov) {
        if (typeof fov === 'undefined' || fov === null || isNaN(fov) || fov <= 0)
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
    // Set the camera's aspect ratio (16/9, 4/3, 21/9...)
    SetAspectRatio(aspectRatio) {
        if (typeof aspectRatio === 'undefined' || aspectRatio === null || isNaN(aspectRatio) || aspectRatio <= 0)
            log('Camera: Aspect ratio value is not a number');
        else
            this[threeCameraSymbol].aspect = aspectRatio;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // Return the camera's aspect ratio
    GetAspectRatio() {
        return (this[threeCameraSymbol].aspect);
    }

    // param: number
    // Set the camera's near plane (minimal distance for an object to appear)
    SetNearPlane(nearPlane) {
        if (typeof nearPlane === 'undefined' || nearPlane === null || isNaN(nearPlane) || nearPlane <= 0)
            log('Camera: Near plane value is not a number');
        else
            this[threeCameraSymbol].near = nearPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // Return the camera's near plane
    GetNearPlane() {
        return (this[threeCameraSymbol].near);
    }

    // param: number
    // Set the camera's far plane (maximal distance for an object to appear)
    SetFarPlane(farPlane) {
        if (typeof farPlane === 'undefined' || farPlane === null || isNaN(farPlane) || farPlane <= 0)
            log('Camera: Far plane value is not a number');
        else
            this[threeCameraSymbol].far = farPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // Return the camera's far plane
    GetFarPlane() {
        return (this[threeCameraSymbol].far);
    }

    // param: number
    // Set the camera's zoom
    SetZoom(zoom) {
        if (typeof zoom === 'undefined' || zoom === null || isNaN(zoom) || zoom <= 0)
            log('Camera: Zoom value is not a number');
        else
            this[threeCameraSymbol].zoom = zoom;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // Return the camera's zoom
    GetZoom() {
        return (this[threeCameraSymbol].zoom);
    }

    // param: THREE.AudioListener
    // Add an audio listener to the camera
    AddAudioListener(audioListener) {
        if (typeof audioListener === 'undefined') {
            logError('Camera::AddAudioListener: \'audioListener\' is undefined');
            return;
        }
        if (audioListener instanceof THREE.AudioListener) {
            this[threeCameraSymbol].add(audioListener);
            this.audioListeners.add(audioListener);
        }
        else {
            logError('Camera::AddAudioListener: unknown type for \'audioListener\'');
        }
    }

    // Return the audio listener of the camera if there is one
    GetAudioListeners() {
        return (this.audioListeners);
    }
}

export default Camera;
