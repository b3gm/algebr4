import { LMat4 } from './LMat4';
import { RMat4 } from './RMat4';
import { LVec4 } from './LVec4';
import { WVec4 } from './WVec4';

/**
 * Interface for writable 3 dimensional matrices. Methods from RMat4 are
 * redefined, to return writable objects. Additional methods are provided,
 * that change the internal state of the object instead of returning a new one.
 */
export interface WMat4 extends RMat4 {

    // overrides
    xx: number;
    xy: number;
    xz: number;
    xw: number;
    yx: number;
    yy: number;
    yz: number;
    yw: number;
    zx: number;
    zy: number;
    zz: number;
    zw: number;
    wx: number;
    wy: number;
    wz: number;
    ww: number;

    add(m: LMat4): WMat4;
    subtract(m: LMat4): WMat4;
    multiply(m: LMat4): WMat4;
    scalarMultiply(f: number): WMat4;
    invert(): WMat4;
    multiplyVec(v: LVec4): WVec4;
    vecMultiply(v: LVec4): WVec4;
    transpose(): WMat4;
    copy(): WMat4;

    // new methods
    assignFrom(m: LMat4): WMat4;
    addSelf(m: LMat4): WMat4;
    subtractSelf(m: LMat4): WMat4;
    scalarMultiplySelf(f: number): WMat4;
    invertSelf(): WMat4;

}