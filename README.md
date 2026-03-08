## @bablr/deep-freeze

Deeply freezes trees of plain Javascript objects and arrays. Throws an error if the structure to be deeply frozen contains non-primitive types.

The recommended way to use this package is with the `/register` import which creates `Object.deepFreeze` and `Object.isDeepFrozen`. Using the tool in this way ensures that there is only one deep-freeze cache. If there are multiple versions of the package's code running, the presence of multiple caches will prevent the packages from recognizing each other's deeply frozen trees.
