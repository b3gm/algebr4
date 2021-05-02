import { LMat4 } from './LMat4';
import { WMat4 } from './WMat4';
import { LVec4 } from './LVec4';
import { Vec4 } from './Vec4';

/**
 * Implementation class for 4 dimensional matrices.
 */
export class Mat4 implements WMat4 {

    public static fromLiteral(m: LMat4): Mat4 {
        return new Mat4(
            m.xx, m.xy, m.xz, m.xw,
            m.yx, m.yy, m.yz, m.yw,
            m.zx, m.zy, m.zz, m.zw,
            m.wx, m.wy, m.wz, m.ww
        );
    }

    public static fromFlatArray(e: Array<number>): Mat4 {
        return new Mat4(
            e[0], e[1], e[2], e[3],
            e[4], e[5], e[6], e[7],
            e[8], e[9], e[10], e[11],
            e[12], e[13], e[14], e[15]
        );
    }

    public static fromRowMajorArray(e: Array<Array<number>>): Mat4 {
        const r1 = e[0] || [], r2 = e[1] || [], r3 = e[2] || [], r4 = e[3] || [];
        return new Mat4(
            r1[0] || 0, r1[1] || 0, r1[2] || 0, r1[3] || 0,
            r2[0] || 0, r2[1] || 0, r2[2] || 0, r2[3] || 0,
            r3[0] || 0, r3[1] || 0, r3[2] || 0, r3[3] || 0,
            r4[0] || 0, r4[1] || 0, r4[2] || 0, r4[3] || 0
        );
    }

    public static fromColumnMajorArray(e: Array<Array<number>>): Mat4 {
        const c1 = e[0] || [], c2 = e[1] || [], c3 = e[2] || [], c4 = e[3] || [];
        return new Mat4(
            c1[0] || 0, c2[0] || 0, c3[0] || 0, c4[0] || 0,
            c1[1] || 0, c2[1] || 0, c3[1] || 0, c4[1] || 0,
            c1[2] || 0, c2[2] || 0, c3[2] || 0, c4[2] || 0,
            c1[3] || 0, c2[3] || 0, c3[3] || 0, c4[3] || 0
        );
    }

    constructor(
        public xx: number,
        public xy: number,
        public xz: number,
        public xw: number,
        public yx: number,
        public yy: number,
        public yz: number,
        public yw: number,
        public zx: number,
        public zy: number,
        public zz: number,
        public zw: number,
        public wx: number,
        public wy: number,
        public wz: number,
        public ww: number
    ) {
    }

    toFlatArray(): number[] {
        return [
            this.xx, this.xy, this.xz, this.xw,
            this.yx, this.yy, this.yz, this.yw,
            this.zx, this.zy, this.zz, this.zw,
            this.wx, this.wy, this.wz, this.ww
        ]
    }

    toRowMajorArray(): Array<Array<number>> {
        return [
            [this.xx, this.xy, this.xz, this.xw],
            [this.yx, this.yy, this.yz, this.yw],
            [this.zx, this.zy, this.zz, this.zw],
            [this.wx, this.wy, this.wz, this.ww]
        ]
    }

    toColumnMajorArray(): Array<Array<number>> {
        return [
            [this.xx, this.yx, this.zx, this.wx],
            [this.xy, this.yy, this.zy, this.wy],
            [this.xz, this.yz, this.zz, this.wz],
            [this.xw, this.yw, this.zw, this.ww]
        ]
    }

    add(m: LMat4): Mat4 {
        return new Mat4(
            this.xx + m.xx, this.xy + m.xy, this.xz + m.xz, this.xw + m.xw,
            this.yx + m.yx, this.yy + m.yy, this.yz + m.yz, this.yw + m.yw,
            this.zx + m.zx, this.zy + m.zy, this.zz + m.zz, this.zw + m.zw,
            this.wx + m.wx, this.wy + m.wy, this.wz + m.wz, this.ww + m.ww
        );
    }

