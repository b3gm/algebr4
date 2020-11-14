import { LVec3 } from './LVec3';
import { WVec3 } from './WVec3';
import { DEG2RAD } from './constants';

export class Vec3 implements WVec3 {

    public static fromLiteral(vec: LVec3): Vec3 {
        return new Vec3(vec.x, vec.y, vec.z);
    }

    public static fromArray(vec: Array<number>): Vec3 {
        return new Vec3(vec[0] || 0, vec[1] || 0, vec[2] || 0);
    }

    constructor(
        public x: number,
        public y: number,
        public z: number
    ) {
    }

    public dot(vec: LVec3): number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    public cross(vec: LVec3): Vec3 {
        return new Vec3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        );
    }

    public add(vec: LVec3): Vec3 {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    public addSelf(vec: LVec3): Vec3 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    public subtract(vec: LVec3): Vec3 {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    public subtractSelf(vec: LVec3): Vec3 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    }

    public scalarMultiply(factor: number): Vec3 {
        return new Vec3(this.x * factor, this.y * factor, this.z * factor);
    }

    public scalarMultiplySelf(factor: number): Vec3 {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    }

    public normSquare(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public norm(): number {
        return Math.sqrt(this.normSquare());
    }

    public l1Norm(): number {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    public lInfNorm(): number {
        return Math.max(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }

    public normalize(): Vec3 {
        return this.scalarMultiply(1 / this.norm());
    }

    public normalizeSelf(): Vec3 {
        const norm = this.norm();
        this.x /= norm;
        this.y /= norm;
        this.z /= norm;
        return this;
    }

    public rotateRadUnsafe(axis: LVec3, angle: number): Vec3 {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const ux = axis.x;
        const uy = axis.y;
        const uz = axis.z;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const oneMcosA = 1 - cosA;
        return new Vec3(
            x * (cosA + ux * ux * oneMcosA)
            + y * (ux * uy * oneMcosA - uz * sinA)
            + z * (ux * uz * oneMcosA + uy * sinA),
            x * (uy * ux * oneMcosA + uz * sinA)
            + y * (cosA + uy * uy * oneMcosA)
            + z * (uy * uz * oneMcosA - ux * sinA),
            x * (uz * ux * oneMcosA - uy * sinA)
            + y * (uz * uy * oneMcosA + ux * sinA)
            + z * (cosA + uz * uz * oneMcosA)
        );
    }

    public rotateRad(axis: LVec3, angle: number): Vec3 {
        return this.rotateRadUnsafe(
            Vec3.fromLiteral(axis).normalizeSelf(),
            angle
        );
    }

    public rotateRadUnsafeSelf(axis: LVec3, angle: number): Vec3 {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const ux = axis.x;
        const uy = axis.y;
        const uz = axis.z;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const oneMcosA = 1 - cosA;
        this.x = x * (cosA + ux * ux * oneMcosA)
            + y * (ux * uy * oneMcosA - uz * sinA)
            + z * (ux * uz * oneMcosA + uy * sinA);
        this.y = x * (uy * ux * oneMcosA + uz * sinA)
            + y * (cosA + uy * uy * oneMcosA)
            + z * (uy * uz * oneMcosA - ux * sinA);
        this.z = x * (uz * ux * oneMcosA - uy * sinA)
            + y * (uz * uy * oneMcosA + ux * sinA)
            + z * (cosA + uz * uz * oneMcosA);
        return this;
    }

    public rotateRadSelf(axis: LVec3, angle: number): Vec3 {
        return this.rotateRadUnsafeSelf(
            Vec3.fromLiteral(axis).normalizeSelf(),
            angle
        );
    }

    public rotateDegUnsafe(axis: LVec3, angle: number): Vec3 {
        return this.rotateRadUnsafe(axis, angle * DEG2RAD);
    }

    public rotateDeg(axis: LVec3, angle: number): Vec3 {
        return this.rotateRad(
            Vec3.fromLiteral(axis).normalizeSelf(),
            angle * DEG2RAD
        );
    }

    public rotateDegUnsafeSelf(axis: LVec3, angle: number): Vec3 {
        return this.rotateRadUnsafeSelf(axis, angle * DEG2RAD);
    }

    public rotateDegSelf(axis: LVec3, angle: number): Vec3 {
        return this.rotateRadSelf(
            Vec3.fromLiteral(axis).normalizeSelf(),
            angle * DEG2RAD
        );
    }

    public angleUnsafe(vec: LVec3): number {
        return Math.acos(this.dot(vec));
    }

    public angle(vec: LVec3): number {
        return this.normalize().angleUnsafe(
            Vec3.fromLiteral(vec).normalizeSelf()
        );
    }

    public copy(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }

    public toArray(): Array<number> {
        return [this.x, this.y, this.z];
    }

    public equals(vec: LVec3, tolerance: number = 1.0e-6): boolean {
        const diff = this.subtract(vec);
        return Math.abs(diff.x) < tolerance
            && Math.abs(diff.y) < tolerance
            && Math.abs(diff.z) < tolerance;
    }
}

export const o3 = Object.freeze(new Vec3(0, 0, 0));
export const ex3 = Object.freeze(new Vec3(1, 0, 0));
export const ey3 = Object.freeze(new Vec3(0, 1, 0));
export const ez3 = Object.freeze(new Vec3(0, 0, 1));