import Mat4 from '../Mat4';
import Mat3 from '../Mat3';
import Mat2 from '../Mat2';
import Vec4 from '../Vec4';
import Vec3 from '../Vec3';
import Vec2 from '../Vec2';

export function testMat4():Mat4 {
    return Mat4.fromRowMajorArray([
        [2, -1, 3, 0],
        [-3, 1, 0, 4],
        [-2, 1, 4, 1],
        [-1, 3, 0, -2]
    ]);
}

export function testMat3(): Mat3 {
    return Mat3.fromRowMajorArray([
        [2, -1, 3],
        [-3, 1, 0],
        [-2, 1, 4]
    ]);
}

export function testMat2(): Mat2 {
    return Mat2.fromRowMajorArray([
        [2, -1],
        [-3, 1]
    ]);
}

export function rowTimesColumn4(): Mat4 {
    return new Mat4(
        1, 2, 3, 4,
        2, 4, 6, 8,
        3, 6, 9, 12,
        4, 8, 12, 16
    );
}

export function rowTimesColumn2(): Mat2 {
    return new Mat2(
        1, 2,
        2, 4
    );
}

export function incrementing4(): Mat4 {
    return new Mat4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
}

export function incrementing3(): Mat3 {
    return new Mat3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
}

export function incrementing2(): Mat2 {
    return new Mat2(
        1, 2,
        3, 4
    );
}

export function array4():Array<Array<number>> {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
}
