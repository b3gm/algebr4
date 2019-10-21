import Vec2 from '../Vec2';
import 'jest';

function testVec() {
    return new Vec2(1, 2);
}

function testVec2() {
    return new Vec2(3, 4);
}

describe(Vec2, () => {
    it('should compare vectors', () => {
        const a = testVec();
        for(let c of ['x', 'y']) {
            const b = a.copy();
            b[c] += 0.001;
            expect(a.equals(b)).toBe(false);
            expect(a.equals(b, 1.0e-2)).toBe(true);
        }
    });
    
    it('should add vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.add(b)).toMatchObject(new Vec2(4, 6));
        expect(a).toMatchObject(testVec());
        expect(b).toMatchObject(testVec2());
    });
    
    it('should add to itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec2(4, 6);
        expect(a.addSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    })
    
    it('should subtract vectors', () => {
        const a = testVec();
        const b = testVec2();
        expect(a.subtract(b)).toMatchObject(
            new Vec2(-2, -2)
        );
        expect(a).toMatchObject(testVec());
    });
    
    it('should subtract vectors from itself', () => {
        const a = testVec();
        const b = testVec2();
        const expected = new Vec2(-2, -2);
        expect(a.subtractSelf(b)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });
    
    it('should calculate the norm square', () => {
        expect(testVec().normSquare()).toBe(5);
    });
    
    it('should calculate the norm', () => {
        expect(testVec().norm()).toBe(Math.sqrt(5));
    })
    
    it('should dot product vectors', () => {
        expect(testVec().dot(testVec())).toBe(testVec().normSquare());
    });
    
    it('should scalar multiply', () => {
        const a = testVec();
        expect(a.scalarMultiply(2)).toMatchObject(new Vec2(2, 4));
        expect(a).toMatchObject(testVec());
    });
    
    it('should scalar multiply itself', () => {
        const a = testVec();
        const expected = new Vec2(2, 4);
        expect(a.scalarMultiplySelf(2)).toMatchObject(expected);
        expect(a).toMatchObject(expected);
    });
    
    it('should calculate the infinity norm', () => {
        expect(testVec().lInfNorm()).toBe(2);
        expect(testVec().scalarMultiplySelf(-1).lInfNorm()).toBe(2);
    });
    
    it('should calculate the l1 norm', () => {
        expect(testVec().l1Norm()).toBe(3);
        expect(testVec().scalarMultiplySelf(-1).l1Norm()).toBe(3);
    });
    
    it('should normalize', () => {
        const norm = Math.sqrt(5);
        const a = testVec();
        expect(a.normalize()).toMatchObject({
            x: 1 / norm,
            y: 2 / norm
        });
        expect(a).toMatchObject(testVec());
    });
    
    it('should normalize itself', () => {
        const norm = Math.sqrt(5);
        const a = testVec();
        const expectedValue = {
            x: 1 / norm,
            y: 2 / norm
        };
        expect(a.normalizeSelf()).toMatchObject(expectedValue);
        expect(a).toMatchObject(expectedValue)
    });
    
    it('should convert to an array', () => {
        expect(testVec().toArray()).toMatchObject([1, 2]);
    });
    
    it('should import arrays', () => {
        expect(Vec2.fromArray([])).toMatchObject(new Vec2(0, 0));
        expect(Vec2.fromArray([1, 2])).toMatchObject(testVec());
    });
    
    it('should import literals', () => {
        expect(Vec2.fromLiteral(testVec())).toMatchObject(testVec());
    });
});