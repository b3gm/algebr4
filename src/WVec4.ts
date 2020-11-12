import { LVec4 } from './LVec4';
import { RVec4 } from './RVec4';

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
    addSelf(vec: LVec4): WVec4;
    subtractSelf(vec: LVec4): WVec4;
    scalarMultiplySelf(factor: number): WVec4;
    normalizeSelf(): WVec4;
    toArray(): Array<number>;
}