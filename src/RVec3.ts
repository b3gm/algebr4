import { LVec3 } from './LVec3';

/**
 * Interface for readable 3 dimensional vectors. Methods do not change the
 * internal state of the object, but rather return a new RVec3 object.
 */
export interface RVec3 extends LVec3 {

    dot(vec: LVec3): number;
    cross(vec: LVec3): RVec3;
    add(vec: LVec3): RVec3;
    subtract(vec: LVec3): RVec3;
    scalarMultiply(factor: number): RVec3;
    normSquare(): number;
    norm(): number;
    l1Norm(): number;
    lInfNorm(): number;
    normalize(): RVec3;
    rotateRadUnsafe(axis: RVec3, angle: number): RVec3;
    rotateRad(axis: RVec3, angle: number): RVec3;
    rotateDegUnsafe(axis: RVec3, angle: number): RVec3;
    rotateDeg(axis: RVec3, angle: number): RVec3;
    angleUnsafe(vec: LVec3): number;
    angleUnsafe(vec: LVec3): number;
    angle(vec: LVec3): number;
    angle(vec: LVec3): number;
    copy(): RVec3;
    toArray(): Array<number>;
    equals(vec: LVec3, tolerance: number): boolean;
    equals(vec: LVec3): boolean;

}