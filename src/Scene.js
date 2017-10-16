'use strict';

let THREE = require('three');
require('three-fbx-loader')(THREE)

import Camera from '../src/Camera.js';

let threeSceneSymbol = Symbol();
let mainCameraSymbol = Symbol();
class Scene {

    get threeObject() {
        return (this[threeSceneSymbol]);
    }

    get camera() {
        return (this[mainCameraSymbol]);
    }

    get Mixers() {
        return (this.mixers);
    }
    // param: string
    constructor(name) {
        this.name = name;
        this[threeSceneSymbol] = new THREE.Scene();
        this[mainCameraSymbol] = undefined;
        this.cameras = [];
        this.objects = [];
        this.mixers = [];
        this.manager = new THREE.LoadingManager();
        this.fbxLoader = new THREE.FBXLoader(this.manager);

        console.log('Scene ' + this.name + ' successfully created');
    }

    Clean() {
        this.cameras.forEach(function (camera) {
            camera.Clean();
        }, this);
        delete (this.cameras); // not sure

        delete (this[threeSceneSymbol]);
        console.log('Scene ' + this.name + ' successfully deleted');
    }

    // param: float
    // Called every frame by Framework if the scene is in use
    // elapsedDeltaTime is the time passed since last frame in milliseconds
    Update(elapsedDeltaTime) {
        this.cameras.forEach(function (camera) {
            if (typeof camera.Update === 'function')
                camera.Update(elapsedDeltaTime);
        }, this);
        this.objects.forEach(function (object) {
            if (typeof object.Update === 'function')
                object.Update(elapsedDeltaTime);
        }, this);
        if (typeof this.UpdateOverride === 'function')
            this.UpdateOverride(elapsedDeltaTime);
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

    GetCameras() {
        return (this.cameras);
    }

    // param: number
    // Change the background color of the scene
    SetBackgroundColor(color) {
        if (typeof color === 'undefined') {
            console.error('Scene::SetBackgroundColor: color undefined');
            return;
        }
        if (typeof color === 'number') {
            this[threeSceneSymbol].background = new THREE.Color(color);
        }
        else if (color instanceof THREE.Color) {
            this[threeSceneSymbol].background = color;
        }
        else {
            console.warn('Scene::SetBackgroundColor: can\'t handle type ' + typeof color + ' of \'color\'');
            console.debug(color);
            console.log(color);
        }
    }

    // param: THREE.Texture
    // Change the background texture of the scene
    SetBackgroundTexture(texture) {
        if (typeof texture === 'undefined') {
            console.error('Scene::SetBackgroundTexture: texture undefined');
            return;
        }
        if (texture instanceof THREE.Texture) {
            this[threeSceneSymbol].background = texture;
        }
        else if (typeof texture === 'string') {
            console.log('Scene::SetBackgroundTexture: \'texture\' is of type string and may not be loaded properly.');
            this[threeSceneSymbol].background = new THREE.TextureLoader().load(texture);
        }
        else {
            console.warn('Scene::SetBackgroundTexture: can\'t handle type ' + typeof texture + ' of \'texture\'');
        }
    }

    // param: THREE.CubeTexture
    // Change the background cube texture of the scene
    SetBackgroundCubeTexture(cubeTexture) {
        if (typeof cubeTexture === 'undefined') {
            console.error('Scene::SetBackgroundCubeTexture: cubeTexture undefined');
            return;
        }
        if (cubeTexture instanceof THREE.CubeTexture) {
            this[threeSceneSymbol].background = cubeTexture;
        }
        else {
            console.warn('Scene::SetBackgroundCubeTexture: can\'t handle type ' + typeof cubeTexture + ' of \'cubeTexture\'');
        }
    }

    LoadModel(path, position, rotation) {
        let model = new THREE.Group();
        let fileExt = path.split('.').pop();

        if (!path)
            console.error('3D model path: ' + path + ' is invalid.');
        if (fileExt === "fbx") {
            this.fbxLoader.load(path, object => this.OnLoadModelSuccess(model, object), xhr => this.OnLoadModelProgress(xhr), xhr => this.OnErrorLoadModel(xhr, path));
            return (model);
        }
        return(undefined);
    }

    OnLoadModelSuccess(model, object) {
        if (object.animations !== undefined){
            object.mixer = new THREE.AnimationMixer(object);
            object.action = object.mixer.clipAction( object.animations[ 0 ] );
            object.action.play();
            this.mixers.push(object.mixer);
        }
        model.add(object);
    }

    OnLoadModelProgress(xhr){
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }

    OnErrorLoadModel(xhr, path){
        console.error(xhr);
        console.error('cannot load properly file :' + path);
    }
}

export default Scene;
