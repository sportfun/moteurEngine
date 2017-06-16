'use strict';

var THREE = require('three');
import Camera from 'Camera.js';

class Scene {

    get threeObject() {
        return (this.threeScene);
    }

    get camera() {
        return (this.mainCamera);
    }

    // param: string
    constructor(name) {
        this.name = name;
        this.threeScene = new THREE.Scene();
        this.mainCamera = undefined;
        console.log('Scene ' + this.name + ' successfully created');
    }

    Clean() {
        delete (this.threeScene);
        console.log('Scene ' + this.name + ' successfully deleted');
    }

    AddModel(model) {
    }

    // param: Camera
    AddCamera(camera) {
        if (typeof camera !== 'undefined' && camera instanceof Camera) { // Check if camera is declared and is a Camera object
            if (this.mainCamera === undefined) // Set the camera used for rendering if there's none
                this.mainCamera = camera;
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
