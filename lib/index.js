let { freeze, getOwnPropertyNames, getOwnPropertySymbols, getOwnPropertyDescriptor } = Object;

let deepFrozen = new WeakSet();

export const deepFreeze = (value) => {
  if (!isDeepFrozen(value)) {
    for (let name of getOwnPropertyNames(value)) {
      deepFreeze(getOwnPropertyDescriptor(value, name).value);
    }
    for (let name of getOwnPropertySymbols(value)) {
      deepFreeze(getOwnPropertyDescriptor(value, name).value);
    }
    deepFrozen.add(freeze(value));
  }

  return value;
};

let objectTypes = ['object', 'function'];

export const isDeepFrozen = (value) => {
  return !objectTypes.includes(typeof value) || value === null || deepFrozen.has(value);
};
