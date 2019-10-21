import RVec2 from './RVec2';
import LVec2 from './LVec2';

export default interface WVec2 extends RVec2 {

    x:number;
    y:number;
    
    addSelf(vec:LVec2):WVec2;
    
    subtractSelf(vec:LVec2):WVec2;

    scalarMultiplySelf(factor:number):WVec2;
    
    normalizeSelf():WVec2;
    
    turnRadSelf(angle:number):WVec2;
    
    turnDegSelf(angle:number):WVec2;
    
}