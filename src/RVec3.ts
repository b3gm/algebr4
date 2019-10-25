import LVec3 from './LVec3';

export default interface RVec3 extends LVec3 {
    readonly x:number;
    readonly y:number;
    readonly z:number;
    
    dot(vec:LVec3):number;
    
    cross(vec:LVec3):RVec3;
    
    add(vec:LVec3):RVec3;
    
    subtract(vec:LVec3):RVec3;
    
    scalarMultiply(factor:number):RVec3;
    
    normSquare():number;
    
    norm():number;
    
    l1Norm():number;
    
    lInfNorm():number;
    
    normalize():RVec3;
    
    turnRadUnsafe(axis:RVec3, angle:number):RVec3;
    
    turnRad(axis:RVec3, angle:number):RVec3;
    
    turnDegUnsafe(axis:RVec3, angle:number):RVec3;
    
    turnDeg(axis:RVec3, angle:number):RVec3;
    
    angleUnsafe(vec:LVec3):number;

    angleUnsafe(vec:LVec3):number;
    
    angle(vec:LVec3):number;
    
    angle(vec:LVec3):number;
    
    copy():RVec3;
    
    toArray():Array<number>;
    
    equals(vec:LVec3, tolerance:number):boolean;
    
    equals(vec:LVec3):boolean;
}