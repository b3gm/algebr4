import LMat3 from './LMat3';
import WMat3 from './WMat3';
import LVec3 from './LVec3';
import Vec3 from './Vec3';

const sin = Math.sin;
const cos = Math.cos;

export default class Mat3 implements WMat3 {
    
    public static fromLiteral(m:LMat3):Mat3 {
        return new Mat3(m.xx, m.xy, m.xz, m.yx, m.yy, m.yz, m.zx, m.zy, m.zz);
    }
    
    public static fromFlatArray(e:Array<number>):Mat3 {
        return new Mat3(
            e[0], e[1], e[2],
            e[3], e[4], e[5],
            e[6], e[7], e[8]
        );
    }
    
    public static fromRowMajorArray(e:Array<Array<number>>):Mat3 {
        const r1 = e[0] || [], r2 = e[1] || [], r3 = e[2] || [];
        return new Mat3(
            r1[0] || 0, r1[1] || 0, r1[2] || 0,
            r2[0] || 0, r2[1] || 0, r2[2] || 0,
            r3[0] || 0, r3[1] || 0, r3[2] || 0,
        );
    }
    
    public static fromColumnMajorArray(e:Array<Array<number>>):Mat3 {
        const c1 = e[0] || [], c2 = e[1] || [], c3 = e[2] || [];
        return new Mat3(
            c1[0] || 0, c2[0] || 0, c3[0] || 0,
            c1[1] || 0, c2[1] || 0, c3[1] || 0,
            c1[2] || 0, c2[2] || 0, c3[2] || 0,
        );
    }
    
    public static axisAngleRotationUnsafe(axis:LVec3, angle:number) {
        const ux = axis.x;
        const uy = axis.y;
        const uz = axis.z;
        const cosA = cos(angle);
        const sinA = sin(angle);
        const oneMcosA = 1 - cosA;
        return new Mat3(
            cosA + ux * ux * oneMcosA,
            ux * uy * oneMcosA - uz * sinA,
            ux * uz * oneMcosA + uy * sinA,
            uy * ux * oneMcosA + uz * sinA,
            cosA + uy * uy * oneMcosA,
            uy * uz * oneMcosA - ux * sinA,
            uz * ux * oneMcosA - uy * sinA,
            uz * uy * oneMcosA - ux * sinA,
            cosA + uz * uz * oneMcosA
        );
    }
    
    constructor(
        public xx: number,
        public xy: number,
        public xz: number,
        public yx: number,
        public yy: number,
        public yz: number,
        public zx: number,
        public zy: number,
        public zz: number
    ) {
    }
    
    toFlatArray(): number[] {
        return [
            this.xx, this.xy, this.xz,
            this.yx, this.yy, this.yz,
            this.zx, this.zy, this.zz
        ]
    }
    
    toRowMajorArray(): Array<Array<number>> {
        return [
            [this.xx, this.xy, this.xz],
            [this.yx, this.yy, this.yz],
            [this.zx, this.zy, this.zz]
        ]
    }
    
    toColumnMajorArray(): Array<Array<number>>  {
        return [
            [this.xx, this.yx, this.zx],
            [this.xy, this.yy, this.zy],
            [this.xz, this.yz, this.zz]
        ]
    }
    
    add(m: LMat3): Mat3 {
        return new Mat3(
            this.xx + m.xx, this.xy + m.xy, this.xz + m.xz,
            this.yx + m.yx, this.yy + m.yy, this.yz + m.yz,
            this.zx + m.zx, this.zy + m.zy, this.zz + m.zz
        );
    }
    
    addSelf(m: LMat3): Mat3 {
        this.xx += m.xx;
        this.xy += m.xy;
        this.xz += m.xz;
        this.yx += m.yx;
        this.yy += m.yy;
        this.yz += m.yz;
        this.zx += m.zx;
        this.zy += m.zy;
        this.zz += m.zz;
        return this;
    }
    
    subtract(m: LMat3): Mat3 {
        return new Mat3(
            this.xx - m.xx, this.xy - m.xy, this.xz - m.xz,
            this.yx - m.yx, this.yy - m.yy, this.yz - m.yz,
            this.zx - m.zx, this.zy - m.zy, this.zz - m.zz
        );
    }
    
    subtractSelf(m: LMat3): Mat3 {
        this.xx -= m.xx;
        this.xy -= m.xy;
        this.xz -= m.xz;
        this.yx -= m.yx;
        this.yy -= m.yy;
        this.yz -= m.yz;
        this.zx -= m.zx;
        this.zy -= m.zy;
        this.zz -= m.zz;
        return this;
    }
    
    multiply(m: LMat3): Mat3 {
        const xx = this.xx, xy = this.xy, xz = this.xz,
            yx = this.yx, yy = this.yy, yz = this.yz,
            zx = this.zx, zy = this.zy, zz = this.zz,
            oxx = m.xx, oxy = m.xy, oxz = m.xz,
            oyx = m.yx, oyy = m.yy, oyz = m.yz,
            ozx = m.zx, ozy = m.zy, ozz = m.zz;
        return new Mat3(
            xx * oxx + xy * oyx + xz * ozx,
            xx * oxy + xy * oyy + xz * ozy,
            xx * oxz + xy * oyz + xz * ozz,
            yx * oxx + yy * oyx + yz * ozx, 
            yx * oxy + yy * oyy + yz * ozy,
            yx * oxz + yy * oyz + yz * ozz,
            zx * oxx + zy * oyx + zz * ozx,
            zx * oxy + zy * oyy + zz * ozy,
            zx * oxz + zy * oyz + zz * ozz
        );
    }
    
