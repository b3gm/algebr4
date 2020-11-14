import { RQuaternion } from './RQuaternion';
import { LQuaternion } from './LQuaternion';
import { WVec3 } from './WVec3';
import { LVec3 } from './LVec3';

export interface WQuaternion extends RQuaternion {

    // overrides
    w: number;
    x: number;
    y: number;
    z: number;

    add(q: LQuaternion): WQuaternion;
    subtract(q: LQuaternion): WQuaternion;
    scalarMultiply(f: number): WQuaternion;
    multiply(q: LQuaternion): WQuaternion;
    normalize(): WQuaternion;
    conjugate(): WQuaternion;
    rotateUnsafe(vec: LVec3): WVec3;
    copy(): WQuaternion;

    // new methods
    addSelf(q: LQuaternion): WQuaternion;
    subtractSelf(q: LQuaternion): WQuaternion;
    scalarMultiplySelf(f: number): WQuaternion;
    multiplySelf(q: LQuaternion): WQuaternion;
    normalizeSelf(): WQuaternion;
    conjugateSelf(): WQuaternion;

}