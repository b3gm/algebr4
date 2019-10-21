import Vec3 from '../Vec3';
import 'jest';

function testVec() {
    return new Vec3(1, 2, 3);
}

function testVec2() {
    return new Vec3(4, 5, 6);
}

describe(Vec3, () => {
    it('should compare vectors', () => {
        const a = testVec();
        for(let c of ['x', 'y', 'z']) {
            const b = a.copy();
            b[c] += 0.001;
            expect(a.equals(b)).toBe(false);
            expect(a.equals(b, 1.0e-2)).toBe(true);
        }
    });
    
    it('should add vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.add(b)).toMatchObject(new Vec3(5, 7, 9));
        expect(a).toMatchObject(testVec());
        expect(b).toMatchObject(testVec2());
    });
    
    it('should add to itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec3(5, 7, 9);
        expect(a.addSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    })
    
    it('should subtract vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.subtract(b)).toMatchObject(
            new Vec3(-3, -3, -3)
        );
        expect(a).toMatchObject(testVec());
    });
    
    it('should subtract vectors from itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec3(-3, -3, -3);
        expect(a.subtractSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });
    
    it('should calculate the norm square', () => {
        expect(testVec().normSquare()).toBe(14);
    });
    
    it('should calculate the norm', () => {
        expect(testVec().norm()).toBe(Math.sqrt(14));
    })
    
    it('should dot product vectors', () => {
        expect(testVec().dot(testVec())).toBe(testVec().normSquare());
    });
    
    it('should scalar multiply', () => {
        const a = testVec();
        expect(a.scalarMultiply(2)).toMatchObject(new Vec3(2, 4, 6));
        expect(a).toMatchObject(testVec());
    });
    
    it('should scalar multiply itself', () => {
        const a = testVec();
        const expected = new Vec3(2, 4, 6);
        expect(a.scalarMultiplySelf(2)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });
    
    it('should calculate the infinity norm', () => {
        expect(testVec().lInfNorm()).toBe(3);
        expect(testVec().scalarMultiplySelf(-1).lInfNorm()).toBe(3);
    });
    
    it('should calculate the l1 norm', () => {
        expect(testVec().l1Norm()).toBe(6);
        expect(testVec().scalarMultiplySelf(-1).l1Norm()).toBe(6);
    });
    
    it('should normalize', () => {
        const norm = Math.sqrt(14);
        const a = testVec();
        expect(a.normalize()).toMatchObject({
            x: 1 / norm,
            y: 2 / norm,
            z: 3 / norm
        });
        expect(a).toMatchObject(testVec());
    });
    
    it('should normalize itself', () => {
        const norm = Math.sqrt(14);
        const a = testVec();
        const expectedValue = {
            x: 1 / norm,
            y: 2 / norm,
            z: 3 / norm
        };
        expect(a.normalizeSelf()).toMatchObject(expectedValue);
        expect(a).toMatchObject(expectedValue)
    });
    
    it('should convert to an array', () => {
        expect(testVec().toArray()).toMatchObject([1, 2, 3]);
    });
    
    it('should import arrays', () => {
        expect(Vec3.fromArray([])).toMatchObject(new Vec3(0, 0, 0));
        expect(Vec3.fromArray([1, 2, 3])).toMatchObject(testVec());
    });
    
    it('should import literals', () => {
        expect(Vec3.fromLiteral(testVec())).toMatchObject(testVec());
    });
    
    it('should turn vectors', () => {
        expect(
            new Vec3(0, 1, 0).turnDeg(new Vec3(1, 0, 0), 90)
        )['matchesVector'](new Vec3(0, 0, 1));
        expect(
            new Vec3(1, 0, 0).turnDeg(new Vec3(1, 0, 0), 90)
        )['matchesVector'](new Vec3(1, 0, 0));
        expect(
            new Vec3(0, 0, 1).turnDeg(new Vec3(1, 0, 0), 90)
        )['matchesVector'](new Vec3(0, -1, 0));
    });
});
    
expect.extend({
    'matchesVector': (received: Vec3, expected:Vec3, ...actual:Vec3[]) => {
        const passX = Math.abs(expected.x - received.x) < 1.0e-6;
        const passY = Math.abs(expected.y - received.y) < 1.0e-6;
        const passZ = Math.abs(expected.z - received.z) < 1.0e-6;
        
        if(passX && passY && passZ) {
            return {
                pass: true,
                message: () => `Expected ${toString(received)} to differ at most by 1.0e-6 in any component from ${toString(expected)}.`
            };
        }
        return {
            pass: false,
            message: () => `Expected ${toString(received)} to differ by more than 1.0e-6 in any component from ${toString(expected)}.`
        };
    }
});

function toString(obj:any) {
    return JSON.stringify(obj);
}