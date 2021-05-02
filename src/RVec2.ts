import { LVec2 } from './LVec2';

/**
 * Interface for readable 2 dimensional vectors. Methods do not change the
 * internal state of the object, but rather return a new RVec2 object.
 */
export interface RVec2 extends LVec2 {

    dot(vec: LVec2): number;
    cross(vec: LVec2): number;
    add(vec: LVec2): RVec2;
    subtract(vec: LVec2): RVec2;
    scalarMultiply(factor: number): RVec2;
    normSquare(): number;
    norm(): number;
    l1Norm(): number;
    lInfNorm(): number;
    normalize(): RVec2;
    rotateRad(angle: number): RVec2;
    rotateDeg(angle: number): RVec2;
    angleUnsafe(vec: LVec2): number;
    angleUnsafe(vec: LVec2): number;
    angle(vec: LVec2): number;
    angle(vec: LVec2): number;
    copy(): RVec2;
    toArray(): Array<number>;
    equals(vec: LVec2): boolean;
    equals(vec: LVec2, tolerance: number): boolean;

}