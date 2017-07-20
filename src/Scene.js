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
        console.log('Scene ' + this.name + ' successfully created');

        // Start of Temporary code
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.rotation.x = 45;
        this.cube.rotation.y = 45;
        //this.cube.position.xset(new THREE.Vector3(1, 1, 1));
        this[threeSceneSymbol].add(this.cube);

        // End of Temporary code
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
        var angle = (90.0 * elapsedDeltaTime) * (Math.PI / 180.0);

        var deltaX = this[mainCameraSymbol].GetPosition().x - this.cube.position.x;
        var deltaY = this[mainCameraSymbol].GetPosition().z - this.cube.position.z;

        var angleCos = Math.cos(angle);
        var angleSin = Math.sin(angle);

        var posX = angleCos * deltaX - angleSin * deltaY + this.cube.position.x;
        var posY = angleSin * deltaX + angleCos * deltaY + this.cube.position.z;

        this[mainCameraSymbol].SetPosition(new THREE.Vector3(posX, 1, posY));
        this[mainCameraSymbol].LookAt(this.cube);
    }

    AddModel(model) {
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
