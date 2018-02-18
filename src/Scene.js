'use strict';

let THREE = require('three');
require('three-fbx-loader')(THREE);

import { log, logError } from '../src/Utils.js';
import Camera from '../src/Camera.js';
import GameObject from '../src/GameObject.js';

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
        this.loadingManager = new THREE.LoadingManager();
        this.fbxLoader = new THREE.FBXLoader(this.loadingManager);

        log('Scene ' + this.name + ' successfully created');
    }

    Clean() {
        this.cameras.forEach(function (camera) {
            camera.Clean();
        }, this);
        delete (this.cameras); // not sure

        delete (this[threeSceneSymbol]);
        log('Scene ' + this.name + ' successfully deleted');
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

    // param: GameObject
    // Add 'object' to the scene
    AddObject(object) {
        if (typeof object === 'undefined') {
            logError('Scene::AddObject: \'object\' is undefined');
            return;
        }
        if (object instanceof GameObject) {
            if (object.cannonBody !== null) {
                this.world.addBody(object.cannonBody);
            }
            else {
                log('No cannonBody');
            }
            this.objects.push(object);
            this[threeSceneSymbol].add(object.threeObject);
        }
        else {
            logError('Scene::AddObject: can\'t handle \'object\' because its type is \'' + typeof object + '\'');
            return;
        }
    }

    AddTHREEObject(object) {
        if (typeof object === 'undefined') {
            logError('Scene::AddObject: \'object\' is undefined');
            return;
        }
        else {
            this[threeSceneSymbol].add(object);
        }
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

    // param: CANNON.World
    // Set the current physics simulated world
    SetWorld(world) {
        this.world = world;
    }

    // param: number
    // Change the background color of the scene
    SetBackgroundColor(color) {
        if (typeof color === 'undefined') {
            logError('Scene::SetBackgroundColor: color undefined');
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
            log(color);
        }
    }

    // param: THREE.Texture
    // Change the background texture of the scene
    SetBackgroundTexture(texture) {
        if (typeof texture === 'undefined') {
            logError('Scene::SetBackgroundTexture: texture undefined');
            return;
        }
        if (texture instanceof THREE.Texture) {
            this[threeSceneSymbol].background = texture;
        }
        else if (typeof texture === 'string') {
            log('Scene::SetBackgroundTexture: \'texture\' is of type string and may not be loaded properly.');
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
            logError('Scene::SetBackgroundCubeTexture: cubeTexture undefined');
            return;
        }
        if (cubeTexture instanceof THREE.CubeTexture) {
            this[threeSceneSymbol].background = cubeTexture;
        }
        else {
            console.warn('Scene::SetBackgroundCubeTexture: can\'t handle type ' + typeof cubeTexture + ' of \'cubeTexture\'');
        }
    }

    SetFog(fog) {
        this[threeSceneSymbol].fog = fog;
    }

    // param: string, function(GameObject, (optional)boolean)
    // Load a 3D model and call the callback on completion
    // Return the GameObject
    LoadModel(filePath, callback) {
        let object = new GameObject();
        let fileExt = filePath.split('.').pop();

        if (typeof filePath === 'undefined')
            logError('Scene::LoadModel: \'filePath\' is undefined');
        if (fileExt === 'fbx') {
            this.fbxLoader.load(filePath, buffer => this.OnLoadModelComplete(buffer, object, callback), xhr => this.OnLoadModelProgress(xhr), xhr => this.OnLoadModelError(xhr, filePath));
            return (object);
        }
        return (undefined);
    }

    OnLoadModelComplete(buffer, object, callback) {
        let animated = false;
        if (typeof buffer.animations !== 'undefined') {
            animated = true;
            object.animations = buffer.animations;
            object.mixer = new THREE.AnimationMixer(buffer);
            object.action = object.mixer.clipAction(object.animations[0]);
            object.action.play();
        }
        object.children = buffer.children.slice();
        object.threeObject = object.children[0];
        callback(object, animated);
    }

    OnLoadModelProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            log(Math.round(percentComplete, 2) + '% downloaded');
        }
    }

    OnLoadModelError(xhr, path) {
        logError(xhr);
        logError('cannot load properly file :' + path);
    }
}

export default Scene;
