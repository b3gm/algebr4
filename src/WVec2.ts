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
    rotateRad(angle: number): WVec2;
    rotateDeg(angle: number): WVec2;
    copy(): WVec2;

    // new methods
    addSelf(vec: LVec2): WVec2;
    subtractSelf(vec: LVec2): WVec2;
    scalarMultiplySelf(factor: number): WVec2;
    normalizeSelf(): WVec2;
    rotateRadSelf(angle: number): WVec2;
    rotateDegSelf(angle: number): WVec2;

}