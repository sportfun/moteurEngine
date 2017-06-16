'use strict';

var THREE = require('three');
import Scene from 'Scene.js';

class Framework {

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scenes = [];
        this.currentScene = undefined;
    }

    Clean() {
        delete (this.renderer);
    }

    Render() {
        requestAnimationFrame(this.Render);
        this.renderer.render(this.currentScene.threeObject, this.currentScene.camera.threeObject);
    }

    // Create a Scene object, add it to the scenes and return it
    // param: string
    CreateScene(sceneName) {
        this.scenes.push(new Scene(sceneName));
        return (this.scenes[this.scenes.length - 1]);
    }

    // Scene to be used for rendering
    // param: Scene
    UseScene(scene) {
        if (typeof scene === undefined) // Check if scene has been declared
            return;
        if (!(scene instanceof Scene)) // Check if scene is a Scene object
            return;
        this.currentScene = scene;
    }
}

export default Framework;
