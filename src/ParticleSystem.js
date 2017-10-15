'use strict'

let THREE = require('three');
let GPUParticleSystem = require('../src/GPUParticleSystem.js');


import Object from '../src/Object.js';

/*
    Particle system wrapping class
*/

var particleSystemSybol = Symbol();
class ParticleSystem extends THREE.GPUParticleSystem
{

    /*
        getter => return the actual instance of the object
    */

    get threeObject(){
        return (this[particleSystemSybol]);
    }

    /*
        parameters to construct the Particle System :
        particleNumber: Particle number
        size: size of each particle
        spread: set how particle spread in the display
    */
    constructor(particleNumber, options, spawnerOptions)
    {
        super();
        this[particleSystemSybol] = new THREE.GPUParticleSystem({maxParticles: particleNumber});
        super.threeObject = this[particleSystemSybol];
        
        this.options = options;
        this.spawnerOptions = spawnerOptions;
    }

    get Options(){
        return (this.options);
    }

    get SpawnerOptions(){
        return (this.spawnerOptions);
    }

    /*
        setter position (THREE.Vector3)
    */
    set Position(position){
        if (position instanceof THREE.Vector3)
            this.particleSystem.position = position;
    }

    set PositionRandomness(positionRandomness){
        if (positionRandomness >= 0 && positionRandomness <= 1)
            this.options.positionRandomness = positionRandomness;
    }

    set Velocity(velocity){
        if (velocity instanceof THREE.Vector3)
            this.options.velocity = velocity;
    }

    set VelocityRandomness(velocityRandomness){
        if (velocityRandomness >= 0 && velocityRandomness <= 1)
            this.options.velocityRandomness = velocityRandomness;
    }

    set Color(color){
        this.options.color = new THREE.color(color);
    }
    set ColorRandomness(colorRandomness){
        if (colorRandomness >= 0 && colorRandomness <= 1){
            this.options.colorRandomness = colorRandomness;
        }
    }

    set Turbulence(turbulence){
        if (turbulence >= 0 && turbulence <= 1)
            this.options.turbulence = turbulence;
    }

    set Lifetime(lifetime){
        this.options.lifetime = lifetime;
    }

    set Size(size){
        this.options.size = size;
    }

    set SizeRandomness(sizeRandomness){
        if (sizeRandomness >= 0 && sizeRandomness <= 1)
            this.options.sizeRandomness = sizeRandomness;
    }

    set SpawnRate(spawnRate){
        this.spawnerOptions.spawnRate = spawnRate;
    }

    set HorizontalSpeed(horizontalSpeed){
        this.spawnerOptions.horizontalSpeed = horizontalSpeed;
    }

    set VerticalSpeed(verticalSpeed){
        this.spawnerOptions.verticalSpeed = verticalSpeed;
    }

    set TimeScale(timeScale){
        if (timeScale >= 0 && timeScale <= 1){
            this.spawnerOptions.timeScale = timeScale;
        }
    }
}

export default ParticleSystem;