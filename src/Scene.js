'use strict';

var THREE = require('three');

import Camera from '../src/Camera.js';

var threeSceneSymbol = Symbol();
var mainCameraSymbol = Symbol();
class Scene {

    get threeObject() {
        return (this[threeSceneSymbol]);
    }

    get camera() {
        return (this[mainCameraSymbol]);
    }

    // param: string
    constructor(name) {
        this.name = name;
        this[threeSceneSymbol] = new THREE.Scene();
        this[mainCameraSymbol] = undefined;
        this.cameras = [];
        this.objects = [];
        console.log('Scene ' + this.name + ' successfully created');
    }

    Clean() {
        this.cameras.forEach(function(camera) {
            camera.Clean();
        }, this);
        delete (this.cameras); // not sure

        delete (this[threeSceneSymbol]);
        console.log('Scene ' + this.name + ' successfully deleted');
    }

    // Called every frame by Framework if the scene is in use
    // elapsedDeltaTime is the time passed since last frame in milliseconds
    // param: float
    Update(elapsedDeltaTime) {
    }

    AddModel(model) {
        // TODO(BoraxKid): Check model before continuing
        this.objects.push(model);
        this[threeSceneSymbol].add(model);
    }

    // param: Camera
    AddCamera(camera) {
        if (typeof camera !== 'undefined' && camera instanceof Camera) { // Check if camera is declared and is a Camera object
            if (this[mainCameraSymbol] === undefined) // Set the camera used for rendering if there's none
                this[mainCameraSymbol] = camera;
            this.cameras.push(camera);
        }
    }

    SetBackgroundColor(color) {
    }

    SetBackgroundTexture(texture) {
    }
    
    SetBackgroundCubeTexture(cubeTexture) {
    }
}

export default Scene;
