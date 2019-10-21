import LVec4 from './LVec4';

export default interface RVec4 {
    
    readonly x:number;
    readonly y:number;
    readonly z:number;
    readonly w:number;
    
    dot(vec:LVec4):number;
    
    add(vec:LVec4):RVec4;
    
    subtract(vec:LVec4):RVec4;
    
    scalarMultiply(factor:number):RVec4;
    
    normSquare():number;
    
    norm():number;
    
    l1Norm():number;
    
    lInfNorm():number;
    
    normalize():RVec4;
    
    copy():RVec4;
    
    toArray():Array<number>;
    
    equals(vec:LVec4, tolerance:number):boolean;
    
    equals(vec:LVec4):boolean;

}