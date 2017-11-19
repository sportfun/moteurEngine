'use strict';

import { isValidType } from '../Utils';
import Vector3 from '../../src/Physics/Vector3.js';

const ForceMode = Object.freeze({
    eConstant: Symbol('0'),
    eImpulse: Symbol('1')
});

class Rigidbody {

    constructor() {
        this.force = new Vector3();
        this.forceMode = ForceMode.eConstant;
        this.torque = new Vector3();
        this.torqueMode = ForceMode.eConstant;
        this.velocity = new  Vector3();
        this.angularVelocity = new  Vector3();
    }

    SetGameObject(gameObject) {
        if (isValidType(gameObject, 'GameObject'))
            this.gameObject = gameObject;
    }

    Update(elapsedTime) {
        // log('Rigidbody::Update: updating (' + elapsedTime + ') with Force' + this.force.toString() + ', Torque' + this.torque.toString() + ', Velocity' + this.velocity + ', Angular Velocity' + this.angularVelocity);
        this.UpdateVelocity(elapsedTime);
        this.UpdateAngularVelocity(elapsedTime);
        if (this.forceMode === ForceMode.eImpulse)
            this.UpdateForce(elapsedTime);
        if (this.torqueMode === ForceMode.eImpulse)
            this.UpdateTorque(elapsedTime);
        if (!this.velocity.isZero())
            this.gameObject.Move(this.velocity.threeObject);
        if (!this.angularVelocity.isZero())
            this.gameObject.Rotate(this.angularVelocity.threeObject);
    }

    // param: number
    // Called every frame
    // Update the velocity with the current force if non zero
    // Decrease the velocity
    UpdateVelocity(elapsedTime) {
        if (!this.force.isZero())
            this.velocity = this.velocity.add(this.force.multiply(elapsedTime));
        if (!this.velocity.isZero()) {
            this.velocity = this.velocity.sub(this.velocity.multiply(elapsedTime));
            this.velocity.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Update the angular velocity with the current torque if non zero
    // Decrease the angular velocity
    UpdateAngularVelocity(elapsedTime) {
        if (!this.torque.isZero())
            this.angularVelocity = this.angularVelocity.add(this.torque.multiply(elapsedTime));
        if (!this.angularVelocity.isZero()) {
            this.angularVelocity = this.angularVelocity.sub(this.angularVelocity.multiply(elapsedTime));
            this.angularVelocity.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Decrease the force if non zero
    UpdateForce(elapsedTime) {
        if (!this.force.isZero()) {
            this.force = this.force.sub(this.force.multiply(elapsedTime));
            this.force.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Decrease the torque if non zero
    UpdateTorque(elapsedTime) {
        if (!this.torque.isZero()) {
            this.torque = this.torque.sub(this.torque.multiply(elapsedTime));
            this.torque.CorrectCloseZero();
        }
    }

    SetForce(force, forceMode) {
        if (isValidType(force, 'Vector3'))
            this.force = force;
        if (typeof forceMode !== 'undefined')
            this.forceMode = forceMode;
        else
            this.forceMode = ForceMode.eConstant;
    }

    SetTorque(torque, forceMode) {
        if (isValidType(torque, 'Vector3'))
            this.torque = torque;
        if (typeof forceMode !== 'undefined')
            this.torqueMode = forceMode;
        else
            this.torqueMode = ForceMode.eConstant;
    }
}

export { ForceMode };
export default Rigidbody;
