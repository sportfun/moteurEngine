/**
 * Created by JanJan on 10/06/2017.
 */

'use strict';

import Framework from '../src/Framework.js';
import Camera from '../src/Camera.js';

let framework = new Framework();

let currentScene = framework.CreateScene('Test scene');
framework.UseScene(currentScene);

let camera = new Camera();
camera.threeObject.position.z = 5;

currentScene.AddCamera(camera);

framework.Render();
