'use strict';

// In case someone need to test an image and get a DOMException, use this
// let imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA50lEQVR4nO3asU0DURQF0Q1W7sEJDawsETihD6jBmQOn7oGAjBqgDxJSN0AjuIgXHMmaye/XaLTJSm/dX5//lwGvbz+T+fL99TLa/x0Po/06Wj8ABdACmgJoAU0BtICmAFpAUwAtoCmAFtAUQAto1tvnNnpgW2b/8+fd+2j/9HsZ7fsCtICmAFpAUwAtoCmAFtAUQAtoCqAFNAXQApoCbKfb6IHpfcBH9wGWAmgBTQG0gKYAWkBTAC2gKYAW0BRAC2gKoAU03QeM1g9AAbSApgBaQFMALaApgBbQFEALaAqgBTQF0AKaOxbSFU3wi7H8AAAAAElFTkSuQmCC';

let THREE = require('three');
import CANNON from 'cannon';
import dat from 'dat.gui/build/dat.gui.js';

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import GameObject from '../src/GameObject.js';
import Rigidbody from '../src/Physics/Rigidbody.js';
import Vector3 from '../src/Physics/Vector3.js';
import { ForceMode } from '../src/Physics/Rigidbody.js';
import { log } from '../src/Utils.js';
// eslint-disable-next-line
import OrbitControls from '../js/controls/OrbitControls.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);
currentScene.SetBackgroundColor(0x34495e);
currentScene.SetBackgroundCubeTexture(new THREE.CubeTextureLoader() .setPath( 'resources/textures/skyboxes/' ) .load( [ 'sea_rt.jpg', 'sea_lf.jpg', 'sea_up.jpg', 'sea_dn.jpg', 'sea_bk.jpg', 'sea_ft.jpg' ] ));

let materialPlane = new Material();

let planeGeometry = new THREE.PlaneGeometry(10, 10, 1);
let plane = new THREE.Mesh(planeGeometry, materialPlane.threeObject);

let planeGameObject = new GameObject();
planeGameObject.threeObject = plane;
planeGameObject.cannonBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0),
    shape: new CANNON.Plane()
});
//let rigidbody = new Rigidbody();
planeGameObject.SetPosition(new Vector3(0, 0, 0));
//cubeGameObject.SetRigidbody(rigidbody);


log('Adding plane to scene');
currentScene.AddObject(planeGameObject);
log('Finished adding plane to scene');

let camera = new Camera();
camera.SetPosition(new THREE.Vector3(2, 18, 28));
currentScene.AddCamera(camera);

let controls = new THREE.OrbitControls(camera.threeObject, framework.threeObject.domElement);
controls.enableZoom = false;

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new Material();

let cube = new THREE.Mesh(geometry, material.threeObject);

let cubeGameObject = new GameObject();
cubeGameObject.threeObject = cube;
cubeGameObject.cannonBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 0, 0),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
});
//let rigidbody = new Rigidbody();
cubeGameObject.SetPosition(new Vector3(10, 0, 0));
// cubeGameObject.SetRotation(new THREE.Vector3(45, 45, 0));
cubeGameObject.SetScale(new Vector3(10, 10, 10));
//cubeGameObject.SetRigidbody(rigidbody);

//rigidbody.SetTorque(new Vector3(0, 1, 0), ForceMode.eImpulse);

log('Adding cube to scene');
currentScene.AddObject(cubeGameObject);
log('Finished adding cube to scene');

let particles = new ParticleSystem(25000);
log('Adding particle system to scene');
currentScene.AddObject(particles);
log('Finished adding particle system to scene');

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

let model;

let modelLoaded = function (object) {
    object.UpdateOverride = function(elapsedDeltaTime) { this.mixer.update(elapsedDeltaTime); };
    model = object;
    model.cannonBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 0, 0),
        shape: new CANNON.Sphere(1)
    });
    model.SetPosition(new Vector3(-10, -10, 0));
    log('Adding model to scene');
    currentScene.AddObject(object);
    log('Finished adding model to scene');
};

currentScene.LoadModel('./resources/models/skinman/xsi_man_skinning.fbx', modelLoaded);

// GUI Stuff
{
    let gui = new dat.GUI();

    let posParameters = {
        x: 10.0,
        y: 0.0,
        z: 0.0,
        button: () => { cubeGameObject.SetPosition(new Vector3(posParameters.x, posParameters.y, posParameters.z)); }
    };

    let rotParameters = {
        x: 45.0,
        y: 45.0,
        z: 0.0,
        button: () => { cubeGameObject.SetRotation(new Vector3(rotParameters.x, rotParameters.y, rotParameters.z)); }
    };

    let scaleParameters = {
        x: 10.0,
        y: 10.0,
        z: 10.0,
        button: () => { cubeGameObject.SetScale(new Vector3(scaleParameters.x, scaleParameters.y, scaleParameters.z)); }
    };

    let forceParameters = {
        x: 0.0,
        y: 0.0,
        z: -0.05,
        forceMode: false,
        applyButton: () => { rigidbody.SetForce(new Vector3(forceParameters.x, forceParameters.y, forceParameters.z), forceParameters.forceMode === true ? ForceMode.eConstant : ForceMode.eImpulse); },
        stopButton: () => { rigidbody.SetForce(new Vector3()); }
    };

    let torqueParameters = {
        x: 0.0,
        y: 0.02,
        z: 0.0,
        forceMode: false,
        applyButton: () => { rigidbody.SetTorque(new Vector3(torqueParameters.x, torqueParameters.y, torqueParameters.z), torqueParameters.forceMode === true ? ForceMode.eConstant : ForceMode.eImpulse); },
        stopButton: () => { rigidbody.SetTorque(new Vector3()); }
    };

    let posFolder = gui.addFolder('Position');
    posFolder.add(posParameters, 'x');
    posFolder.add(posParameters, 'y');
    posFolder.add(posParameters, 'z');
    posFolder.add(posParameters, 'button').name('Apply');

    let rotFolder = gui.addFolder('Rotation');
    rotFolder.add(rotParameters, 'x');
    rotFolder.add(rotParameters, 'y');
    rotFolder.add(rotParameters, 'z');
    rotFolder.add(rotParameters, 'button').name('Apply');

    let scaleFolder = gui.addFolder('Scale');
    scaleFolder.add(scaleParameters, 'x');
    scaleFolder.add(scaleParameters, 'y');
    scaleFolder.add(scaleParameters, 'z');
    scaleFolder.add(scaleParameters, 'button').name('Apply');

    let forceFolder = gui.addFolder('Force');
    forceFolder.add(forceParameters, 'x');
    forceFolder.add(forceParameters, 'y');
    forceFolder.add(forceParameters, 'z');
    forceFolder.add(forceParameters, 'forceMode').name('Constant');
    forceFolder.add(forceParameters, 'applyButton').name('Apply');
    forceFolder.add(forceParameters, 'stopButton').name('Stop');

    let torqueFolder = gui.addFolder('Torque');
    torqueFolder.add(torqueParameters, 'x');
    torqueFolder.add(torqueParameters, 'y');
    torqueFolder.add(torqueParameters, 'z');
    torqueFolder.add(torqueParameters, 'forceMode').name('Constant');
    torqueFolder.add(torqueParameters, 'applyButton').name('Apply');
    torqueFolder.add(torqueParameters, 'stopButton').name('Stop');

    gui.open();
}

framework.Render();
