'use strict';

var THREE = require('three');
import Scene from '../src/Scene.js';

class Framework {

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
        this.scenes = [];
        this.currentScene = undefined;
        console.log('Framework successfully created');
    }

    Clean() {
        this.scenes.forEach(function(scene) {
            scene.Clean();
        }, this);
        delete (this.scenes); // not sure about this one

        delete (this.clock);
        delete (this.renderer);
        console.log('Framework successfully deleted');
    }

    Render() {
        requestAnimationFrame(() => this.Render()); // Just passing this.Render caused a 'not defined'
        this.currentScene.Update(this.clock.getDelta());
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