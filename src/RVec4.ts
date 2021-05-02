import { LVec4 } from './LVec4';

/**
 * Interface for readable 4 dimensional vectors. Methods do not change the
 * internal state of the object, but rather return a new RVec4 object.
 */
export interface RVec4 {

    x: number;
    y: number;
    z: number;
    w: number;

    dot(vec: LVec4): number;
    add(vec: LVec4): RVec4;
    subtract(vec: LVec4): RVec4;
    scalarMultiply(factor: number): RVec4;
    normSquare(): number;
    norm(): number;
    l1Norm(): number;
    lInfNorm(): number;
    normalize(): RVec4;
    copy(): RVec4;
    toArray(): Array<number>;
    equals(vec: LVec4, tolerance: number): boolean;
    equals(vec: LVec4): boolean;

}