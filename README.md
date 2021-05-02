algebr4
=======

Vectors and Matrices for up to 4 dimensions written in typescript.

Builds
------

The packaged npm version provides different builds for different module systems:

The default build is for ES6 modules which can be used for angular projects
among others:

```typescript
import { Vec3 } from '@b3gm/algebr4';

const v = new Vec3(3.0, 4.0, 5.0);
```

If you want to use the library in the backend for a regular node project, you
will have to import the commonjs build:

```typescript
import { Vec3 } from '@b3gm/algebr4/dist/commonjs/algebr4';

const v = new Vec3(3.0, 4.0, 5.0);
```

And finally there is a bundled build for direct use in the browser, that creates
the top level `algebr4` namespace within the global namespace in
`dist/bundle/algebr4.bundle.js`.

```html
<script src="https://cdn.jsdelivr.net/npm/@b3gm/algebr4@0.0.5/dist/bundle/algebr4.bundle.js"></script>
<script type="text/javascript">
  var v = new algebr4.Vec3(3.0, 4.0, 5.0);
</script>
```

General Naming Conventions
--------------------------

Typescript interfaces use the following prefixes:

- `L` - Literal: base interfaces for all other interfaces and classes. All
methods take Literals as input. Those interfaces contain no methods and only
declare the used fields. This facilitates assignment and usage of object
literals or JSON deserialized objects as input for all vector and matrix
methods.
- `R` - Readable: extend Literals. Contain no methods, that change the
internal state of the object. All methods create and return new readable
objects. Note that this does not mean Immutable, since the object might still
be writable.
- `W` - Writable: extend Readables. All methods from the Readable interface
should be overwritten to return writables instead of readables. Most methods
from the readable interface have "Self" suffixed overloads, that work on
the object itself and update their internal state instead of returning a new
object.

Unsafe Methods
--------------

Some methods have overloads, that are suffixed with `Unsafe`. They only work
correctly if their inputs satisfy certain criteria, but no such checks are
undertaken upon executing those.
For vectors and quaternions, this means, they have to have a length of 1.
Rotation matrices need to have a determinante of +-1 and need to be orthogonal.

Using unsafe methods with parameters, that do not satisfy those criteria, will
therefore yield unexpected results, but can safe performance if for 
instance a vector's length is already guaranteed to be `1.0` by surrounding
code.
