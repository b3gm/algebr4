import LMat3 from './LMat3';
import RMat3 from './RMat3';

export default interface WMat3 extends RMat3 {
    
    addSelf(m: LMat3): WMat3;
    subtractSelf(m: LMat3): WMat3;
    scalarMultiplySelf(f: number): WMat3;
    
    invertSelf():WMat3;
    
    transposeSelf(): WMat3;
    
}