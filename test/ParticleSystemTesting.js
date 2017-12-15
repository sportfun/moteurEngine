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
import Vector3 from '../src//Physics/Vector3.js';

describe('ParticleSystem', () => {

    describe('.Position', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Position with undefined', () => {
            particleSystem.Position = undefined;
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Position with bad parameters', () => {
            particleSystem.Position = 1;
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Position with good parameters', () => {
            particleSystem.Position = new Vector3(1, 2, 3);
            expect(particleSystem.threeObject.position.x).to.be.a('number').that.is.equal(1);
            expect(particleSystem.threeObject.position.y).to.be.a('number').that.is.equal(2);
            expect(particleSystem.threeObject.position.z).to.be.a('number').that.is.equal(3);

        });
    });

    describe('.PositionRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .PositionRandomness with undefined', () => {
            particleSystem.PositionRandomness = undefined;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness wrong parameter ', () => {
            particleSystem.PositionRandomness = 5;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness wrong parameter ', () => {
            particleSystem.PositionRandomness = -34;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.3);
        });

        it('checks .PositionRandomness good parameter ', () => {
            particleSystem.PositionRandomness = 0.5;
            expect(particleSystem.options["positionRandomness"]).to.be.a('number').that.is.equal(0.5);
        });
    });

    describe('.Velocity', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Velocity with undefined', () => {
            particleSystem.Velocity = undefined;
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Velocity with wrong parameters', () => {
            particleSystem.Velocity = 3;
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(0);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(0);
        });

        it('checks .Velocity with our Vector3 class', () => {
            particleSystem.Velocity = new Vector3(4, 13, 3);
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(4);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(13);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(3);
        });

        it('checks .Velocity with THREE Vector3 class', () => {
            particleSystem.Velocity = new THREE.Vector3(2, 6, 9);
            expect(particleSystem.options["velocity"].x).to.be.a('number').that.is.equal(2);
            expect(particleSystem.options["velocity"].y).to.be.a('number').that.is.equal(6);
            expect(particleSystem.options["velocity"].z).to.be.a('number').that.is.equal(9);
        });
    });

    describe('.VelocityRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Velocity with undefined', () => {
            particleSystem.VelocityRandomness = undefined;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with wrong parameters over 1', () => {
            particleSystem.VelocityRandomness = 2;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with wrong parameters negatives', () => {
            particleSystem.VelocityRandomness = -3;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.5);
        });

        it('checks .Velocity with good parameters', () => {
            particleSystem.VelocityRandomness = 0.7;
            expect(particleSystem.options["velocityRandomness"]).to.be.a('number').that.is.equal(0.7);
        });
    });

    describe('.Color', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Color with undefined', () => {
            particleSystem.Color = undefined;
            expect(particleSystem.options["color"]).to.be.a('number').that.is.equal(new THREE.Color(0x00ff00).getHex());
        })

        it('checks .Color with good values', () => {
            particleSystem.Color = 0xffffff;
            expect(particleSystem.options["color"].getHex()).to.be.an('number').that.is.equal(new THREE.Color(0xffffff).getHex());
        })
    });

    describe('.ColorRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .ColorRandomness with undefined', () => {
            particleSystem.ColorRandomness = undefined;
            expect(particleSystem.options["colorRandomness"]).to.be.a('number').that.is.equal(0);
        })


        it('checks .ColorRandomness with value under 1', () => {
            particleSystem.ColorRandomness = -3;
            expect(particleSystem.options["colorRandomness"]).to.be.an('number').that.is.equal(0);
        })

        it('checks .ColorRandomness with value over 1', () => {
            particleSystem.ColorRandomness = 50;
            expect(particleSystem.options["colorRandomness"]).to.be.an('number').that.is.equal(0);
        })

        it('checks .ColorRandomness with good values', () => {
            particleSystem.ColorRandomness = 0.3;
            expect(particleSystem.options["colorRandomness"]).to.be.an('number').that.is.equal(0.3);
        })
    });


    describe('.Turbulence', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Turbulence with undefined', () => {
            particleSystem.Turbulence = undefined;
            expect(particleSystem.options["turbulence"]).to.be.a('number').that.is.equal(0.5);
        })


        it('checks .Turbulence with value under 1', () => {
            particleSystem.Turbulence = -9;
            expect(particleSystem.options["turbulence"]).to.be.an('number').that.is.equal(0.5);
        })

        it('checks .Turbulence with value over 1', () => {
            particleSystem.Turbulence = 320;
            expect(particleSystem.options["turbulence"]).to.be.an('number').that.is.equal(0.5);
        })

        it('checks .Turbulence with good values', () => {
            particleSystem.Turbulence = 0.3;
            expect(particleSystem.options["turbulence"]).to.be.an('number').that.is.equal(0.3);
        })
    });

    describe('.Lifetime', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Lifetime with undefined', () => {
            particleSystem.Lifetime = undefined;
            expect(particleSystem.options["lifetime"]).to.be.a('number').that.is.equal(2);
        })

        it('checks .Lifetime with value under 1', () => {
            particleSystem.Lifetime = -3;
            expect(particleSystem.options["lifetime"]).to.be.an('number').that.is.equal(0);
        })

        it('checks .Lifetime with value over 1', () => {
            particleSystem.Lifetime = 50;
            expect(particleSystem.options["lifetime"]).to.be.an('number').that.is.equal(50);
        })
    })

    describe('.Size', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .Size with undefined', () => {
            particleSystem.Size = undefined;
            expect(particleSystem.options["size"]).to.be.a('number').that.is.equal(5);
        })

        it('checks .Size with value under 1', () => {
            particleSystem.Size = -300;
            expect(particleSystem.options["size"]).to.be.an('number').that.is.equal(0);
        })

        it('checks .Size with value over 1', () => {
            particleSystem.Size = 10;
            expect(particleSystem.options["size"]).to.be.an('number').that.is.equal(10);
        })
    })

    describe('.SizeRandomness', () => {
        let particleSystem;

        beforeEach(() => {
            particleSystem = new ParticleSystem();
        });

        it('checks .SizeRandomness with undefined', () => {
            particleSystem.SizeRandomness = undefined;
            expect(particleSystem.options["sizeRandomness"]).to.be.a('number').that.is.equal(1);
        })


        it('checks .SizeRandomness with value under 1', () => {
            particleSystem.SizeRandomness = -9;
            expect(particleSystem.options["sizeRandomness"]).to.be.an('number').that.is.equal(1);
        })

        it('checks .SizeRandomness with value over 1', () => {
            particleSystem.SizeRandomness = 320;
            expect(particleSystem.options["sizeRandomness"]).to.be.an('number').that.is.equal(1);
        })

        it('checks .SizeRandomness with good values', () => {
            particleSystem.SizeRandomness = 0.3;
            expect(particleSystem.options["sizeRandomness"]).to.be.an('number').that.is.equal(0.3);
        })
    });
});

