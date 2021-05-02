import { LVec3 } from './LVec3';
import { Vec3 } from './Vec3';
import { Mat3 } from './Mat3';
import { LQuaternion } from './LQuaternion';
import { WQuaternion } from './WQuaternion';

const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;

/**
 * Implementation class for quaternions.
 */
export class Quaternion implements WQuaternion {

    public static fromFlatArray(a: Array<number>): Quaternion {
        return new Quaternion(a[0] || 0, a[1] || 0, a[2] || 0, a[3] || 0);
    }

    public static fromVec3(vec: LVec3): Quaternion {
        return new Quaternion(0, vec.x, vec.y, vec.z);
    }

    public static fromAngleAxisUnsafe(a: number, vec: LVec3): Quaternion {
        const aHalf = a / 2, sinAHalf = sin(aHalf);
        return new Quaternion(
            cos(aHalf),
            sinAHalf * vec.x,
            sinAHalf * vec.y,
            sinAHalf * vec.z
        );
    }

    // source: http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    public static fromRotationMatrixUnsafe(m: Mat3): Quaternion {
        const tr = m.xx + m.yy + m.zz;
        if (tr > 0) {
            const s = sqrt(tr + 1) * 2;
            return new Quaternion(
                0.25 * s,
                (m.zy - m.yz) / s,
                (m.xz - m.zx) / s,
                (m.yx - m.xy) / s
            );
        } else if (m.xx > m.yy && m.xx > m.zz) {
            const s = sqrt(1 + m.xx - m.yy - m.zz) * 2;
            return new Quaternion(
                (m.zy - m.yz) / s,
                0.25 * s,
                (m.xy + m.yx) / s,
                (m.xz + m.zx) / s
            );
        } else if (m.yy > m.zz) {
            const s = sqrt(1 + m.yy - m.xx - m.zz) * 2;
            return new Quaternion(
                (m.xz - m.zx) / s,
                (m.xy + m.yx) / s,
                0.25 * s,
                (m.yz + m.zy) / s
            );
        }
        const s = sqrt(1 + m.zz - m.xx - m.yy) * 2;
        return new Quaternion(
            (m.yx - m.xy) / s,
            (m.xz + m.zx) / s,
            (m.yz + m.zy) / s,
            0.25 * s
        );
    }

    constructor(
        public w: number,
        public x: number,
        public y: number,
        public z: number
    ) {
    }

    public add(q: Quaternion): Quaternion {
        return new Quaternion(
            this.w + q.w,
            this.x + q.x,
            this.y + q.y,
            this.z + q.z
        );
    }

    public addSelf(q: Quaternion): Quaternion {
        this.w += q.w;
        this.x += q.x;
        this.y += q.y;
        this.z += q.z;
        return this;
    }

    public subtract(q: Quaternion): Quaternion {
        return new Quaternion(
            this.w - q.w,
            this.x - q.x,
            this.y - q.y,
            this.z - q.z
        );
    }

    public subtractSelf(q: Quaternion): Quaternion {
        this.w -= q.w;
        this.x -= q.x;
        this.y -= q.y;
        this.z -= q.z;
        return this;
    }

    public scalarMultiply(f: number): Quaternion {
        return new Quaternion(
            this.w * f,
            this.x * f,
            this.y * f,
            this.z * f
        );
    }

    public scalarMultiplySelf(f: number): Quaternion {
        this.w *= f;
        this.x *= f;
        this.y *= f;
        this.z *= f;
        return this;
    }

    public multiply(q: LQuaternion): Quaternion {
        const w = this.w, x = this.x, y = this.y, z = this.z,
            qw = q.w, qx = q.x, qy = q.y, qz = q.z;
        return new Quaternion(
            w * qw - x * qx - y * qy - z * qz,
            w * qx + x * qw + y * qz - z * qy,
            w * qy - x * qz + y * qw + z * qx,
            w * qz + x * qy - y * qx + z * qw
        );
    }

    public multiplySelf(q: LQuaternion): Quaternion {
        const w = this.w, x = this.x, y = this.y, z = this.z,
            qw = q.w, qx = q.x, qy = q.y, qz = q.z;
        this.w = w * qw - x * qx - y * qy - z * qz,
            this.x = w * qx + x * qw + y * qz - z * qy,
            this.y = w * qy - x * qz + y * qw + z * qx,
            this.z = w * qz + x * qy - y * qx + z * qw;
        return this;
    }

    public normSquare(): number {
        const w = this.w, x = this.x, y = this.y, z = this.z;
        return w * w + x * x + y * y + z * z;
    }

    public norm(): number {
        return sqrt(this.normSquare());
    }

    public normalize(): Quaternion {
        const norm = this.norm();
        return new Quaternion(
            this.w / norm,
            this.x / norm,
            this.y / norm,
            this.z / norm
        );
    }

    public normalizeSelf(): Quaternion {
        const norm = this.norm();
        this.w /= norm;
        this.x /= norm;
        this.y /= norm;
        this.z /= norm;
        return this;
    }

    public conjugate(): Quaternion {
        return new Quaternion(
            this.w,
            - this.x,
            - this.y,
            - this.z
        );
    }

    public conjugateSelf(): Quaternion {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    public rotateUnsafe(vec: LVec3): Vec3 {
        return Vec3.fromLiteral(
            this.multiply(Quaternion.fromVec3(vec))
                .multiplySelf(this.conjugate())
        );
    }

    public copy(): Quaternion {
        return new Quaternion(
            this.w,
            this.x,
            this.y,
            this.z
        );
    }

    public assignFrom(q: LQuaternion): Quaternion {
        this.w = q.w;
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        return this;
    }

}