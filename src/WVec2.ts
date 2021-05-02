import { RVec2 } from './RVec2';
import { LVec2 } from './LVec2';

/**
 * Interface for writable 2 dimensional vectors. Methods from
 * RVec2 are redefined, to return writable objects. Additional
 * methods are provided, that change the internal state of the object instead
 * of returning a new one.
 */
export interface WVec2 extends RVec2 {

    // overrides
    x: number;
    y: number;

    add(vec: LVec2): WVec2;
    subtract(vec: LVec2): WVec2;
    scalarMultiply(factor: number): WVec2;
    normalize(): WVec2
    rotateRad(angle: number): WVec2;
    rotateDeg(angle: number): WVec2;
    copy(): WVec2;

    // new methods
    assignFrom(vec: LVec2): WVec2;
    addSelf(vec: LVec2): WVec2;
    subtractSelf(vec: LVec2): WVec2;
    scalarMultiplySelf(factor: number): WVec2;
    normalizeSelf(): WVec2;
    rotateRadSelf(angle: number): WVec2;
    rotateDegSelf(angle: number): WVec2;

}