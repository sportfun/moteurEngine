'use strict';

var THREE = require("three");

class Scene {
    constructor(name) {
        this.name = name;
        this.threeJSScene = new THREE.Scene();
        console.log("Scene " + this.name + " successfully created");
    }

    Clean() {
        delete (this.threeJSScene);
        console.log("Scene " + this.name + " successfully deleted");
    }

    AddModel(model) {
    }

    AddCamera(camera) {
    }

    SetBackgroundColor(color) {
    }

    SetBackgroundTexture(texture) {
    }
    
    SetBackgroundCubeTexture(cubeTexture) {
    }
}

export default Scene;