    scalarMultiply(f: number): Mat3 {
        return new Mat3(
            f * this.xx, f * this.xy, f * this.xz,
            f * this.yx, f * this.yy, f * this.yz,
            f * this.zx, f * this.zy, f * this.zz
        );
    }
    
    scalarMultiplySelf(f: number): Mat3 {
        this.xx *= f;
        this.xy *= f;
        this.xz *= f;
        this.yx *= f;
        this.yy *= f;
        this.yz *= f;
        this.zx *= f;
        this.zy *= f;
        this.zz *= f;
        return this;
    }
    
    det(): number {
        const xx = this.xx, xy = this.xy, xz = this.xz,
            yx = this.yx, yy = this.yy, yz = this.yz,
            zx = this.zx, zy = this.zy, zz = this.zz;
        return xx * (yy * zz - zy * yz)
            - xy * (yx * zz - zx * yz)
            + xz * (yx * zy - zx * yy);
    }
    
    invert(): Mat3 {
        const xx = this.xx, xy = this.xy, xz = this.xz,
            yx = this.yx, yy = this.yy, yz = this.yz,
            zx = this.zx, zy = this.zy, zz = this.zz,
            t1 = yy * zz - zy * yz,
            t2 = yx * zz - zx * yz,
            t3 = yx * zy - zx * yy;
        const detInv = 1 / (xx * t1 - xy * t2 + xz * t3);
        
        return new Mat3(
            detInv * t1,
            - detInv * (xy * zz - zy * xz),
            detInv * (xy * yz - yy * xz),
            - detInv * t2,
            detInv * (xx * zz - zx * xz),
            - detInv * (xx * yz - yx * xz),
            detInv * t3,
            - detInv * (xx * zy - zx * xy),
            detInv * (xx * yy - yx * xy)
        );
    }
    
    invertSelf(): Mat3 {
        const xx = this.xx, xy = this.xy, xz = this.xz,
            yx = this.yx, yy = this.yy, yz = this.yz,
            zx = this.zx, zy = this.zy, zz = this.zz,
            t1 = yy * zz - zy * yz,
            t2 = yx * zz - zx * yz,
            t3 = yx * zy - zx * yy;
        const detInv = 1 / (xx * t1 - xy * t2 + xz * t3);
        
        this.xx = detInv * t1;
        this.xy = - detInv * (xy * zz - zy * xz);
        this.xz = detInv * (xy * yz - yy * xz);
        this.yx = - detInv * t2;
        this.yy = detInv * (xx * zz - zx * xz);
        this.yz = - detInv * (xx * yz - yx * xz);
        this.zx = detInv * t3;
        this.zy = - detInv * (xx * zy - zx * xy);
        this.zz = detInv * (xx * yy - yx * xy);
        return this;
    }
    
    multiplyVec(v: LVec3): Vec3 {
        const vx = v.x, vy = v.y, vz = v.z;
        return new Vec3(
            this.xx * vx + this.xy * vy + this.xz * vz,
            this.yx * vx + this.yy * vy + this.yz * vz,
            this.zx * vx + this.zy * vy + this.zz * vz
        );
    }
    
    vecMultiply(v: LVec3): Vec3 {
        const vx = v.x, vy = v.y, vz = v.z;
        return new Vec3(
            this.xx * vx + this.yx * vy + this.zx * vz,
            this.xy * vx + this.yy * vy + this.zy * vz,
            this.xz * vx + this.yz * vy + this.zz * vz
        );
    }
    
    transpose(): Mat3 {
        return new Mat3(
            this.xx, this.yx, this.zx,
            this.xy, this.yy, this.zy,
            this.xz, this.yz, this.zz
        );
    }
    
    transposeSelf(): Mat3 {
        const xy = this.xy, xz = this.xz, yz = this.yz;
        this.xy = this.yx;
        this.yx = xy;
        this.yz = this.zy;
        this.zy = yz;
        this.xz = this.zx;
        this.zx = xz;
        return this;
    }
    
    copy():Mat3 {
        return new Mat3(
            this.xx, this.xy, this.xz,
            this.yx, this.yy, this.yz,
            this.zx, this.zy, this.zz
        );
    }
    
    equals(o:Mat3, tolerance:number = 0):boolean {
        if(tolerance > 0) {
            return Math.abs(this.xx - o.xx) < tolerance
                && Math.abs(this.xy - o.xy) < tolerance
                && Math.abs(this.xz - o.xz) < tolerance
                && Math.abs(this.yx - o.yx) < tolerance
                && Math.abs(this.yy - o.yy) < tolerance
                && Math.abs(this.yz - o.yz) < tolerance
                && Math.abs(this.zx - o.zx) < tolerance
                && Math.abs(this.zy - o.zy) < tolerance
                && Math.abs(this.zz - o.zz) < tolerance;
        }
        return this.xx === o.xx
            && this.xy === o.xy
            && this.xz === o.xz
            && this.yx === o.yx
            && this.yy === o.yy
            && this.yz === o.yz
            && this.zx === o.zx
            && this.zy === o.zy
            && this.zz === o.zz;
    }
}