'use strict';

var THREE = require('three');

class Camera {

    get threeObject() {
        return (this.threeCamera);
    }

    constructor() {
        this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        console.log('Camera successfully created');
    }

    Clean() {
        delete (this.threeCamera);
        console.log('Camera successfully deleted');
    }
}

export default Camera;
