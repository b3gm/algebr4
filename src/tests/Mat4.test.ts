import { Mat4 } from '../Mat4';
import { Vec4 } from '../Vec4';
import 'jest';
import * as c from './common';

describe('Mat4', () => {
    it('should correctly invert', () => {
        const mat: Mat4 = c.testMat4();
        const inverse = mat.invert();
        const product = mat.multiply(inverse);
        const prodArray = product.toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                if (i === j) {
                    expect(prodArray[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(prodArray[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });

    it('should correctly invert itself', () => {
        const mat = c.testMat4();
        const inverse = c.testMat4().invertSelf();
        const product = mat.multiply(inverse).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                if (i === j) {
                    expect(product[i][j]).toBeCloseTo(1, 10);
                } else {
                    expect(product[i][j]).toBeCloseTo(0, 10);
                }
            }
        }
    });

    it('should throw if not invertible', () => {
        let err: any = null;
        const mat: Mat4 = new Mat4(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        );
        try {
            mat.invert();
        } catch(e) {
            err = e;
        }
        expect(err.message).toBe('Matrix cannot be inverted.');
    });

    it('should throw if not invertible on invertSelf', () => {
        let err: any = null;
        const mat: Mat4 = new Mat4(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        );
        try {
            mat.invertSelf();
        } catch(e) {
            err = e;
        }
        expect(err).not.toBeNull();
        expect(err.message).toBe('Matrix cannot be inverted.');
    });

    it('should assign to itself from another matrix', () => {
        const a = c.testMat4();
        const b = c.rowTimesColumn4();
        b.assignFrom(a);
        expect(b).toEqual(a);
    });

    it('should correctly add matrices', () => {
        const a = c.incrementing4();
        const b = c.rowTimesColumn4();
        const result = a.add(b).toRowMajorArray();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10);
            }
        }
    });

    it('should correctly subtract matrices', () => {
        const a = c.incrementing4();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtract(b).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10);
            }
        }
    });

    it('should correctly add matrices to itself', () => {
        const a = c.incrementing4();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.addSelf(b).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] + bArr[i][j], 10);
            }
        }
    });

    it('should correctly subtract matrices from itself', () => {
        const a = c.incrementing4();
        const b = c.rowTimesColumn4();
        const aArr = a.toRowMajorArray();
        const bArr = b.toRowMajorArray();
        const result = a.subtractSelf(b).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBeCloseTo(aArr[i][j] - bArr[i][j], 10);
            }
        }
    });

    it('should correctly transpose', () => {
        const a = c.incrementing4();
        const aArr = a.toRowMajorArray();
        const result = a.transpose().toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]);
            }
        }
    });

    it('should correctly transpose itself', () => {
        const a = c.incrementing4();
        const aArr = a.toRowMajorArray();
        const result = a.transposeSelf().toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBe(aArr[j][i]);
            }
        }
    });

    it('should correctly calculate the determinante', () => {
        const a = c.testMat4();
        expect(a.det()).toBe(-102);
    });

    it('should correctly multiply with vectors', () => {
        const a = c.incrementing4();
        const v = new Vec4(1, 2, 3, 4);
        const result = a.multiplyVec(v);
        expect(result.x).toBe(30);
        expect(result.y).toBe(70);
        expect(result.z).toBe(110);
        expect(result.w).toBe(150);
    });

    it('should correctly pre multiply with vectors', () => {
        const a = c.incrementing4();
        const v = new Vec4(1, 2, 3, 4);
        const result = a.vecMultiply(v);
        expect(result.x).toBe(90);
        expect(result.y).toBe(100);
        expect(result.z).toBe(110);
        expect(result.w).toBe(120);
    });

    it('should copy itself', () => {
        const a = c.incrementing4();
        const result = a.copy().toFlatArray();
        for (let i = 0; i != 16; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });

    it('should import literals', () => {
        const result = Mat4.fromLiteral(c.incrementing4()).toFlatArray();
        for (let i = 0; i != 16; ++i) {
            expect(result[i]).toBe(i + 1);
        }
    });

    it('should correctly scalar multiply', () => {
        const a = c.incrementing4();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiply(2).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2);
            }
        }
    });

    it('should correctly scalar multiply itself', () => {
        const a = c.incrementing4();
        const aArr = a.toRowMajorArray();
        const result = a.scalarMultiplySelf(2).toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBe(aArr[i][j] * 2);
            }
        }
    });

    it('should correctly return a column major array', () => {
        const result = c.incrementing4().toColumnMajorArray();
        const aArr = c.incrementing4().transposeSelf().toRowMajorArray();
        for (let i = 0; i != 4; ++i) {
            for (let j = 0; j != 4; ++j) {
                expect(result[i][j]).toBe(aArr[i][j]);
            }
        }
        expect(
            Mat4.fromColumnMajorArray([])
                .equals(Mat4.fromColumnMajorArray(c.array4()))
        ).toBe(true);
    });

    it('should correctly import { row } major arrays', () => {
        const arr = Mat4.fromRowMajorArray([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ]).toFlatArray();
        for (let i = 0; i != 16; ++i) {
            expect(arr[i]).toBe(i + 1);
        }
        expect(
            Mat4.fromRowMajorArray([])
                .equals(Mat4.fromRowMajorArray(c.array4()))
        ).toBe(true);
    });

    it('should correctly import { column } major arrays', () => {
        const result = Mat4.fromColumnMajorArray(c.incrementing4().toColumnMajorArray());
        expect(result.equals(c.incrementing4())).toBe(true);

    });

    it('should correctly compare matrices', () => {
        const flat: Array<number> = [];
        for (let i = 1; i <= 16; ++i) {
            flat.push(i);
        }
        const a = c.incrementing4();
        expect(a.equals(Mat4.fromFlatArray(flat))).toBe(true);
        for (let i = 0; i != 16; ++i) {
            const copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            const b = Mat4.fromFlatArray(copy);
            expect(a.equals(b)).toBe(false);
        }
    });

    it('should correctly compare matrices with tolerance', () => {
        const flat: Array<number> = [];
        for (let i = 1; i <= 16; ++i) {
            flat.push(i);
        }
        const a = c.incrementing4();
        expect(a.equals(Mat4.fromFlatArray(flat))).toBe(true);
        for (let i = 0; i != 16; ++i) {
            let copy = flat.map(v => v);
            copy[i] = copy[i] + 0.001
            let b = Mat4.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(false);
            copy = flat.map(v => v);
            copy[i] = copy[i] + 0.0001
            b = Mat4.fromFlatArray(copy);
            expect(a.equals(b, 0.0005)).toBe(true);
        }
    });

});
