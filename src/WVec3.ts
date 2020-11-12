import { LVec3 } from './LVec3';
import { RVec3 } from './RVec3';

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
    turnRadUnsafe(axis: LVec3, angle: number): WVec3;
    turnRad(axis: LVec3, angle: number): WVec3;
    turnDegUnsafe(axis: LVec3, angle: number): WVec3;
    turnDeg(axis: LVec3, angle: number): WVec3;
    copy(): WVec3;

    // new methods
    addSelf(vec: LVec3): WVec3;
    subtractSelf(vec: LVec3): WVec3;
    scalarMultiplySelf(factor: number): WVec3;
    normalizeSelf(): WVec3;
    turnRadSelf(axis: LVec3, angle: number): WVec3;
    turnDegSelf(axis: LVec3, angle: number): WVec3;
    toArray(): Array<number>;
}