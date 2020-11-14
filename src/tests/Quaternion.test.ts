import { Quaternion } from '../Quaternion';
import { Vec3 } from '../Vec3';
import { RVec3 } from '../RVec3';
import { Mat3 } from '../Mat3';
import 'jest';

const TOL = 1.0e-6;

describe(Quaternion, () => {

    it('should correctly add quaternions', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.add(b))['equals'](new Quaternion(6, 8, 10, 12));
        expect(a)['equals'](testQ());
        expect(b)['equals'](testQ2());
    });

    it('should correctly add quaternion to itself', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.addSelf(b))['equals'](new Quaternion(6, 8, 10, 12));
        expect(a)['equals'](new Quaternion(6, 8, 10, 12));
        expect(b)['equals'](testQ2());
    });

    it('should correctly subtract quaternions', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.subtract(b))['equals'](new Quaternion(-4, -4, -4, -4));
        expect(a)['equals'](testQ());
        expect(b)['equals'](testQ2());
    });

    it('should correctly subtract quaternion from itself', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.subtractSelf(b))['equals'](new Quaternion(-4, -4, -4, -4));
        expect(a)['equals'](new Quaternion(-4, -4, -4, -4));
        expect(b)['equals'](testQ2());
    });

    it('should correctly multiply quaternions', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.multiply(b))['equals'](new Quaternion(-60, 12, 30, 24));
        expect(a)['equals'](testQ());
        expect(b)['equals'](testQ2());
    });

    it('should correctly multiply quaternion to itself', () => {
        const a = testQ();
        const b = testQ2();
        expect(a.multiplySelf(b))['equals'](new Quaternion(-60, 12, 30, 24));
        expect(a)['equals'](new Quaternion(-60, 12, 30, 24));
        expect(b)['equals'](testQ2());
    });

    it('should scalar multiply', () => {
        const a = testQ();
        expect(a.scalarMultiply(2))['equals'](new Quaternion(2, 4, 6, 8));
        expect(a)['equals'](testQ());
    });

    it('should scalar multiply itself', () => {
        const a = testQ();
        expect(a.scalarMultiplySelf(2))['equals'](new Quaternion(2, 4, 6, 8));
        expect(a)['equals'](new Quaternion(2, 4, 6, 8));
    });

    it('should correctly conjugate itself', () => {
        const a = testQ();
        expect(a.conjugateSelf())['equals'](new Quaternion(1, -2, -3, -4));
        expect(a)['equals'](new Quaternion(1, -2, -3, -4));
    });

    it('should correctly conjugate', () => {
        const a = testQ();
        expect(a.conjugate())['equals'](new Quaternion(1, -2, -3, -4));
        expect(a)['equals'](testQ());
    });

    it('should correctly calculate the square norm', () => {
        expect(testQ().normSquare()).toBe(30);
    });

    it('should correctly calculate the norm', () => {
        expect(testQ().norm()).toBeCloseTo(Math.sqrt(30), 1.0e-6);
    });

    it('should correctly normalize', () => {
        const a = testQ();
        const n = Math.sqrt(30);
        expect(a.normalize())['equals'](
            new Quaternion(1 / n, 2 / n, 3 / n, 4 / n)
        );
        expect(a)['equals'](testQ());
    });

    it('should correctly normalize itself', () => {
        const a = testQ();
        const n = Math.sqrt(30);
        expect(a.normalizeSelf())['equals'](
            new Quaternion(1 / n, 2 / n, 3 / n, 4 / n)
        );
        expect(a)['equals'](new Quaternion(1 / n, 2 / n, 3 / n, 4 / n));
    });

    it('should correctly copy itself', () => {
        const a = testQ();
        const c = a.copy();
        expect(c)['equals'](testQ());
        a.w = 0.5;
        expect(a)['equals'](new Quaternion(0.5, 2, 3, 4));
        expect(c)['equals'](testQ());
    });

    it('should correctly rotate a vector', () => {
        const v: RVec3 = new Vec3(0, 1, 0);
        const q = Quaternion.fromAngleAxisUnsafe(
            Math.PI / 4,
            new Vec3(1, 0, 0)
        );
        const vPrime = q.rotateUnsafe(v);
        expect(vPrime.x).toBeCloseTo(0, TOL);
        expect(vPrime.y).toBeCloseTo(1 / Math.sqrt(2), TOL);
        expect(vPrime.z).toBeCloseTo(1 / Math.sqrt(2), TOL);
    });

    it('should correctly import { flat } arrays', () => {
        let arr: Array<number> = [];
        expect(Quaternion.fromFlatArray(arr))['equals'](
            new Quaternion(0, 0, 0, 0)
        );
        arr = [1, 2, 3, 4];
        expect(Quaternion.fromFlatArray(arr))['equals'](testQ());
    });

    it('should create quaternions from rotation matrices', () => {
        expect(
            Quaternion.fromRotationMatrixUnsafe(
                Mat3.fromFlatArray([
                    0, -1, 0,
                    1, 0, 0,
                    0, 0, 1
                ])
            )
        )['equals'](
            new Quaternion(Math.cos(Math.PI / 4), 0, 0, Math.sin(Math.PI / 4))
        );
        expect(
            Quaternion.fromRotationMatrixUnsafe(
                Mat3.fromFlatArray([
                    1, 0, 0,
                    0, -1, 0,
                    0, 0, -1
                ])
            )
        )['equals'](
            new Quaternion(Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0, 0)
        );
        expect(
            Quaternion.fromRotationMatrixUnsafe(
                Mat3.fromFlatArray([
                    -1, 0, 0,
                    0, 1, 0,
                    0, 0, -1
                ])
            )
        )['equals'](
            new Quaternion(Math.cos(Math.PI / 2), 0, Math.sin(Math.PI / 2), 0)
        );
        expect(
            Quaternion.fromRotationMatrixUnsafe(
                Mat3.fromFlatArray([
                    -1, 0, 0,
                    0, -1, 0,
                    0, 0, 1
                ])
            )
        )['equals'](
            new Quaternion(Math.cos(Math.PI / 2), 0, 0, Math.sin(Math.PI / 2))
        );
    });
});

function testQ() {
    return new Quaternion(1, 2, 3, 4);
}

function testQ2() {
    return new Quaternion(5, 6, 7, 8);
}

expect.extend({
    equals: (received: Quaternion, expected: Quaternion) => {
        if (
            Math.abs(received.w - expected.w) < 1.0e-6
            && Math.abs(received.x - expected.x) < 1.0e-6
            && Math.abs(received.y - expected.y) < 1.0e-6
            && Math.abs(received.z - expected.z) < 1.0e-6
        ) {
            return {
                pass: true,
                message: () => `Expected ${toString(received)} to differ no more than 1.0e-6 from ${toString(expected)}.`
            }
        }
        return {
            pass: false,
            message: () => `Expected ${toString(received)} to differ by more than 1.0e-6 in at least one component from ${toString(expected)}.`
        }
    }
});

function toString(q: Quaternion) {
    return JSON.stringify(q);
}