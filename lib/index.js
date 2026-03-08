let { freeze, getPrototypeOf, getOwnPropertyNames, getOwnPropertySymbols } = Object;

let deepFrozen = new WeakSet();

export const deepFreeze = (value) => {
  if (!isDeepFrozen(value)) {
    let proto = getPrototypeOf(value);

    if (proto && proto !== Object.prototype && proto !== Array.prototype) {
      throw new Error();
    }

    for (let name of getOwnPropertyNames(value)) {
      let value_ = value[name];
      if (!isDeepFrozen(value_)) {
        deepFreeze(value_);
      }
    }

    for (let name of getOwnPropertySymbols(value)) {
      let value_ = value[name];
      if (!isDeepFrozen(value_)) {
        deepFreeze(value_);
      }
    }

    deepFrozen.add(freeze(value));
  }

  return value;
};

export const isDeepFrozen = (value) => {
  return deepFrozen.has(value) || typeof value !== 'object' || value === null;
};