    addSelf(m: LMat4): Mat4 {
        this.xx += m.xx;
        this.xy += m.xy;
        this.xz += m.xz;
        this.xw += m.xw;
        this.yx += m.yx;
        this.yy += m.yy;
        this.yz += m.yz;
        this.yw += m.yw;
        this.zx += m.zx;
        this.zy += m.zy;
        this.zz += m.zz;
        this.zw += m.zw;
        this.wx += m.wx;
        this.wy += m.wy;
        this.wz += m.wz;
        this.ww += m.ww;
        return this;
    }

    subtract(m: LMat4): Mat4 {
        return new Mat4(
            this.xx - m.xx, this.xy - m.xy, this.xz - m.xz, this.xw - m.xw,
            this.yx - m.yx, this.yy - m.yy, this.yz - m.yz, this.yw - m.yw,
            this.zx - m.zx, this.zy - m.zy, this.zz - m.zz, this.zw - m.zw,
            this.wx - m.wx, this.wy - m.wy, this.wz - m.wz, this.ww - m.ww
        );
    }

    subtractSelf(m: LMat4): Mat4 {
        this.xx -= m.xx;
        this.xy -= m.xy;
        this.xz -= m.xz;
        this.xw -= m.xw;
        this.yx -= m.yx;
        this.yy -= m.yy;
        this.yz -= m.yz;
        this.yw -= m.yw;
        this.zx -= m.zx;
        this.zy -= m.zy;
        this.zz -= m.zz;
        this.zw -= m.zw;
        this.wx -= m.wx;
        this.wy -= m.wy;
        this.wz -= m.wz;
        this.ww -= m.ww;
        return this;
    }

    multiply(m: LMat4): Mat4 {
        const xx = this.xx, xy = this.xy, xz = this.xz, xw = this.xw,
            yx = this.yx, yy = this.yy, yz = this.yz, yw = this.yw,
            zx = this.zx, zy = this.zy, zz = this.zz, zw = this.zw,
            wx = this.wx, wy = this.wy, wz = this.wz, ww = this.ww,
            oxx = m.xx, oxy = m.xy, oxz = m.xz, oxw = m.xw,
            oyx = m.yx, oyy = m.yy, oyz = m.yz, oyw = m.yw,
            ozx = m.zx, ozy = m.zy, ozz = m.zz, ozw = m.zw,
            owx = m.wx, owy = m.wy, owz = m.wz, oww = m.ww;
        return new Mat4(
            xx * oxx + xy * oyx + xz * ozx + xw * owx,
            xx * oxy + xy * oyy + xz * ozy + xw * owy,
            xx * oxz + xy * oyz + xz * ozz + xw * owz,
            xx * oxw + xy * oyw + xz * ozw + xw * oww,
            yx * oxx + yy * oyx + yz * ozx + yw * owx,
            yx * oxy + yy * oyy + yz * ozy + yw * owy,
            yx * oxz + yy * oyz + yz * ozz + yw * owz,
            yx * oxw + yy * oyw + yz * ozw + yw * oww,
            zx * oxx + zy * oyx + zz * ozx + zw * owx,
            zx * oxy + zy * oyy + zz * ozy + zw * owy,
            zx * oxz + zy * oyz + zz * ozz + zw * owz,
            zx * oxw + zy * oyw + zz * ozw + zw * oww,
            wx * oxx + wy * oyx + wz * ozx + ww * owx,
            wx * oxy + wy * oyy + wz * ozy + ww * owy,
            wx * oxz + wy * oyz + wz * ozz + ww * owz,
            wx * oxw + wy * oyw + wz * ozw + ww * oww
        );
    }

    scalarMultiply(f: number): Mat4 {
        return new Mat4(
            f * this.xx, f * this.xy, f * this.xz, f * this.xw,
            f * this.yx, f * this.yy, f * this.yz, f * this.yw,
            f * this.zx, f * this.zy, f * this.zz, f * this.zw,
            f * this.wx, f * this.wy, f * this.wz, f * this.ww
        );
    }

