import { LQuaternion } from './LQuaternion';
import { LVec3 } from './LVec3';
import { RVec3 } from './RVec3';

export interface RQuaternion extends LQuaternion {

    add(q: LQuaternion): RQuaternion;
    subtract(q: LQuaternion): RQuaternion;
    scalarMultiply(f: number): RQuaternion;
    multiply(q: LQuaternion): RQuaternion;
    normSquare(): number;
    norm(): number;
    normalize(): RQuaternion;
    conjugate(): RQuaternion;
    rotateUnsafe(vec: LVec3): RVec3;
    copy(): RQuaternion;

}


