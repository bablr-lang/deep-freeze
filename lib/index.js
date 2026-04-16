let { freeze, getOwnPropertyNames, getOwnPropertySymbols, getOwnPropertyDescriptor } = Object;

let cache = new WeakMap();

let isObject = (value) => {
  switch (typeof value) {
    case 'object':
    case 'function':
      return value !== null;
    default:
      return false;
  }
};

export const deepFreeze = (value) => {
  let immutable = true;
  if (!isDeepFrozen(value, false)) {
    for (let name of getOwnPropertyNames(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      immutable &&= desc.get || desc.set ? false : deepFreeze(desc.value);
    }
    for (let name of getOwnPropertySymbols(value)) {
      let desc = getOwnPropertyDescriptor(value, name);
      immutable &&= desc.get || desc.set ? false : deepFreeze(desc.value);
    }
    cache.set(freeze(value), immutable);
  }

  return immutable;
};

export const isDeepFrozen = (value) => !isObject(value) || cache.has(value);

export const isDeepImmutable = (value) => !isObject(value) || !!cache.get(value);
