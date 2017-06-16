'use strict';

var THREE = require('three');

class Camera {

    get threeObject() {
        return (this.threeCamera);
    }

    constructor() {
        this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    Clean() {
        delete (this.threeCamera);
    }
}

export default Camera;