    scalarMultiplySelf(f: number): Mat4 {
        this.xx *= f;
        this.xy *= f;
        this.xz *= f;
        this.xw *= f;
        this.yx *= f;
        this.yy *= f;
        this.yz *= f;
        this.yw *= f;
        this.zx *= f;
        this.zy *= f;
        this.zz *= f;
        this.zw *= f;
        this.wx *= f;
        this.wy *= f;
        this.wz *= f;
        this.ww *= f;
        return this;
    }

    det(): number {
        const xx = this.xx, xy = this.xy, xz = this.xz, xw = this.xw,
            yx = this.yx, yy = this.yy, yz = this.yz, yw = this.yw,
            zx = this.zx, zy = this.zy, zz = this.zz, zw = this.zw,
            wx = this.wx, wy = this.wy, wz = this.wz, ww = this.ww,
            t1 = yy * (zz * ww - wz * zw) + yz * (zw * wy - ww * zy) + yw * (zy * wz - wy * zz),
            t2 = yz * (zw * wx - ww * zx) + yw * (zx * wz - wx * zz) + yx * (zz * ww - wz * zw),
            t3 = yw * (zx * wy - wx * zy) + yx * (zy * ww - wy * zw) + yy * (zw * wx - ww * zx),
            t4 = yx * (zy * wz - wy * zz) + yy * (zz * wx - wz * zx) + yz * (zx * wy - wx * zy);
        return xx * t1 - xy * t2 + xz * t3 - xw * t4;
    }

    invert(): Mat4 {
        const xx = this.xx, xy = this.xy, xz = this.xz, xw = this.xw,
            yx = this.yx, yy = this.yy, yz = this.yz, yw = this.yw,
            zx = this.zx, zy = this.zy, zz = this.zz, zw = this.zw,
            wx = this.wx, wy = this.wy, wz = this.wz, ww = this.ww,
            t1 = yy * (zz * ww - wz * zw) + yz * (zw * wy - ww * zy) + yw * (zy * wz - wy * zz),
            t2 = yz * (zw * wx - ww * zx) + yw * (zx * wz - wx * zz) + yx * (zz * ww - wz * zw),
            t3 = yw * (zx * wy - wx * zy) + yx * (zy * ww - wy * zw) + yy * (zw * wx - ww * zx),
            t4 = yx * (zy * wz - wy * zz) + yy * (zz * wx - wz * zx) + yz * (zx * wy - wx * zy);
        const det = (xx * t1 - xy * t2 + xz * t3 - xw * t4);
        if (det === 0) {
            throw new Error('Matrix cannot be inverted.');
        }
        const detInv = 1 / det;

        return new Mat4(
            detInv * t1,
            - detInv * (xy * (zz * ww - wz * zw) + xz * (zw * wy - ww * zy) + xw * (zy * wz - wy * zz)),
            detInv * (xy * (yz * ww - wz * yw) + xz * (yw * wy - ww * yy) + xw * (yy * wz - wy * yz)),
            - detInv * (xy * (yz * zw - zz * yw) + xz * (yw * zy - zw * yy) + xw * (yy * zz - zy * yz)),
            - detInv * t2,
            detInv * (xx * (zz * ww - wz * zw) + xz * (zw * wx - ww * zx) + xw * (zx * wz - wx * zz)),
            - detInv * (xx * (yz * ww - wz * yw) + xz * (yw * wx - ww * yx) + xw * (yx * wz - wx * yz)),
            detInv * (xx * (yz * zw - zz * yw) + xz * (yw * zx - zw * yx) + xw * (yx * zz - zx * yz)),
            detInv * t3,
            - detInv * (xx * (zy * ww - wy * zw) + xy * (zw * wx - ww * zx) + xw * (zx * wy - wx * zy)),
            detInv * (xx * (yy * ww - wy * yw) + xy * (yw * wx - ww * yx) + xw * (yx * wy - wx * yy)),
            - detInv * (xx * (yy * zw - zy * yw) + xy * (yw * zx - zw * yx) + xw * (yx * zy - zx * yy)),
            - detInv * t4,
            detInv * (xx * (zy * wz - wy * zz) + xy * (zz * wx - wz * zx) + xz * (zx * wy - wx * zy)),
            - detInv * (xx * (yy * wz - wy * yz) + xy * (yz * wx - wz * yx) + xz * (yx * wy - wx * yy)),
            detInv * (xx * (yy * zz - zy * yz) + xy * (yz * zx - zz * yx) + xz * (yx * zy - zx * yy))
        );
    }

