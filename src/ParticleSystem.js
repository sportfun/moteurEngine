'use strict';

let THREE = require('three');

// eslint-disable-next-line
import GPUParticleSystem from '../src/GPUParticleSystem.js';
import Object from '../src/Object.js';
/*
    Particle system wrapping class
*/

var particleSystemSybol = Symbol();
class ParticleSystem extends Object {

    /*
        getter => return the actual instance of the object
    */

    get threeObject() {
        return (this[particleSystemSybol]);
    }

    /*
        parameters to construct the Particle System :
        particleNumber: Particle number
        size: size of each particle
        spread: set how particle spread in the display
    */
    constructor(particleNumber, options, spawnerOptions) {
        super();
        this[particleSystemSybol] = new THREE.GPUParticleSystem({ maxParticles: particleNumber });

        this.options = options || {
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
        this.spawnerOptions = spawnerOptions || {
            spawnRate: 15000,
            horizontalSpeed: 1.5,
            verticalSpeed: 1.33,
            timeScale: 1
        };
    }

    // param: number
    // Called every frame, update the state of the camera
    // Override 'UpdateOverride' to customize the update
    Update(elapsedDeltaTime) {
        if (typeof this.UpdateOverride === 'function')
            this.UpdateOverride(elapsedDeltaTime);
    }

    get Options() {
        return (this.options);
    }

    get SpawnerOptions() {
        return (this.spawnerOptions);
    }

    /*
        setter position (THREE.Vector3)
    */
    set Position(position) {
        if (position instanceof THREE.Vector3)
            this.particleSystem.position = position;
    }

    set PositionRandomness(positionRandomness) {
        if (positionRandomness >= 0 && positionRandomness <= 1)
            this.options.positionRandomness = positionRandomness;
    }

    set Velocity(velocity) {
        if (velocity instanceof THREE.Vector3)
            this.options.velocity = velocity;
    }

    set VelocityRandomness(velocityRandomness) {
        if (velocityRandomness >= 0 && velocityRandomness <= 1)
            this.options.velocityRandomness = velocityRandomness;
    }

    set Color(color) {
        this.options.color = new THREE.color(color);
    }
    set ColorRandomness(colorRandomness) {
        if (colorRandomness >= 0 && colorRandomness <= 1) {
            this.options.colorRandomness = colorRandomness;
        }
    }

    set Turbulence(turbulence) {
        if (turbulence >= 0 && turbulence <= 1)
            this.options.turbulence = turbulence;
    }

    set Lifetime(lifetime) {
        this.options.lifetime = lifetime;
    }

    set Size(size) {
        this.options.size = size;
    }

    set SizeRandomness(sizeRandomness) {
        if (sizeRandomness >= 0 && sizeRandomness <= 1)
            this.options.sizeRandomness = sizeRandomness;
    }

    set SpawnRate(spawnRate) {
        this.spawnerOptions.spawnRate = spawnRate;
    }

    set HorizontalSpeed(horizontalSpeed) {
        this.spawnerOptions.horizontalSpeed = horizontalSpeed;
    }

    set VerticalSpeed(verticalSpeed) {
        this.spawnerOptions.verticalSpeed = verticalSpeed;
    }

    set TimeScale(timeScale) {
        if (timeScale >= 0 && timeScale <= 1) {
            this.spawnerOptions.timeScale = timeScale;
        }
    }
}

export default ParticleSystem;
