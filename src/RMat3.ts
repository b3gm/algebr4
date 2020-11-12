import { LMat3 } from './LMat3';
import { LVec3 } from './LVec3';
import { RVec3 } from './RVec3';

export interface RMat3 extends LMat3 {

    toFlatArray(): Array<number>;
    toRowMajorArray(): Array<Array<number>>;
    toColumnMajorArray(): Array<Array<number>>;

    add(m: LMat3): RMat3;
    subtract(m: LMat3): RMat3;
    multiply(m: LMat3): RMat3;
    scalarMultiply(f: number): RMat3;
    det(): number;
    invert(): RMat3;
    multiplyVec(v: LVec3): RVec3;
    vecMultiply(v: LVec3): RVec3;
    transpose(): RMat3;
    copy(): RMat3;
    equals(vec: LMat3, tolerance: number): boolean;
    equals(vec: LMat3): boolean;
}