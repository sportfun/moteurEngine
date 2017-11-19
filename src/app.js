'use strict';

// In case someone need to test an image and get a DOMException, use this
// let imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA50lEQVR4nO3asU0DURQF0Q1W7sEJDawsETihD6jBmQOn7oGAjBqgDxJSN0AjuIgXHMmaye/XaLTJSm/dX5//lwGvbz+T+fL99TLa/x0Po/06Wj8ABdACmgJoAU0BtICmAFpAUwAtoCmAFtAUQAto1tvnNnpgW2b/8+fd+2j/9HsZ7fsCtICmAFpAUwAtoCmAFtAUQAtoCqAFNAXQApoCbKfb6IHpfcBH9wGWAmgBTQG0gKYAWkBTAC2gKYAW0BRAC2gKoAU03QeM1g9AAbSApgBaQFMALaApgBbQFEALaAqgBTQF0AKaOxbSFU3wi7H8AAAAAElFTkSuQmCC';

let THREE = require('three');

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import GameObject from '../src/GameObject.js';
import Rigidbody from '../src/Physics/Rigidbody.js';
import Vector3 from '../src/Physics/Vector3.js';
import { ForceMode } from '../src/Physics/Rigidbody.js';
// eslint-disable-next-line
import OrbitControls from '../js/controls/OrbitControls.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);
currentScene.SetBackgroundColor(0x34495e);
currentScene.SetBackgroundCubeTexture(new THREE.CubeTextureLoader() .setPath( 'resources/textures/skyboxes/' ) .load( [ 'sea_rt.jpg', 'sea_lf.jpg', 'sea_up.jpg', 'sea_dn.jpg', 'sea_bk.jpg', 'sea_ft.jpg' ] ));

let camera = new Camera();
camera.SetPosition(new THREE.Vector3(2, 18, 28));
currentScene.AddCamera(camera);

let controls = new THREE.OrbitControls(camera.threeObject, framework.threeObject.domElement);
controls.enableZoom = false;

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new Material();
material.SetTransparent(false);
material.SetOpacity(0.5);

let cube = new THREE.Mesh(geometry, material.threeObject);
cube.rotation.x = 45;
cube.rotation.y = 45;

let cubeGameObject = new GameObject();
cubeGameObject.threeObject = cube;
let rigidbody = new Rigidbody();
cubeGameObject.SetRigidbody(rigidbody);
rigidbody.SetTorque(new Vector3(0, 1, 0), ForceMode.eImpulse);

currentScene.AddObject(cubeGameObject);

let particles = new ParticleSystem(25000);
currentScene.AddObject(particles);

let colors = [0xaa88ff, 0xff7711, 0x44cc99]; 
let tick = 0;
particles.UpdateOverride = function (elapsedDeltaTime) {
    let delta = elapsedDeltaTime * this.spawnerOptions.timeScale;
    tick += elapsedDeltaTime;
    for (var c in colors) {
        var p = colors[c]; 
        this.options.color = p; 
        this.options.position.x = Math.sin(tick + (Math.PI * 0.5 * c) * this.spawnerOptions.horizontalSpeed) * 40; 
        this.options.position.y = Math.cos(tick + (Math.PI * 0.5 * c) * this.spawnerOptions.verticalSpeed) * 20; 
        this.options.position.z = Math.sin(tick + (Math.PI * 0.5 * c) * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed) * 5; 
        for (var x = 0; x < this.spawnerOptions.spawnRate * delta; x++) { 
            this.threeObject.spawnParticle(this.Options); 
        } 
    }
    this.threeObject.update(tick); 
};

let light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.0);
light.position.set(0, 1, 0);
currentScene.AddTHREEObject(light);

let modelLoaded = function (object) {
    currentScene.AddObject(object);
    object.UpdateOverride = function(elapsedDeltaTime) { this.mixer.update(elapsedDeltaTime); };
};

let model = currentScene.LoadModel('./resources/models/skinman/xsi_man_skinning.fbx', modelLoaded);

// camera.UpdateOverride = function (elapsedDeltaTime) {
//     let angle = (90.0 * elapsedDeltaTime) * (Math.PI / 180.0);

//     let deltaX = this.GetPosition().x - cubeGameObject.threeObject.position.x;
//     let deltaY = this.GetPosition().z - cubeGameObject.threeObject.position.z;

//     let angleCos = Math.cos(angle);
//     let angleSin = Math.sin(angle);

//     let posX = angleCos * deltaX - angleSin * deltaY + cubeGameObject.threeObject.position.x;
//     let posY = angleSin * deltaX + angleCos * deltaY + cubeGameObject.threeObject.position.z;

//     this.SetPosition(new THREE.Vector3(posX, 1, posY));
//     this.LookAt(cubeGameObject.threeObject);
// };

framework.Render();
