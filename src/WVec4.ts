import { LVec4 } from './LVec4';
import { RVec4 } from './RVec4';

/**
 * Interface for writable 4 dimensional vectors. Methods from
 * RVec4 are redefined, to return writable objects. Additional
 * methods are provided, that change the internal state of the object instead
 * of returning a new one.
 */
export interface WVec4 extends RVec4 {

    // overrides
    x: number;
    y: number;
    z: number;
    w: number;

    add(vec: LVec4): WVec4;
    subtract(vec: LVec4): WVec4;
    scalarMultiply(factor: number): WVec4;
    normalize(): WVec4;
    copy(): WVec4;

    // new methods
    assignFrom(vec: LVec4): WVec4;
    addSelf(vec: LVec4): WVec4;
    subtractSelf(vec: LVec4): WVec4;
    scalarMultiplySelf(factor: number): WVec4;
    normalizeSelf(): WVec4;
    toArray(): Array<number>;
}