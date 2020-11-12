import { Mat2 } from '../Mat2';
import { Vec2 } from '../Vec2';
import 'jest';
import * as c from './common';

describe('Mat2', () => {
    it('should correctly invert', () => {
        const mat: Mat2 = c.testMat2();
        const inverse = mat.invert();
        const product = mat.multiply(inverse);
        const prodArray = product.toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                if (i === j) {
                    expect(prodArray[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(prodArray[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });

    it('should correctly invert itself', () => {
        const mat = c.testMat2();
        const inverse = c.testMat2().invertSelf();
        const product = mat.multiply(inverse).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                if (i === j) {
                    expect(product[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(product[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });

    it('should correctly add matrices', () => {
        const a = c.incrementing2();
        const b = c.rowTimesColumn4();
        const result = a.add(b).toRowMajorArray();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10);
            }
        }
    });

    it('should correctly subtract matrices', () => {
        const a = c.incrementing2();
        const b = c.rowTimesColumn2();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtract(b).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10);
            }
        }
    });

    it('should correctly add matrices to itself', () => {
        const a = c.incrementing2();
        const b = c.rowTimesColumn2();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.addSelf(b).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10);
            }
        }
    });

    it('should correctly subtract matrices from itself', () => {
        const a = c.incrementing2();
        const b = c.rowTimesColumn2();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtractSelf(b).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10);
            }
        }
    });

    it('should correctly transpose', () => {
        const a = c.incrementing2();
        const aArr = a.toRowMajorArray();
        const result = a.transpose().toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]);
            }
        }
    });

    it('should correctly transpose itself', () => {
        const a = c.incrementing2();
        const aArr = a.toRowMajorArray();
        const result = a.transposeSelf().toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]);
            }
        }
    });

    it('should correctly calculate the determinante', () => {
        const a = c.testMat2();
        expect(a.det()).toBe(-1);
    });

    it('should correctly multiply with vectors', () => {
        const a = c.incrementing2();
        const v = new Vec2(1, 2);
        const result = a.multiplyVec(v);
        expect(result.x).toBe(5);
        expect(result.y).toBe(11);
    });

    it('should correctly pre multiply with vectors', () => {
        const a = c.incrementing2();
        const v = new Vec2(1, 2);
        const result = a.vecMultiply(v);
        expect(result.x).toBe(7);
        expect(result.y).toBe(10);
    });

    it('should copy itself', () => {
        const a = c.incrementing2();
        const result = a.copy().toFlatArray();
        for (let i = 0; i != 4; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });

    it('should import literals', () => {
        const result = Mat2.fromLiteral(c.incrementing2()).toFlatArray();
        for (let i = 0; i != 4; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });

    it('should correctly scalar multiply', () => {
        const a = c.incrementing2();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiply(2).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2);
            }
        }
    });

    it('should correctly scalar multiply itself', () => {
        const a = c.incrementing2();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiplySelf(2).toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2);
            }
        }
    });

    it('should correctly return a column major array', () => {
        const result = c.incrementing2().toColumnMajorArray();
        const aArr = c.incrementing2().transposeSelf().toRowMajorArray();
        for (let i = 0; i != 2; ++i) {
            for (let j = 0; j != 2; ++j) {
                expect(result[i][j]).toBe(aArr[i][j]);
            }
        }
        expect(
            Mat2.fromColumnMajorArray([])
                .equals(Mat2.fromColumnMajorArray(c.array4()))
        ).toBe(true);
    });

    it('should correctly import row major arrays', () => {
        const arr = Mat2.fromRowMajorArray([
            [1, 2],
            [3, 4]
        ]).toFlatArray();
        for (let i = 0; i != 4; ++i) {
            expect(arr[i]).toBe(i + 1);
        }
        expect(
            Mat2.fromRowMajorArray([])
                .equals(Mat2.fromRowMajorArray(c.array4()))
        ).toBe(true);
    });

    it('should correctly import column major arrays', () => {
        const result = Mat2.fromColumnMajorArray(c.incrementing2().toColumnMajorArray());
        expect(result.equals(c.incrementing2())).toBe(true);

    });

    it('should correctly compare matrices', () => {
        const flat: Array<number> = [];
        for (let i = 1; i <= 4; ++i) {
            flat.push(i);
        }
        const a = c.incrementing2();
        expect(a.equals(Mat2.fromFlatArray(flat))).toBe(true);
        for (let i = 0; i != 4; ++i) {
            const copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            const b = Mat2.fromFlatArray(copy);
            expect(a.equals(b)).toBe(false);
        }
    });

    it('should correctly compare matrices with tolerance', () => {
        const flat: Array<number> = [];
        for (let i = 1; i <= 4; ++i) {
            flat.push(i);
        }
        const a = c.incrementing2();
        expect(a.equals(Mat2.fromFlatArray(flat))).toBe(true);
        for (let i = 0; i != 4; ++i) {
            let copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            let b = Mat2.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(false);
            copy = flat.map(v => v);
            copy[i] = copy[i] + 0.0001
            b = Mat2.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(true);
        }
    });

});
