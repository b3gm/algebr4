import LMat2 from './LMat2';
import RMat2 from './RMat2';

export default interface WMat2 extends RMat2 {
    
    addSelf(m: LMat2): WMat2;
    subtractSelf(m: LMat2): WMat2;
    scalarMultiplySelf(f: number): WMat2;
    
    invertSelf():WMat2;
    
    transposeSelf(): WMat2;
    
}