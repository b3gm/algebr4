import { LMat3 } from './LMat3';
import { RMat3 } from './RMat3';
import { LVec3 } from './LVec3';
import { WVec3 } from './WVec3';

export interface WMat3 extends RMat3 {

    // overrides
    xx: number;
    xy: number;
    xz: number;
    yx: number;
    yy: number;
    yz: number;
    zx: number;
    zy: number;
    zz: number;

    add(m: LMat3): WMat3;
    subtract(m: LMat3): WMat3;
    multiply(m: LMat3): WMat3;
    scalarMultiply(f: number): WMat3;
    invert(): WMat3;
    multiplyVec(v: LVec3): WVec3;
    vecMultiply(v: LVec3): WVec3;
    transpose(): WMat3;
    copy(): WMat3;

    // new methods
    addSelf(m: LMat3): WMat3;
    subtractSelf(m: LMat3): WMat3;
    scalarMultiplySelf(f: number): WMat3;
    invertSelf(): WMat3;
    transposeSelf(): WMat3;

}