    invertSelf(): Mat4 {
        const xx = this.xx, xy = this.xy, xz = this.xz, xw = this.xw,
            yx = this.yx, yy = this.yy, yz = this.yz, yw = this.yw,
            zx = this.zx, zy = this.zy, zz = this.zz, zw = this.zw,
            wx = this.wx, wy = this.wy, wz = this.wz, ww = this.ww,
            t1 = yy * (zz * ww - wz * zw) + yz * (zw * wy - ww * zy) + yw * (zy * wz - wy * zz),
            t2 = yz * (zw * wx - ww * zx) + yw * (zx * wz - wx * zz) + yx * (zz * ww - wz * zw),
            t3 = yw * (zx * wy - wx * zy) + yx * (zy * ww - wy * zw) + yy * (zw * wx - ww * zx),
            t4 = yx * (zy * wz - wy * zz) + yy * (zz * wx - wz * zx) + yz * (zx * wy - wx * zy);
        const det = (xx * t1 - xy * t2 + xz * t3 - xw * t4);
        if (det === 0) {
            throw new Error('Matrix cannot be inverted.');
        }
        const detInv = 1 / det;

        this.xx = detInv * t1,
            this.xy = - detInv * (xy * (zz * ww - wz * zw) + xz * (zw * wy - ww * zy) + xw * (zy * wz - wy * zz)),
            this.xz = detInv * (xy * (yz * ww - wz * yw) + xz * (yw * wy - ww * yy) + xw * (yy * wz - wy * yz)),
            this.xw = - detInv * (xy * (yz * zw - zz * yw) + xz * (yw * zy - zw * yy) + xw * (yy * zz - zy * yz)),
            this.yx = - detInv * t2,
            this.yy = detInv * (xx * (zz * ww - wz * zw) + xz * (zw * wx - ww * zx) + xw * (zx * wz - wx * zz)),
            this.yz = - detInv * (xx * (yz * ww - wz * yw) + xz * (yw * wx - ww * yx) + xw * (yx * wz - wx * yz)),
            this.yw = detInv * (xx * (yz * zw - zz * yw) + xz * (yw * zx - zw * yx) + xw * (yx * zz - zx * yz)),
            this.zx = detInv * t3,
            this.zy = - detInv * (xx * (zy * ww - wy * zw) + xy * (zw * wx - ww * zx) + xw * (zx * wy - wx * zy)),
            this.zz = detInv * (xx * (yy * ww - wy * yw) + xy * (yw * wx - ww * yx) + xw * (yx * wy - wx * yy)),
            this.zw = -detInv * (xx * (yy * zw - zy * yw) + xy * (yw * zx - zw * yx) + xw * (yx * zy - zx * yy)),
            this.wx = - detInv * t4,
            this.wy = detInv * (xx * (zy * wz - wy * zz) + xy * (zz * wx - wz * zx) + xz * (zx * wy - wx * zy)),
            this.wz = - detInv * (xx * (yy * wz - wy * yz) + xy * (yz * wx - wz * yx) + xz * (yx * wy - wx * yy)),
            this.ww = detInv * (xx * (yy * zz - zy * yz) + xy * (yz * zx - zz * yx) + xz * (yx * zy - zx * yy))
        return this;
    }

    multiplyVec(v: LVec4): Vec4 {
        const vx = v.x, vy = v.y, vz = v.z, vw = v.w;
        return new Vec4(
            this.xx * vx + this.xy * vy + this.xz * vz + this.xw * vw,
            this.yx * vx + this.yy * vy + this.yz * vz + this.yw * vw,
            this.zx * vx + this.zy * vy + this.zz * vz + this.zw * vw,
            this.wx * vx + this.wy * vy + this.wz * vz + this.ww * vw
        );
    }

