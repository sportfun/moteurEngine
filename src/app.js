'use strict';

var THREE = require('three');

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);

let camera = new Camera();
camera.SetPosition(new THREE.Vector3(10, 3, 10));
currentScene.AddCamera(camera);

currentScene.Update = function (elapsedDeltaTime) {

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new Material();
material.SetTransparent(false);
material.SetOpacity(0.5);

let cube = new THREE.Mesh(geometry, material.threeObject);
cube.rotation.x = 45;
cube.rotation.y = 45;
currentScene.AddModel(cube);

    var angle = (90.0 * elapsedDeltaTime) * (Math.PI / 180.0);

    var deltaX = camera.GetPosition().x - this.cube.position.x;
    var deltaY = camera.GetPosition().z - this.cube.position.z;

    var angleCos = Math.cos(angle);
    var angleSin = Math.sin(angle);

    var posX = angleCos * deltaX - angleSin * deltaY + this.cube.position.x;
    var posY = angleSin * deltaX + angleCos * deltaY + this.cube.position.z;

    camera.SetPosition(new THREE.Vector3(posX, 1, posY));
    camera.LookAt(this.cube);
};

framework.Render();
