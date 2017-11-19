'use strict';

let THREE = require('three');

import { log } from '../src/Utils.js';
import Scene from '../src/Scene.js';

let threeRendererSymbol = Symbol();
class Framework {

    get threeObject() {
        return (this[threeRendererSymbol]);
    }

    constructor() {
        this[threeRendererSymbol] = new THREE.WebGLRenderer();
        this.scenes = [];
        this.OnWindowResize();
        window.addEventListener('resize', event => this.OnWindowResize(event), false);
        document.body.appendChild(this[threeRendererSymbol].domElement);
        this.clock = new THREE.Clock();
        this.currentScene = undefined;
        log('Framework successfully created');
    }

    Clean() {
        this.scenes.forEach(function(scene) {
            scene.Clean();
        }, this);
        delete (this.scenes); // not sure about this one

        delete (this.clock);
        delete (this[threeRendererSymbol]);
        log('Framework successfully deleted');
    }

    Render() {
        requestAnimationFrame(() => this.Render()); // Just passing this.Render caused a 'not defined'
        this.currentScene.Update(this.clock.getDelta());
        this[threeRendererSymbol].render(this.currentScene.threeObject, this.currentScene.camera.threeObject);
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

    // Handle resizing of the window
    // eslint-disable-next-line no-unused-vars
    OnWindowResize(event) {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.aspect = this.screenWidth / this.screenHeight;
        this[threeRendererSymbol].setSize(this.screenWidth, this.screenHeight);
        this[threeRendererSymbol].setPixelRatio(window.devicePixelRatio);

        this.scenes.forEach(function (scene) {
            let cameras = scene.GetCameras();
            cameras.forEach(function (camera) {
                camera.SetAspectRatio(this.aspect);
            }, this);
        }, this);
    }
}

export default Framework;
