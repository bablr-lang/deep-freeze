## @bablr/deep-freeze

Deeply freezes trees of plain Javascript objects and arrays.

Caution: If you import this package in an environment in which `Object` is writable, it will add three new methods to object: `Object.deepFreeze`, `Object.isDeepFrozen`, and `Object.isImmutable`. If these three methods already exist, they will be used as-is.
