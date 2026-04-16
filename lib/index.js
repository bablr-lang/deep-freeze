let { freeze, getOwnPropertyNames, getOwnPropertySymbols, getOwnPropertyDescriptor } = Object;

let cache = new WeakMap();
let objectTypes = ['object', 'function'];

export const deepFreeze = (value) => {
  let immutable = true;
  if (!isDeepFrozen(value, false)) {
    for (let name of getOwnPropertyNames(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      immutable &&= desc.get ? false : deepFreeze(desc.value);
    }
    for (let name of getOwnPropertySymbols(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      immutable &&= desc.get ? false : deepFreeze(desc.value);
    }
    cache.set(freeze(value), immutable);
  }

  return immutable;
};

export const isDeepFrozen = (value) => {
  return !objectTypes.includes(typeof value) || value === null || cache.has(value);
};

export const isDeepImmutable = (value) => {
  return !objectTypes.includes(typeof value) || value === null || !!cache.get(value);
};
