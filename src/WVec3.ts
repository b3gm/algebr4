import LVec3 from './LVec3';
import RVec3 from './RVec3';

export default interface WVec3 extends RVec3 {
    
    x:number;
    y:number;
    z:number;
    
    addSelf(vec:LVec3):WVec3;
    
    subtractSelf(vec:LVec3):WVec3;

    scalarMultiplySelf(factor:number):WVec3;
    
    normalizeSelf():WVec3;
    
    turnRadSelf(axis:LVec3, angle:number):WVec3;
    
    turnDegSelf(axis:LVec3, angle:number):WVec3;
    
    toArray():Array<number>;
}