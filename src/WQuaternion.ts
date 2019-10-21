import RQuaternion from './RQuaternion';
import LQuaternion from './LQuaternion';
import WVec3 from './WVec3';
import LVec3 from './LVec3';

export default interface WQuaternion extends RQuaternion {

    add(q:LQuaternion):WQuaternion ;
    
    addSelf(q:LQuaternion):WQuaternion ;
    
    subtract(q:LQuaternion):WQuaternion ;
    
    subtractSelf(q:LQuaternion):WQuaternion ;
    
    scalarMultiply(f:number):WQuaternion ;
    
    scalarMultiplySelf(f:number):WQuaternion ;
    
    multiply(q:LQuaternion):WQuaternion ;
    
    multiplySelf(q:LQuaternion):WQuaternion ;
    
    normSquare():number;
    
    norm():number;
    
    normalize():WQuaternion ;
    
    normalizeSelf():WQuaternion ;
    
    conjugate():WQuaternion ;
    
    conjugateSelf():WQuaternion ;
    
    turnUnsafe(vec:LVec3):WVec3;
    
    copy():WQuaternion ;
    
}