algebr4
=======

Vectors and Matrices for up to 4 dimensions.

Naming Conventions
------------------

Interfaces use the following prefixes:

- `L` - Literal: base interfaces for all other interfaces and classes. All
methods take Literals as input. That way, one can easily use object literals or
JSON deserialized objects as input for vector and matrix methods.
- `R` - Readable: extend Literals. Contain no methods, that change the
internal state of the object. Note that this does not mean Immutable, since the
object might still be writable
- `W` - Writable: extend Readables. Contain all Self suffixed overloads for
methods from the Readable interface, that work on the object itself and update
their internal state.

Methods suffixed with `Unsafe` only work correctly if the input satisfies certain
criteria, but no such checks are undertaken on executing those. For vectors and
quaternions, this means, they have to have a length of 1. Rotation matrices need
to have a determinante of +-1 and need to be orthogonal.