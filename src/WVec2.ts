import { RVec2 } from './RVec2';
import { LVec2 } from './LVec2';

export interface WVec2 extends RVec2 {

    // overrides
    x: number;
    y: number;

    add(vec: LVec2): WVec2;
    subtract(vec: LVec2): WVec2;
    scalarMultiply(factor: number): WVec2;
    normalize(): WVec2
    turnRad(angle: number): WVec2;
    turnDeg(angle: number): WVec2;
    copy(): WVec2;

    // new methods
    addSelf(vec: LVec2): WVec2;
    subtractSelf(vec: LVec2): WVec2;
    scalarMultiplySelf(factor: number): WVec2;
    normalizeSelf(): WVec2;
    turnRadSelf(angle: number): WVec2;
    turnDegSelf(angle: number): WVec2;

}