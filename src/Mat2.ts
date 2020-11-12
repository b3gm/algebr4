import { LMat2 } from './LMat2';
import { WMat2 } from './WMat2';
import { LVec2 } from './LVec2';
import { Vec2 } from './Vec2';

export class Mat2 implements WMat2 {

    public static fromLiteral(m: LMat2): Mat2 {
        return new Mat2(m.xx, m.xy, m.yx, m.yy);
    }

    public static fromFlatArray(e: Array<number>): Mat2 {
        return new Mat2(
            e[0], e[1],
            e[2], e[3]
        );
    }

    public static fromRowMajorArray(e: Array<Array<number>>): Mat2 {
        const r1 = e[0] || [], r2 = e[1] || [];
        return new Mat2(
            r1[0] || 0, r1[1] || 0,
            r2[0] || 0, r2[1] || 0
        );
    }

    public static fromColumnMajorArray(e: Array<Array<number>>): Mat2 {
        const c1 = e[0] || [], c2 = e[1] || [];
        return new Mat2(
            c1[0] || 0, c2[0] || 0,
            c1[1] || 0, c2[1] || 0
        );
    }

    constructor(
        public xx: number,
        public xy: number,
        public yx: number,
        public yy: number
    ) {
    }

    toFlatArray(): number[] {
        return [
            this.xx, this.xy,
            this.yx, this.yy
        ]
    }

    toRowMajorArray(): Array<Array<number>> {
        return [
            [this.xx, this.xy],
            [this.yx, this.yy]
        ]
    }

    toColumnMajorArray(): Array<Array<number>> {
        return [
            [this.xx, this.yx],
            [this.xy, this.yy]
        ]
    }

    add(m: LMat2): Mat2 {
        return new Mat2(
            this.xx + m.xx, this.xy + m.xy,
            this.yx + m.yx, this.yy + m.yy
        );
    }

    addSelf(m: LMat2): Mat2 {
        this.xx += m.xx;
        this.xy += m.xy;
        this.yx += m.yx;
        this.yy += m.yy;
        return this;
    }

    subtract(m: LMat2): Mat2 {
        return new Mat2(
            this.xx - m.xx, this.xy - m.xy,
            this.yx - m.yx, this.yy - m.yy
        );
    }

    subtractSelf(m: LMat2): Mat2 {
        this.xx -= m.xx;
        this.xy -= m.xy;
        this.yx -= m.yx;
        this.yy -= m.yy;
        return this;
    }

    multiply(m: LMat2): Mat2 {
        const xx = this.xx, xy = this.xy,
            yx = this.yx, yy = this.yy,
            oxx = m.xx, oxy = m.xy,
            oyx = m.yx, oyy = m.yy;
        return new Mat2(
            xx * oxx + xy * oyx, xx * oxy + xy * oyy,
            yx * oxx + yy * oyx, yx * oxy + yy * oyy
        );
    }

    scalarMultiply(f: number): Mat2 {
        return new Mat2(
            f * this.xx, f * this.xy,
            f * this.yx, f * this.yy
        );
    }

    scalarMultiplySelf(f: number): Mat2 {
        this.xx *= f;
        this.xy *= f;
        this.yx *= f;
        this.yy *= f;
        return this;
    }

    det(): number {
        return this.xx * this.yy - this.yx * this.xy;
    }

    invert(): Mat2 {
        const xx = this.xx, xy = this.xy,
            yx = this.yx, yy = this.yy;
        const detInv = 1 / (xx * yy - xy * yx);

        return new Mat2(
            detInv * yy, - detInv * xy,
            - detInv * yx, detInv * xx
        );
    }

    invertSelf(): Mat2 {
        const xx = this.xx, xy = this.xy,
            yx = this.yx, yy = this.yy;
        const detInv = 1 / (xx * yy - xy * yx);
        this.xx = detInv * yy;
        this.xy = - detInv * xy;
        this.yx = - detInv * yx;
        this.yy = detInv * xx;
        return this;
    }

    multiplyVec(v: LVec2): Vec2 {
        const vx = v.x, vy = v.y;
        return new Vec2(
            this.xx * vx + this.xy * vy,
            this.yx * vx + this.yy * vy
        );
    }

    vecMultiply(v: LVec2): Vec2 {
        const vx = v.x, vy = v.y;
        return new Vec2(
            this.xx * vx + this.yx * vy,
            this.xy * vx + this.yy * vy
        );
    }

    transpose(): Mat2 {
        return new Mat2(
            this.xx, this.yx,
            this.xy, this.yy
        );
    }

    transposeSelf(): Mat2 {
        const xy = this.xy;
        this.xy = this.yx;
        this.yx = xy;
        return this;
    }

    copy(): Mat2 {
        return new Mat2(
            this.xx, this.xy,
            this.yx, this.yy
        );
    }

    equals(o: Mat2, tolerance: number = 0): boolean {
        if (tolerance > 0) {
            return Math.abs(this.xx - o.xx) < tolerance
                && Math.abs(this.xy - o.xy) < tolerance
                && Math.abs(this.yx - o.yx) < tolerance
                && Math.abs(this.yy - o.yy) < tolerance;
        }
        return this.xx === o.xx
            && this.xy === o.xy
            && this.yx === o.yx
            && this.yy === o.yy;
    }

}