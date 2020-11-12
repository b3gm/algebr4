import { LMat2 } from './LMat2';
import { RMat2 } from './RMat2';
import { LVec2 } from './LVec2';
import { WVec2 } from './WVec2';

export interface WMat2 extends RMat2 {

    // overrides
    xx: number;
    xy: number;
    yx: number;
    yy: number;

    add(m: LMat2): WMat2;
    subtract(m: LMat2): WMat2;
    multiply(m: LMat2): WMat2;
    scalarMultiply(f: number): WMat2;
    invert(): WMat2;
    multiplyVec(v: LVec2): WVec2;
    vecMultiply(v: LVec2): WVec2;
    transpose(): WMat2;
    copy(): WMat2;

    // new methods
    addSelf(m: LMat2): WMat2;
    subtractSelf(m: LMat2): WMat2;
    scalarMultiplySelf(f: number): WMat2;
    invertSelf(): WMat2;
    transposeSelf(): WMat2;

}