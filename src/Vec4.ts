import { LVec4 } from './LVec4';
import { WVec4 } from './WVec4';

export class Vec4 implements WVec4 {

    public static fromLiteral(vec: LVec4): Vec4 {
        return new Vec4(vec.x, vec.y, vec.z, vec.w);
    }

    public static fromArray(vec: Array<number>): Vec4 {
        return new Vec4(vec[0] || 0, vec[1] || 0, vec[2] || 0, vec[3] || 0);
    }

    constructor(
        public x: number,
        public y: number,
        public z: number,
        public w: number
    ) {
    }

    public dot(vec: LVec4): number {
        return this.x * vec.x + this.y * vec.y
            + this.z * vec.z + this.w * vec.w;
    }

    public add(vec: LVec4): Vec4 {
        return new Vec4(
            this.x + vec.x,
            this.y + vec.y,
            this.z + vec.z,
            this.w + vec.w
        );
    }

    public addSelf(vec: LVec4): Vec4 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        this.w += vec.w;
        return this;
    }

    public subtract(vec: LVec4): Vec4 {
        return new Vec4(
            this.x - vec.x,
            this.y - vec.y,
            this.z - vec.z,
            this.w - vec.w
        );
    }

    public subtractSelf(vec: LVec4): Vec4 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        this.w -= vec.w;
        return this;
    }

    public scalarMultiply(factor: number): Vec4 {
        return new Vec4(
            this.x * factor,
            this.y * factor,
            this.z * factor,
            this.w * factor
        );
    }

    public scalarMultiplySelf(factor: number): Vec4 {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        this.w *= factor;
        return this;
    }

    public normSquare(): number {
        return this.x * this.x
            + this.y * this.y
            + this.z * this.z
            + this.w * this.w;
    }

    public norm(): number {
        return Math.sqrt(this.normSquare());
    }

    public l1Norm(): number {
        return Math.abs(this.x) + Math.abs(this.y)
            + Math.abs(this.z) + Math.abs(this.w);
    }

    public lInfNorm(): number {
        return Math.max(
            Math.abs(this.x),
            Math.abs(this.y),
            Math.abs(this.z),
            Math.abs(this.w)
        );
    }

    public normalize(): Vec4 {
        return this.scalarMultiply(1 / this.norm());
    }

    public normalizeSelf(): Vec4 {
        const norm = this.norm();
        this.x /= norm;
        this.y /= norm;
        this.z /= norm;
        this.w /= norm;
        return this;
    }

    public copy(): Vec4 {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    public toArray(): Array<number> {
        return [this.x, this.y, this.z, this.w];
    }

    public equals(vec: LVec4, tolerance: number = 1.0e-6): boolean {
        const diff = this.subtract(vec);
        return Math.abs(diff.x) < tolerance
            && Math.abs(diff.y) < tolerance
            && Math.abs(diff.z) < tolerance
            && Math.abs(diff.w) < tolerance;
    }

}