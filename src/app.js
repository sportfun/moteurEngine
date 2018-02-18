'use strict';

// In case someone need to test an image and get a DOMException, use this
// let imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA50lEQVR4nO3asU0DURQF0Q1W7sEJDawsETihD6jBmQOn7oGAjBqgDxJSN0AjuIgXHMmaye/XaLTJSm/dX5//lwGvbz+T+fL99TLa/x0Po/06Wj8ABdACmgJoAU0BtICmAFpAUwAtoCmAFtAUQAto1tvnNnpgW2b/8+fd+2j/9HsZ7fsCtICmAFpAUwAtoCmAFtAUQAtoCqAFNAXQApoCbKfb6IHpfcBH9wGWAmgBTQG0gKYAWkBTAC2gKYAW0BRAC2gKoAU03QeM1g9AAbSApgBaQFMALaApgBbQFEALaAqgBTQF0AKaOxbSFU3wi7H8AAAAAElFTkSuQmCC';

let THREE = require('three');
import CANNON from 'cannon';
import dat from 'dat.gui/build/dat.gui.js';
import { log } from '../src/Utils.js';
import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import GameObject from '../src/GameObject.js';
import Vector3 from '../src/Physics/Vector3.js';
// eslint-disable-next-line
import OrbitControls from '../js/controls/OrbitControls.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);

currentScene.SetBackgroundColor(0x34495e);
currentScene.SetBackgroundCubeTexture(new THREE.CubeTextureLoader().setPath('resources/textures/skyboxes/').load(['sea_rt.jpg', 'sea_lf.jpg', 'sea_up.jpg', 'sea_dn.jpg', 'sea_bk.jpg', 'sea_ft.jpg']));

let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-1, 1.75, 1);
dirLight.position.multiplyScalar(30);
currentScene.AddTHREEObject(dirLight);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 50;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;
let dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
currentScene.AddTHREEObject(dirLightHeper);

let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
currentScene.AddTHREEObject(hemiLight);

let materialPlane = new Material();

let planeGeometry = new THREE.PlaneGeometry(1000, 1000);
let plane = new THREE.Mesh(planeGeometry, materialPlane.threeObject);

let planeGameObject = new GameObject();
planeGameObject.threeObject = plane;
planeGameObject.cannonBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane()
});

planeGameObject.SetPosition(new Vector3(0, -20, 0));
planeGameObject.SetRotation(new Vector3(270, 0, 0));
currentScene.AddObject(planeGameObject);

plane.receiveShadow = true;

let camera = new Camera();
camera.SetPosition(new THREE.Vector3(2, 18, -28));
currentScene.AddCamera(camera);

let controls = new THREE.OrbitControls(camera.threeObject, framework.threeObject.domElement);
controls.enableZoom = false;

let balls = [];
let ballShape = new CANNON.Sphere(2);
let ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
let ballMaterial = new Material();
ballMaterial.threeObject.color = new THREE.Color(0xff0000);
let shootDirection = new THREE.Vector3();
let shootVelocity = 150;

window.addEventListener('click', function (event) {
    var ball = new GameObject();
    let x = camera.threeObject.position.x;
    let y = camera.threeObject.position.y;
    let z = camera.threeObject.position.z;
    log(x + ', ' + y + ', ' + z);
    ball.threeObject = new THREE.Mesh(ballGeometry, ballMaterial.threeObject);
    ball.threeObject.castShadow = true;
    ball.threeObject.receiveShadow = true;
    ball.cannonBody = new CANNON.Body({ mass: 1 });
    ball.cannonBody.addShape(ballShape);
    camera.threeObject.getWorldDirection(shootDirection);
    log(shootDirection);
    ball.cannonBody.velocity.set(shootDirection.x * shootVelocity, shootDirection.y * shootVelocity, shootDirection.z * shootVelocity);
    ball.SetPosition(new Vector3(x, y, z));
    currentScene.AddObject(ball);
    balls.push(ball);
});

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new Material();
material.threeObject.color = new THREE.Color(0x00ff00);
let cube = new THREE.Mesh(geometry, material.threeObject);
cube.castShadow = true;
cube.receiveShadow = true;
let cubeGameObject = new GameObject();
cubeGameObject.threeObject = cube;
cubeGameObject.cannonBody = new CANNON.Body({
    mass: 10,
    shape: new CANNON.Box(new CANNON.Vec3(5, 5, 5)),
    linearDamping: 0.5,
    angularDamping: 0.5
});

cubeGameObject.SetScale(new Vector3(10, 10, 10));

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

// let model;

// let modelLoaded = function (object) {
//     object.UpdateOverride = function(elapsedDeltaTime) { this.mixer.update(elapsedDeltaTime); };
//     model = object;
//     model.cannonBody = new CANNON.Body({
//         mass: 10,
//         position: new CANNON.Vec3(0, 0, 0),
//         shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
//         velocity: new CANNON.Vec3(0, 0, 0),
//         angularVelocity: new CANNON.Vec3(0, 0, 0),
//     });
//     model.SetPosition(new Vector3(-10, -10, 0));
//     currentScene.AddObject(object);
// };

// currentScene.LoadModel('./resources/models/skinman/xsi_man_skinning.fbx', modelLoaded);

// GUI Stuff
{
    let gui = new dat.GUI();

    let posParameters = {
        x: -1.0,
        y: 1.75,
        z: 1.0,
        button: () => { dirLight.position.set(posParameters.x, posParameters.y, posParameters.z); }
    };

    // let rotParameters = {
    //     x: 45.0,
    //     y: 45.0,
    //     z: 0.0,
    //     button: () => { planeGameObject.SetRotation(new Vector3(rotParameters.x, rotParameters.y, rotParameters.z)); }
    // };

    // let scaleParameters = {
    //     x: 10.0,
    //     y: 10.0,
    //     z: 10.0,
    //     button: () => { planeGameObject.SetScale(new Vector3(scaleParameters.x, scaleParameters.y, scaleParameters.z)); }
    // };

    let ballParameters = {
        velocity: 150,
        button: () => { shootVelocity = this.velocity; }
    };

    // let posFolder = gui.addFolder('Position');
    // posFolder.add(posParameters, 'x');
    // posFolder.add(posParameters, 'y');
    // posFolder.add(posParameters, 'z');
    // posFolder.add(posParameters, 'button').name('Apply');

    // let rotFolder = gui.addFolder('Rotation');
    // rotFolder.add(rotParameters, 'x');
    // rotFolder.add(rotParameters, 'y');
    // rotFolder.add(rotParameters, 'z');
    // rotFolder.add(rotParameters, 'button').name('Apply');

    // let scaleFolder = gui.addFolder('Scale');
    // scaleFolder.add(scaleParameters, 'x');
    // scaleFolder.add(scaleParameters, 'y');
    // scaleFolder.add(scaleParameters, 'z');
    // scaleFolder.add(scaleParameters, 'button').name('Apply');

    // let ballFolder = gui.addFolder('Ball');
    // ballFolder.add(ballParameters, 'velocity');
    // ballFolder.add(ballParameters, 'button').name('Apply');

    gui.open();
}

framework.Render();
