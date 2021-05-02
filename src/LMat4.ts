/**
 * Base interface for 4 dimensional matrices.
 */
export interface LMat4 {
    readonly xx: number;
    readonly xy: number;
    readonly xz: number;
    readonly xw: number;
    readonly yx: number;
    readonly yy: number;
    readonly yz: number;
    readonly yw: number;
    readonly zx: number;
    readonly zy: number;
    readonly zz: number;
    readonly zw: number;
    readonly wx: number;
    readonly wy: number;
    readonly wz: number;
    readonly ww: number;
}