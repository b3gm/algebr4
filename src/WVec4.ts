import LVec4 from './LVec4';
import RVec4 from './RVec4';

export default interface WVec4 extends RVec4 {
    
    x:number;
    y:number;
    z:number;
    w:number;
    
    addSelf(vec:LVec4):WVec4;
    
    subtractSelf(vec:LVec4):WVec4;

    scalarMultiplySelf(factor:number):WVec4;
    
    normalizeSelf():WVec4;
    
    toArray():Array<number>;
}