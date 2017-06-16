'use strict';

var THREE = require('three');
import Camera from '../src/Camera.js';

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
        this.cameras = [];
        console.log('Scene ' + this.name + ' successfully created');

        // Start of Temporary code
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.threeScene.add(this.cube);

        // End of Temporary code
    }

    Clean() {
        this.cameras.forEach(function(camera) {
            camera.Clean();
        }, this);
        delete (this.cameras); // not sure

        delete (this.threeScene);
        console.log('Scene ' + this.name + ' successfully deleted');
    }

    // Called every frame by Framework if the scene is in use
    // elapsedDeltaTime is the time passed since last frame in milliseconds
    // param: float
    Update(elapsedDeltaTime) {
        // Start of Temporary code
        this.cube.rotation.x += 1 * elapsedDeltaTime;
        this.cube.rotation.y += 1 * elapsedDeltaTime;
        // End of Temporary code
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
