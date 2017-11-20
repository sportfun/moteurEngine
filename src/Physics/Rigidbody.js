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
        // log('Rigidbody::Update: updating (' + elapsedTime + ') with Force' + this.force.ToString() + ', Torque' + this.torque.ToString() + ', Velocity' + this.velocity + ', Angular Velocity' + this.angularVelocity);
        this.UpdateVelocity(elapsedTime);
        this.UpdateAngularVelocity(elapsedTime);
        if (this.forceMode === ForceMode.eImpulse)
            this.UpdateForce(elapsedTime);
        if (this.torqueMode === ForceMode.eImpulse)
            this.UpdateTorque(elapsedTime);
        if (!this.velocity.IsZero())
            this.gameObject.Move(this.velocity.threeObject);
        if (!this.angularVelocity.IsZero())
            this.gameObject.Rotate(this.angularVelocity.threeObject);
    }

    // param: number
    // Called every frame
    // Update the velocity with the current force if non zero
    // Decrease the velocity
    UpdateVelocity(elapsedTime) {
        if (!this.force.IsZero())
            this.velocity = this.velocity.Add(this.force.Multiply(elapsedTime));
        if (!this.velocity.IsZero()) {
            this.velocity = this.velocity.Sub(this.velocity.Multiply(elapsedTime));
            this.velocity.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Update the angular velocity with the current torque if non zero
    // Decrease the angular velocity
    UpdateAngularVelocity(elapsedTime) {
        if (!this.torque.IsZero())
            this.angularVelocity = this.angularVelocity.Add(this.torque);//.Multiply(elapsedTime));
        if (!this.angularVelocity.IsZero()) {
            this.angularVelocity = this.angularVelocity.Sub(this.angularVelocity.Multiply(elapsedTime));
            this.angularVelocity.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Decrease the force if non zero
    UpdateForce(elapsedTime) {
        if (!this.force.IsZero()) {
            this.force = this.force.Sub(this.force.Multiply(elapsedTime));
            this.force.CorrectCloseZero();
        }
    }

    // param: number
    // Called every frame
    // Decrease the torque if non zero
    UpdateTorque(elapsedTime) {
        if (!this.torque.IsZero()) {
            this.torque = this.torque.Sub(this.torque.Multiply(elapsedTime));
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
