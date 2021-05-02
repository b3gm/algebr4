import { LMat4 } from './LMat4';
import { LVec4 } from './LVec4';
import { RVec4 } from './RVec4';

/**
 * Interface for readable 4 dimensional matrices. Methods do not change the
 * internal state of the object, but rather return a new RMat4 object.
 */
export interface RMat4 extends LMat4 {

    toFlatArray(): Array<number>;
    toRowMajorArray(): Array<Array<number>>;
    toColumnMajorArray(): Array<Array<number>>;

    add(m: LMat4): RMat4;
    subtract(m: LMat4): RMat4;
    multiply(m: LMat4): RMat4;
    scalarMultiply(f: number): RMat4;
    det(): number;
    invert(): RMat4;
    multiplyVec(v: LVec4): RVec4;
    vecMultiply(v: LVec4): RVec4;
    transpose(): RMat4;
    copy(): RMat4;
    equals(vec: LMat4, tolerance: number): boolean;
    equals(vec: LMat4): boolean;

}