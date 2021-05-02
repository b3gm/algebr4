import { LVec2 } from './LVec2';
import { WVec2 } from './WVec2';
import { DEG2RAD } from './constants';

/**
 * Implementation class for 2 dimensional vectors.
 */
export class Vec2 implements WVec2 {

    public static fromLiteral(vec: LVec2): Vec2 {
        return new Vec2(vec.x, vec.y);
    }

    public static fromArray(vec: Array<number>): Vec2 {
        return new Vec2(vec[0] || 0, vec[1] || 0);
    }

    constructor(public x: number, public y: number) {
    }

    public dot(vec: LVec2): number {
        return this.x * vec.x + this.y * vec.y;
    }

    public cross(vec: LVec2): number {
        return this.x * vec.y - this.y * vec.x;
    }

    public add(vec: LVec2): Vec2 {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    public addSelf(vec: LVec2): Vec2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    public subtract(vec: LVec2): Vec2 {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    public subtractSelf(vec: LVec2): Vec2 {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    public scalarMultiply(factor: number): Vec2 {
        return new Vec2(this.x * factor, this.y * factor);
    }

    public scalarMultiplySelf(factor: number): Vec2 {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    public normSquare(): number {
        return this.x * this.x + this.y * this.y;
    }

    public norm(): number {
        return Math.sqrt(this.normSquare());
    }

    public l1Norm(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    public lInfNorm(): number {
        return Math.max(Math.abs(this.x), Math.abs(this.y));
    }

    public normalize(): Vec2 {
        return this.scalarMultiply(1 / this.norm());
    }

    public normalizeSelf(): Vec2 {
        const norm = this.norm();
        this.x /= norm;
        this.y /= norm;
        return this;
    }

    public rotateRad(angle: number): Vec2 {
        const x = this.x;
        const y = this.y;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        return new Vec2(
            x * cosA - y * sinA,
            x * sinA + y * cosA
        );
    }

    public rotateRadSelf(angle: number): Vec2 {
        const x = this.x;
        const y = this.y;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        this.x = x * cosA - y * sinA;
        this.y = x * sinA + y * cosA;
        return this;
    }

    public rotateDeg(angle: number): Vec2 {
        return this.rotateRad(angle * DEG2RAD);
    }

    public rotateDegSelf(angle: number): Vec2 {
        return this.rotateRadSelf(angle * DEG2RAD);
    }

    public angleUnsafe(vec: LVec2): number {
        return Math.acos(this.dot(vec));
    }

    public angle(vec: LVec2): number {
        return this.normalize().angleUnsafe(
            Vec2.fromLiteral(vec).normalizeSelf()
        );
    }

    public copy(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public assignFrom(vec: LVec2): Vec2 {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    }

    public toArray(): Array<number> {
        return [this.x, this.y];
    }

    public equals(vec: LVec2, tolerance: number = 1.0e-6): boolean {
        const diff = this.subtract(vec);
        return Math.abs(diff.x) < tolerance && Math.abs(diff.y) < tolerance;
    }
}

export const o2 = Object.freeze(new Vec2(0, 0));
export const ux2 = Object.freeze(new Vec2(1, 0));
export const uy2 = Object.freeze(new Vec2(0, 1));