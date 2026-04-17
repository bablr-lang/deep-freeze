## @bablr/deep-freeze

Deeply freezes own properties of plain Javascript objects and arrays. Prototypes are not considered. An immutable object is one that is deeply frozen and contains no non-prototype getters.

Caution: If you import this package in an environment in which `Object` is writable, it will add three new methods to object: `Object.deepFreeze`, `Object.isDeepFrozen`, and `Object.isImmutable`. If these three methods already exist, they will be used as-is.
