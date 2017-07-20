/**
 * Created by JanJan on 10/06/2017.
 */

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

framework.Render();
