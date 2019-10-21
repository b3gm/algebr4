import LMat4 from './LMat4';
import RMat4 from './RMat4';

export default interface WMat4 extends RMat4 {
    
    addSelf(m: LMat4): WMat4;
    subtractSelf(m: LMat4): WMat4;
    scalarMultiplySelf(f: number): WMat4;
    
    invertSelf():WMat4;
    
}