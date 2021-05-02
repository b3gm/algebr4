import { LMat2 } from './LMat2';
import { LVec2 } from './LVec2';
import { RVec2 } from './RVec2';

/**
 * Interface for readable 2 dimensional matrices. Methods do not change the
 * internal state of the object, but rather return a new RMat2 object.
 */
export interface RMat2 extends LMat2 {

    toFlatArray(): Array<number>;
    toRowMajorArray(): Array<Array<number>>;
    toColumnMajorArray(): Array<Array<number>>;

    add(m: LMat2): RMat2;
    subtract(m: LMat2): RMat2;
    multiply(m: LMat2): RMat2;
    scalarMultiply(f: number): RMat2;
    det(): number;
    invert(): RMat2;
    multiplyVec(v: LVec2): RVec2;
    vecMultiply(v: LVec2): RVec2;
    transpose(): RMat2;
    copy(): RMat2;
    equals(vec: LMat2, tolerance: number): boolean;
    equals(vec: LMat2): boolean;

}