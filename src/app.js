'use strict';

var THREE = require('three');

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';
import Material from '../src/Material.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);
currentScene.SetBackgroundColor(0xff0000);

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

camera.UpdateOverride = function (elapsedDeltaTime) {
    var angle = (90.0 * elapsedDeltaTime) * (Math.PI / 180.0);

    var deltaX = this.GetPosition().x - cube.position.x;
    var deltaY = this.GetPosition().z - cube.position.z;

    var angleCos = Math.cos(angle);
    var angleSin = Math.sin(angle);

    var posX = angleCos * deltaX - angleSin * deltaY + cube.position.x;
    var posY = angleSin * deltaX + angleCos * deltaY + cube.position.z;

    this.SetPosition(new THREE.Vector3(posX, 1, posY));
    this.LookAt(cube);
};

framework.Render();
