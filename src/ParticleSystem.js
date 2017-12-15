'use strict';

let THREE = require('three');

// eslint-disable-next-line
import GPUParticleSystem from '../src/GPUParticleSystem.js';
import GameObject from '../src/GameObject.js';
import Vector3 from '../src/Physics/Vector3';
import { SIGPWR } from 'constants';
/*
    Particle system wrapping class
*/

var particleSystemSybol = Symbol();
class ParticleSystem extends GameObject {

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

    /*
        return the object options, fill with particle systems features
    */

    get Options() {
        return (this.options);
    }

    /*
        return the object spawner use to spawn particles with all it features
    */

    get SpawnerOptions() {
        return (this.spawnerOptions);
    }

    /*
        setter position 
        param: (THREE.Vector3)
    */
    set Position(position) {
        if (position instanceof THREE.Vector3 || position instanceof Vector3) {
            this[particleSystemSybol].position.x = position.x;
            this[particleSystemSybol].position.y = position.y;
            this[particleSystemSybol].position.z = position.z;
        }
    }


    /*
        setter positionRandomness 
        param: positionRandomness (float 0 <= x <= 1)
    */

    set PositionRandomness(positionRandomness) {
        if (positionRandomness >= 0 && positionRandomness <= 1)
            this.options.positionRandomness = positionRandomness;
    }

    /*
        setter Velocity 
        param: velocity (THREE.Vector3)
    */

    set Velocity(velocity) {
        if (velocity instanceof THREE.Vector3 || velocity instanceof Vector3)
            this.options.velocity = velocity;
    }

    /*
        setter VelocityRandomness 
        param: velocityRandomness (float 0 <= x <= 1)
    */

    set VelocityRandomness(velocityRandomness) {
        if (velocityRandomness >= 0 && velocityRandomness <= 1)
            this.options.velocityRandomness = velocityRandomness;
    }

    /*
        setter particles color 
        param: color (Hexa)
    */

    set Color(color) {
        if (color !== undefined)
            this.options.color = new THREE.Color(color);
    }

    /*
        setter colorrandomness of this particle system
        param: colorRandomness 0 <= colorRandomness <= 1
    */

    set ColorRandomness(colorRandomness) {
        if (colorRandomness >= 0 && colorRandomness <= 1) {
            this.options.colorRandomness = colorRandomness;
        }
    }

    /*
        setter turbulence of particle 
        param: turbulence float 0 <= turbulence <= 1
    */

    set Turbulence(turbulence) {
        if (turbulence >= 0 && turbulence <= 1)
            this.options.turbulence = turbulence;
    }

    /*
        setter Life time of a particle
        param: lifeTime
    */

    set Lifetime(lifetime) {
        if (lifetime !== undefined) {
            if (lifetime < 0)
                lifetime = 0;
            this.options.lifetime = lifetime;
        }
    }

    /*
        setter particle size
        param: size
    */

    set Size(size) {
        if (size !== undefined){
            if (size < 0)
                size = 0;
            this.options.size = size;
        }
    }

    /*
        setter particle size randomness at spawning
        param: sizeRandomness 0 <= sizeRandomness <= 1
    */

    set SizeRandomness(sizeRandomness) {
        if (sizeRandomness >= 0 && sizeRandomness <= 1)
            this.options.sizeRandomness = sizeRandomness;
    }

    /*
        setter particle Spawn rate 
        param: spawnRate
    */

    set SpawnRate(spawnRate) {
        if (spawnRate !== undefined) {
            if (spawnRate < 0)
                spawnRate = 0;
            this.spawnerOptions.spawnRate = spawnRate;
        }
    }

    /*
        setter particle horizontal speed
        param: horizontalSpeed
    */

    set HorizontalSpeed(horizontalSpeed) {
        if (horizontalSpeed !== undefined)
            this.spawnerOptions.horizontalSpeed = horizontalSpeed;
    }

    /*
        setter particle vertical speed
        param: verticalSpeed
    */

    set VerticalSpeed(verticalSpeed) {
        if (verticalSpeed !== undefined)
            this.spawnerOptions.verticalSpeed = verticalSpeed;
    }

    /*
        setter time scale of spawning
        param: timeScale 0 <= timeScale <= 1
    */

    set TimeScale(timeScale) {
        if (timeScale >= 0 && timeScale <= 1) {
            this.spawnerOptions.timeScale = timeScale;
        }
    }
}

export default ParticleSystem;
