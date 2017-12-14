/* eslint-disable */
'use strict';

process.env.NODE_ENV = 'test';

let should = require('chai').should();
let expect = require('chai').expect;

let THREE = require('three');

import Audio from '../src/Audio.js';
import Camera from '../src/Camera.js';
import Framework from '../src/Framework.js';
import GameObject from '../src/GameObject.js';
import Material from '../src/Material.js';
import ParticleSystem from '../src/ParticleSystem.js';
import Scene from '../src/Scene.js';
import Vector3 from '../src/Physics/Vector3.js';

require('./Vector3Testing');
describe('Audio', () => {
});

require('./CameraTesting.js');

require('./FrameworkTesting.js');

require('./GameObjectTesting.js');

require('./MaterialTesting.js');

require('./ParticleSystemTesting.js');

describe('Scene', () => {
});
