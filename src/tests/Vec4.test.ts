import { Vec4 } from '../Vec4';
import 'jest';

function testVec() {
    return new Vec4(1, 2, 3, 4);
}

function testVec2() {
    return new Vec4(5, 6, 7, 8);
}

describe(Vec4, () => {
    it('should compare vectors', () => {
        const a = testVec();
        for (const c of ['x', 'y', 'z', 'w']) {
            const b = a.copy();
            b[c] += 0.001;
            expect(a.equals(b)).toBe(false);
            expect(a.equals(b, 1.0e-2)).toBe(true);
        }
    });

    it('should add vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.add(b)).toMatchObject(new Vec4(6, 8, 10, 12));
        expect(a).toMatchObject(testVec());
        expect(b).toMatchObject(testVec2());
    });

    it('should add to itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec4(6, 8, 10, 12);
        expect(a.addSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    })

    it('should subtract vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.subtract(b)).toMatchObject(
            new Vec4(-4, -4, -4, -4)
        );
        expect(a).toMatchObject(testVec());
    });

    it('should subtract vectors from itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec4(-4, -4, -4, -4);
        expect(a.subtractSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });

    it('should calculate the norm square', () => {
        expect(testVec().normSquare()).toBe(30);
    });

    it('should calculate the norm', () => {
        expect(testVec().norm()).toBe(Math.sqrt(30));
    })

    it('should dot product vectors', () => {
        expect(testVec().dot(testVec())).toBe(testVec().normSquare());
    });

    it('should scalar multiply', () => {
        const a = testVec();
        expect(a.scalarMultiply(2)).toMatchObject(new Vec4(2, 4, 6, 8));
        expect(a).toMatchObject(testVec());
    });

    it('should scalar multiply itself', () => {
        const a = testVec();
        const expected = new Vec4(2, 4, 6, 8);
        expect(a.scalarMultiplySelf(2)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });

    it('should calculate the infinity norm', () => {
        expect(testVec().lInfNorm()).toBe(4);
        expect(testVec().scalarMultiplySelf(-1).lInfNorm()).toBe(4);
    });

    it('should calculate the l1 norm', () => {
        expect(testVec().l1Norm()).toBe(10);
        expect(testVec().scalarMultiplySelf(-1).l1Norm()).toBe(10);
    });

    it('should normalize', () => {
        const norm = Math.sqrt(30);
        const a = testVec();
        expect(a.normalize()).toMatchObject({
            x: 1 / norm,
            y: 2 / norm,
            z: 3 / norm,
            w: 4 / norm
        });
        expect(a).toMatchObject(testVec());
    });

    it('should normalize itself', () => {
        const norm = Math.sqrt(30);
        const a = testVec();
        const expectedValue = {
            x: 1 / norm,
            y: 2 / norm,
            z: 3 / norm,
            w: 4 / norm
        };
        expect(a.normalizeSelf()).toMatchObject(expectedValue);
        expect(a).toMatchObject(expectedValue)
    });

    it('should convert to an array', () => {
        expect(testVec().toArray()).toMatchObject([1, 2, 3, 4]);
    });

    it('should import arrays', () => {
        expect(Vec4.fromArray([])).toMatchObject(new Vec4(0, 0, 0, 0));
        expect(Vec4.fromArray([1, 2, 3, 4])).toMatchObject(testVec());
    });

    it('should import literals', () => {
        expect(Vec4.fromLiteral(testVec())).toMatchObject(testVec());
    });

    it('should assign to itself from another vector', () => {
        const a = testVec();
        const b = testVec2();
        b.assignFrom(a);
        expect(b).toEqual(a);
    });
});