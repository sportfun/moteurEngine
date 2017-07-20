'use strict';

var THREE = require('three');

import Object from '../src/Object.js';

var threeCameraSymbol = Symbol();
class Camera extends Object {

    get threeObject() {
        return (this[threeCameraSymbol]);
    }

    constructor() {
        super();
        this[threeCameraSymbol] = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        super.threeObject = this[threeCameraSymbol];
        console.log('Camera: Successfully created');
    }

    Clean() {
        delete (this[threeCameraSymbol]);
        console.log('Camera: Successfully deleted');
    }

    // param: number
    // Set the camera's field of view (FOV)
    SetFOV(fov) {
        if (isNaN(fov))
            console.log('Camera: FOV value is not a number');
        else
            this[threeCameraSymbol].fov = fov;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's aspect ration (16/9, 4/3, 21/9...)
    SetAspectRatio(aspectRatio) {
        if (isNaN(aspectRatio))
            console.log('Camera: Aspect ratio value is not a number');
        else
            this[threeCameraSymbol].aspect = aspectRatio;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's near plane (minimal distance for an object to appear)
    SetNearPlane(nearPlane) {
        if (isNaN(nearPlane))
            console.log('Camera: Near plane value is not a number');
        else
            this[threeCameraSymbol].near = nearPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's far plane (maximal distance for an object to appear)
    SetFarPlane(farPlane) {
        if (isNaN(farPlane))
            console.log('Camera: Far plane value is not a number');
        else
            this[threeCameraSymbol].far = farPlane;
        this[threeCameraSymbol].updateProjectionMatrix();
    }

    // param: number
    // Set the camera's zoom
    SetZoom(zoom) {
        if (isNaN(zoom))
            console.log('Camera: Zoom value is not a number');
        else
            this[threeCameraSymbol].zoom = zoom;
        this[threeCameraSymbol].updateProjectionMatrix();
    }
}

export default Camera;
