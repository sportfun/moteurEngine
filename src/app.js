'use strict';

// In case someone need to test an image and get a DOMException, use this
// let imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA50lEQVR4nO3asU0DURQF0Q1W7sEJDawsETihD6jBmQOn7oGAjBqgDxJSN0AjuIgXHMmaye/XaLTJSm/dX5//lwGvbz+T+fL99TLa/x0Po/06Wj8ABdACmgJoAU0BtICmAFpAUwAtoCmAFtAUQAto1tvnNnpgW2b/8+fd+2j/9HsZ7fsCtICmAFpAUwAtoCmAFtAUQAtoCqAFNAXQApoCbKfb6IHpfcBH9wGWAmgBTQG0gKYAWkBTAC2gKYAW0BRAC2gKoAU03QeM1g9AAbSApgBaQFMALaApgBbQFEALaAqgBTQF0AKaOxbSFU3wi7H8AAAAAElFTkSuQmCC';

let THREE = require('three');

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';

let framework = new Framework();

let tick = 0;
let colors = [0xaa88ff, 0xff7711, 0x44cc99];

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);
currentScene.SetBackgroundColor(0x34495e);

let camera = new Camera();
camera.SetPosition(new THREE.Vector3(10, 3, 10));
currentScene.AddCamera(camera);

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new Material();
material.SetTransparent(false);
material.SetOpacity(0.5);

let cube = new THREE.Mesh(geometry, material.threeObject);
cube.rotation.x = 45;
cube.rotation.y = 45;

currentScene.AddModel(cube);

let options = {
    position: new THREE.Vector3(),
    positionRandomness: .3,
    velocity: new THREE.Vector3(),
    velocityRandomness: .5,
    color: 0x00ff00,
    colorRandomness: 0,
    turbulence: .5,
    lifetime: 2,
    size: 5,
    sizeRandomness: 1
};
let spawnerOptions = {
    spawnRate: 15000,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 1
};

let particleSystem = new ParticleSystem(250000, options, spawnerOptions);
currentScene.AddModel(particleSystem.threeObject);

camera.UpdateOverride = function (elapsedDeltaTime) {
    // let angle = (90.0 * elapsedDeltaTime) * (Math.PI / 180.0);
    let delta = elapsedDeltaTime * particleSystem.spawnerOptions.timeScale;

    // let deltaX = this.GetPosition().x - cube.position.x;
    // let deltaY = this.GetPosition().z - cube.position.z;

    // let angleCos = Math.cos(angle);
    // let angleSin = Math.sin(angle);

    // let posX = angleCos * deltaX - angleSin * deltaY + cube.position.x;
    // let posY = angleSin * deltaX + angleCos * deltaY + cube.position.z;

    tick += delta;
    if (tick < 0) tick = 0;
    if (delta > 0) {

        for (var c in colors) {
            var p = colors[c];
            options.color = p;
            particleSystem.options.position.x = Math.sin(tick + (Math.PI * 0.5 * c) * particleSystem.spawnerOptions.horizontalSpeed) * 40;
            particleSystem.options.position.y = Math.cos(tick + (Math.PI * 0.5 * c) * particleSystem.spawnerOptions.verticalSpeed) * 20;
            particleSystem.options.position.z = Math.sin(tick + (Math.PI * 0.5 * c) * particleSystem.spawnerOptions.horizontalSpeed + particleSystem.spawnerOptions.verticalSpeed) * 5;
            for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
                particleSystem.threeObject.spawnParticle(particleSystem.Options);
            }
        }

    }
    particleSystem.threeObject.update(tick);
    //this.SetPosition(new THREE.Vector3(posX, 1, posY));
    this.LookAt(cube);
};

framework.Render();