    vecMultiply(v: LVec4): Vec4 {
        const vx = v.x, vy = v.y, vz = v.z, vw = v.w;
        return new Vec4(
            this.xx * vx + this.yx * vy + this.zx * vz + this.wx * vw,
            this.xy * vx + this.yy * vy + this.zy * vz + this.wy * vw,
            this.xz * vx + this.yz * vy + this.zz * vz + this.wz * vw,
            this.xw * vx + this.yw * vy + this.zw * vz + this.ww * vw
        );
    }

    transpose(): Mat4 {
        return new Mat4(
            this.xx, this.yx, this.zx, this.wx,
            this.xy, this.yy, this.zy, this.wy,
            this.xz, this.yz, this.zz, this.wz,
            this.xw, this.yw, this.zw, this.ww
        );
    }

    transposeSelf(): Mat4 {
        const xy = this.xy, xz = this.xz, xw = this.xw,
            yz = this.yz, yw = this.yw,
            zw = this.zw;
        this.xy = this.yx;
        this.yx = xy;
        this.xz = this.zx;
        this.zx = xz;
        this.xw = this.wx;
        this.wx = xw;
        this.yz = this.zy;
        this.zy = yz;
        this.yw = this.wy;
        this.wy = yw;
        this.zw = this.wz;
        this.wz = zw;
        return this;
    }

    copy(): Mat4 {
        return new Mat4(
            this.xx, this.xy, this.xz, this.xw,
            this.yx, this.yy, this.yz, this.yw,
            this.zx, this.zy, this.zz, this.zw,
            this.wx, this.wy, this.wz, this.ww
        );
    }

    assignFrom(m: LMat4): Mat4 {
        this.xx = m.xx;
        this.xy = m.xy;
        this.xz = m.xz;
        this.xw = m.xw;
        this.yx = m.yx;
        this.yy = m.yy;
        this.yz = m.yz;
        this.yw = m.yw;
        this.zx = m.zx;
        this.zy = m.zy;
        this.zz = m.zz;
        this.zw = m.zw;
        this.wx = m.wx;
        this.wy = m.wy;
        this.wz = m.wz;
        this.ww = m.ww;
        return this;
    }

    equals(o: LMat4, tolerance: number = 0): boolean {
        if (tolerance > 0) {
            return Math.abs(this.xx - o.xx) < tolerance
                && Math.abs(this.xy - o.xy) < tolerance
                && Math.abs(this.xz - o.xz) < tolerance
                && Math.abs(this.xw - o.xw) < tolerance
                && Math.abs(this.yx - o.yx) < tolerance
                && Math.abs(this.yy - o.yy) < tolerance
                && Math.abs(this.yz - o.yz) < tolerance
                && Math.abs(this.yw - o.yw) < tolerance
                && Math.abs(this.zx - o.zx) < tolerance
                && Math.abs(this.zy - o.zy) < tolerance
                && Math.abs(this.zz - o.zz) < tolerance
                && Math.abs(this.zw - o.zw) < tolerance
                && Math.abs(this.wx - o.wx) < tolerance
                && Math.abs(this.wy - o.wy) < tolerance
                && Math.abs(this.wz - o.wz) < tolerance
                && Math.abs(this.ww - o.ww) < tolerance;
        }
        return this.xx === o.xx
            && this.xy === o.xy
            && this.xz === o.xz
            && this.xw === o.xw
            && this.yx === o.yx
            && this.yy === o.yy
            && this.yz === o.yz
            && this.yw === o.yw
            && this.zx === o.zx
            && this.zy === o.zy
            && this.zz === o.zz
            && this.zw === o.zw
            && this.wx === o.wx
            && this.wy === o.wy
            && this.wz === o.wz
            && this.ww === o.ww;
    }
}