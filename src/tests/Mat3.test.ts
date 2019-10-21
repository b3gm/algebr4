import Mat3 from '../Mat3';
import Vec3 from '../Vec3';
import 'jest';
import * as c from './common';

describe('Mat3', () => {
    it('should correctly invert', () => {
        const mat:Mat3 = c.testMat3();
        const inverse = mat.invert();
        const product = mat.multiply(inverse);
        const prodArray = product.toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                if(i === j) {
                    expect(prodArray[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(prodArray[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });
    
    it('should correctly invert itself', () => {
        const mat = c.testMat3();
        const inverse = c.testMat3().invertSelf();
        const product = mat.multiply(inverse).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                if(i === j) {
                    expect(product[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(product[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });
    
    it('should correctly add matrices', () => {
        const a = c.incrementing3();
        const b = c.rowTimesColumn4();
        const result = a.add(b).toRowMajorArray();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10); 
            }
        }
    });
    
    it('should correctly subtract matrices', () => {
        const a = c.incrementing3();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtract(b).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10); 
            }
        }
    });
    
    it('should correctly add matrices to itself', () => {
        const a = c.incrementing3();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.addSelf(b).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10); 
            }
        }
    });
    
    it('should correctly subtract matrices from itself', () => {
        const a = c.incrementing3();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtractSelf(b).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10); 
            }
        }
    });
    
    it('should correctly transpose', () => {
        const a = c.incrementing3();
        const aArr = a.toRowMajorArray();
        const result = a.transpose().toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]); 
            }
        }
    });
    
    it('should correctly transpose itself', () => {
        const a = c.incrementing3();
        const aArr = a.toRowMajorArray();
        const result = a.transposeSelf().toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]); 
            }
        }
    });
    
    it('should correctly calculate the determinante', () => {
        const a = c.testMat3();
        expect(a.det()).toBe(-7);
    });
    
    it('should correctly multiply with vectors', () => {
        const a = c.incrementing3();
        const v = new Vec3(1, 2, 3);
        const result = a.multiplyVec(v);
        expect(result.x).toBe(14);
        expect(result.y).toBe(32);
        expect(result.z).toBe(50);
    });
    
    it('should correctly pre multiply with vectors', () => {
        const a = c.incrementing3();
        const v = new Vec3(1, 2, 3);
        const result = a.vecMultiply(v);
        expect(result.x).toBe(30);
        expect(result.y).toBe(36);
        expect(result.z).toBe(42);
    });
    
    it('should copy itself', () => {
        const a = c.incrementing3();
        const result = a.copy().toFlatArray();
        for(let i = 0; i != 9; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });
    
    it('should import literals', () => {
        const result = Mat3.fromLiteral(c.incrementing3()).toFlatArray();
        for(let i = 0; i != 9; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });
    
    it('should correctly scalar multiply', () => {
        const a = c.incrementing3();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiply(2).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2); 
            }
        }
    });
    
    it('should correctly scalar multiply itself', () => {
        const a = c.incrementing3();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiplySelf(2).toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2); 
            }
        }
    });
    
    it('should correctly return a column major array', () => {
        const result = c.incrementing3().toColumnMajorArray();
        const aArr = c.incrementing3().transposeSelf().toRowMajorArray();
        for(let i = 0; i != 3; ++i) {
            for(let j = 0; j != 3; ++j) {
                expect(result[i][j]).toBe(aArr[i][j]); 
            }
        }
        expect(
            Mat3.fromColumnMajorArray([])
                .equals(Mat3.fromColumnMajorArray(c.array4()))
        ).toBe(true);
    });
    
    it('should correctly import row major arrays', () => {
        const arr = Mat3.fromRowMajorArray([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]).toFlatArray();
        for (let i = 0; i != 9; ++i) {
            expect(arr[i]).toBe(i + 1);
        }
        expect(
            Mat3.fromRowMajorArray([])
                .equals(Mat3.fromRowMajorArray(c.array4()))
        ).toBe(true);
    });
    
    it('should correctly import column major arrays', () => {
        const result = Mat3.fromColumnMajorArray(c.incrementing3().toColumnMajorArray());
        expect(result.equals(c.incrementing3())).toBe(true);
        
    });
    
    it('should correctly compare matrices', () => {
        const flat:Array<number> = [];
        for(let i = 1; i <= 9; ++i) {
            flat.push(i);
        }
        const a = c.incrementing3();
        expect(a.equals(Mat3.fromFlatArray(flat))).toBe(true);
        for(let i = 0; i != 9; ++i) {
            const copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            const b = Mat3.fromFlatArray(copy);
            expect(a.equals(b)).toBe(false);
        }
    });
    
    it('should correctly compare matrices with tolerance', () => {
        const flat:Array<number> = [];
        for(let i = 1; i <= 9; ++i) {
            flat.push(i);
        }
        const a = c.incrementing3();
        expect(a.equals(Mat3.fromFlatArray(flat))).toBe(true);
        for(let i = 0; i != 9; ++i) {
            let copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            let b = Mat3.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(false);
            copy = flat.map(v => v);
            copy[i] = copy[i] + 0.0001
            b = Mat3.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(true);
        }
    });
    
});
