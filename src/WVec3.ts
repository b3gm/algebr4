import { LVec3 } from './LVec3';
import { RVec3 } from './RVec3';

/**
* Interface for writable 3 dimensional vectors. Methods from
* RVec3 are redefined, to return writable objects. Additional
* methods are provided, that change the internal state of the object instead
* of returning a new one.
*/
export interface WVec3 extends RVec3 {

    // overrides
    x: number;
    y: number;
    z: number;

    cross(vec: LVec3): WVec3;
    add(vec: LVec3): WVec3;
    subtract(vec: LVec3): WVec3;
    scalarMultiply(factor: number): WVec3;
    normalize(): WVec3;
    rotateRadUnsafe(axis: LVec3, angle: number): WVec3;
    rotateRad(axis: LVec3, angle: number): WVec3;
    rotateDegUnsafe(axis: LVec3, angle: number): WVec3;
    rotateDeg(axis: LVec3, angle: number): WVec3;
    copy(): WVec3;

    // new methods
    assignFrom(vec: LVec3): WVec3;
    addSelf(vec: LVec3): WVec3;
    subtractSelf(vec: LVec3): WVec3;
    scalarMultiplySelf(factor: number): WVec3;
    normalizeSelf(): WVec3;
    rotateRadSelf(axis: LVec3, angle: number): WVec3;
    rotateDegSelf(axis: LVec3, angle: number): WVec3;
    toArray(): Array<number>;
}